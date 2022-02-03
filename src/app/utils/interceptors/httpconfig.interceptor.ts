import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {
  SharedService} from 'src/app/utils';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { LoaderService } from '../services/loader-service/loader.service';
import { JwtService } from '../services/jwt-service/jwt.service';
import { AuthService } from '../services/auth-service/auth.service';
import { finalize } from "rxjs/operators";
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionStorage } from 'ngx-webstorage';

@Injectable({
    providedIn: 'root'
  })

  export class HttpInterceptorService implements HttpInterceptor  {

    constructor(private sharedService: SharedService,private router:Router,private jwtService: JwtService, private authservice: AuthService,public loaderService: LoaderService, private spinnerService: NgxSpinnerService) { }
    @SessionStorage('authenticationToken') public authenticationToken: string;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // get token
      const token = this.authenticationToken;
  
      // token present set authorization header and update user session time
      if (token) {
        this.spinnerService.show();
        console.log('I am interceptor');
        return next.handle(
          req.clone({
           setHeaders: { 
            'x-access-token': token,
           // 'content-type' : 'application/json'
        }
        }
        )).pipe(
          catchError(err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401 || err.status === 403) {
                this.sharedService.displayErrorMessage("Your token is invalid or expired. Please Sign in again.");
                this.router.navigate(['/']);
                window.location.reload();
              }
              // return the error back to the caller
              return throwError(err);
            }
          }),
          finalize(() => this.spinnerService.hide() )
        );
      }
  }
  }