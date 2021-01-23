import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SPAN_TYPES } from 'src/app/constants/constants';
import { CartAndWishlistResponse } from 'src/app/models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  cartResponse: CartAndWishlistResponse[];
  constructor() { }

  getCurrentINRValue(): number {
    return 87;
  }

  setSpanMessage(spanElement: HTMLElement, message: string) {
    spanElement.innerText = message;
  }

  setSpanType(spanElement: HTMLElement, type: SPAN_TYPES) {
    spanElement.classList.remove('text-danger', 'text-primary', 'text-success', 'visibility-hidden');
    switch (type) {
      case 'error':
        spanElement.classList.add('text-danger');
        break;
      case 'progress':
        spanElement.classList.add('text-primary');
        break;
      case 'success':
        spanElement.classList.add('text-success');
        break;
      default:
        break;
    }
  }

  removeElement(spanElement: HTMLElement) {
    spanElement.remove();
  }

  hideElement(spanElement: HTMLElement) {
    spanElement.classList.toggle('visibility-hidden');
  }

  setCartItems(response: CartAndWishlistResponse[]) {
    this.cartResponse = response;
  }

  getCartItems() {
    return this.cartResponse;
  }
}
