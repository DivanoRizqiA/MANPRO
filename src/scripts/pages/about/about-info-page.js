export default class AboutInfoPage {
  async render() {
    return `
    <div class="hero-background">
      <div class="hero-container">
        <section class="profile-card" style="margin-bottom:16px;">
          <div class="profile-header" style="margin-bottom:12px;">
            <img src="/images/Vector.png" alt="Diateksi" class="brand-icon" />
            <div class="profile-meta">
              <h2 class="profile-name">Tentang Diateksi</h2>
              <p class="profile-email">Platform cek risiko diabetes yang modern dan mudah digunakan</p>
            </div>
          </div>
          <p class="section-description">Diateksi membantu Anda memahami risiko diabetes secara cepat dan informatif. Dengan menggabungkan masukan kesehatan dasar seperti umur, BMI, tekanan darah, dan riwayat keluarga, sistem kami memberikan penilaian risiko sederhana yang mudah dipahami. Diateksi dirancang untuk pengguna umum: ringan, responsif, dan fokus pada kejelasan.</p>
        </section>

        <section class="profile-card" style="margin-bottom:16px;">
          <h3 class="section-title">Misi Kami</h3>
          <p class="section-description">Misi Diateksi adalah mempermudah akses informasi kesehatan dasar bagi semua orang. Kami percaya pencegahan dimulai dari pengetahuan yang sederhana: mengetahui risiko Anda dan mengambil langkah tepat sejak dini.</p>
        </section>

        <section class="profile-card" style="margin-bottom:16px;">
          <h3 class="section-title">Fitur Utama</h3>
          <ul style="margin-top:8px; color:#64748b; display:grid; gap:8px; padding-left:24px;">
            <li>Cek risiko dengan form sederhana dan jelas</li>
            <li>Ringkasan hasil yang mudah dipahami</li>
            <li>Riwayat penilaian untuk memantau progres</li>
            <li>Tampilan modern dan responsif di berbagai perangkat</li>
          </ul>
        </section>

        <section class="profile-card" style="margin-bottom:16px;">
          <h3 class="section-title">Cara Kerja</h3>
          <p class="section-description">Anda memasukkan data kesehatan dasar, sistem memprosesnya dengan pendekatan statistik sederhana, lalu menampilkan estimasi risiko. Hasil ini bersifat indikatif, bukan diagnosis. Untuk keputusan medis, selalu konsultasikan dengan profesional kesehatan.</p>
        </section>

        <section class="profile-card" style="margin-bottom:16px;">
          <h3 class="section-title">Tim & Proyek</h3>
          <p class="section-description">Diateksi adalah proyek edukasi yang berfokus pada pengalaman pengguna dan penyajian informasi kesehatan dengan gaya yang modern. Kami terbuka terhadap masukan untuk meningkatkan akurasi, kegunaan, dan aksesibilitas.</p>
        </section>

        <section class="profile-card">
          <h3 class="section-title">Kontak</h3>
          <p class="section-description">Punya saran atau pertanyaan? Silakan hubungi kami melalui email dan media sosial yang tertera di halaman utama. Kami senang mendengar masukan Anda.</p>
        </section>
      </div>
    </div>`;
  }

  async afterRender() { /* no-op for now */ }
}
