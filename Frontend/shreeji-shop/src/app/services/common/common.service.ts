import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  getInrPrice(priceInEur: number): string {
    const inrAmt = 87;
    const answer = priceInEur * inrAmt;
    return answer.toLocaleString('en-IN', { maximumSignificantDigits: 3 });
  }
}
