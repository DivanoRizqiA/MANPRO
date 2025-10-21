import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import AuthPage from '../pages/auth/auth-page';
import ForgotPasswordPage from '../pages/auth/forgot-password-page';
import ResetPasswordPage from '../pages/auth/reset-password-page';

const routes = {
  '/': new AuthPage(), // Default to auth page
  '/home': new HomePage(), // Home page after auth
  '/about': new AboutPage(),
  '/auth': new AuthPage(),
  '/forgot-password': new ForgotPasswordPage(),
  '/reset-password': new ResetPasswordPage(), // expects token in hash query e.g. #/reset-password?token=...
};

export default routes;
