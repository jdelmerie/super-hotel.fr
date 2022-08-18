import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { LoginComponent } from './components/login/login.component';
import { CityComponent } from './components/admin/city/city.component';
import { AuthGuardService } from './service/auth-guard.service';
import { HoteliersComponent } from './components/admin/hoteliers/hoteliers.component';
import { HotelsAdminComponent } from './components/admin/hotels-admin/hotels-admin.component';
import { HotelFormComponent } from './components/admin/hotel-form/hotel-form.component';
import { HomeHotelierComponent } from './components/hoteliers/home-hotelier/home-hotelier.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HotelFormUpdateComponent } from './components/hoteliers/hotel-form-update/hotel-form-update.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'hotels',
    component: HotelsComponent,
  },
  {
    path: 'hotel/:id',
    component: HotelComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin/cities',
    component: CityComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin/hotel/:id',
    component: HotelFormComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'admin/hoteliers',
    component: HoteliersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin/hotels',
    component: HotelsAdminComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'hotelier',
    component: HomeHotelierComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'hotelier/hotel/:id',
    component: HotelFormUpdateComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'user',
    component: UserHomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin',
    redirectTo: '/admin/hotels',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
