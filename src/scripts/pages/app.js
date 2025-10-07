import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import Auth from '../data/auth';
import AuthUI from '../utils/auth-ui';

class App {
  #content = null;

  constructor({ content }) {
    this.#content = content;
    this._checkAuthAndRedirect();
  }

  _checkAuthAndRedirect() {
    const token = Auth.getToken();
    const currentRoute = getActiveRoute();
    
    if (!token && currentRoute !== '/auth' && currentRoute !== '/') {
      window.location.hash = '#/auth';
    } else if (token && (currentRoute === '/auth' || currentRoute === '/')) {
      window.location.hash = '#/home';
    }
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];
    
    if (!page) {
      window.location.hash = '#/';
      return;
    }

    this.#content.innerHTML = await page.render();
    await page.afterRender();
    
    // Update navigation UI based on auth status
    AuthUI.updateNavigation();
  }
}

export default App;