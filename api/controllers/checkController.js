
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
      Age,
      providedRisk,
      providedAnalysis
    } = req.body;

    console.log('[INFO] Incoming req.body:', req.body);

    // Calculate BMI
    const heightInMeters = Height / 100;
    const calculatedBMI = (Weight / (heightInMeters * heightInMeters)).toFixed(2);

    let riskNum, predictionNum, riskCategory, aiAnalysis;

    // Use provided data if available to avoid re-calculation and ensure consistency
    if (providedRisk !== undefined && providedAnalysis) {
        console.log('[INFO] Using provided risk and analysis (Consistency Mode)');
        riskNum = Number(providedRisk);
        predictionNum = riskNum > 50 ? 1 : 0; 
        aiAnalysis = providedAnalysis;
    } else {
        // Fallback: Calculate if not provided
        console.log('[INFO] Memanggil ML prediction API di HuggingFace (Fallback Mode)...');
        
        let mlResponse;
        let retries = 3;
        let lastError;

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                mlResponse = await axios.post(
                  'https://vano00-Diateksi.hf.space/predict',
                  {
                    Pregnancies: Number(Pregnancies),
                    Glucose: Number(Glucose),
                    BloodPressure: Number(BloodPressure),
                    SkinThickness: Number(SkinThickness),
                    Insulin: Number(Insulin),
                    BMI: parseFloat(calculatedBMI),
                    DiabetesPedigreeFunction: Number(DiabetesPedigreeFunction),
                    Age: Number(Age)
                  },
                  { timeout: 30000, headers: { 'Content-Type': 'application/json' } }
                );

                if (!mlResponse.data) throw new Error('Empty response');

                if (mlResponse.data.risk_percentage !== undefined) {
                    riskNum = Number(mlResponse.data.risk_percentage);
                    predictionNum = Number(mlResponse.data.prediction);
                } else if (mlResponse.data.probability !== undefined) {
                    riskNum = Number(mlResponse.data.probability);
                    predictionNum = riskNum > 50 ? 1 : 0;
                } else {
                    throw new Error('Unknown format');
                }
                break;
            } catch (e) {
                lastError = e;
                if (attempt === retries) {
                     // If ML fails in fallback mode, we effectively fail the save or save with 0?
                     // Verify if critical. For now, throw to trigger catch block
                     throw e; 
                }
                await new Promise(r => setTimeout(r, 2000));
            }
        }

        // Gemini Logic for Fallback
        const diabetesData = {
          Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin,
          BMI: parseFloat(calculatedBMI), DiabetesPedigreeFunction, Age,
          Outcome: predictionNum, risk_percentage: riskNum
        };
        
        try {
           aiAnalysis = await getAIAnalysis(diabetesData);
        } catch (e) {
           aiAnalysis = `[Analisis AI Tidak Tersedia] ${e.message}`;
        }
    }

    // Determine category based on validated threshold (Same as Frontend)
    if (riskNum > 70) {
      riskCategory = 'high';
    } else if (riskNum > 30) {
      riskCategory = 'medium';
    } else {
      riskCategory = 'low';
    }

    // Save check to DB
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
      result: predictionNum === 1 ? 'positive' : 'negative',
      risk: Number(riskNum).toFixed(2),
      riskCategory,
      aiAnalysis: aiAnalysis
    });

    await check.save();
    console.log('[SUCCESS] Check berhasil disimpan ke database');

    res.status(201).json({
      ...check.toObject(),
      aiAnalysis: aiAnalysis
    });
  } catch (err) {
    console.error(err);
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