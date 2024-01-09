import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HomeComponent } from './home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { ActivityClubComponent } from './activity-club/activity-club.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CardJoinActivityComponent } from './component/card-join-activity/card-join-activity.component';
import { NewActivityComponent } from './popup/new-activity/new-activity.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    ForgotPasswordComponent,
    RegisterUserComponent,
    HomeComponent,
    ActivityClubComponent,
    CalendarComponent,
    CardJoinActivityComponent,
    NewActivityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    RouterModule,

  ],
  providers: [CookieService],

  bootstrap: [AppComponent]
})
export class AppModule { }
