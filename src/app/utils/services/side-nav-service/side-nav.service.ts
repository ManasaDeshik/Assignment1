import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  private messageSource = new BehaviorSubject('no data');
  currentMessage = this.messageSource.asObservable();
  @Output() change: EventEmitter<any> = new EventEmitter();
  public sideNavState$: Subject<boolean> = new Subject();
  public subject = new Subject<any>();
  public subtext = new Subject<any>();
  public subCustomer = new Subject<any>();
  constructor() { }

  setSideNav(message: any) {
    this.subject.next({ text: message });
  }

  clearMessages() {
    this.subject.next();
  }

  getSideNav(): Observable<any> {
    return this.subject.asObservable();
  }

  setSubText(value: number) {
    // this.subtext = value;
    this.subtext.next({ text: value });
    this.change.emit({ data: value });
  }
  getSubText(): Observable<any> {
    // return this.subtext;
    return this.subtext.asObservable();
  }
  setCustomer(value) {
    // console.log(value);
    this.messageSource.next(value );
    // this.change.emit({ data: value });
    // console.log(value);
  }
  // getCustomer(): Observable<any> {
  //   // console.log('getCustomer')
  //   return this.subCustomer.asObservable();
  // }
}
