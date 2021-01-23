import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartAndWishlistResponse } from 'src/app/models/transaction.model';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishlistItems: CartAndWishlistResponse[];

  constructor(private http: HttpService,
    private common: CommonService,
    private router: Router,) { }

  ngOnInit(): void {
    this._initWishlistItems();
  }

  private _initWishlistItems() {
    this.http.getWishlistOfUser().subscribe(
      wishlistItems => {
        if (wishlistItems.length > 0) {
          this.wishlistItems = wishlistItems;
        } else {
          console.log('No items in wishlist');
          this.wishlistItems = [];
        }
      },
      error => {
        console.log('Error while getting cart items of user > ', error);
      }
    )
  }

  getCurrentINRValue() {
    return this.common.getCurrentINRValue();
  }

  removePhone(wishlistItem: CartAndWishlistResponse) {
    this.http.removeItemFromWishlist(wishlistItem.id).subscribe(
      removedItem => {
        if (removedItem) {
          console.log(removedItem);
          this._initWishlistItems();
        } else {
          console.log('Failed to remove the phone from cart');
        }
      },
      error => {
        console.log('Failed to remove the phone from cart', error);
      }
    );
  }

  addToCartFromWishlist(wishlistItem: CartAndWishlistResponse) {
    const request = {
      wishlistId: wishlistItem.id,
      brandId: wishlistItem.brandId,
      modelId: wishlistItem.modelId
    }
    this.http.addToCartFromWishlist(request).subscribe(
      cartResponse => {
        console.log(cartResponse);
        this._initWishlistItems();
      },
      error => {
        console.log('Error occurred while adding phone to cart from wishlist > ', error);
      }
    );
  }

  openPhoneDetails(cartItem: CartAndWishlistResponse) {
    this.router.navigate([]).then((_result: never) => { window.open(`/phone/${cartItem.brandName}/${cartItem.brandId}/${cartItem.modelId}`, '_blank') });
  }

}
