// HomePage now only shows dashboard, features, info and CTA.

import { funfacts } from '../../data/funfacts';
import { createCarouselHTML, initCarousel } from '../../components/carousel';

export default class HomePage {
  async render() {
    return `
    <div class="hero-background" id="dashboard-top">
    <div class="hero-container">
      <!-- Top Hero -->
      <section class="top-hero">
        <div class="top-hero-inner">
          <div class="top-hero-left">
            <h1 class="top-hero-title">Dapatkan prediksi risiko diabetes Anda berdasarkan indikator kesehatan.</h1>
            <p class="top-hero-sub">Alat kami menggunakan kriteria medis teruji untuk memberi wawasan berharga tentang kesehatan Anda.</p>
          </div>
          <div class="top-hero-right">
            <img src="/images/illustration.png" alt="Health illustration" class="top-hero-illustration" />
          </div>
        </div>
      </section>

      <!-- Quick Stats Strip -->
      <section class="stats-strip" aria-label="Statistik singkat">
        <div class="stat">
          <div class="stat-value">≤ 2 dtk</div>
          <div class="stat-label">Rata-rata waktu hasil</div>
        </div>
        <div class="stat">
          <div class="stat-value">Akurat</div>
          <div class="stat-label">Berbasis indikator kesehatan</div>
        </div>
        <div class="stat">
          <div class="stat-value">24/7</div>
          <div class="stat-label">Akses kapan saja</div>
        </div>
      </section>

      <!-- Fun Facts Carousel (below hero) -->
      <section class="section">
        <h3 class="section-title">Wawasan Diabetes</h3>
        ${createCarouselHTML('funfacts-carousel', funfacts)}
      </section>

      <!-- About Diateksi Card -->
      <section class="about-section">
        <div class="about-card">
          <h3 class="about-title">Tentang Diateksi</h3>
          <p class="about-sub">Platform sederhana untuk mengevaluasi risiko diabetes dan memantau progres Anda.</p>
          <div class="about-items">
            <div class="about-item">
              <div class="about-icon blue">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
              </div>
              <div class="about-item-text">
                <div class="about-item-title">Prediksi Akurat</div>
                <div class="about-item-desc">Menggunakan indikator kesehatan sebagai dasar penilaian.</div>
              </div>
            </div>

            <div class="about-item">
              <div class="about-icon green">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div class="about-item-text">
                <div class="about-item-title">Hasil Dalam Sekejap</div>
                <div class="about-item-desc">Dapatkan penilaian dengan cepat dan jelas.</div>
              </div>
            </div>

            <div class="about-item">
              <div class="about-icon purple">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              </div>
              <div class="about-item-text">
                <div class="about-item-title">Menyimpan History</div>
                <div class="about-item-desc">Buat akun untuk menyimpan hasil dan melihat progres.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Toolbar removed (search bar deleted as requested) -->

      
        

          <!-- CTA Card -->
          <div class="cta-card">
            <div class="cta-content">
              <h3 class="cta-title">Apakah kamu beresiko Diabetes?</h3>
              <p class="cta-sub">Mengetahui gejala awal dapat membantu mengelola diabetes lebih baik. Pakai kalkulator untuk cek tingkat risiko dan dapatkan rekomendasi untuk tingkatkan kesehatan.</p>
              <button id="cek-sekarang" class="btn-primary">Cek Sekarang</button>
            </div>
            <div class="cta-art" aria-hidden="true">
              <img src="/images/hospital.png" alt="Healthcare illustration" class="cta-illustration" />
            </div>
          </div>

          <!-- Risk checker moved to dedicated /risk page -->
        </div>
      </div> <!--start of home page-->
    `;
  }

  async afterRender() {
    const cekBtn = document.getElementById('cek-sekarang');
    if (cekBtn) {
      cekBtn.addEventListener('click', () => {
        location.hash = '#/risk';
      });
    }

    // Init funfacts carousel
    initCarousel('funfacts-carousel', { autoPlayMs: 6000, pauseOnHover: true });
  }
}