export function createCheckCard(check) {
    const card = document.createElement("div");
    card.style = `
      background-color: #fff;
      border-color: rgb(226, 232, 240);
      border-radius: 8px;
      border-width: 0.666667px;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
      font-weight: 400;
      margin-bottom: 16px;
      pointer-events: auto;
      transition: box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      padding: 24px;
    `;
  
    const date = new Date(check.createdAt);
    const formattedDate = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  
    const riskColorMap = {
      low: {
        bg: "rgb(240, 253, 244)",
        border: "rgb(187, 247, 208)",
        text: "rgb(21, 128, 61)",
        label: "Risiko Rendah",
        icon: `<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />`
      },
      medium: {
        bg: "rgb(254, 252, 232)",
        border: "rgb(254, 240, 138)",
        text: "rgb(202, 138, 4)",
        label: "Risiko Sedang",
        icon: `<path d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z" />`
      },
      high: {
        bg: "rgb(254, 242, 242)",
        border: "rgb(254, 202, 202)",
        text: "rgb(220, 38, 38)",
        label: "Risiko Tinggi",
        icon: `<path d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z" />`
      }
    };
  
    const riskCategory = check.riskCategory?.toLowerCase?.() || "low"; // fallback to "low"
    const risk = riskColorMap[riskCategory];
  
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
        <div>
          <div style="display: flex; align-items: center; margin-bottom: 4px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor"
              style="color: rgb(107, 114, 128); margin-right: 8px;" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" viewBox="0 0 24 24">
              <path d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10M5 7h14l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7z"/>
            </svg>
            <h3 style="color: rgb(17, 24, 39); font-size: 18px; font-weight: 600; margin: 0;">Penilaian</h3>
          </div>
          <p style="color: rgb(75, 85, 99); font-size: 14px; margin: 0;">${formattedDate}, ${formattedTime}</p>
        </div>
        <div style="text-align: right;">
          <div style="color: rgb(17, 24, 39); font-size: 24px; font-weight: 700; margin-bottom: 8px;">${(check.risk)}%</div>
          <div style="display: inline-flex; align-items: center; background-color: ${risk.bg}; color: ${risk.text};
            border: 2px solid ${risk.border}; border-radius: 9999px; font-size: 14px; font-weight: 500; padding: 4px 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="${risk.text}"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" style="margin-right: 4px;">
              ${risk.icon}
            </svg>
            <span>${risk.label}</span>
          </div>
        </div>
      </div>
  
      <div style="display: grid; gap: 16px; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-bottom: 16px;">
        <div><span style="color: rgb(75, 85, 99); font-weight: 500; font-size: 14px;">Umur:</span><span style="margin-left: 8px;">${check.age} tahun</span></div>
        <div><span style="color: rgb(75, 85, 99); font-weight: 500; font-size: 14px;">BMI:</span><span style="margin-left: 8px;">${check.bmi}</span></div>
        <div><span style="color: rgb(75, 85, 99); font-weight: 500; font-size: 14px;">Glukosa:</span><span style="margin-left: 8px;">${check.glucose} mg/dL</span></div>
        <div><span style="color: rgb(75, 85, 99); font-weight: 500; font-size: 14px;">Tekanan Darah:</span><span style="margin-left: 8px;">${check.bloodPressure} mm Hg</span></div>
      </div>
  
      <hr style="border-color: rgb(229, 231, 235); border-top-width: 1px; margin: 16px 0;" />
  
      <details style="cursor: pointer;">
        <summary style="color: rgb(75, 85, 99); font-size: 14px; font-weight: 500; user-select: none;">
          Lihat Data Lengkap
        </summary>
        <div style="background-color: rgb(249, 250, 251); border-radius: 8px; display: grid; gap: 16px;
          grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 16px; padding: 16px;">
          <div><span style="color: rgb(75, 85, 99); font-weight: 500; font-size: 14px;">Kehamilan:</span><span style="margin-left: 8px;">${check.pregnancies}</span></div>
          <div><span style="color: rgb(75, 85, 99); font-weight: 500; font-size: 14px;">Ketebalan Kulit:</span><span style="margin-left: 8px;">${check.skinThickness} mm</span></div>
          <div><span style="color: rgb(75, 85, 99); font-weight: 500; font-size: 14px;">Insulin:</span><span style="margin-left: 8px;">${check.insulin} mu U/ml</span></div>
          <div><span style="color: rgb(75, 85, 99); font-weight: 500; font-size: 14px;">Fungsi Keturunan:</span><span style="margin-left: 8px;">${check.diabetesPedigree}</span></div>
        </div>
      </details>
    `;
  
    return card;
  }
  