import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import AuthPage from '../pages/auth/auth-page';

const routes = {
  '/': new AuthPage(), // Default to auth page
  '/home': new HomePage(), // Home page after auth
  '/about': new AboutPage(),
  '/auth': new AuthPage(),
};

export default routes;
