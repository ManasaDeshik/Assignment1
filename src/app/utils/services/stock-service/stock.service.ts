import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class StockService {
  private name = new Subject<any>();
  private stocks = new Subject<any>();
  private messageSource = new BehaviorSubject('');
  public barCode = new Subject<any>();
  currentMessage = this.messageSource.asObservable();
  
  constructor() { }

  setManufacturerId(message: any) {
    this.name.next(message);
  }

  getManufacturerId(): Observable<any> {
    return this.name.asObservable();
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  setBarCode(message: any) {
    this.barCode.next(message);
  }

  getBarCode(): Observable<any> {
    return this.barCode.asObservable();
  }

  setStocks(message: any) {
    this.stocks.next(message);
  }

  getStocks(): Observable<any> {
    return this.stocks.asObservable();
  }
}
