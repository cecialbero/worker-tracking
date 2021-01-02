import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Libs
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// Pipes
import { Initial } from './shared/pipes/initial.pipe';
// Directives
import { RotateDirective } from './shared/directives/rotate.directive';
// Components
import { HeaderComponent } from './shared/components/header/header.component';
import { SelectComponent } from './shared/components/select/select.component';
import { TooltipComponent } from './shared/components/tooltip/tooltip.component';
import { SideNavComponent } from './shared/components/side-nav/side-nav.component';
import { LoadMoreComponent } from './shared/components/load-more/load-more.component';
import { SearchComponentComponent } from './shared/components/search-component/search-component.component';
import { SigninComponent } from './shared/components/home/signin/signin.component';
import { SignupComponent } from './shared/components/home/signup/signup.component';
import { HomeComponent } from './shared/components/home/home.component';
import { OtherUsersInfoService } from './services/other-users-info.service';
import { UserInfoComponent } from './components/dashboard/user-info/user-info.component';
import { OtherUsersInfoComponent } from './components/dashboard//other-users-info/other-users-info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TeamComponent } from './components/teams/team.component';
import { RolesComponent } from './components/roles/roles.component';
import { StatusComponent } from './components/status/status.component';
import { WorkerComponent } from './components/worker/worker.component';
import { RequestInterceptor } from './services/identity/request.interceptor';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';


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
    StatusComponent,
    WorkerComponent,
    LoadMoreComponent,
    SearchComponentComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
      newestOnTop: true,
      preventDuplicates: true,
    }),
  ],
  providers: [
    OtherUsersInfoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
