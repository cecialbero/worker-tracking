import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Pipes
import { Initial } from './shared/pipes/initial.pipe';
// Directives
import { RotateDirective } from './shared/directives/rotate.directive';
// Components
import { HeaderComponent } from './components/header/header.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { SelectComponent } from './shared/components/select/select.component';
import { OtherUsersInfoComponent } from './components/other-users-info/other-users-info.component';
import { TooltipComponent } from './shared/components/tooltip/tooltip.component';
import { OtherUsersInfoService } from './components/other-users-info/other-users-info.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Initial,
    RotateDirective,
    UserInfoComponent,
    SelectComponent,
    OtherUsersInfoComponent,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [OtherUsersInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
