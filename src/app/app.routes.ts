import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.gaurd';
import { adminGuard } from './guards/admin.guard';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Dashboard } from './pages/dashboard/dashboard';
import { Admin } from './pages/admin/admin';
import { YouthProfile } from './pages/youth-profile/youth-profile';
import { Curriculum } from './pages/curriculum/curriculum';
import { Lesson } from './pages/lesson/lesson';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'signup',
    component: Signup
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: 'admin',
    component: Admin,
    canActivate: [adminGuard]
  },

  {
  path: 'youth/:id',
  component: YouthProfile,
  canActivate: [authGuard]
},

{
  path: 'curriculum',
  component: Curriculum,
  canActivate: [authGuard]
},

{
  path: 'curriculum/lesson/:number',
  component: Lesson,
  canActivate: [authGuard]
},

  // ALWAYS keep wildcard last
  {
    path: '**',
    redirectTo: ''
  }

];