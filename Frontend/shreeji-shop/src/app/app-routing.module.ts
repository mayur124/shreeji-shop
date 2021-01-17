import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { PhoneDetailComponent } from './components/phone-detail/phone-detail.component';
import { CheckoutComponent } from "./components/checkout/checkout.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'authenticate', component: AuthComponent }
    ]
  },
  {
    path: 'phone/:brandName/:brandId/:id',
    component: PhoneDetailComponent,
    children: [
      { path: 'authenticate', component: AuthComponent }
    ]
  },
  {
    path: 'user',
    loadChildren: () => import('./components/user-action/user-action.module').then(m => m.UserActionModule),
  },
  {
    path: 'user/order/checkout', component: CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
