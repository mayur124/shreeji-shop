import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from "./components/header/header.component";
import { FilterComponent } from './components/filter/filter.component';
import { HomeComponent } from './components/home/home.component';
import { PaginationComponent } from "./components/home/pagination/pagination.component";
import { TaglineComponent } from "./components/tagline/tagline.component";
import { PhoneModelComponent } from './components/phone-model/phone-model.component';
import { PhoneDetailComponent } from './components/phone-detail/phone-detail.component';
import { AuthComponent } from './components/auth/auth.component';

import { HttpService } from './services/http/http.service';
import { CommonService } from './services/common/common.service';
import { AuthService } from './services/auth/auth.service';

import { TokenInterceptor } from "./interceptor/token-interceptor.interceptor";

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { UserActionComponent } from './components/user-action/user-action.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    HomeComponent,
    PhoneModelComponent,
    PaginationComponent,
    TaglineComponent,
    PhoneDetailComponent,
    AuthComponent,
    UserActionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSliderModule,
    ReactiveFormsModule
  ],
  providers: [HttpService, CommonService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
