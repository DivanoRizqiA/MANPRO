/**
 * Simple test script untuk test diabetes analysis flow
 */

const http = require('http');

// Test data
const testEmail = `test_${Date.now()}@test.com`;
const testPassword = 'Test123!';

let userToken = null;

// Step 1: Create account
console.log('[STEP 1] Creating account...');
const signupData = JSON.stringify({
  email: testEmail,
  password: testPassword
});

const signupReq = http.request({
  hostname: '127.0.0.1',
  port: 7000,
  path: '/api/auth/signup',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': signupData.length
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      if (response.token) {
        userToken = response.token;
        console.log('[SUCCESS] Account created');
        console.log(`[TOKEN] ${userToken.substring(0, 50)}...`);
        
        // Step 2: Call analysis
        testAnalysis();
      } else {
        console.log('[ERROR] Signup failed:', response);
        process.exit(1);
      }
    } catch (e) {
      console.log('[ERROR] Parse error:', e.message);
      console.log('[RAW RESPONSE]', data);
      process.exit(1);
    }
  });
});

signupReq.on('error', (e) => {
  console.log('[ERROR] Signup request failed:', e.message);
  process.exit(1);
});

signupReq.write(signupData);
signupReq.end();

// Step 2: Test analysis
function testAnalysis() {
  console.log('\n[STEP 2] Testing diabetes analysis...');
  
  const analysisData = JSON.stringify({
    Pregnancies: 2,
    Glucose: 160,
    BloodPressure: 130,
    SkinThickness: 30,
    Insulin: 150,
    BMI: 27.6,
    DiabetesPedigreeFunction: 0.9,
    Age: 45,
    Outcome: 0
  });

  const analysisReq = http.request({
    hostname: '127.0.0.1',
    port: 7000,
    path: '/api/analysis',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
      'Content-Length': analysisData.length
    }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        
        if (response.success && response.data) {
          console.log('[SUCCESS] Analysis completed!');
          console.log(`[RISK %] ${response.data.riskPercentage}%`);
          console.log(`[RISK LEVEL] ${response.data.riskLevel}`);
          console.log(`[ANALYSIS] ${response.data.analysis.substring(0, 300)}...`);
        } else {
          console.log('[ERROR] Analysis failed:', response.message);
          console.log('[DETAILS]', response.error);
        }
        
        process.exit(0);
      } catch (e) {
        console.log('[ERROR] Parse error:', e.message);
        console.log('[RAW RESPONSE]', data.substring(0, 500));
        process.exit(1);
      }
    });
  });

  analysisReq.on('error', (e) => {
    console.log('[ERROR] Analysis request failed:', e.message);
    process.exit(1);
  });

  analysisReq.write(analysisData);
  analysisReq.end();
}
