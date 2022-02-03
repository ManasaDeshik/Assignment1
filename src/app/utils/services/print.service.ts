import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  public barCode = new Subject<any>();

  constructor() { }


  setBarCode(message: any) {
    this.barCode.next(message);
  }

  getBarCode(): Observable<any> {
    return this.barCode.asObservable();
  }
}
