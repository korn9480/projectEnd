import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './login-user/login-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HomeComponent } from './home/home.component';
import { ActivityClubComponent } from './activity-club/activity-club.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: 'login', component: LoginUserComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'activity-club', component: ActivityClubComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: '**', redirectTo:'home'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
