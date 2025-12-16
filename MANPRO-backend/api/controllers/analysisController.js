const { spawn } = require('child_process');
const path = require('path');

/**
 * Controller untuk analisis diabetes menggunakan Gemini AI
 */
exports.analyzeDiabetes = async (req, res) => {
    try {
        console.log('[INFO] Menerima request analisis diabetes');
        
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
        const pythonPath = path.join(__dirname, '../../.venv/Scripts/python.exe');
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

        // Handle ketika process selesai
        pythonProcess.on('close', (code) => {
            console.log(`[INFO] Python process selesai dengan code: ${code}`);
            
            if (code !== 0) {
                console.error('[ERROR] Python process error:', errorString);
                return res.status(500).json({
                    success: false,
                    message: 'Error saat menjalankan analisis',
                    error: errorString
                });
            }

            try {
                console.log('[INFO] Raw output dari Python:', dataString);
                const result = JSON.parse(dataString);
                
                if (result.success) {
                    console.log('[SUCCESS] Analisis berhasil');
                    return res.status(200).json({
                        success: true,
                        data: {
                            inputData: diabetesData,
                            analysis: result.analysis
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

        // Handle error saat spawn
        pythonProcess.on('error', (error) => {
            console.error('[ERROR] Gagal menjalankan Python process:', error);
            return res.status(500).json({
                success: false,
                message: 'Gagal menjalankan Python script',
                error: error.message
            });
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
