import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/home-children/dashboard/dashboard.component';
import { MembersComponent } from './components/home-children/members/members.component';
import { WeatherComponent } from './components/home-children/weather/weather.component';
import { WaterComponent } from './components/home-children/water/water.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'miembros', component: MembersComponent },
      { path: 'clima', component: WeatherComponent },
      { path: 'riego', component: WaterComponent }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
