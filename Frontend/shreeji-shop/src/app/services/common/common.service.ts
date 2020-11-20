import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  getInrPrice(priceInEur: number, noToLocale?: boolean): string | number {
    const inrAmt = 87;
    const answer = priceInEur * inrAmt;
    if (noToLocale) {
      return answer;
    }
    return answer.toLocaleString('en-IN', { maximumSignificantDigits: 3 });
  }
}
