export function createCarouselHTML(id, items = []) {
  const slides = items.map((it, idx) => `
    <article class="carousel-slide" role="group" aria-roledescription="slide" aria-label="${idx + 1} dari ${items.length}">
      <div class="slide-inner ${it.theme || ''}">
        <div class="slide-emoji" aria-hidden="true">${it.emoji || 'ℹ️'}</div>
        <div class="slide-content">
          <h3 class="slide-title">${it.title}</h3>
          <p class="slide-highlight">${it.highlight || ''}</p>
          <p class="slide-text">${it.text}</p>
        </div>
      </div>
    </article>
  `).join('');

  const dots = items.map((_, i) => `<button class="carousel-dot" data-index="${i}" aria-label="Ke slide ${i + 1}"></button>`).join('');

  return `
    <section class="carousel" id="${id}" aria-roledescription="carousel" aria-label="Wawasan Diabetes">
      <div class="carousel-track">${slides}</div>
      <button class="carousel-nav prev" aria-label="Sebelumnya" type="button">‹</button>
      <button class="carousel-nav next" aria-label="Berikutnya" type="button">›</button>
      <div class="carousel-dots" role="tablist">${dots}</div>
    </section>
  `;
}

export function initCarousel(id, { autoPlayMs = 5000, pauseOnHover = true } = {}) {
  const root = document.getElementById(id);
  if (!root) return;

  const track = root.querySelector('.carousel-track');
  const slides = Array.from(root.querySelectorAll('.carousel-slide'));
  const prevBtn = root.querySelector('.prev');
  const nextBtn = root.querySelector('.next');
  const dots = Array.from(root.querySelectorAll('.carousel-dot'));

  let index = 0;
  let timer = null;
  const count = slides.length;

  function update() {
    track.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function goTo(i) {
    index = (i + count) % count;
    update();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function start() {
    if (timer || count <= 1 || autoPlayMs <= 0) return;
    timer = setInterval(next, autoPlayMs);
  }
  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  nextBtn?.addEventListener('click', () => { stop(); next(); start(); });
  prevBtn?.addEventListener('click', () => { stop(); prev(); start(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { stop(); goTo(i); start(); }));

  if (pauseOnHover) {
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
  }

  // Keyboard support
  root.tabIndex = 0;
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { stop(); next(); start(); }
    if (e.key === 'ArrowLeft') { stop(); prev(); start(); }
  });

  // Touch swipe
  let startX = 0; let dragging = false;
  root.addEventListener('touchstart', (e) => { dragging = true; startX = e.touches[0].clientX; stop(); }, { passive: true });
  root.addEventListener('touchmove', (e) => { if (!dragging) return; }, { passive: true });
  root.addEventListener('touchend', (e) => {
    if (!dragging) return; dragging = false;
    const endX = (e.changedTouches && e.changedTouches[0].clientX) || startX;
    const dx = endX - startX;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
    start();
  });

  // Init
  update();
  start();
}
