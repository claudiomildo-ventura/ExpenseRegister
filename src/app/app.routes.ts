import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Query } from './components/query/query';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: Register },
  { path: 'query', component: Query },
];
