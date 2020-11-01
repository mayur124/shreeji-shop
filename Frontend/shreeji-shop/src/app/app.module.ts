import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./components/header/header.component";
import { BrandFilterComponent } from './components/brand-filter/brand-filter.component';
import { HomeComponent } from './components/home/home.component';
import { PaginationComponent } from "./components/home/pagination/pagination.component";
import { TaglineComponent } from "./components/tagline/tagline.component";
import { ModelFilterComponent } from './components/model-filter/model-filter.component';
import { PhoneModelComponent } from './components/phone-model/phone-model.component';
import { HttpService } from './services/http/http.service';
import { CommonService } from './services/common/common.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PhoneDetailComponent } from './components/phone-detail/phone-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BrandFilterComponent,
    HomeComponent,
    ModelFilterComponent,
    PhoneModelComponent,
    PaginationComponent,
    TaglineComponent,
    PhoneDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [HttpService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
