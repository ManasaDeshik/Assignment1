import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { JwtService } from '../jwt-service/jwt.service';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    const jwtServiceStub = () => ({ getToken: () => ({}) });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpService,
        { provide: JwtService, useFactory: jwtServiceStub }
      ]
    });
    service = TestBed.inject(HttpService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`baseUrl has default value`, () => {
    expect(service.baseUrl).toEqual(environment.baseUrl);
  });

  // describe('getRequestHeaders', () => {
  //   it('makes expected calls', () => {
  //     const jwtServiceStub: JwtService = TestBed.inject(JwtService);
  //     spyOn(jwtServiceStub, 'getToken').and.callThrough();
  //     service.getRequestHeaders();
  //     expect(jwtServiceStub.getToken).toHaveBeenCalled();
  //   });
  // });
});
