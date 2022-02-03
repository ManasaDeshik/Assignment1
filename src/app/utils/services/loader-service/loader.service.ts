import { Injectable } from '@angular/core';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public spinnerService: NgxSpinnerService) { }


  show(type: string) {
    if (type === 'show') {
      this.spinnerService.show();
      setTimeout(() => this.spinnerService.hide(), 300000);
    } else if (type === 'hide') {
      this.spinnerService.hide();
    }
  }
  // show() {
  //   this.spinnerService.show();
  //   setTimeout(() => this.spinnerService.hide(), 500000);
  // }
  // hide() {
  //   this.spinnerService.hide();
  // }
  // isLoading = new Subject<boolean>();

  // show() {
  //   this.isLoading.next(true);
  // }
  // hide() {
  //   this.isLoading.next(false);
  // }
}
