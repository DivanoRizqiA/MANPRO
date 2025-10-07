const riskStyles = {
  low: { text: 'Risiko Rendah', background: '#d1fae5', border: '#047857', color: '#065f46' },
  medium: { text: 'Risiko Sedang', background: '#fef3c7', border: '#f59e0b', color: '#92400e' },
  high: { text: 'Risiko Tinggi', background: '#fee2e2', border: '#ef4444', color: '#991b1b' }
};

export function showRiskResult(response) {
  try {
    const data = typeof response === 'string' ? JSON.parse(response) : response;
    const container = document.querySelector('.result-container');
    const percentageEl = container.querySelector('.result-percentage');
    const labelEl = container.querySelector('.result-risk-label');

    if (!container || !percentageEl || !labelEl) {
      throw new Error('Required elements not found');
    }

    const riskCategory = (data.riskCategory || 'low').toLowerCase();
    const riskValue = data.risk || 0;
    const style = riskStyles[riskCategory] || riskStyles.low;

    // Update display
    container.style.display = 'block';
    percentageEl.textContent = Number(riskValue).toFixed(2) + '%';
    labelEl.textContent = style.text;

    // Apply styling
    Object.assign(labelEl.style, {
      backgroundColor: style.background,
      border: `2px solid ${style.border}`,
      color: style.color
    });

    // Scroll to result
    setTimeout(() => {
      container.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);

  } catch (error) {
    console.error('Error displaying result:', error);
    window.alert('Terjadi kesalahan saat menampilkan hasil.');
  }
}