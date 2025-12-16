const { spawn } = require('child_process');
const path = require('path');

/**
 * Controller untuk analisis diabetes menggunakan Gemini AI
 */
exports.analyzeDiabetes = async (req, res) => {
    try {
        console.log('[INFO] Menerima request analisis diabetes');
        console.log('[DEBUG] Request body:', req.body);
        console.log('[DEBUG] User:', req.user);
        
        const {
            Pregnancies,
            Glucose,
            BloodPressure,
            SkinThickness,
            Insulin,
            BMI,
            DiabetesPedigreeFunction,
            Age,
            Outcome
        } = req.body;

        // Validasi input
        if (
            Pregnancies === undefined ||
            Glucose === undefined ||
            BloodPressure === undefined ||
            SkinThickness === undefined ||
            Insulin === undefined ||
            BMI === undefined ||
            DiabetesPedigreeFunction === undefined ||
            Age === undefined ||
            Outcome === undefined
        ) {
            console.log('[ERROR] Validasi gagal - ada field yang kosong');
            return res.status(400).json({
                success: false,
                message: 'Semua field harus diisi'
            });
        }

        // Prepare data untuk dikirim ke Python
        const diabetesData = {
            Pregnancies,
            Glucose,
            BloodPressure,
            SkinThickness,
            Insulin,
            BMI,
            DiabetesPedigreeFunction,
            Age,
            Outcome
        };

        console.log('[INFO] Data pasien:', JSON.stringify(diabetesData, null, 2));

        // Path ke Python script dan virtual environment
        // Coba beberapa path kemungkinan
        let pythonPath = 'python';  // Default system python
        const possiblePaths = [
            path.join(__dirname, '../../.venv/Scripts/python.exe'),
            path.join(__dirname, '../../.venv/bin/python'),
            'python.exe',
            'python'
        ];
        
        // Cari python yang available
        const fs = require('fs');
        for (let p of possiblePaths) {
            try {
                if (fs.existsSync(p)) {
                    pythonPath = p;
                    console.log('[INFO] Found Python at:', pythonPath);
                    break;
                }
            } catch (e) {
                // Continue to next path
            }
        }
        
        const scriptPath = path.join(__dirname, '../../LLM.py');

        console.log('[INFO] Python path:', pythonPath);
        console.log('[INFO] Script path:', scriptPath);

        // Panggil Python script dengan spawn
        const pythonProcess = spawn(pythonPath, [
            scriptPath,
            JSON.stringify(diabetesData)
        ]);

        let dataString = '';
        let errorString = '';
        let responseSent = false;  // Flag untuk track apakah response sudah dikirim

        // Collect data dari stdout
        pythonProcess.stdout.on('data', (data) => {
            dataString += data.toString();
        });

        // Collect error dari stderr (termasuk log dari Python)
        pythonProcess.stderr.on('data', (data) => {
            const message = data.toString();
            console.log('[PYTHON]', message.trim());
            errorString += message;
        });

        // Handle error saat spawn (prioritas tinggi)
        pythonProcess.on('error', (error) => {
            if (responseSent) return;  // Cegah multiple response
            responseSent = true;
            
            console.error('[ERROR] Gagal menjalankan Python process:', error);
            console.error('[ERROR] Coba gunakan system python: python -c "import sys; print(sys.executable)"');
            return res.status(500).json({
                success: false,
                message: 'Gagal menjalankan Python script - Python tidak ditemukan atau virtual env error',
                error: error.message,
                pythonPath: pythonPath
            });
        });

        // Handle ketika process selesai
        pythonProcess.on('close', (code) => {
            if (responseSent) return;  // Cegah multiple response
            responseSent = true;
            
            console.log(`[INFO] Python process selesai dengan code: ${code}`);
            
            if (code !== 0) {
                console.error('[ERROR] Python process error:', errorString);
                return res.status(500).json({
                    success: false,
                    message: 'Error saat menjalankan analisis',
                    error: errorString,
                    code: code
                });
            }

            try {
                console.log('[INFO] Raw output dari Python:', dataString);
                const result = JSON.parse(dataString);
                
                if (result.success) {
                    console.log('[SUCCESS] Analisis berhasil');
                    console.log('[SUCCESS] Risk percentage:', result.riskPercentage);
                    console.log('[SUCCESS] Risk level:', result.riskLevel);
                    return res.status(200).json({
                        success: true,
                        data: {
                            inputData: diabetesData,
                            analysis: result.analysis,
                            riskPercentage: result.riskPercentage || 0,
                            riskLevel: result.riskLevel || 'Tidak Diketahui'
                        }
                    });
                } else {
                    console.log('[ERROR] Analisis gagal:', result.error);
                    return res.status(500).json({
                        success: false,
                        message: 'Analisis gagal',
                        error: result.error
                    });
                }
            } catch (parseError) {
                console.error('[ERROR] Parse error:', parseError);
                return res.status(500).json({
                    success: false,
                    message: 'Error parsing hasil analisis',
                    error: parseError.message,
                    rawOutput: dataString
                });
            }
        });

    } catch (error) {
        console.error('[ERROR] Exception:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};
