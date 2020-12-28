import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Pipes
import { Initial } from './shared/pipes/initial.pipe';
// Directives
import { RotateDirective } from './shared/directives/rotate.directive';
// Components
import { HeaderComponent } from './shared/components/header/header.component';
import { UserInfoComponent } from './components/dashboard/user-info/user-info.component';
import { SelectComponent } from './shared/components/select/select.component';
import { OtherUsersInfoComponent } from './components/dashboard//other-users-info/other-users-info.component';
import { TooltipComponent } from './shared/components/tooltip/tooltip.component';
import { TeamComponent } from './components/teams/team.component';
import { RolesComponent } from './components/roles/roles.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideNavComponent } from './shared/components/side-nav/side-nav.component';
import { OtherUsersInfoService } from './services/other-users-info.service';
import { StatusComponent } from './components/status/status.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Initial,
    RotateDirective,
    UserInfoComponent,
    SelectComponent,
    OtherUsersInfoComponent,
    TooltipComponent,
    TeamComponent,
    RolesComponent,
    DashboardComponent,
    SideNavComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [OtherUsersInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
