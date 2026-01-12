import Auth from '../data/auth';

const AuthUI = {
  updateNavigation() {
    const token = Auth.getToken();
    
    // Elements from index.html (Sidebar layout)
    const sidebarUser = document.querySelector('.sidebar-user');
    const logoutBtn = document.getElementById('sidebar-logout');
    const historyLink = document.querySelector('a[href="#/history"]');
    
    if (token) {
      if (sidebarUser) sidebarUser.style.display = 'flex';
      if (logoutBtn) logoutBtn.style.display = 'block';
      if (historyLink) historyLink.style.display = 'flex';
    } else {
      if (sidebarUser) sidebarUser.style.display = 'none';
      if (logoutBtn) logoutBtn.style.display = 'none';
      if (historyLink) historyLink.style.display = 'none';
    }
  }
};

export default AuthUI;