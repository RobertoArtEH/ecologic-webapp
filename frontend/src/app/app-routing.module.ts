import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/home-children/dashboard/dashboard.component';
import { MembersComponent } from './components/home-children/members/members.component';
import { WeatherComponent } from './components/home-children/weather/weather.component';
import { WaterComponent } from './components/home-children/water/water.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'miembros', component: MembersComponent },
      { path: 'clima', component: WeatherComponent },
      { path: 'riego', component: WaterComponent }
    ] 
  },
  { path:'login', component: LoginComponent, canActivate: [AuthGuard], data: { route: 'auth'} },
  { path:'registro', component: RegisterComponent, canActivate: [AuthGuard], data: { route: 'auth'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
