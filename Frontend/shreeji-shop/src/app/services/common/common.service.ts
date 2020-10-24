import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  deepCopy(object: any) {
    return JSON.parse(JSON.stringify(object));
  }
}
