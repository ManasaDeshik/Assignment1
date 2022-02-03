import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable, from } from 'rxjs';
 import { SessionStorage } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs/internal/observable/of';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { JwtService } from '../jwt-service/jwt.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  public baseUrl: string = environment.baseUrl;
  public serverError: EventEmitter<Response> = new EventEmitter();
  public newtoken : string;

  constructor(private http: HttpClient, private jwtService: JwtService) { }
  @SessionStorage('authenticationToken') public authenticationToken: string;
  token = this.jwtService.getToken();
  /** 
   * @method to perform the http `delete` method
   * @param api - name of the service/api to be called
   * @param data - data to be passed for deleting
   * @returns the Observable<any>
   */
  delete(api: any, data: any): Observable<any> {
    const requestOptions = {  headers:  new HttpHeaders()
      .set('x-access-token', this.authenticationToken)
      .set('content-type' , 'application/json')};
    let req = new HttpRequest('DELETE', this.baseUrl+api,requestOptions);
    let newReq = req.clone({body: data});
    return this.http
      .request(newReq)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  deleteNew(api: any, data: any): Observable<any> {
    const requestOptions = {  headers:  new HttpHeaders()
      .set('x-access-token', this.authenticationToken)
      .set('content-type' , 'application/json')};
    let req = new HttpRequest('DELETE', environment.newBaseUrl+api,requestOptions);
    let newReq = req.clone({body: data});
    return this.http
      .request(newReq)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
    }


  /**
    * @method to perform the http `delete` method
    * @param api - name of the service/api to be called
    * @param data - data to be passed for deleting
    * @returns the Observable<any>
   */

  deleteBanner(api: any): Observable<any> {
    const requestOptions = {  headers:  new HttpHeaders()
      .set('x-access-token', this.authenticationToken)
      .set('content-type' , 'application/json')};
    return this.http
      .delete(this.baseUrl + api,requestOptions)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }


  /**
   * @method to perform the http `get` method
   * @param api - name of the service/api to be called
   * @returns the Observable<any>
   */

  get(api: any): Observable<any> {
    const requestOptions = {  headers:  new HttpHeaders()
            .set('x-access-token', this.authenticationToken)
            .set('content-type' , 'application/json')};
    return this.http.get(this.baseUrl + api, requestOptions)
      .pipe(map(response => response), catchError(error => of(error)));
  }

  /**
   * @method to perform the http `get` method
   * @param api - name of the service/api to be called
   * @returns the Observable<any>
   */

  getNew(api: any): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders()
        .set('x-access-token', this.authenticationToken)
        .set('content-type', 'application/json')
    };
    return this.http.get(environment.newBaseUrl + api, requestOptions)
      .pipe(map(response => response), catchError(error => of(error)));
  }

  getTranslateAPINew(api: any): Observable<any> {
    const axios = require('axios').default;
    /*const requestOptions = {
      headers: new HttpHeaders()
        .set('x-access-token', this.authenticationToken)
        .set('content-type', 'application/json')
    };*/
    const promise =  axios.get(environment.newGoogleAPIUrl + api)
      .then(response => response).catch(error => of(error));
      const observable = from(promise);
      return observable;
  }
  getDataModified(api: any): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders()
        .set('x-access-token', this.authenticationToken)
        .set('content-type', 'application/json')
    };
    return this.http.get(environment.newBaseUrl + api, requestOptions)
      .pipe(map(response => response), catchError(error => of(error)));
  }
  /**
   * @method to perform the http `post` method
   * @param api - name of the service/api to be called
   * @param data - data to be passed to server
   * @returns the Observable<any>
   */

post(api: any, data: any): Observable<any> {
  const OptionTypes = {
        headers: this.getRequestHeaders(),
      };
      return this.http.post(this.baseUrl + api, data ,OptionTypes )
        .pipe(
          map(response => response),
          catchError(this.handleError)
       );
    }

postNew(api: any, data: any): Observable<any> {
  const OptionTypes = {
        headers: this.getRequestHeaders(),
      };
      return this.http.post(environment.newBaseUrl + api, data ,OptionTypes )
        .pipe(
          map(response => response),
          catchError(this.handleError)
        );
    }

  /**
 * @method to perform the http `post` method
 * @param api - name of the service/api to be called
 * @param data - data to be passed to server
 * @returns the Observable<any>
 */
  patch(api: any, data: any): Observable<any> {
    const requestOptions = {  headers:  new HttpHeaders()
      .set('x-access-token', this.authenticationToken)
      .set('content-type' , 'application/json')};
    return this.http
      .patch(this.baseUrl + api, JSON.stringify(data),requestOptions)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  patchNew(api: any, data: any): Observable<any> {
    const requestOptions = {  headers:  new HttpHeaders()
      .set('x-access-token', this.authenticationToken)
      .set('content-type' , 'application/json')};
    return this.http
      .patch(environment.newBaseUrl + api, JSON.stringify(data),requestOptions)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  /**
   * @method to perform the http `put` method
   * @param api - name of the service/api to be called
   * @param data - data to be passed for updating in server
   * @returns the Observable<any>
   */
  put(api: any, data: any): Observable<any> {
    const requestOptions = {  headers:  new HttpHeaders()
      .set('x-access-token', this.authenticationToken)
      .set('content-type' , 'application/json')};
    return this.http
      .put(this.baseUrl + api, JSON.stringify(data),requestOptions)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  putNew(api: any, data: any): Observable<any> {
    const requestOptions = {  headers:  new HttpHeaders()
      .set('x-access-token', this.authenticationToken)
      .set('content-type' , 'application/json')};
    return this.http
      .put(environment.newBaseUrl + api, JSON.stringify(data),requestOptions)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  /**
   * @method
   * @description
   * download the files
   */
  fileDownload(query: any) {
    // const requestOptions = {  headers:  new HttpHeaders()
    //   .set('x-access-token', this.authenticationToken)
    //   .set('content-type' , 'application/json')};
    return this.http.get(this.baseUrl + query, {headers: this.getFileUploadHeader(),responseType: 'blob' })
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  fileDownloadNew(query: any) {
    // const requestOptions = {  headers:  new HttpHeaders()
    //   .set('x-access-token', this.authenticationToken)
    //   .set('content-type' , 'application/json')};
    return this.http.get(environment.newBaseUrl + query, {headers: this.getFileUploadHeader(),responseType: 'blob' })
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  getFile(data: any) {
    return this.http.get(data, {headers: this.getFileUploadHeader(), responseType: 'json' })
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  postUploadNew(api: any, data: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    if (this.authenticationToken) {
      headers.set('x-access-token', this.authenticationToken);
    }
    return this.http.post(environment.newBaseUrl  + api, data, { headers: this.getFileUploadHeader()}).pipe(
      map(response => response), catchError(this.handleError));
  }

  /**
 * @method to perform the http `post` method
 * @param api - name of the service/api to be called
 * @param data - data to be passed to server
 * @returns the Observable<any>
 */
  postUpload(api: any, data: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    if (this.authenticationToken) {
      headers.set('x-access-token', this.authenticationToken);
    }
    return this.http.post(this.baseUrl + api, data, { headers: this.getFileUploadHeader()}).pipe(
      map(response => response), catchError(this.handleError));
  }
  /**
* @method to perform the http `PUT` method
* @param api - name of the service/api to be called
* @param data - data to be passed to server
* @returns the Observable<any>
*/
  updateUpload(api: any, data: any): Observable<any> {
  //  const headers: HttpHeaders = new HttpHeaders();
  //   if (this.authenticationToken) {
  //     headers.set('x-access-token', this.authenticationToken);
  //   }
  const requestOptions = {  headers:  new HttpHeaders()
    .set('x-access-token', this.authenticationToken)};
    return this.http.put(environment.newBaseUrl + api, data, requestOptions).pipe(
      map(response => response), catchError(this.handleError));
  }

  fileupload(api: any, data: any): Observable<any> {
    //  const headers: HttpHeaders = new HttpHeaders();
    //   if (this.authenticationToken) {
    //     headers.set('x-access-token', this.authenticationToken);
    //   }
    const requestOptions = {  headers:  new HttpHeaders()
      .set('x-access-token', this.authenticationToken)};
      return this.http.post(environment.newBaseUrl + api, data, requestOptions).pipe(
        map(response => response), catchError(this.handleError));
    }


  updateUploadNew(api: any, data: any): Observable<any> {
    //  const headers: HttpHeaders = new HttpHeaders();
    //   if (this.authenticationToken) {
    //     headers.set('x-access-token', this.authenticationToken);
    //   }
    const requestOptions = {  headers:  new HttpHeaders()
      .set('x-access-token', this.authenticationToken)};
      return this.http.put(environment.newBaseUrl + api, data, requestOptions).pipe(
        map(response => response), catchError(this.handleError));
    }
  /**
   * @method
   * @description
   * download the files based on the passed data
   */
  fileDataDownload(query: any, data: any) {
    return this.http.post(this.baseUrl + query, data, {headers: this.getFileUploadHeader(), observe: 'response',
    responseType: 'blob'})
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }
  
  fileDataDownloadNew(query: any, data: any) {
    const requestOptions = {  headers:  new HttpHeaders()
      .set('x-access-token', this.authenticationToken),};
    return this.http.post(environment.newBaseUrl + query, data, {headers: this.getFileUploadHeader(), observe: 'response',
    responseType: 'blob'})
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }
  /**
   * @method
   * @description
   * download the files based on the passed data
   */
  fileDataDownloadPut(query: any, data: any) {
    return this.http.put(this.baseUrl + query, data, {headers: this.getFileUploadHeader(), observe: 'response',
    responseType: 'blob'})
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  /**
   * @method
   * @description
   * download the files based on the passed data
   */
   fileDataDownloadPutNew(query: any, data: any) {
    return this.http.put(environment.newBaseUrl + query, data, {headers: this.getFileUploadHeader(), observe: 'response',
    responseType: 'json'})
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }
  /**
   * @method
   * @description
   * Request headers to be set during file upload
   */
  private getFileUploadHeader():  HttpHeaders {
    let fileUploadHeader: HttpHeaders = new HttpHeaders;
    return fileUploadHeader = new HttpHeaders({
      'x-access-token': this.authenticationToken
    });
  }

  /**
   * @method to get the request headers
   * @param api - name of the service/api to be called
   * @param data - data to be passed for deleting
   * @returns the request headers of type `Headers`
   */
    getRequestHeaders(): HttpHeaders {
    const token = this.jwtService.getToken();
    const headers: HttpHeaders = new HttpHeaders({
      'x-access-token': token,
      'Content-Type': 'application/json',
      // 'Connection': 'keep-alive',
      // 'Keep-Alive': 'timeout=200'
    });
    headers.set('x-access-token', token);
    // include the autherisation header if it exitsts
    if (this.authenticationToken) {
      headers.set('x-access-token', token);
    }
    return headers;

  }

  /**
   * @method to capture the service errors
   * @param api - name of the service/api to be called
   * @param data - data to be passed for deleting
   */
  handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
