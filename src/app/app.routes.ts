import { Routes, RouterModule } from '@angular/router';
import { Home } from './home';
import { LoginComponent } from './login';
import { UsersComponent, UserEditComponent } from './users';
import { NoContent } from './no-content';

import { UsersDataResolver } from './app.resolver';

import { LoggedInGuard } from './login/logged-in.guard';

export const ROUTES: Routes = [
  { path: '',      component: Home, canActivate: [LoggedInGuard] },
  { path: 'home',  component: Home, canActivate: [LoggedInGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent, canActivate: [LoggedInGuard] },
  { path: 'user/edit/:id', component: UserEditComponent, canActivate: [LoggedInGuard] },
  { path: '**',    component: NoContent },
];
