import { Routes } from '@angular/router';
import { SignUpPage } from './pages/auth/pages/sign-up/sign-up.page';
import { AuthPage } from './pages/auth/auth.page';
import { ForgotPasswordPage } from './pages/auth/pages/forgot-password/forgot-password.page';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/auth/auth.routes')
  },
  {
    path: 'initial',
    loadChildren: () => import('./pages/application/pages.routes')
  }
];

export default routes;
