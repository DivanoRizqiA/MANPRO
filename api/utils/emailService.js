const nodemailer = require('nodemailer');

/**
 * Email Service menggunakan Nodemailer (Gmail/Mailtrap)
 */
class EmailService {
  constructor() {
    const isGmail = (process.env.MAIL_HOST || '').includes('gmail');
    
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
      port: parseInt(process.env.MAIL_PORT) || 2525,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      // Gmail specific settings
      ...(isGmail && {
        tls: {
          rejectUnauthorized: false
        }
      })
    });

    this.from = process.env.MAIL_FROM || 'no-reply@diateksi.local';
  }

  /**
   * Verifikasi koneksi email
   */
  async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log('[EMAIL] Email service connected successfully');
      return true;
    } catch (error) {
      console.error('[EMAIL] Email service connection failed:', error.message);
      return false;
    }
  }

  /**
   * Kirim email reset password
   * @param {string} to - Email tujuan
   * @param {string} resetToken - Token untuk reset password
   * @param {string} userName - Nama user (opsional)
   */
  async sendPasswordResetEmail(to, resetToken, userName = 'User') {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:9000';
    const resetLink = `${frontendUrl}/#/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `"DiaTeksi" <${this.from}>`,
      to: to,
      subject: 'Reset Password - DiaTeksi',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Password</title>
        </head>
        <body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f4f4f4;">
          <table role="presentation" style="width:100%;border-collapse:collapse;">
            <tr>
              <td align="center" style="padding:40px 0;">
                <table role="presentation" style="width:600px;border-collapse:collapse;background-color:#ffffff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="padding:40px 40px 20px;text-align:center;background:linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%);border-radius:8px 8px 0 0;">
                      <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">DiaTeksi</h1>
                      <p style="margin:8px 0 0;color:#bfdbfe;font-size:14px;">Aplikasi Pengecekan Risiko Diabetes</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding:40px;">
                      <h2 style="margin:0 0 16px;color:#111827;font-size:24px;font-weight:600;">Reset Password</h2>
                      <p style="margin:0 0 16px;color:#4b5563;font-size:16px;line-height:1.6;">
                        Halo <strong>${userName}</strong>,
                      </p>
                      <p style="margin:0 0 24px;color:#4b5563;font-size:16px;line-height:1.6;">
                        Kami menerima permintaan untuk reset password akun DiaTeksi Anda. 
                        Klik tombol di bawah ini untuk membuat password baru:
                      </p>
                      
                      <!-- Button -->
                      <table role="presentation" style="width:100%;border-collapse:collapse;">
                        <tr>
                          <td align="center" style="padding:24px 0;">
                            <a href="${resetLink}" style="display:inline-block;padding:14px 32px;background-color:#2563eb;color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;border-radius:8px;box-shadow:0 2px 4px rgba(37,99,235,0.3);">
                              Reset Password
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="margin:24px 0 16px;color:#6b7280;font-size:14px;line-height:1.6;">
                        Atau copy dan paste link berikut ke browser Anda:
                      </p>
                      <p style="margin:0 0 24px;padding:12px;background-color:#f3f4f6;border-radius:4px;word-break:break-all;">
                        <a href="${resetLink}" style="color:#2563eb;font-size:14px;text-decoration:none;">${resetLink}</a>
                      </p>
                      
                      <!-- Warning -->
                      <div style="padding:16px;background-color:#fef3c7;border-left:4px solid #f59e0b;border-radius:4px;margin:24px 0;">
                        <p style="margin:0;color:#92400e;font-size:14px;">
                          <strong>⚠️ Penting:</strong> Link ini akan kadaluarsa dalam <strong>1 jam</strong>. 
                          Jika Anda tidak meminta reset password, abaikan email ini.
                        </p>
                      </div>
                      
                      <p style="margin:24px 0 0;color:#4b5563;font-size:16px;line-height:1.6;">
                        Terima kasih,<br>
                        <strong>Tim DiaTeksi</strong>
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding:24px 40px;background-color:#f9fafb;border-top:1px solid #e5e7eb;border-radius:0 0 8px 8px;">
                      <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">
                        Email ini dikirim secara otomatis oleh DiaTeksi.<br>
                        Jangan membalas email ini.
                      </p>
                      <p style="margin:12px 0 0;color:#9ca3af;font-size:12px;text-align:center;">
                        © ${new Date().getFullYear()} DiaTeksi. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      text: `
        Reset Password - DiaTeksi
        
        Halo ${userName},
        
        Kami menerima permintaan untuk reset password akun DiaTeksi Anda.
        
        Klik link berikut untuk membuat password baru:
        ${resetLink}
        
        Link ini akan kadaluarsa dalam 1 jam.
        
        Jika Anda tidak meminta reset password, abaikan email ini.
        
        Terima kasih,
        Tim DiaTeksi
      `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('[EMAIL] Password reset email sent:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('[EMAIL] Failed to send password reset email:', error);
      throw new Error('Gagal mengirim email reset password');
    }
  }

  /**
   * Kirim email notifikasi password berhasil direset
   * @param {string} to - Email tujuan
   * @param {string} userName - Nama user
   */
  async sendPasswordChangedEmail(to, userName = 'User') {
    const mailOptions = {
      from: `"DiaTeksi" <${this.from}>`,
      to: to,
      subject: 'Password Berhasil Diubah - DiaTeksi',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f4f4f4;">
          <table role="presentation" style="width:100%;border-collapse:collapse;">
            <tr>
              <td align="center" style="padding:40px 0;">
                <table role="presentation" style="width:600px;border-collapse:collapse;background-color:#ffffff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding:40px 40px 20px;text-align:center;background:linear-gradient(135deg,#10b981 0%,#059669 100%);border-radius:8px 8px 0 0;">
                      <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">✓ Password Diubah</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:40px;">
                      <p style="margin:0 0 16px;color:#4b5563;font-size:16px;line-height:1.6;">
                        Halo <strong>${userName}</strong>,
                      </p>
                      <p style="margin:0 0 24px;color:#4b5563;font-size:16px;line-height:1.6;">
                        Password akun DiaTeksi Anda telah berhasil diubah pada <strong>${new Date().toLocaleString('id-ID')}</strong>.
                      </p>
                      <div style="padding:16px;background-color:#fef2f2;border-left:4px solid #ef4444;border-radius:4px;">
                        <p style="margin:0;color:#991b1b;font-size:14px;">
                          <strong>🔒 Peringatan Keamanan:</strong> Jika Anda tidak melakukan perubahan ini, 
                          segera hubungi tim support kami.
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px 40px;background-color:#f9fafb;border-top:1px solid #e5e7eb;border-radius:0 0 8px 8px;">
                      <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">
                        © ${new Date().getFullYear()} DiaTeksi. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      text: `
        Password Berhasil Diubah - DiaTeksi
        
        Halo ${userName},
        
        Password akun DiaTeksi Anda telah berhasil diubah pada ${new Date().toLocaleString('id-ID')}.
        
        Jika Anda tidak melakukan perubahan ini, segera hubungi tim support kami.
        
        Tim DiaTeksi
      `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('[EMAIL] Password changed notification sent:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('[EMAIL] Failed to send password changed email:', error);
      // Tidak throw error karena ini hanya notifikasi
    }
  }
}

// Export singleton instance
module.exports = new EmailService();
