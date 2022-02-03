import { Injectable, Injector } from '@angular/core';
import { SharedService } from '../shared-service/shared.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  public sharedService : any;
  constructor(private injector: Injector, private router: Router) {
    this.sharedService = this.injector.get<SharedService>(SharedService);
 
  }
  errorHandler(err: any) {
    if (err.status === 401) {
      this.sharedService.displayErrorMessage('Unauthorized Access');
      this.router.navigate(['']);
    } else if (err.status === 404) {
      err.error = {
        message : "Service Not Found"
      }
      return err
    }
  }

}
