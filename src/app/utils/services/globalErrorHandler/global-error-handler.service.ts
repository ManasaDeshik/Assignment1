import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor() { }
  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
 
     if (chunkFailedMessage.test(error.message)) {
       window.location.reload();
     }
   }
}
