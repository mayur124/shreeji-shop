import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddOrderCartItem, AddOrderRequest, CartAndWishlistResponse } from 'src/app/models/transaction.model';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: CartAndWishlistResponse[];

  constructor(private http: HttpService,
    private common: CommonService,
    private router: Router,) { }

  ngOnInit(): void {
    this._initCartItems();
  }

  private _initCartItems() {
    this.http.getCartItemsOfUser().subscribe(
      cartItems => {
        if (cartItems.length > 0) {
          this.cartItems = cartItems;
          this.cartItems.forEach(item => item.quantity = 1);
        } else {
          console.log('No items in cart');
          this.cartItems = [];
        }
      },
      error => {
        console.log('Error while getting cart items of user > ', error);
      }
    )
  }

  getConvertedPrice(priceEur: number) {
    return this.common.getInrPrice(priceEur);
  }

  removePhone(cartItem: CartAndWishlistResponse) {
    this.http.removeItemFromCart(cartItem.id).subscribe(
      removedItem => {
        if (removedItem) {
          console.log(removedItem);
          this._initCartItems();
        } else {
          console.log('Failed to remove the phone from cart');
        }
      },
      error => {
        console.log('Failed to remove the phone from cart', error);
      }
    );
  }

  openPhoneDetails(cartItem: CartAndWishlistResponse) {
    this.router.navigate([]).then((_result: never) => { window.open(`/phone/${cartItem.brandName}/${cartItem.brandId}/${cartItem.modelId}`, '_blank') });
  }

  checkout() {
    this.common.setCartItems(this.cartItems);
    this.router.navigate(['user/order/checkout']);
  }

}
