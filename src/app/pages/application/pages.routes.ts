import { Routes } from '@angular/router';
import { InitialComponent } from './pages/initial/initial.page';

export const pagesRoutes: Routes = [
  {
    path: '',
    component: InitialComponent,
    children: [

    ]
  },

];

export default pagesRoutes;
