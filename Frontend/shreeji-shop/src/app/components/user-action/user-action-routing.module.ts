import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { UserActionComponent } from './user-action.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path: '', component: UserActionComponent,
    children: [
      { path: 'authenticate', component: AuthComponent }
    ]
  },
  // { path: 'cart', component: CartComponent },
  // { path: 'wishlist', component: WishlistComponent },
  // { path: 'orders', component: OrderComponent },
  // { path: 'profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserActionRoutingModule { }
