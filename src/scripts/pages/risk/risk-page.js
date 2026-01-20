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
        <div class="risk-submit-cta"><button id="risk-submit-btn" type="button" class="submit-button"><span class="btn-label">Periksa Risiko Diabetes Saya</span><span class="btn-spinner" aria-hidden="true" style="display:none"></span></button></div>

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
            <p class="section-description">Berikut adalah analisis lengkap dari AI berdasarkan data kesehatan yang Anda masukkan. Gunakan toolbar untuk membuka semua, atau salin.</p>
          </div>
          <div class="reco-toolbar" role="toolbar" aria-label="Aksi analisis">
            <button type="button" class="btn-ghost" id="reco-expand-all">Buka Semua</button>
            <button type="button" class="btn-ghost" id="reco-collapse-all">Tutup Semua</button>
          </div>
          <div class="reco-card" id="reco-card">
            <div class="reco-inner">
              <div id="llm-loading" class="llm-loading" style="display:none">
                <span class="spinner"></span>
                <span class="loading-text">Menganalisis data Anda, mohon tunggu…</span>
              </div>
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
    const btnLabel = submitBtn?.querySelector('.btn-label');
    const btnSpinner = submitBtn?.querySelector('.btn-spinner');

    // Enable Enter-to-next navigation across inputs
    const enableEnterNavigation = () => {
      const focusableSelectors = 'input.form-input, input[name="diabetesHistory"]';
      const fields = Array.from(form.querySelectorAll(focusableSelectors))
        .filter(el => el.type !== 'hidden' && !el.disabled);
      fields.forEach((el, idx) => {
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const next = fields[idx + 1];
            if (next) next.focus();
            else if (submitBtn) submitBtn.focus();
          }
        });
      });
    };
    enableEnterNavigation();
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
        
        // UI Loading state for button and analysis card
        const healthRecoSection = document.getElementById('health-recommendations');
        const loadingEl = document.getElementById('llm-loading');
        if (submitBtn) {
          submitBtn.disabled = true;
          if (btnLabel) btnLabel.textContent = 'Memproses…';
          if (btnSpinner) btnSpinner.style.display = 'inline-block';
        }
        if (healthRecoSection) healthRecoSection.style.display = 'block';
        if (loadingEl) loadingEl.style.display = 'flex';

        const response = await analyzeRisk(analysisData);
        if (response.error) throw new Error(response.error);
        
        console.log('[Risk Check] Response:', response);
        
        // Save to history (addCheck) with full data including height/weight
        await addCheck(dataForDb);
        
        // Show result with risk percentage (displays first)
        showRiskResult(response);

        // Show LLM analysis recommendations if available (displays second, below risk assessment)
        if (response.analysis && recoList) {
          const healthRecoSection2 = document.getElementById('health-recommendations');
          if (healthRecoSection2) {
            healthRecoSection2.style.display = 'block';
          }

          // Helper: clean greeting, extract Kesimpulan, and build sections
          const buildSections = (text) => {
            // Helper: compute per-parameter risk level from input values
            const computeRiskMeta = (titleLine) => {
              const colors = { safe: '#16a34a', warn: '#f59e0b', high: '#dc2626' };
              const labels = { safe: 'Rendah', warn: 'Sedang', high: 'Tinggi' };
              const percentMap = { safe: 33, warn: 66, high: 100 };

              // Extract label without numbering, e.g., "1. Glukosa (...)" -> "Glukosa"
              const plainTitle = (titleLine || '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
              const titleNoNum = plainTitle.replace(/^\d+\.\s*/, '').trim();
              const name = (titleNoNum.split('(')[0] || '').trim().toLowerCase();

              let level = 'safe';
              try {
                if (name.includes('glukosa')) {
                  const v = Number(analysisData.Glucose);
                  level = (v >= 126) ? 'high' : (v >= 100 ? 'warn' : 'safe');
                } else if (name.includes('bmi')) {
                  const v = Number(analysisData.BMI);
                  level = (v >= 30) ? 'high' : (v >= 25 ? 'warn' : 'safe');
                } else if (name.includes('tekanan darah')) {
                  const v = Number(analysisData.BloodPressure); // diastolic
                  level = (v >= 90 || v < 60) ? 'high' : (v >= 81 ? 'warn' : 'safe');
                } else if (name.includes('insulin')) {
                  const v = Number(analysisData.Insulin);
                  level = (v > 25) ? 'high' : (v > 15 ? 'warn' : 'safe');
                } else if (name.includes('usia')) {
                  const v = Number(analysisData.Age);
                  level = (v >= 45) ? 'high' : (v >= 35 ? 'warn' : 'safe');
                } else if (name.includes('kehamilan')) {
                  const v = Number(analysisData.Pregnancies);
                  level = (v >= 6) ? 'high' : (v >= 3 ? 'warn' : 'safe');
                } else if (name.includes('ketebalan kulit')) {
                  const v = Number(analysisData.SkinThickness);
                  level = (v >= 35) ? 'high' : (v >= 25 ? 'warn' : 'safe');
                } else if (name.includes('riwayat keluarga') || name.includes('pedigree')) {
                  const v = Number(analysisData.DiabetesPedigreeFunction);
                  level = (v >= 0.7) ? 'high' : (v >= 0.4 ? 'warn' : 'safe');
                }
              } catch (_) { level = 'safe'; }

              return {
                level,
                color: colors[level],
                percent: percentMap[level],
                label: labels[level]
              };
            };

            // Remove greeting paragraph (anything before first numbered item)
            let cleanedText = text.trim();
            const firstNumberMatch = cleanedText.match(/\n*(\d+\.\s)/);
            if (firstNumberMatch) {
              const startIdx = cleanedText.indexOf(firstNumberMatch[0]);
              cleanedText = cleanedText.substring(startIdx).trim();
            }

            // Normalize newlines
            let normalized = cleanedText.replace(/\r\n/g, '\n').trim();

            // Try to extract a Kesimpulan section (if present) so it doesn't get nested under point 8
            let conclusion = null;
            const linesAll = normalized.split('\n');
            const conclIdx = linesAll.findIndex((l) => l.replace(/\*/g, '').toUpperCase().includes('KESIMPULAN'));
            if (conclIdx !== -1) {
              const conclTitleRaw = (linesAll[conclIdx] || '').trim();
              const conclBodyRaw = linesAll.slice(conclIdx + 1).join('\n').trim();
              // Remove conclusion part from the main text
              normalized = linesAll.slice(0, conclIdx).join('\n').trim();
              // Clean title and body (strip markdown markers)
              const conclTitle = conclTitleRaw.replace(/\*\*/g, '').replace(/\*/g, '').trim();
              const conclBody = conclBodyRaw
                .split('\n')
                .map(l => l.trim())
                .map(l => {
                  l = l.replace(/^[-*•◦▪▫]\s*/, '');
                  // Multiple passes to strip all asterisks thoroughly
                  l = l.replace(/\*\*/g, ''); // remove all double asterisks
                  l = l.replace(/\*/g, ''); // remove all single asterisks
                  return l;
                })
                .filter(Boolean)
                .join('<br>')
                .trim();
              conclusion = {
                id: 'conclusion',
                title: conclTitle || 'Kesimpulan & Rekomendasi',
                body: conclBody
              };
            }

            const rawParts = normalized.split(/\n(?=\d+\.\s)/).map(p => p.trim()).filter(Boolean);
            if (!rawParts.length) return { sections: [], conclusion };
            const sections = rawParts.map((part, idx) => {
              const lines = part.split('\n').filter(Boolean);
              // Title cleanup: strip markdown asterisks
              const title = (lines[0] || '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
              const riskMeta = computeRiskMeta(title);

              // Clean up the body: remove bullets and markdown symbols
              const bodyLines = lines.slice(1)
                .map(line => line.trim())
                .map(line => {
                  // Remove leading bullets: -, *, •, ◦, ▪, ▫
                  line = line.replace(/^[-*•◦▪▫]\s*/, '');
                  // Strip markdown bold/italic to plain text
                  line = line.replace(/\*\*(.*?)\*\*/g, '$1');
                  line = line.replace(/\*(.*?)\*/g, '$1');
                  return line;
                })
                .filter(line => line.length > 0);

              const body = bodyLines.join('<br>').trim();
              return { id: idx, title, body, bodyItems: bodyLines, riskMeta };
            });
            return { sections, conclusion };
          };

          const built = buildSections(response.analysis);
          const sections = built.sections || [];
          const conclusion = built.conclusion || null;

          if (!sections.length) {
            // Fallback: strip greeting and display as single item
            let cleanedAnalysis = response.analysis.trim();
            const firstNumberMatch = cleanedAnalysis.match(/\n*(\d+\.\s)/);
            if (firstNumberMatch) {
              const startIdx = cleanedAnalysis.indexOf(firstNumberMatch[0]);
              cleanedAnalysis = cleanedAnalysis.substring(startIdx).trim();
            }
            
            // Clean up bullets and formatting symbols
            let formattedAnalysis = cleanedAnalysis
              .split('\n')
              .map(line => line.trim())
              .map(line => {
                // Remove bullets
                line = line.replace(/^[-*•◦▪▫]\s*/, '');
                // Strip markdown bold/italic to plain text
                line = line.replace(/\*\*(.*?)\*\*/g, '$1');
                line = line.replace(/\*(.*?)\*/g, '$1');
                return line;
              })
              .filter(line => line.length > 0)
              .join('<br>');
            
            recoList.innerHTML = `
              <li class="reco-item" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:10px;padding:18px;">
                <div style="color:#475569;line-height:1.7;font-size:14px;">${formattedAnalysis}</div>
              </li>`;
          } else {
            recoList.innerHTML = sections.map((s) => {
              const hasDetails = !!(s.body && s.body.length > 0);
              const copyBtn = `<button type="button" class="reco-copy btn-ghost" data-target="reco-body-${s.id}">Salin</button>`;
              const toggleBtn = hasDetails ? `
                <button type="button" class="reco-toggle btn-link" aria-expanded="false" aria-controls="reco-body-${s.id}" data-target="reco-body-${s.id}">
                  <span class="toggle-label">Selengkapnya</span>
                  <svg class="chev" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>` : '';
              const bodyContent = hasDetails
                ? ((s.bodyItems && s.bodyItems.length)
                    ? `<ul style="margin:8px 0 0 0;padding:0;list-style:none;">${s.bodyItems.map(t => `
                        <li style=\"display:flex;align-items:flex-start;gap:8px;margin:6px 0;\">
                          <span style=\"flex:none;width:6px;height:6px;margin-top:8px;border-radius:50%;background:#94a3b8;\"></span>
                          <span style=\"display:block;line-height:1.6;\">${t}</span>
                        </li>`).join('')}</ul>`
                    : s.body)
                : '';
              const bodyEl = hasDetails ? `<div id="reco-body-${s.id}" class="reco-body" style="display:none;margin-top:8px;color:var(--text-muted);line-height:1.6;">${bodyContent}</div>` : '';
              const barColor = s.riskMeta?.color || '#16a34a';
              const barPct = s.riskMeta?.percent ?? 33;
              const barLabel = s.riskMeta?.label || 'Rendah';
              // Mini inline bar with compact text label beside the title
              const riskMini = `
                <span class="risk-mini" style="display:inline-flex;align-items:center;gap:6px;">
                  <span style="display:inline-block;width:56px;height:6px;background:#e5e7eb;border-radius:999px;overflow:hidden;">
                    <span style="display:block;width:${barPct}%;height:100%;background:${barColor};"></span>
                  </span>
                  <span class="risk-mini-label" style="font-size:12px;color:${barColor};font-weight:600;">${barLabel}</span>
                </span>`;
              return `
              <li class="reco-item">
                <div class="reco-item-header" style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
                  <div class="reco-title" style="display:flex;align-items:center;gap:8px;font-weight:600;color:var(--text-heading);"><span>${s.title}</span>${riskMini}</div>
                  <div style="display:flex;gap:6px;align-items:center;">
                    ${copyBtn}
                    ${toggleBtn}
                  </div>
                </div>
                ${bodyEl}
              </li>`;
            }).join('');

            // If a standalone conclusion exists, render as separate themed cards
            if (conclusion && conclusion.body) {
              const rawLines = conclusion.body.split('<br>').map(l => l.trim()).filter(Boolean);

              // Topic buckets
              const buckets = {
                summary: [],
                menu: { pagi: [], siang: [], malam: [], camilan: [], other: [] },
                olahraga: [],
                dokter: [],
                rekomendasi: []
              };

              let topic = 'summary';
              let sub = null;

              const isHeader = (t) => /^(MENU MAKANAN|MAKANAN|DIET|JADWAL OLAHRAGA|OLAHRAGA|AKTIVITAS|KAPAN HARUS KE DOKTER|KAPAN KE DOKTER|DOKTER|REKOMENDASI|KESIMPULAN)$/i.test(t);
              const isSubMeal = (t) => /^(PAGI|SIANG|MALAM|CAMILAN)$/i.test(t);

              rawLines.forEach((line) => {
                if (isHeader(line)) {
                  if (/(MENU MAKANAN|MAKANAN|DIET)/i.test(line)) { topic = 'menu'; sub = null; return; }
                  if (/(JADWAL OLAHRAGA|OLAHRAGA|AKTIVITAS)/i.test(line)) { topic = 'olahraga'; sub = null; return; }
                  if (/(KAPAN HARUS KE DOKTER|KAPAN KE DOKTER|DOKTER)/i.test(line)) { topic = 'dokter'; sub = null; return; }
                  if (/REKOMENDASI/i.test(line)) { topic = 'rekomendasi'; sub = null; return; }
                  if (/KESIMPULAN/i.test(line)) { topic = 'summary'; sub = null; return; }
                }

                if (isSubMeal(line)) { sub = line.toLowerCase(); return; }

                // Check for PENTING marker and add icon
                const withImportantIcon = /PENTING/i.test(line) ? line.replace(/PENTING/gi, '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin:0 4px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>PENTING') : line;

                if (topic === 'menu') {
                  const target = sub && buckets.menu[sub] ? buckets.menu[sub] : buckets.menu.other;
                  target.push(withImportantIcon);
                } else {
                  buckets[topic].push(withImportantIcon);
                }
              });

              // Render Kesimpulan Inti (if exists)
              if (buckets.summary.length) {
                const items = buckets.summary.map(p => `<li style="margin:8px 0;padding-left:0;">${p}</li>`).join('');
                const summaryCard = `
                <li class="reco-item" style="background:linear-gradient(135deg, #5b86e5 0%, #36d1dc 100%);border:none;border-radius:12px;padding:24px;box-shadow:0 4px 16px rgba(91,134,229,0.25);margin-top:16px;">
                  <div class="reco-item-header" style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
                      <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                    </svg>
                    <div class="reco-title" style="font-weight:700;color:#ffffff;font-size:18px;">Kesimpulan Inti</div>
                  </div>
                  <div style="color:#ffffff;line-height:1.8;font-size:14.5px;"><ul style="margin:0 0 0 16px;padding:0;list-style:none;">${items}</ul></div>
                </li>`;
                recoList.insertAdjacentHTML('beforeend', summaryCard);
              }

              // Menu Makanan Card (themed for food)
              if (buckets.menu.pagi.length || buckets.menu.siang.length || buckets.menu.malam.length || buckets.menu.camilan.length || buckets.menu.other.length) {
                const renderMeal = (label, items) => {
                  if (!items || !items.length) return '';
                  const list = items.map(t => `<li style="margin:6px 0;">${t}</li>`).join('');
                  return `<div style="margin-bottom:12px;"><div style="font-weight:600;color:#fff;margin-bottom:6px;font-size:14.5px;">${label}</div><ul style="margin:0 0 0 16px;padding:0;">${list}</ul></div>`;
                };
                const emoji = (c) => `<span style="font-family:'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji','Segoe UI Symbol',sans-serif">${c}</span>`;
                const menuContent = [
                  renderMeal(`${emoji('🌅')} Pagi`, buckets.menu.pagi),
                  renderMeal(`${emoji('☀️')} Siang`, buckets.menu.siang),
                  renderMeal(`${emoji('🌙')} Malam`, buckets.menu.malam),
                  renderMeal(`${emoji('🍎')} Camilan`, buckets.menu.camilan),
                  buckets.menu.other.length ? `<div>${buckets.menu.other.map(t => `<p style="margin:6px 0;">${t}</p>`).join('')}</div>` : ''
                ].filter(Boolean).join('');

                const menuCard = `
                <li class="reco-item" style="background:linear-gradient(135deg, #fa8c82 0%, #ffac81 100%);border:none;border-radius:12px;padding:24px;box-shadow:0 4px 16px rgba(250,140,130,0.25);margin-top:16px;">
                  <div class="reco-item-header" style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
                    </svg>
                    <div class="reco-title" style="font-weight:700;color:#ffffff;font-size:18px;">Menu Makanan</div>
                  </div>
                  <div style="color:#ffffff;line-height:1.7;font-size:14.5px;">${menuContent}</div>
                </li>`;
                recoList.insertAdjacentHTML('beforeend', menuCard);
              }

              // Jadwal Olahraga Card (themed for sports)
              if (buckets.olahraga.length) {
                const list = buckets.olahraga.map(t => `<li style="margin:6px 0;">${t}</li>`).join('');
                const olahragaCard = `
                <li class="reco-item" style="background:linear-gradient(135deg, #11998e 0%, #38ef7d 100%);border:none;border-radius:12px;padding:24px;box-shadow:0 4px 16px rgba(17,153,142,0.25);margin-top:16px;">
                  <div class="reco-item-header" style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6.5 6.5l11 11"/><path d="M21 3l-1 1"/><path d="M3 21l1-1"/><path d="M18.5 2.5L16 5l3 3 2.5-2.5"/><path d="M2.5 21.5L5 19l3 3-2.5 2.5"/>
                    </svg>
                    <div class="reco-title" style="font-weight:700;color:#ffffff;font-size:18px;">Jadwal Olahraga</div>
                  </div>
                  <div style="color:#ffffff;line-height:1.7;font-size:14.5px;"><ul style="margin:6px 0 0 16px;padding:0;">${list}</ul></div>
                </li>`;
                recoList.insertAdjacentHTML('beforeend', olahragaCard);
              }

              // Kapan Harus ke Dokter Card (emphasized)
              if (buckets.dokter.length) {
                const list = buckets.dokter.map(t => `<li style="margin:6px 0;">${t}</li>`).join('');
                const dokterCard = `
                <li class="reco-item" style="background:linear-gradient(135deg, #f7971e 0%, #ffd200 100%);border:none;border-radius:12px;padding:24px;box-shadow:0 4px 16px rgba(247,151,30,0.25);margin-top:16px;">
                  <div class="reco-item-header" style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    <div class="reco-title" style="font-weight:700;color:#ffffff;font-size:18px;">⚠️ Kapan Harus ke Dokter</div>
                  </div>
                  <div style="color:#ffffff;line-height:1.7;font-size:14.5px;"><ul style="margin:6px 0 0 16px;padding:0;">${list}</ul></div>
                </li>`;
                recoList.insertAdjacentHTML('beforeend', dokterCard);
              }

              // Rekomendasi (if exists)
              if (buckets.rekomendasi.length) {
                const list = buckets.rekomendasi.map(t => `<li style="margin:6px 0;">${t}</li>`).join('');
                const rekoCard = `
                <li class="reco-item" style="background:linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);border:none;border-radius:12px;padding:24px;box-shadow:0 4px 16px rgba(161,140,209,0.25);margin-top:16px;">
                  <div class="reco-item-header" style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <div class="reco-title" style="font-weight:700;color:#ffffff;font-size:18px;">Rekomendasi Tambahan</div>
                  </div>
                  <div style="color:#ffffff;line-height:1.7;font-size:14.5px;"><ul style="margin:6px 0 0 16px;padding:0;">${list}</ul></div>
                </li>`;
                recoList.insertAdjacentHTML('beforeend', rekoCard);
              }

              // Disclaimer Card (at the bottom)
              const disclaimerCard = `
              <li class="reco-item" style="background:#f8f9fa;border:2px solid #dee2e6;border-radius:12px;padding:20px;margin-top:16px;">
                <div style="display:flex;align-items:start;gap:12px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6c757d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px;">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <div>
                    <div style="font-weight:700;color:#495057;font-size:15px;margin-bottom:6px;">Disclaimer</div>
                    <p style="color:#6c757d;font-size:13.5px;line-height:1.6;margin:0;">Analisis ini bersifat informatif dan tidak menggantikan konsultasi medis profesional. Untuk diagnosis dan rekomendasi yang akurat, konsultasikan dengan dokter atau tenaga kesehatan yang berkualifikasi.</p>
                  </div>
                </div>
              </li>`;
              recoList.insertAdjacentHTML('beforeend', disclaimerCard);
            }

            // Toggle detail show/hide (only for sections that have details)
            recoList.querySelectorAll('.reco-toggle').forEach((btn) => {
              btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                const bodyEl = document.getElementById(targetId);
                if (!bodyEl) return;
                const isOpen = bodyEl.style.display === 'block';
                bodyEl.style.display = isOpen ? 'none' : 'block';
                const label = btn.querySelector('.toggle-label');
                const chev = btn.querySelector('.chev');
                if (label) label.textContent = isOpen ? 'Selengkapnya' : 'Sembunyikan';
                btn.setAttribute('aria-expanded', String(!isOpen));
                if (chev) chev.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
              });
            });

            // Copy per-section
            recoList.querySelectorAll('.reco-copy').forEach((btn) => {
              btn.addEventListener('click', async () => {
                const targetId = btn.getAttribute('data-target');
                const bodyEl = document.getElementById(targetId);
                if (!bodyEl) return;
                const sectionText = bodyEl.innerText || bodyEl.textContent || '';
                try {
                  await navigator.clipboard.writeText(sectionText);
                  btn.textContent = 'Disalin';
                  setTimeout(() => { btn.textContent = 'Salin'; }, 1200);
                } catch (_) { alert('Gagal menyalin.'); }
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
      finally {
        const loadingEl2 = document.getElementById('llm-loading');
        if (loadingEl2) loadingEl2.style.display = 'none';
        if (submitBtn) {
          submitBtn.disabled = false;
          if (btnLabel) btnLabel.textContent = 'Periksa Risiko Diabetes Saya';
          if (btnSpinner) btnSpinner.style.display = 'none';
        }
      }
    });

    // Toolbar actions for recommendations
    const recoListEl = document.getElementById('reco-list');
    const expandAllBtn = document.getElementById('reco-expand-all');
    const collapseAllBtn = document.getElementById('reco-collapse-all');

    const expandCollapseAll = (open) => {
      if (!recoListEl) return;
      recoListEl.querySelectorAll('.reco-body').forEach((el) => { el.style.display = open ? 'block' : 'none'; });
      recoListEl.querySelectorAll('.reco-toggle').forEach((btn) => {
        const label = btn.querySelector('.toggle-label');
        const chev = btn.querySelector('.chev');
        if (label) label.textContent = open ? 'Sembunyikan' : 'Selengkapnya';
        btn.setAttribute('aria-expanded', String(open));
        if (chev) chev.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
      });
    };

    expandAllBtn?.addEventListener('click', () => expandCollapseAll(true));
    collapseAllBtn?.addEventListener('click', () => expandCollapseAll(false));

    // Fitur "Salin Semua" dan "Unduh" dihapus sesuai permintaan
  }
}
