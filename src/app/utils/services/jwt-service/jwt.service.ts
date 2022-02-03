import { Injectable } from '@angular/core';
import { SessionStorage } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }
  @SessionStorage('authenticationToken') public authenticationToken: string;

  // get token by decrypt
  getToken(): string {
    let _token = this.authenticationToken;
    // .getItem('Token');
    return (_token) ? _token : '';
  }

  // // save token by encrypt
  // saveToken(token: string) {
  //   this.authenticationToken.setItem('Token', token)
  // }

  // // destroy token
  // destroyToken() {
  //   this.authenticationToken.removeItem('Token');
  // }
}
