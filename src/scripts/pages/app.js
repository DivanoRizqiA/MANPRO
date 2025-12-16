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
    // Allow unauthenticated access to auth, home root, forgot/reset password routes
    const publicRoutes = ['/', '/auth', '/forgot-password', '/reset-password'];

    if (!token && !publicRoutes.includes(currentRoute)) {
      window.location.hash = '#/auth';
    } else if (token && (currentRoute === '/auth' || currentRoute === '/')) {
      window.location.hash = '#/home';
    }
  }

  async renderPage() {
    try {
      const url = getActiveRoute();
      const page = routes[url];

      if (!page) {
        // Fallback to welcome/root when route not found
        window.location.hash = '#/';
        return;
      }

      // Clear previous content to avoid overlapping DOM
      this.#content.innerHTML = '';

      // Some pages are plain objects (WelcomePage), others are class instances already in the map
      const pageInstance = page;

      if (!pageInstance || typeof pageInstance.render !== 'function') {
        console.error('Invalid page object for route:', url, pageInstance);
        this.#content.innerHTML = '<div style="padding:24px;text-align:center"><h2>Page Error</h2><p>Unable to render this page.</p></div>';
        return;
      }

      // Render HTML
      const html = await pageInstance.render();
      this.#content.innerHTML = html || '';

      // Safely run afterRender if available
      if (typeof pageInstance.afterRender === 'function') {
        try {
          await pageInstance.afterRender();
        } catch (afterErr) {
          console.error('afterRender error:', afterErr);
        }
      }

      // Update navigation UI based on auth status
      try {
        AuthUI.updateNavigation();
      } catch (uiErr) {
        console.warn('AuthUI update failed:', uiErr);
      }
    } catch (err) {
      console.error('renderPage fatal error:', err);
      this.#content.innerHTML = '<div style="padding:24px;text-align:center"><h2>Unexpected Error</h2><p>Please refresh the page.</p></div>';
    }
  }
}

export default App;