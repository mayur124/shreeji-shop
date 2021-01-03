import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserActionRoutingModule } from './user-action-routing.module';
import { OrderComponent } from './order/order.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrderComponent, WishlistComponent, CartComponent, UserProfileComponent],
  exports: [OrderComponent, WishlistComponent, CartComponent, UserProfileComponent],
  imports: [
    CommonModule,
    UserActionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserActionModule { }
