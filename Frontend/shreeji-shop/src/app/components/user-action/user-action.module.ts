import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserActionRoutingModule } from './user-action-routing.module';
import { OrderComponent } from './order/order.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [OrderComponent, WishlistComponent, CartComponent, UserProfileComponent],
  imports: [
    CommonModule,
    UserActionRoutingModule
  ]
})
export class UserActionModule { }
