import { addCheck, analyzeRisk } from '../../data/api.js';
import { showRiskResult } from '../home/home-presenter.js';

export default class RiskPage {
  async render() {
    return `
    <div class="hero-background">
      <div class="hero-container" id="risk-top">
        <div class="health-info-section" style="margin-bottom:16px">
          <h3 class="section-title">Informasi</h3>
          <p class="section-description">Masukkan data kesehatan untuk memprediksi risiko Anda terhadap diabetes. Semua kolom wajib diisi untuk penilaian yang akurat.</p>
        </div>
        <div class="risk-form-card" id="risk-form-wrapper">
          <div class="risk-form-card-inner">
            <form id="diabetes-form">
              <div style="display:grid;gap:16px;grid-template-columns:repeat(2,minmax(0,1fr));" class="sm-grid-cols-1">
                  <div class="form-group">
                    <div class="label-wrapper"><label class="input-label">Umur</label><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="info-icon"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></div>
                    <div class="input-wrapper"><input type="number" name="age" max="100" required placeholder="30" class="form-input"/><span class="field-unit">tahun</span></div>
                  </div>
                <div class="form-group">
                  <div class="label-wrapper"><label class="input-label">Tinggi Badan</label><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="info-icon"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></div>
                  <div class="input-wrapper"><input type="number" name="height" min="100" max="250" required placeholder="170" class="form-input" oninput="calculateBMI()"/><span class="field-unit">cm</span></div>
                </div>
                <div class="form-group">
                  <div class="label-wrapper"><label class="input-label">Berat Badan</label><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="info-icon"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></div>
                  <div class="input-wrapper"><input type="number" name="weight" min="30" max="200" required placeholder="65" class="form-input" oninput="calculateBMI()"/><span class="field-unit">kg</span></div>
                </div>
                <div class="form-group">
                  <div class="label-wrapper"><label class="input-label">Indeks Massa Tubuh (BMI)</label><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="info-icon"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></div>
                  <div class="input-wrapper"><input type="number" name="bmi" class="form-input" placeholder="22.5" step="0.01"/><span class="field-unit">kg/m²</span></div>
                </div>
                <div class="form-group"><div class="label-wrapper"><label class="input-label">Jumlah Kehamilan</label></div><div class="input-wrapper"><input type="number" name="pregnancies" min="0" max="100" required placeholder="0" class="form-input"/><span class="field-unit">kali</span></div></div>
                <div class="form-group"><div class="label-wrapper"><label class="input-label">Kadar Glukosa</label><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="info-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></div><div class="input-wrapper"><input type="number" name="glucose" min="70" max="300" required placeholder="99" class="form-input"/><span class="field-unit">mg/dL</span></div><p class="field-help-text">Normal: 70-99 mg/dL (puasa)</p></div>
                <div class="form-group"><div class="label-wrapper"><label class="input-label">Tekanan Darah Diastolik</label><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="info-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></div><div class="input-wrapper"><input type="number" name="bloodPressure" min="80" max="200" required placeholder="120" class="form-input"/><span class="field-unit">mmHg</span></div><p class="field-help-text">Normal: 90-120 mmHg</p></div>
                <div class="form-group"><div class="label-wrapper"><label class="input-label">Ketebalan kulit</label><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="info-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></div><div class="input-wrapper"><input type="number" name="skinThickness" min="0" max="99" required placeholder="20" class="form-input"/><span class="field-unit">mm</span></div><p class="field-help-text">Diukur di bagian belakang lengan atas</p></div>
                <div class="form-group"><div class="label-wrapper"><label class="input-label">Kadar Insulin</label><svg xmlns="http://www.w3.org/2000/svg" class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></div><div class="input-wrapper"><input type="number" name="insulin" min="0" max="846" required placeholder="79" class="form-input"/><span class="field-unit">μU/mL</span></div><p class="field-help-text">Normal: 2.6-24.9 μU/mL (puasa)</p></div>
                </div>
                <div class="form-group" style="grid-column:1/-1;">
                  <div class="label-wrapper"><label class="input-label">Riwayat Diabetes Keluarga</label><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="info-icon"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></div>
                  <div class="diabetes-family-history">
                    <div style="display:grid;gap:8px;">
                      <label class="checkbox-label" style="display:flex;align-items:center;gap:8px;"><input type="checkbox" name="diabetesHistory" value="parent" onchange="calculatePedigreeScore()"/>Orang tua</label>
                      <label class="checkbox-label" style="display:flex;align-items:center;gap:8px;"><input type="checkbox" name="diabetesHistory" value="sibling" onchange="calculatePedigreeScore()"/>Saudara kandung</label>
                      <label class="checkbox-label" style="display:flex;align-items:center;gap:8px;"><input type="checkbox" name="diabetesHistory" value="grandparent" onchange="calculatePedigreeScore()"/>Kakek/Nenek</label>
                      <label class="checkbox-label" style="display:flex;align-items:center;gap:8px;"><input type="checkbox" name="diabetesHistory" value="aunt_uncle" onchange="calculatePedigreeScore()"/>Paman/Bibi</label>
                    </div>
                    <input type="hidden" name="diabetesPedigree" value="0" />
                    <div class="pedigree-score-row">
                      <span style="color:var(--text-muted);">Skor Riwayat:</span>
                      <span id="pedigreeScore" style="font-weight:600;color:var(--text-heading);">0.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="risk-submit-cta"><button id="risk-submit-btn" type="button" class="submit-button">Periksa Risiko Diabetes Saya</button></div>

        <!-- Risk Assessment Result (Shows First) -->
        <div class="result-container" style="display:none;margin-top:24px;">
          <div class="result-header"><h3 class="result-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="result-icon-green"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>Penilaian Risiko Diabetes Anda</span></h3></div>
          <div class="result-content">
            <div class="result-summary"><div class="result-percentage">25%</div><div class="result-risk-label">Risiko Rendah</div></div>
            <div class="important-notice"><div class="notice-inner"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="notice-icon-blue"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg><div class="notice-text"><p><strong>Penting:</strong> Ini adalah penilaian risiko perkiraan berdasarkan data yang Anda masukkan. Silakan konsultasikan dengan profesional kesehatan untuk nasihat medis dan diagnosis yang tepat.</p></div></div></div>
            <div class="save-confirmation"><div class="confirmation-inner"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="confirmation-icon-green"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><div class="confirmation-text"><p>Penilaian ini telah disimpan ke riwayat Anda. Anda dapat melihat semua penilaian masa lalu di bagian Riwayat.</p></div></div></div>
          </div>
        </div>

        <!-- Health Recommendations from LLM (Shows Second, Below Risk Assessment) -->
        <section id="health-recommendations" class="health-reco-section" aria-live="polite" style="margin-top:24px;display:none;">
          <div class="health-info-section">
            <h3 class="section-title">Analisis Kesehatan Detail</h3>
            <p class="section-description">Berikut adalah analisis lengkap dari AI berdasarkan data kesehatan yang Anda masukkan. Bacalah dengan seksama untuk memahami kondisi Anda.</p>
          </div>
          <div class="reco-card" id="reco-card">
            <div class="reco-inner">
              <ul class="reco-list" id="reco-list"></ul>
            </div>
          </div>
        </section>
      </div>
    </div>`;
  }

  async afterRender() {
    const form = document.querySelector('#diabetes-form');
    if (!form) return;
    const recoList = document.getElementById('reco-list');
    const submitBtn = document.getElementById('risk-submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        if (typeof form.requestSubmit === 'function') form.requestSubmit();
        else form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      });
    }

    window.calculateBMI = () => {
      const height = parseFloat(form.elements['height'].value);
      const weight = parseFloat(form.elements['weight'].value);
      const bmiInput = form.elements['bmi'];
      if (height && weight) {
        const hM = height / 100; bmiInput.value = (weight / (hM * hM)).toFixed(2);
      } else { bmiInput.value = ''; }
    };

    window.calculatePedigreeScore = () => {
      const checks = form.querySelectorAll('input[name="diabetesHistory"]');
      const pedigreeInput = form.elements['diabetesPedigree'];
      const display = document.getElementById('pedigreeScore');
      let score = 0;
      checks.forEach(c => { if (c.checked) { if (c.value==='parent') score+=0.5; else if (c.value==='sibling') score+=0.4; else if (c.value==='grandparent') score+=0.3; else if (c.value==='aunt_uncle') score+=0.2; } });
      score = Math.min(score,1); pedigreeInput.value = score.toFixed(2); if (display) display.textContent = score.toFixed(2);
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const height = Number(fd.get('height')); const weight = Number(fd.get('weight')); const hM = height/100; const bmi = (weight/(hM*hM)).toFixed(2);
      
      // Data for MongoDB (includes height, weight)
      const dataForDb = {
        Pregnancies: Number(fd.get('pregnancies')),
        Glucose: Number(fd.get('glucose')),
        BloodPressure: Number(fd.get('bloodPressure')),
        SkinThickness: Number(fd.get('skinThickness')),
        Insulin: Number(fd.get('insulin')),
        Height: height,
        Weight: weight,
        BMI: Number(bmi),
        DiabetesPedigreeFunction: Number(fd.get('diabetesPedigree')),
        Age: Number(fd.get('age')),
        Outcome: 0
      };
      
      // Data for analysis API (only 9 fields required by LLM.py)
      const analysisData = {
        Pregnancies: Number(fd.get('pregnancies')),
        Glucose: Number(fd.get('glucose')),
        BloodPressure: Number(fd.get('bloodPressure')),
        SkinThickness: Number(fd.get('skinThickness')),
        Insulin: Number(fd.get('insulin')),
        BMI: Number(bmi),
        DiabetesPedigreeFunction: Number(fd.get('diabetesPedigree')),
        Age: Number(fd.get('age')),
        Outcome: 0
      };
      
      if (Object.values(analysisData).some(v => isNaN(v))) { alert('Harap isi semua kolom dengan benar.'); return; }
      try {
        const token = localStorage.getItem('token');
        if (!token) { alert('Login dahulu untuk mengecek'); return; }
        
        console.log('[Risk Check] Submitting analysis data:', analysisData);
        console.log('[Risk Check] DB data:', dataForDb);
        
        const response = await analyzeRisk(analysisData);
        if (response.error) throw new Error(response.error);
        
        console.log('[Risk Check] Response:', response);
        
        // Save to history (addCheck) with full data including height/weight
        await addCheck(dataForDb);
        
        // Show result with risk percentage (displays first)
        showRiskResult(response);

        // Show LLM analysis recommendations if available (displays second, below risk assessment)
        if (response.analysis && recoList) {
          const healthRecoSection = document.getElementById('health-recommendations');
          if (healthRecoSection) {
            healthRecoSection.style.display = 'block';
          }

          // Helper: potong analisis menjadi section (judul + isi) berdasar heading bernomor
          const buildSections = (text) => {
            const normalized = text.replace(/\r\n/g, '\n').trim();
            const rawParts = normalized.split(/\n(?=\d+\.\s)/).map(p => p.trim()).filter(Boolean);
            if (!rawParts.length) return [];
            return rawParts.map((part, idx) => {
              const lines = part.split('\n').filter(Boolean);
              const title = lines[0];
              const body = lines.slice(1).join('<br>') || 'Tidak ada detail tambahan.';
              return { id: idx, title, body };
            });
          };

          const sections = buildSections(response.analysis);

          if (!sections.length) {
            // Fallback ke tampilan lama bila parsing gagal
            let formattedAnalysis = response.analysis.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
            recoList.innerHTML = `<li class="reco-item">${formattedAnalysis}</li>`;
          } else {
            recoList.innerHTML = sections.map((s) => `
              <li class="reco-item">
                <div class="reco-item-header" style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
                  <div class="reco-title" style="font-weight:600;color:var(--text-heading);">${s.title}</div>
                  <button type="button" class="reco-toggle" data-target="reco-body-${s.id}" style="display:flex;align-items:center;gap:6px;border:none;background:none;color:#2563eb;font-weight:600;cursor:pointer;padding:6px 8px;border-radius:8px;">
                    Selengkapnya
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                </div>
                <div id="reco-body-${s.id}" class="reco-body" style="display:none;margin-top:8px;color:var(--text-muted);line-height:1.6;">${s.body}</div>
              </li>
            `).join('');

            // Toggle detail show/hide
            recoList.querySelectorAll('.reco-toggle').forEach((btn) => {
              btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                const bodyEl = document.getElementById(targetId);
                if (!bodyEl) return;
                const isOpen = bodyEl.style.display === 'block';
                bodyEl.style.display = isOpen ? 'none' : 'block';
                btn.textContent = isOpen ? 'Selengkapnya' : 'Sembunyikan';
              });
            });
          }

          // Scroll to result container (risk assessment) first
          setTimeout(() => {
            const resultContainer = document.querySelector('.result-container');
            if (resultContainer) {
              resultContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }, 150);
        }
      } catch (err) { console.error('[Risk Check] Error:', err); alert(err.message || 'Terjadi kesalahan.'); }
    });
  }
}
