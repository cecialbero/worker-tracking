import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TeamComponent } from './components/teams/team.component';
import { RolesComponent } from './components/roles/roles.component';
import { StatusComponent } from './components/status/status.component';
import { WorkerComponent } from './components/worker/worker.component';
import { SigninComponent } from './shared/components/home/signin/signin.component';
import { AuthGuard } from './services/identity/auth.guard';
import { SignupComponent } from './shared/components/home/signup/signup.component';
import { HomeComponent } from './shared/components/home/home.component';
import { RequireAuthGuard } from './services/identity/require-auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SigninComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'workers',
    component: WorkerComponent,
    canActivate: [RequireAuthGuard],
  },
  {
    path: 'teams',
    component: TeamComponent,
    canActivate: [RequireAuthGuard],
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [RequireAuthGuard],
  },
  {
    path: 'status',
    component: StatusComponent,
    canActivate: [RequireAuthGuard],
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
