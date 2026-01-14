import { Routes } from '@angular/router';
import { EmployeeGuard } from '../core/guards/employee.guard';
import { AuthGuard } from '../core/guards/auth.guard';
import { employeeResolver } from '../shared/resolvers/user.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then((component) => component.LoginComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'employee',
    loadComponent: () => import('./features/employee/employee').then((component) => component.EmployeeComponent),
    canActivate: [EmployeeGuard],
    children: [
      {
        path: 'list',
        resolve: {
          employee: employeeResolver
        },
        loadComponent: () => import('./features/employee/employee-list/employee-list').then((component) => component.EmployeeListComponent),
      },
      {
        path: 'add',
        loadComponent: () => import('./features/employee/employee-add/employee-add').then((component) => component.EmployeeAddComponent),
      },
      {
        path: 'detail',
        loadComponent: () => import('./features/employee/employee-detail/employee-detail').then((component) => component.EmployeeDetailComponent),
      },
      { 
        path: '', 
        redirectTo: 'list', 
        pathMatch: 'full' 
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('../shared/components/not-found/not-found').then((component) => component.notFoundComponent),
  },
];
