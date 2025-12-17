// CSS imports
import '../styles/styles.css';
import App from './pages/app';
import Auth from './data/auth';

// Check authentication status and redirect accordingly
const checkAuth = () => {
  const token = Auth.getToken();
  const currentPath = getCurrentPath();
  const publicRoutes = ['/', '/auth', '/register', '/forgot-password', '/reset-password'];

  if (!token && !publicRoutes.includes(currentPath)) {
    window.location.hash = '#/auth';
  } else if (token && (currentPath === '/auth' || currentPath === '/' || currentPath === '/register')) {
    window.location.hash = '#/home';
  }
};

// ✅ Loader control with fade-out and delay
function showLoader() {
  const loader = document.getElementById("loading");
  if (loader) {
    loader.classList.add("show");
    loader.classList.remove("hide");
  }
}

function hideLoader() {
  const loader = document.getElementById("loading");
  if (loader) {
    loader.classList.add("hide"); // fade out
    setTimeout(() => {
      loader.classList.remove("show");
    }, 500); // delay to match fade duration
  }
}

// ✅ Lightweight global toast (flash message)
let __toastVisible = false;
function showToast(message, { background = '#e0f2fe', border = '#93c5fd', text = '#075985', timeout = 2400 } = {}) {
  if (__toastVisible) return; // prevent stacking
  __toastVisible = true;

  const enterMs = 250;
  const exitMs = 300;
  const visibleMs = Math.max(0, timeout - exitMs);

  const wrap = document.createElement('div');
  wrap.setAttribute('role', 'status');
  wrap.style.position = 'fixed';
  wrap.style.top = '12px';
  wrap.style.left = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.style.zIndex = '9999';
  wrap.style.pointerEvents = 'none';

  const box = document.createElement('div');
  box.textContent = message;
  box.style.background = background; // light blue
  box.style.color = text;
  box.style.border = `1px solid ${border}`;
  box.style.borderRadius = '8px';
  box.style.padding = '10px 14px';
  box.style.fontSize = '14px';
  box.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
  box.style.maxWidth = '80vw';
  box.style.textAlign = 'center';
  box.style.opacity = '0';
  box.style.transform = 'translateY(-14px)';
  box.style.transition = `opacity ${enterMs}ms ease, transform ${enterMs}ms ease`;

  wrap.appendChild(box);
  document.body.appendChild(wrap);

  // Animate in next frame
  requestAnimationFrame(() => {
    box.style.opacity = '1';
    box.style.transform = 'translateY(0)';
  });

  // Schedule animate out
  setTimeout(() => {
    box.style.transition = `opacity ${exitMs}ms ease, transform ${exitMs}ms ease`;
    box.style.opacity = '0';
    box.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
      __toastVisible = false;
    }, exitMs);
  }, visibleMs);
}

function processFlashFromStorage() {
  try {
    const raw = localStorage.getItem('flash');
    if (!raw) return;
    const { message, type } = JSON.parse(raw);
    // Only show if message exists
    if (message) {
      // For now we only style success in blue; can extend by type later
      showToast(message, { background: '#e0f2fe', border: '#93c5fd', text: '#075985', timeout: 2400 });
    }
  } catch (_) {
    // ignore
  } finally {
    localStorage.removeItem('flash');
  }
}

// ✅ Active navigation link highlighter
function setActiveNavLink() {
  checkAuth(); // Check authentication before setting active link
  const links = document.querySelectorAll('.nav-link');
  const currentHash = window.location.hash;

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === '/' && (currentHash === '' || currentHash === '#/' || currentHash === '#')) {
      link.classList.add('active');
    } else if (href === currentHash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Route helpers for auth/signup views
function getCurrentPath() {
  const raw = window.location.hash.slice(1) || '/';
  const pathOnly = raw.split('?')[0].split('#')[0] || '/';
  // normalize trailing slash (keep root as '/')
  return pathOnly.length > 1 ? pathOnly.replace(/\/$/, '') : pathOnly;
}

function isNoChromeRoute() {
  const path = getCurrentPath();
  return (
    path === '/auth' ||
    path === '/register' ||
    path === '/' ||
    path === '/welcome' ||
    path === '/forgot-password' ||
    path === '/reset-password'
  );
}

// Responsive helper
function isMobile() {
  return window.matchMedia('(max-width: 899.98px)').matches;
}

// Collapsed state persistence (desktop only)
function applyCollapsed(collapsed) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  if (isMobile() || isNoChromeRoute()) {
    sidebar.classList.remove('collapsed');
    return;
  }
  sidebar.classList.toggle('collapsed', !!collapsed);
  try { localStorage.setItem('sidebarCollapsed', collapsed ? '1' : '0'); } catch (_) {}
}
function restoreCollapsed() {
  const saved = (localStorage.getItem('sidebarCollapsed') === '1');
  applyCollapsed(saved);
}

// Show hamburger only on non-auth pages
function toggleHamburgerVisibility() {
  const hamburger = document.getElementById('hamburger-btn');
  if (!hamburger) return;
  if (isNoChromeRoute()) {
    hamburger.style.display = 'none';
  } else {
    hamburger.style.display = 'inline-flex';
  }
}

// Hide sidebar entirely on auth/signup
function toggleSidebarVisibility() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (!sidebar) return;
  if (isNoChromeRoute()) {
    sidebar.classList.remove('open');
    sidebar.setAttribute('aria-hidden', 'true');
    sidebar.style.display = 'none';
    if (backdrop) backdrop.hidden = true;
  } else {
    sidebar.style.display = '';
    // Ensure correct state per viewport
    if (isMobile()) {
      sidebar.classList.remove('collapsed');
      sidebar.classList.remove('auto-hover');
    } else {
      // Enable auto-hover on desktop: collapsed baseline
      sidebar.classList.add('auto-hover');
      sidebar.classList.add('collapsed');
    }
  }
}

// Hide global header on auth/signup
function toggleHeaderVisibility() {
  const header = document.querySelector('.site-title-bar');
  if (!header) return;
  if (isNoChromeRoute()) {
    header.style.display = 'none';
  } else {
    header.style.display = '';
  }
}

// Sidebar wiring
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeBtn = document.getElementById('sidebar-close');
  const sideEmail = document.getElementById('sidebar-user-email');
  const sideName = document.getElementById('sidebar-user-name');
  const avatar = document.querySelector('.sidebar-user .avatar');

  // Skip binding when hidden on auth/signup
  if (isNoChromeRoute()) {
    if (sidebar) {
      sidebar.classList.remove('open');
      sidebar.setAttribute('aria-hidden', 'true');
    }
    if (backdrop) backdrop.hidden = true;
    return;
  }

  // Mapping target -> element id
  const scrollTargets = {
    dashboard: 'dashboard-top',
    risk: 'risk-top', // now on /risk page
    history: 'history-top'
  };

  // Populate profile
  const email = localStorage.getItem('email');
  if (sideEmail) sideEmail.textContent = email || 'user@email.com';
  if (sideName) sideName.textContent = (email ? email.split('@')[0] : 'User');
  if (avatar) avatar.textContent = ((email ? email.charAt(0) : 'U') || 'U').toUpperCase();

  const openSidebar = () => {
    if (!isMobile()) return;
    sidebar.classList.add('open');
    sidebar.setAttribute('aria-hidden', 'false');
    if (backdrop) backdrop.hidden = false;
  };
  const closeSidebar = () => {
    if (!isMobile()) return;
    sidebar.classList.remove('open');
    sidebar.setAttribute('aria-hidden', 'true');
    if (backdrop) backdrop.hidden = true;
  };

  if (hamburgerBtn && !hamburgerBtn.dataset.boundHamburger) {
    hamburgerBtn.dataset.boundHamburger = '1';
    hamburgerBtn.addEventListener('click', () => {
      if (isMobile()) {
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
      } else {
        // In auto-hover mode, no manual toggle on desktop
        if (!sidebar.classList.contains('auto-hover')) {
          const next = !sidebar.classList.contains('collapsed');
          applyCollapsed(next);
        }
      }
    });
  }
  if (closeBtn && !closeBtn.dataset.boundClose) {
    closeBtn.dataset.boundClose = '1';
    closeBtn.addEventListener('click', () => {
      if (isMobile()) {
        closeSidebar();
      } else {
        // In auto-hover mode, no manual toggle on desktop
        if (!sidebar.classList.contains('auto-hover')) {
          const next = !sidebar.classList.contains('collapsed');
          applyCollapsed(next);
        }
      }
    });
  }
  if (backdrop && !backdrop.dataset.boundBackdrop) {
    backdrop.dataset.boundBackdrop = '1';
    backdrop.addEventListener('click', closeSidebar);
  }

  // Logout
  const sideLogout = document.getElementById('sidebar-logout');
  if (sideLogout && !sideLogout.dataset.boundLogout) {
    sideLogout.dataset.boundLogout = 'true';
    sideLogout.addEventListener('click', () => showLogoutConfirmModal());
  }

  // Delegasi klik menu
  const sideNav = document.querySelector('.sidebar-nav');
  if (sideNav && !sideNav.dataset.boundNav) {
    sideNav.dataset.boundNav = '1';
    sideNav.addEventListener('click', (e) => {
      const item = e.target.closest('.side-item');
      if (!item || item.classList.contains('disabled')) return;
      const href = item.getAttribute('href');
      if (!href) return;
      e.preventDefault();

      const targetKey = item.dataset.target; // dashboard / risk / history
      const destHash = href.startsWith('#') ? href : `#${href}`;
      const currentHash = window.location.hash || '#/';

      // Jika masih di route sama
      if (destHash === currentHash) {
        if (targetKey && scrollTargets[targetKey]) {
          const el = document.getElementById(scrollTargets[targetKey]);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        closeSidebar();
      } else {
        // Simpan target scroll untuk setelah navigasi
        if (targetKey && scrollTargets[targetKey]) {
          window.__pendingScrollTarget = scrollTargets[targetKey];
        }
        // Mark light navigation so only content refreshes with soft fade
        window.__navLight = true;
        window.location.hash = destHash.replace(/^#/, '');
        closeSidebar();
      }
    });
  }

  // Refresh profil saat hash berubah
  window.addEventListener('hashchange', () => {
    if (sidebar.classList.contains('open')) closeSidebar();
    const newEmail = localStorage.getItem('email');
    if (newEmail && sideEmail) {
      sideEmail.textContent = newEmail;
      if (sideName) sideName.textContent = newEmail.split('@')[0];
      if (avatar) avatar.textContent = (newEmail.charAt(0) || 'U').toUpperCase();
      const userSection = document.querySelector('.sidebar-user');
      if (userSection) userSection.style.display = '';
    }
    // On route change, ensure desktop auto-hover baseline collapsed
    if (!isMobile() && !isNoChromeRoute()) {
      sidebar.classList.add('auto-hover');
      sidebar.classList.add('collapsed');
    }
  });

  // Apply initial auto-hover collapsed state (desktop)
  if (!isMobile() && !isNoChromeRoute()) {
    sidebar.classList.add('auto-hover');
    sidebar.classList.add('collapsed');
  }
  // Re-evaluate on resize
  if (!window.__sidebarResizeBound) {
    window.__sidebarResizeBound = true;
    window.addEventListener('resize', () => {
      if (isNoChromeRoute()) return;
      if (isMobile()) {
        sidebar.classList.remove('collapsed');
        sidebar.classList.remove('open');
        if (backdrop) backdrop.hidden = true;
        sidebar.classList.remove('auto-hover');
      } else {
        sidebar.classList.add('auto-hover');
        sidebar.classList.add('collapsed');
      }
    });
  }
}

// Fungsi scroll pending generik
function applyPendingScroll() {
  if (!window.__pendingScrollTarget) return;
  const id = window.__pendingScrollTarget;
  const el = document.getElementById(id);
  if (el) {
    // Delay kecil agar konten pasti sudah ter-render
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }
  window.__pendingScrollTarget = null;
}

// Logout confirmation modal (moved out of updateNavbar)
function showLogoutConfirmModal() {
  if (document.getElementById('logout-confirm-overlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'logout-confirm-overlay';
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.background = 'rgba(0,0,0,0.45)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '9999';
  const modal = document.createElement('div');
  modal.style.width = '100%';
  modal.style.maxWidth = '420px';
  modal.style.background = '#fff';
  modal.style.borderRadius = '12px';
  modal.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
  modal.style.padding = '20px';
  modal.innerHTML = `
    <h3 style="margin:0 0 8px;font-size:18px;color:#111827">Konfirmasi Logout</h3>
    <p style="margin:0 0 16px;color:#4b5563;font-size:14px">Apakah Anda yakin ingin keluar dari akun?</p>
    <div style="display:flex;gap:12px;justify-content:flex-end">
      <button id="logout-cancel-btn" style="padding:10px 14px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;cursor:pointer;font-size:14px;color:#111827">Batal</button>
      <button id="logout-confirm-btn" style="padding:10px 14px;border:none;border-radius:8px;background:#ef4444;color:#fff;cursor:pointer;font-size:14px">Ya, Logout</button>
    </div>`;
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  const cleanup = () => { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); };
  modal.querySelector('#logout-cancel-btn').addEventListener('click', () => { cleanup(); if (location.hash !== '#/home') location.hash = '/home'; });
  modal.querySelector('#logout-confirm-btn').addEventListener('click', () => {
    if (window.__logoutInProgress) return; window.__logoutInProgress = true;
    try { localStorage.removeItem('token'); localStorage.removeItem('email'); } finally { cleanup(); location.hash = '/'; setTimeout(() => { window.__logoutInProgress = false; }, 0); }
  });
}

// Active sidebar highlight
function setActiveSideItem() {
  const items = document.querySelectorAll('.side-item');
  const currentHash = window.location.hash;
  items.forEach(item => {
    const href = item.getAttribute('href');
    if (!href) return;
    if (href === currentHash) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// ✅ Navbar updater
function updateNavbar() { /* Header removed; minimal auth UI now inside sidebar only */ }

// ✅ App initialization
document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
  });

  // Early UI toggle to avoid flash on first paint
  toggleHamburgerVisibility();
  toggleSidebarVisibility();

  // Re-run auth redirect logic in case hash points to root/auth
  if (typeof app._checkAuthAndRedirect === 'function') {
    app._checkAuthAndRedirect();
  }

  showLoader();
  try {
    await app.renderPage();
  } finally {
    hideLoader();
  }

  updateNavbar();
  setActiveSideItem();
  toggleHamburgerVisibility();
  toggleSidebarVisibility();
  toggleHeaderVisibility();
  initSidebar();
  processFlashFromStorage();
  applyPendingScroll();

  window.addEventListener('hashchange', async () => {
    // Early toggle to avoid flash when navigating
    toggleHamburgerVisibility();
    toggleSidebarVisibility();

    // Ensure auth redirect applies on navigation
    if (typeof app._checkAuthAndRedirect === 'function') {
      app._checkAuthAndRedirect();
    }

    const light = !!window.__navLight; // set by sidebar clicks
    window.__navLight = false;
    const mc = document.getElementById('main-content');
    if (light && mc) mc.classList.add('is-fading');
    try {
      if (!light) {
        showLoader();
      }
      await app.renderPage();
    } finally {
      if (!light) hideLoader();
      if (light && mc) setTimeout(() => mc.classList.remove('is-fading'), 160);
    }

    updateNavbar();
    setActiveSideItem();
    toggleHamburgerVisibility();
    toggleSidebarVisibility();
    toggleHeaderVisibility();
    initSidebar();
    processFlashFromStorage();
    applyPendingScroll();
  });
});
