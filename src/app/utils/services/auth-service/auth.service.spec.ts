import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../.../../../../../aws-exports';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the active user correctly', () => {
    const user =  {
      phone_number: '+919078654444',
      password: '123456'
    };
  
    service.loginWithCognito(user);
  
    expect(service['phone_number']).toEqual('+919078654444');
    expect(service['password']).toEqual('123456');
  });

  it('should set the active user correctly', () => {
    const userwithoutprefix =  {
      phone_number: '9078654444',
      password: '123456'
    };
  
    service.loginWithCognito(userwithoutprefix);

    expect(service['phone_number']).toEqual('+919078654444');
    expect(service['password']).toEqual('123456');
  });
});
