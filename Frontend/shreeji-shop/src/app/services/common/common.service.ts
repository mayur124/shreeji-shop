import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  getInrPrice(priceInEur: number): number {
    const inrAmt = 87;
    return priceInEur * inrAmt;
  }
}
