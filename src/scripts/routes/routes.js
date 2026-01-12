import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import AboutInfoPage from '../pages/about/about-info-page';
import AuthPage from '../pages/auth/auth-page';
import RegisterPage from '../pages/auth/register-page';
import ForgotPasswordPage from '../pages/auth/forgot-password-page';
import ResetPasswordPage from '../pages/auth/reset-password-page';
import WelcomePage from '../pages/auth/welcome-page';
import RiskPage from '../pages/risk/risk-page';
import ProfilePage from '../pages/profile/profile-page';

const routes = {
  '/': WelcomePage,
  '/home': new HomePage(), // Home page after auth
  '/about': new AboutInfoPage(),
  '/history': new AboutPage(),
  '/risk': new RiskPage(),
  '/profile': new ProfilePage(),
  '/auth': new AuthPage(),
  // '/register': new RegisterPage(), // Register now handled by AuthPage
  '/forgot-password': new ForgotPasswordPage(),
  '/reset-password': new ResetPasswordPage(), // expects token in hash query e.g. #/reset-password?token=...
  '/welcome': WelcomePage,
};

export default routes;
