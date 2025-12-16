import Auth from '../data/auth';

const AuthUI = {
  updateNavigation() {
    const token = Auth.getToken();
    const authSection = document.getElementById('auth-section');
    const loginButton = document.getElementById('login-button');
    const authLink = document.getElementById('auth-link');
    const historyLink = document.getElementById('history-link');
    
    if (token) {
      authSection.style.display = 'flex';
      loginButton.style.display = 'none';
      authLink.style.display = 'none';
      historyLink.style.display = 'flex';
    } else {
      authSection.style.display = 'none';
      loginButton.style.display = 'flex';
      authLink.style.display = 'flex';
      historyLink.style.display = 'none';
    }
  }
};

export default AuthUI;