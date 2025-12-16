
const Check = require('../models/check');
const axios = require('axios');
const { spawn } = require('child_process');
const path = require('path');

/**
 * Fungsi untuk memanggil LLM.py dengan timeout dan better error handling
 */
const getAIAnalysis = (diabetesData) => {
  return new Promise((resolve, reject) => {
    console.log('[INFO] Memanggil LLM.py untuk analisis AI...');
    
    // Coba pake python dari PATH dulu, jika tidak ada, gunakan .venv
    const pythonPath = 'python';  // Gunakan python dari PATH untuk fleksibilitas
    const scriptPath = path.join(__dirname, '../../LLM.py');
    
    const pythonProcess = spawn(pythonPath, [
      scriptPath,
      JSON.stringify(diabetesData)
    ]);

    let dataString = '';
    let errorString = '';
    let timeout;

    // Set 30 second timeout for LLM response
    timeout = setTimeout(() => {
      console.warn('[WARN] LLM process timeout setelah 30 detik');
      pythonProcess.kill();
      reject(new Error('LLM process timeout - terlalu lama memproses'));
    }, 30000);

    pythonProcess.stdout.on('data', (data) => {
      dataString += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      const message = data.toString();
      if (message.trim()) {
        console.log('[PYTHON]', message.trim());
        errorString += message;
      }
    });

    pythonProcess.on('close', (code) => {
      clearTimeout(timeout);
      console.log(`[INFO] Python process selesai dengan code: ${code}`);
      
      // Cek output dulu sebelum reject berdasarkan exit code
      // Karena Python bisa exit 1 tapi tetap return valid JSON (mock response)
      try {
        if (!dataString || dataString.trim() === '') {
          if (code !== 0) {
            console.error('[ERROR] Python process error tanpa output:', errorString);
            reject(new Error(`Python script error (code ${code})`));
          } else {
            reject(new Error('Tidak ada output dari Python script'));
          }
          return;
        }
        
        const result = JSON.parse(dataString.trim());
        
        if (result.success) {
          console.log('[SUCCESS] Analisis AI berhasil didapat (exit code:', code, ')');
          resolve(result.analysis);
        } else {
          console.log('[ERROR] Analisis AI gagal:', result.error);
          reject(new Error(result.error || 'Unknown error from LLM'));
        }
      } catch (parseError) {
        // Jika JSON parse error DAN exit code error, reject
        if (code !== 0) {
          console.error('[ERROR] Python process error:', errorString);
          reject(new Error(`Python script error (code ${code})`));
        } else {
          console.error('[ERROR] JSON parse error:', parseError.message);
          console.error('[DEBUG] Raw output:', dataString);
          reject(new Error('Invalid JSON response from LLM'));
        }
      }
    });

    pythonProcess.on('error', (error) => {
      clearTimeout(timeout);
      console.error('[ERROR] Gagal menjalankan Python process:', error.message);
      reject(new Error(`Failed to execute LLM: ${error.message}`));
    });
  });
};

exports.getAllChecks = async (req, res) => {
  try {
    const checks = await Check.find({ userId: req.user.id });
    res.json(checks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.addCheck = async (req, res) => {
  try {
    const {
      Pregnancies,
      Glucose,
      BloodPressure,
      SkinThickness,
      Insulin,
      Height,
      Weight,
      DiabetesPedigreeFunction,
      Age
    } = req.body;

    console.log('[INFO] Incoming req.body:', req.body);

    // Calculate BMI
    const heightInMeters = Height / 100;
    const calculatedBMI = (Weight / (heightInMeters * heightInMeters)).toFixed(2);

    // Call the ML prediction API
    console.log('[INFO] Memanggil ML prediction API...');
    const mlResponse = await axios.post('https://vano00-diateksi.hf.space/predict', {
      Pregnancies,
      Glucose,
      BloodPressure,
      SkinThickness,
      Insulin,
      BMI: calculatedBMI,
      DiabetesPedigreeFunction,
      Age
    });

    const { prediction, risk_percentage } = mlResponse.data;
    console.log('[INFO] ML Prediction:', { prediction, risk_percentage });

    // Determine risk category based on percentage
    let riskCategory = 'low';
    if (risk_percentage > 70) {
      riskCategory = 'high';
    } else if (risk_percentage > 50) {
      riskCategory = 'medium';
    }

    // Prepare data for AI analysis
    const diabetesData = {
      Pregnancies,
      Glucose,
      BloodPressure,
      SkinThickness,
      Insulin,
      BMI: parseFloat(calculatedBMI),
      DiabetesPedigreeFunction,
      Age,
      Outcome: prediction // 0 atau 1 dari ML prediction
    };

    // Get AI analysis from Gemini
    let aiAnalysis = null;
    try {
      console.log('[INFO] Meminta analisis AI (timeout 35 detik)...');
      aiAnalysis = await getAIAnalysis(diabetesData);
      console.log('[SUCCESS] AI Analysis diterima dengan sukses');
    } catch (aiError) {
      console.error('[WARNING] Gagal mendapat AI analysis:', aiError.message);
      // Tetap lanjutkan dengan fallback message
      aiAnalysis = `[Analisis AI Tidak Tersedia]\n\nMohon maaf, analisis AI tidak berhasil diproses saat ini (${aiError.message}). Silakan coba lagi beberapa saat kemudian atau konsultasikan dengan dokter untuk penjelasan lebih detail mengenai hasil pemeriksaan Anda.`;
      console.log('[INFO] Menggunakan fallback message untuk AI analysis');
    }

    // Save check to DB (dengan AI analysis)
    const check = new Check({
      userId: req.user.id,
      pregnancies: Pregnancies,
      glucose: Glucose,
      bloodPressure: BloodPressure,
      skinThickness: SkinThickness,
      insulin: Insulin,
      height: Height,
      weight: Weight,
      bmi: calculatedBMI,
      diabetesPedigree: DiabetesPedigreeFunction,
      age: Age,
      result: prediction === 1 ? 'positive' : 'negative',
      risk: Number(risk_percentage).toFixed(2),
      riskCategory,
      aiAnalysis: aiAnalysis // Tambahkan AI analysis ke database
    });

    await check.save();
    console.log('[SUCCESS] Check berhasil disimpan ke database');

    // Return response dengan AI analysis
    res.status(201).json({
      ...check.toObject(),
      aiAnalysis: aiAnalysis
    });
  } catch (err) {
    if (err.response) {
      console.error('[ERROR] ML API error:', err.response.status, err.response.data);
    } else if (err.request) {
      console.error('[ERROR] ML API no response:', err.request);
    } else {
      console.error('[ERROR] Server error:', err.message || err);
    }
    res.status(500).json({ 
      error: 'Server error',
      message: err.message 
    });
  }
};

exports.deleteAllChecks = async (req, res) => {
  try {
    await Check.deleteMany({ userId: req.user.id });
    res.json({ msg: 'All checks deleted' });
  } catch (err) {
    console.error("ML prediction or DB save error:", err.response?.data || err.message || err);
    res.status(500).send('Server error');
  }
};

exports.deleteCheckById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Check.deleteOne({ _id: id, userId: req.user.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Riwayat tidak ditemukan atau bukan milik pengguna.' });
    }
    res.json({ msg: 'Check deleted' });
  } catch (err) {
    console.error('[ERROR] Delete check by id:', err.message || err);
    res.status(500).json({ message: 'Server error' });
  }
};

/*
const Check = require('../models/check');

exports.getAllChecks = async (req, res) => {
  try {
    const checks = await Check.find({ userId: req.user.id });
    res.json(checks);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.addCheck = async (req, res) => {
  try {
    const {
      age, bmi, glucose, pregnancies,
      insulin, bloodPressure, skinThickness,
      diabetesPedigree
    } = req.body;

    // Calculate risk score (you can change the formula)
    const risk = (
      (glucose * 0.3) +
      (bmi * 0.2) +
      (bloodPressure * 0.1) +
      (skinThickness * 0.1) +
      (insulin * 0.1) +
      (diabetesPedigree * 10) +
      (age * 0.1) +
      (pregnancies * 1)
    );

    // Determine risk category
    let riskCategory = 'low';
    if (risk > 70) {
      riskCategory = 'high';
    } else if (risk > 40) {
      riskCategory = 'medium';
    }

    const check = new Check({
      userId: req.user.id,
      age,
      bmi,
      glucose,
      pregnancies,
      insulin,
      bloodPressure,
      skinThickness,
      diabetesPedigree,
      risk,
      riskCategory
    });

    await check.save();
    res.status(201).json(check);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.deleteAllChecks = async (req, res) => {
  try {
    await Check.deleteMany({ userId: req.user.id });
    res.json({ msg: 'All checks deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

*/