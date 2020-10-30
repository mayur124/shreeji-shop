import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private tagLineSubject: Subject<string> = new Subject();

  constructor() { }

  getInrPrice(priceInEur: number): number {
    const inrAmt = 87;
    return priceInEur * inrAmt;
  }

  setTagline(text: string) {
    this.tagLineSubject.next(text);
  }

  getTagLine() {
    return this.tagLineSubject.asObservable();
  }
}
