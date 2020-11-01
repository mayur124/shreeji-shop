import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PhoneDetailComponent } from './components/phone-detail/phone-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'filter', component: HomeComponent },
  { path: 'search', component: HomeComponent },
  { path: 'phone/:brandName/:brandId/:id', component: PhoneDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
