import { Routes } from '@angular/router';
import { InitialComponent } from './pages/application/pages/initial/initial.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/auth/auth.routes')
  },
  {
    path: 'initial',
    component: InitialComponent
  }
];

export default routes;
