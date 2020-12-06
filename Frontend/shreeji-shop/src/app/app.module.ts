import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from "./components/header/header.component";
import { FilterComponent } from './components/filter/filter.component';
import { HomeComponent } from './components/home/home.component';
import { PaginationComponent } from "./components/home/pagination/pagination.component";
import { TaglineComponent } from "./components/tagline/tagline.component";
import { ModelFilterComponent } from './components/model-filter/model-filter.component';
import { PhoneModelComponent } from './components/phone-model/phone-model.component';
import { PhoneDetailComponent } from './components/phone-detail/phone-detail.component';

import { HttpService } from './services/http/http.service';
import { CommonService } from './services/common/common.service';
import { AuthService } from './services/auth/auth.service';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { LoginComponent } from './components/auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    HomeComponent,
    ModelFilterComponent,
    PhoneModelComponent,
    PaginationComponent,
    TaglineComponent,
    PhoneDetailComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSliderModule,
    ReactiveFormsModule
  ],
  providers: [HttpService, CommonService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
