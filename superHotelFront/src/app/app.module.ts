import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { LoginComponent } from './components/login/login.component';
import { CityComponent } from './components/admin/city/city.component';
import { HoteliersComponent } from './components/admin/hoteliers/hoteliers.component';
import { HotelsAdminComponent } from './components/admin/hotels-admin/hotels-admin.component';
import { HotelFormComponent } from './components/admin/hotel-form/hotel-form.component';
import { HomeHotelierComponent } from './components/hoteliers/home-hotelier/home-hotelier.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HotelFormUpdateComponent } from './components/hoteliers/hotel-form-update/hotel-form-update.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, HotelsComponent, HotelComponent, LoginComponent, CityComponent, HoteliersComponent, HotelsAdminComponent, HotelFormComponent, HomeHotelierComponent, NotFoundComponent, HotelFormUpdateComponent, UserHomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
