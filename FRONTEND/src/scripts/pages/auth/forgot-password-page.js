import { requestPasswordReset } from '../../data/api';

export default class ForgotPasswordPage {
  async render() {
    return `
      <div style="max-width:480px;margin:40px auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;background:#fff">
        <h2 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111827">Lupa Kata Sandi</h2>
        <p style="margin:0 0 16px;color:#6b7280">Masukkan email Anda. Kami akan kirimkan tautan reset password.</p>
        <form id="forgot-form">
          <label style="display:block;margin:12px 0 6px;color:#4b5563">Email</label>
          <input type="email" name="email" required placeholder="you@mail.com" style="width:100%;height:40px;padding:8px 12px;border:1px solid #e5e7eb;border-radius:6px" />
          <button type="submit" style="margin-top:16px;width:100%;height:40px;background:#2563eb;color:#fff;border:none;border-radius:6px;cursor:pointer">Kirim Tautan Reset</button>
        </form>
        <div id="forgot-msg" style="margin-top:12px;font-size:14px;color:#111827"></div>
        <div style="margin-top:16px"><a href="#/auth" style="color:#2563eb;text-decoration:none">Kembali ke Login</a></div>
      </div>
    `;
  }

  async afterRender() {
    const form = document.getElementById('forgot-form');
    const msg = document.getElementById('forgot-msg');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msg.textContent = '';
      const email = new FormData(form).get('email');
      try {
        await requestPasswordReset(email);
        msg.style.color = '#065f46';
        msg.textContent = 'Jika email terdaftar, tautan reset telah dikirim.';
      } catch (err) {
        msg.style.color = '#991b1b';
        msg.textContent = err.message || 'Gagal mengirim tautan reset.';
      }
    });
  }
}
