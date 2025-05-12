import { Routes } from '@angular/router';
import { AuthPage } from './auth.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterComponent } from './pages/register/register.page';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: 'login',
        component: LoginPage
      },
      {
        path: 'register',
        //loadComponent: () => import('./pages/auth/pages/register/register.page').then( m => m.RegisterPage)
        component: RegisterComponent
      }
    ]
  },

];

export default authRoutes;
