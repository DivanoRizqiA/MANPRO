// CSS imports
import '../styles/styles.css';
import App from './pages/app';
import Auth from './data/auth';

// Check authentication status and redirect accordingly
const checkAuth = () => {
  const token = Auth.getToken();
  const currentPath = window.location.hash.slice(1) || '/';
  
  if (!token && currentPath !== '/auth' && currentPath !== '/') {
    window.location.hash = '#/auth';
  } else if (token && (currentPath === '/auth' || currentPath === '/')) {
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

// ✅ Navbar updater
function updateNavbar() {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const loginBtn = document.getElementById("login-button");
  const authSection = document.getElementById("auth-section");
  const emailDom = document.getElementById("user-email");
  const logoutBtn = document.querySelector(".logout-button");
  const historyLink = document.getElementById("history-link");
  const signupBtn = document.getElementById("signup-btn");

  const isLoggedIn = !!token;

  if (loginBtn) loginBtn.style.display = isLoggedIn ? "none" : "flex";
  if (authSection) authSection.style.display = isLoggedIn ? "flex" : "none";
  if (historyLink) historyLink.style.display = isLoggedIn ? "inline-flex" : "none";
  if (emailDom && email) emailDom.textContent = `Welcome, ${email}`;

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      updateNavbar();
      alert("Logout Successful");
      location.hash = "/auth";
    }, { once: true }); // Prevent multiple listeners stacking
  }

  
}

// ✅ App initialization
document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
  });

  showLoader();
  try {
    await app.renderPage();
  } finally {
    hideLoader();
  }

  updateNavbar();
  setActiveNavLink();

  window.addEventListener('hashchange', async () => {
    showLoader();
    try {
      await app.renderPage();
    } finally {
      hideLoader();
    }

    updateNavbar();
    setActiveNavLink();
  });
});
