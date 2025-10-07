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
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function signIn(email, password) {
  const res = await fetch(`${API_BASE}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json(); // includes { token: "..." }
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