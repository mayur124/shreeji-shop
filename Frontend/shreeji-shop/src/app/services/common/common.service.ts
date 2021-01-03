import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SPAN_TYPES } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  getInrPrice(priceInEur: number): string | number {
    const answer = this.getInrPriceNoLocale(priceInEur);
    return answer.toLocaleString('en-IN', { maximumSignificantDigits: 3 });
  }

  getInrPriceNoLocale(priceInEur: number): number {
    const inrAmt = this._getCurrentINRValue();
    return priceInEur * inrAmt;
  }

  getEurPrice(priceINR: number): number {
    const inrAmt = this._getCurrentINRValue();
    return Math.round(priceINR / inrAmt)
  }

  private _getCurrentINRValue(): number {
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

  hideElement(spanElement: HTMLElement){
    spanElement.classList.toggle('visibility-hidden');
  }
}
