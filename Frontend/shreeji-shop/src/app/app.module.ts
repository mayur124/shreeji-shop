import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./components/header/header.component";
import { BrandFilterComponent } from './components/brand-filter/brand-filter.component';
import { HomeComponent } from './components/home/home.component';
import { ModelFilterComponent } from './components/model-filter/model-filter.component';
import { ModelsComponent } from './components/models/models.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BrandFilterComponent,
    HomeComponent,
    ModelFilterComponent,
    ModelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
