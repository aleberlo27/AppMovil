import { Routes } from '@angular/router';
import { AuthPage } from './auth.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { RegisterComponent } from './pages/register/register.page';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: 'login',
        component: SignUpPage
      },
      {
        path: 'register',
        //loadComponent: () => import('./pages/auth/pages/register/register.page').then( m => m.RegisterPage)
        component: RegisterComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },

];

export default authRoutes;
