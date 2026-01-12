import CONFIG from '../config.js';
import Auth from './auth.js';

const API_BASE = CONFIG.BASE_URL;

function getAuthHeader() {
  const token = Auth.getToken();
  if (!token) throw new Error('Token tidak ditemukan. Harap login.');
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function signUp(email, password) {
  try {
    console.log('Sending signup request to:', `${API_BASE}/auth/signup`);
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    console.log('Signup response status:', res.status);
    const data = await res.json().catch(() => ({}));
    console.log('Signup response data:', data);
    
    if (!res.ok) {
      throw new Error(data.msg || data.message || 'Sign up failed');
    }
    return data;
  } catch (error) {
    console.error('Signup fetch error:', error);
    throw error;
  }
}

export async function signIn(email, password) {
  try {
    console.log('Sending signin request to:', `${API_BASE}/auth/signin`);
    const res = await fetch(`${API_BASE}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    console.log('Signin response status:', res.status);
    const data = await res.json().catch(() => ({}));
    console.log('Signin response data:', data);
    
    if (!res.ok) {
      throw new Error(data.msg || data.message || 'Login failed');
    }
    return data; // includes { token: "..." }
  } catch (error) {
    console.error('Signin fetch error:', error);
    throw error;
  }
}

export async function addCheck(data) {
  const res = await fetch(`${API_BASE}/checks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Terjadi kesalahan pada server');
  }

  return res.json();
}

export async function getChecks() {
  const res = await fetch(`${API_BASE}/checks`, {
    headers: getAuthHeader(),
  });
  return res.json();
}

export async function deleteAllChecks() {
  const res = await fetch(`${API_BASE}/checks`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  return res.json();
}

export async function deleteCheck(id) {
  const res = await fetch(`${API_BASE}/checks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Gagal menghapus riwayat');
  }
  return res.json();
}

// Password reset (Mailtrap-backed) helpers
export async function requestPasswordReset(email) {
  const res = await fetch(`${API_BASE}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.msg || errorData.message || 'Gagal mengirim tautan reset');
  }
  return res.json();
}

export async function resetPassword(token, password) {
  try {
    console.log('Sending password reset request to:', `${API_BASE}/auth/reset-password`);
    const res = await fetch(`${API_BASE}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.msg || data.message || 'Gagal mereset kata sandi');
    }
    return data;
  } catch (error) {
    console.error('Password reset fetch error:', error);
    throw error;
  }
}

export async function analyzeRisk(diabetesData) {
  try {
    console.log('Sending analyze request to:', `${API_BASE}/analysis`);
    console.log('Data:', diabetesData);
    const res = await fetch(`${API_BASE}/analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(diabetesData)
    });
    
    console.log('Analyze response status:', res.status);
    const data = await res.json().catch(() => ({}));
    console.log('Analyze response data:', data);
    
    if (!res.ok) {
      throw new Error(data.message || 'Analisis gagal');
    }
    
    // Return response dengan struktur yang benar untuk risk page
    return {
      riskPercentage: data.data?.riskPercentage || 0,
      riskLevel: data.data?.riskLevel || 'Rendah',
      analysis: data.data?.analysis || ''
    };
  } catch (error) {
    console.error('Analyze fetch error:', error);
    throw error;
  }
}