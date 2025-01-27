import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import {AppBoxedLoginComponent} from "./authentication/boxed-login/boxed-login.component";

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppBoxedLoginComponent,
    data: {
      title: 'Welcome',
    },
  },
];
