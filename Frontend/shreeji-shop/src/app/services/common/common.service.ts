import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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

  private _getCurrentINRValue(): number{
    return 87;
  }
}
