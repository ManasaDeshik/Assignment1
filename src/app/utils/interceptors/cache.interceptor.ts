import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { share } from 'rxjs/operator';
import { LoaderService } from '../services/loader-service/loader.service';
import { JwtService } from '../services/jwt-service/jwt.service';
import { finalize } from "rxjs/operators";
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
    providedIn: 'root'
  })

  export class CacheInterceptor implements HttpInterceptor {
//     private cache = new Map<string, any>();

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (request.method !== 'GET') {
//       return next.handle(request);
//     }

//     const cachedResponse = this.cache.get(request.url);
//     if (cachedResponse) {
//       return of(cachedResponse);
//     }

//     return next.handle(request).pipe(
//       tap(event => {
//         if (event instanceof HttpResponse) {
//           this.cache.set(request.url, event);
//         }
//       })
//     );
//   }

 	  private cache = new Map<string, any>();
 	

      intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 	    if (request.method !== 'GET') {
 	      return next.handle(request);
 	    }
 	
        const cachedResponse = this.cache.get(request.url);
 	    if (cachedResponse) {
 	      return of(cachedResponse);
 	    }
 	
        return next.handle(request).pipe(
 	      tap(event => {
 	        if (event instanceof HttpResponse) {
 	          this.cache.set(request.url, event);
 	        }
 	      })
 	    );
 	  }
   
 /* private cache: Map<HttpRequest<any>, HttpResponse<any>> = new Map()
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    if(req.method !== "GET") {
        return next.handle(req)
    }
    if(req.headers.get("reset")) {
        this.cache.delete(req)
    }
    const cachedResponse: HttpResponse<any> = this.cache.get(req)
    if(cachedResponse) {
        return of(cachedResponse.clone())
    }else {
        return next.handle(req).pipe(
            tap(stateEvent => {
                if(stateEvent instanceof HttpResponse) {
                    this.cache.set(req, stateEvent.clone())
                }
            })
        )
    }
  }  */  
}