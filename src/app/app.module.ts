import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Pipes
import { Initial } from './shared/pipes/initial.pipe';
//Directives
import { RotateDirective } from './shared/directives/rotate.directive';
// Components
import { HeaderComponent } from './shared/components/header/header.component';
import { UserInfoComponent } from './components/dashboard/user-info/user-info.component';
import { SelectComponent } from './shared/components/select/select.component';
import { OtherUsersInfoComponent } from './components/dashboard//other-users-info/other-users-info.component';
import { TooltipComponent } from './shared/components/tooltip/tooltip.component';
import { FirstComponent } from './components/first/first.component';
import { SecondComponent } from './components/second/second.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideNavComponent } from './shared/components/side-nav/side-nav.component';

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
    FirstComponent,
    SecondComponent,
    DashboardComponent,
    SideNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
