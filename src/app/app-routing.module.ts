import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TeamComponent } from './components/teams/team.component';
import { RolesComponent } from './components/roles/roles.component';
import { StatusComponent } from './components/status/status.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'teams', component: TeamComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'status', component: StatusComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
