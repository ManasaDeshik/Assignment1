import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import Amplify, { Auth } from 'aws-amplify';
import { SessionStorage } from 'ngx-webstorage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  phone_number: string;
  password: string = '';
  currentSession: any;
  token: any;
  refreshToken: any;
  authenticationToken: string;

  constructor() { }

  async loginWithCognito(data) {
    try{
      this.phone_number = data.phone_number;
      if(data.phone_number.includes("+91")) {
        this.phone_number = data.phone_number;
      }
      else {
        let prefix = "+91";
        let phone = prefix.concat(data.phone_number);
        this.phone_number = phone;
      }
      this.password = data.password;
      var user = await Auth.signIn(this.phone_number.toString(), this.password.toString());
      console.log('Authentication performed for user=' + this.phone_number + 'password=' + this.password + ' login result==' + user);
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
        Auth.completeNewPassword(
            user,               // the Cognito User Object
            this.password
        ).then(async user => {
            // at this time the user is logged in if no MFA required
            this.currentSession = await Auth.currentSession();
            this.token = this.currentSession.getAccessToken().getJwtToken();
            this.refreshToken = this.currentSession.getRefreshToken().getToken();
            sessionStorage.setItem("token", this.token);
            return this.token;
        }).catch(e => {
          console.log(e);
        });
      }else{
        console.log('36',user)
        this.currentSession = await Auth.currentSession();
        this.token = this.currentSession.getAccessToken().getJwtToken();
        this.refreshToken = this.currentSession.getRefreshToken().getToken();
        sessionStorage.setItem("authenticationToken", this.token);
        return this.token;
      }
    }
    catch(error) {
      console.log(error);
      alert('User Authentication failed');
    }
  }
}
