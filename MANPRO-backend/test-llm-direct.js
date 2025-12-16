/**
 * Direct test untuk LLM.py dari Node.js
 * Gunakan: node test-llm-direct.js
 */

const { spawn } = require('child_process');
const path = require('path');

const testData = {
  Pregnancies: 1,
  Glucose: 150,
  BloodPressure: 90,
  SkinThickness: 25,
  Insulin: 100,
  BMI: 28.5,
  DiabetesPedigreeFunction: 0.5,
  Age: 45,
  Outcome: 1
};

console.log('[TEST] Menjalankan LLM.py directly dari Node.js...\n');
console.log('[TEST] Input data:', testData);
console.log('[TEST] ======================================\n');

const pythonPath = 'python';
const scriptPath = path.join(__dirname, 'LLM.py');

const pythonProcess = spawn(pythonPath, [
  scriptPath,
  JSON.stringify(testData)
]);

let stdout = '';
let stderr = '';

pythonProcess.stdout.on('data', (data) => {
  const chunk = data.toString();
  stdout += chunk;
  console.log('[STDOUT]', chunk);
});

pythonProcess.stderr.on('data', (data) => {
  const chunk = data.toString();
  stderr += chunk;
  console.log('[STDERR]', chunk);
});

pythonProcess.on('close', (code) => {
  console.log('\n[TEST] ======================================');
  console.log(`[TEST] Process selesai dengan code: ${code}`);
  
  if (code === 0 && stdout) {
    try {
      const result = JSON.parse(stdout.trim());
      console.log('[TEST] ✓ JSON parsing berhasil!');
      if (result.success) {
        console.log('[TEST] ✓ Success: true');
        console.log('[TEST] ✓ Analysis length:', result.analysis.length, 'chars');
        console.log('\n[ANALYSIS PREVIEW]');
        console.log(result.analysis.substring(0, 500) + '...\n');
      } else {
        console.log('[TEST] ✗ Success: false');
        console.log('[TEST] Error:', result.error);
      }
    } catch (e) {
      console.log('[TEST] ✗ JSON parsing error:', e.message);
      console.log('[TEST] Raw stdout:', stdout.substring(0, 200));
    }
  } else {
    console.log('[TEST] ✗ Process failed or no output');
    if (stderr) {
      console.log('[TEST] Stderr:', stderr.substring(0, 300));
    }
  }
});

pythonProcess.on('error', (error) => {
  console.error('[TEST] ✗ Error:', error.message);
});

// Timeout setelah 60 detik
setTimeout(() => {
  console.log('\n[TEST] ✗ TIMEOUT setelah 60 detik!');
  pythonProcess.kill();
  process.exit(1);
}, 60000);
