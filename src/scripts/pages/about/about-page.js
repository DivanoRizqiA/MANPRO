import { deleteAllChecks, getChecks, deleteCheck } from '../../data/api.js';
import { createCheckCard } from '../../components/createCheckcard.js';

export default class HistoryPage {
  async render() {
    return `
      <div class="container-background" id="history-top">
        <div class="container-content">
          <div class="header">
            <div class="header-title-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="header-icon">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h1 class="header-title">Riwayat Penilaian</h1>
            </div>
            <p class="header-description">
              Lacak penilaian risiko diabetes Anda dari waktu ke waktu dan pantau
              perubahan profil kesehatan Anda.
            </p>
          </div>

          <div class="statistics-grid">
            <div class="card">
              <h3 class="card-title">Total Penilaian</h3>
              <div class="card-value" id="total-assessments">0</div>
            </div>

            <div class="card">
              <h3 class="card-title">Risiko Rata-rata</h3>
              <div class="card-value" id="average-risk">0%</div>
            </div>

            <div class="card">
              <h3 class="card-title">Tren Terbaru</h3>
              <div class="latest-trend-content">
                <svg xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"
                  class="latest-trend-icon" id="trend-icon">
                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span class="latest-trend-value" id="trend-score">0%</span>
              </div>
            </div>
          </div>

          <div class="clear-history-button-wrapper">
            <button id="clear-button" class="clear-history-button">
              <svg xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"
                class="clear-history-icon">
                <path
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span>Hapus Riwayat</span>
            </button>
          </div>

          <div class="assessment-history-list" id="assessment-history-list">
            <!-- Check cards will be rendered here -->
          </div>
        </div>
      </div>
    `;
  }

  async afterRender() {
    const container = document.getElementById("assessment-history-list");
    const totalDom = document.getElementById("total-assessments");
    const averageDom = document.getElementById("average-risk");
    const trendScoreDom = document.getElementById("trend-score");
    const trendIconDom = document.getElementById("trend-icon");

    try {
      const checks = await getChecks(); // Fetch all checks
      const total = checks.length;

      // Compute average
      const average =
        total > 0
          ? Math.round(checks.reduce((sum, check) => sum + check.risk, 0) / total)
          : 0;
          
      // Compute trend
      const last = checks[checks.length - 1]?.risk || 0;
      const prev = checks[checks.length - 2]?.risk || 0;
      const trend = prev ? last - prev : 0;
      const trendText = `${trend > 0 ? "+" : ""}${trend}%`;
      const trendColor = trend > 0 ? "rgb(239 68 68)" : "rgb(34 197 94)";

      // Update UI stats
      totalDom.textContent = total;
      averageDom.textContent = `${average}%`;
      trendScoreDom.textContent = trendText;
      trendScoreDom.style.color = trendColor;
      trendIconDom.style.stroke = trendColor;
      trendIconDom.style.transform = trend > 0 ? "rotate(0deg)" : "rotate(180deg)";

      // Render check cards
      container.innerHTML = "";
      if (checks.length === 0) {
        container.innerHTML = '<p style="color: rgb(75 85 99);">Belum ada riwayat pemeriksaan.</p>';
        return;
      }

      checks.reverse().forEach((check) => {
        const card = createCheckCard(check);
        container.appendChild(card);
      });


      document.getElementById("clear-button").addEventListener("click", async () => {
        const confirmDelete = confirm("Yakin ingin menghapus semua riwayat?");
        if (confirmDelete) {
          await deleteAllChecks();
          await this.afterRender(); 
        }
      });

      // Delegate per-card delete clicks
      container.addEventListener('click', async (e) => {
        const btn = e.target.closest('[data-check-id]');
        if (!btn) return;
        const id = btn.getAttribute('data-check-id');
        const ok = confirm('Hapus riwayat ini?');
        if (!ok) return;
        try {
          await deleteCheck(id);
          await this.afterRender();
        } catch (err) {
          alert(err.message || 'Gagal menghapus riwayat');
        }
      });
    } catch (error) {
      container.innerHTML = `<p style="color: rgb(239 68 68);">Gagal memuat data: ${error.message}</p>`;
    }
  }
}

