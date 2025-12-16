import { resetPassword } from '../../data/api';

function getTokenFromHash() {
  const hash = window.location.hash || '';
  const qIndex = hash.indexOf('?');
  if (qIndex === -1) return null;
  const query = new URLSearchParams(hash.substring(qIndex + 1));
  return query.get('token');
}

export default class ResetPasswordPage {
  async render() {
    return `
      <div style="max-width:480px;margin:40px auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;background:#fff">
        <h2 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111827">Reset Kata Sandi</h2>
        <p style="margin:0 0 16px;color:#6b7280">Masukkan kata sandi baru Anda.</p>
        <form id="reset-form">
          <label style="display:block;margin:12px 0 6px;color:#4b5563">Kata Sandi Baru</label>
          <input type="password" name="password" required minlength="6" placeholder="Kata sandi baru" style="width:100%;height:40px;padding:8px 12px;border:1px solid #e5e7eb;border-radius:6px" />
          <label style="display:block;margin:12px 0 6px;color:#4b5563">Konfirmasi Kata Sandi</label>
          <input type="password" name="confirm" required minlength="6" placeholder="Ulangi kata sandi" style="width:100%;height:40px;padding:8px 12px;border:1px solid #e5e7eb;border-radius:6px" />
          <button type="submit" style="margin-top:16px;width:100%;height:40px;background:#2563eb;color:#fff;border:none;border-radius:6px;cursor:pointer">Simpan</button>
        </form>
        <div id="reset-msg" style="margin-top:12px;font-size:14px;color:#111827"></div>
        <div style="margin-top:16px"><a href="#/auth" style="color:#2563eb;text-decoration:none">Kembali ke Login</a></div>
      </div>
    `;
  }

  async afterRender() {
    const form = document.getElementById('reset-form');
    const msg = document.getElementById('reset-msg');
    const token = getTokenFromHash();
    if (!token) {
      msg.style.color = '#991b1b';
      msg.textContent = 'Token reset tidak ditemukan.';
      form.querySelector('button[type="submit"]').disabled = true;
      return;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msg.textContent = '';
      const fd = new FormData(form);
      const password = fd.get('password');
      const confirm = fd.get('confirm');
      if (password !== confirm) {
        msg.style.color = '#991b1b';
        msg.textContent = 'Konfirmasi kata sandi tidak cocok.';
        return;
      }
      try {
        await resetPassword(token, password);
        msg.style.color = '#065f46';
        msg.textContent = 'Kata sandi berhasil direset. Anda bisa login kembali.';
      } catch (err) {
        msg.style.color = '#991b1b';
        msg.textContent = err.message || 'Gagal mereset kata sandi.';
      }
    });
  }
}
