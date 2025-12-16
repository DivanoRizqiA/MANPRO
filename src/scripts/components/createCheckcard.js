export function createCheckCard(check) {
    const card = document.createElement("div");
    card.style = `
      background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
      border: 1px solid #e5e7eb;
      border-radius: 16px;
      box-shadow: 0 6px 22px rgba(2,6,23,0.08);
      font-weight: 400;
      margin: 6px; /* create leftover space around the card */
      pointer-events: auto;
      transition: box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      padding: 30px;
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
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 20px;">
        <div>
          <div style="display: inline-flex; align-items: center; margin-bottom: 6px;">
            <h3 style="color: rgb(17, 24, 39); font-size: 20px; font-weight: 700; margin: 0;">Penilaian</h3>
          </div>
          <p style="color: rgb(75, 85, 99); font-size: 15px; margin: 0;">${formattedDate}, ${formattedTime}</p>
        </div>
        <div style="text-align: center; margin-top: 10px;">
          <div style="color: rgb(17, 24, 39); font-size: 36px; font-weight: 800; margin-bottom: 10px;">${(check.risk)}%</div>
          <div style="display: inline-flex; align-items: center; justify-content: center; background-color: ${risk.bg}; color: ${risk.text};
            border: 2px solid ${risk.border}; border-radius: 9999px; font-size: 14px; font-weight: 500; padding: 4px 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="${risk.text}"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" style="margin-right: 4px;">
              ${risk.icon}
            </svg>
            <span>${risk.label}</span>
          </div>
        </div>
      </div>
  
      <div style="display: grid; gap: 20px; grid-template-columns: repeat(2, minmax(0, 1fr)); margin-bottom: 20px; text-align:center;">
        <div><span style="color: rgb(75, 85, 99); font-weight: 600; font-size: 15px;">Umur:</span><span style="margin-left: 10px; font-size:15px;">${check.age} tahun</span></div>
        <div><span style="color: rgb(75, 85, 99); font-weight: 600; font-size: 15px;">BMI:</span><span style="margin-left: 10px; font-size:15px;">${check.bmi}</span></div>
        <div><span style="color: rgb(75, 85, 99); font-weight: 600; font-size: 15px;">Glukosa:</span><span style="margin-left: 10px; font-size:15px;">${check.glucose} mg/dL</span></div>
        <div><span style="color: rgb(75, 85, 99); font-weight: 600; font-size: 15px;">Tekanan Darah:</span><span style="margin-left: 10px; font-size:15px;">${check.bloodPressure} mm Hg</span></div>
      </div>
  
      <hr style="border-color: rgb(229, 231, 235); border-top-width: 1px; margin: 18px 0;" />
  
      <details style="cursor: pointer;">
        <summary style="color: rgb(75, 85, 99); font-size: 15px; font-weight: 600; user-select: none;">
          Lihat Data Lengkap
        </summary>
        <div style="background-color: rgb(249, 250, 251); border-radius: 10px; display: grid; gap: 18px;
          grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 16px; padding: 18px; text-align:center;">
          <div><span style="color: rgb(75, 85, 99); font-weight: 600; font-size: 15px;">Kehamilan:</span><span style="margin-left: 10px; font-size:15px;">${check.pregnancies}</span></div>
          <div><span style="color: rgb(75, 85, 99); font-weight: 600; font-size: 15px;">Ketebalan Kulit:</span><span style="margin-left: 10px; font-size:15px;">${check.skinThickness} mm</span></div>
          <div><span style="color: rgb(75, 85, 99); font-weight: 600; font-size: 15px;">Insulin:</span><span style="margin-left: 10px; font-size:15px;">${check.insulin} mu U/ml</span></div>
          <div><span style="color: rgb(75, 85, 99); font-weight: 600; font-size: 15px;">Fungsi Keturunan:</span><span style="margin-left: 10px; font-size:15px;">${check.diabetesPedigree}</span></div>
        </div>
      </details>
      <div style="display:flex; justify-content:flex-end; margin-top:14px;">
        <button class="clear-history-button" data-check-id="${check.id}" title="Hapus riwayat ini">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="clear-history-icon">
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          <span>Hapus</span>
        </button>
      </div>
    `;
  
    return card;
  }
  