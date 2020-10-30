import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private tagLineSubject: Subject<string> = new Subject();

  constructor() { }

  getInrPrice(priceInEur: number): string {
    const inrAmt = 87;
    const answer = priceInEur * inrAmt;
    return answer.toLocaleString('en-IN', { maximumSignificantDigits: 3 });
  }

  setTagline(text: string) {
    this.tagLineSubject.next(text);
  }

  getTagLine() {
    return this.tagLineSubject.asObservable();
  }
}
