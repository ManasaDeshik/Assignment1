import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from '../shared-service/shared.service';
import { HttpService } from '../http-service/http.service';
import { JwtService } from '../jwt-service/jwt.service';
import { StorageService } from 'ngx-webstorage-service';
import { SessionStorage } from 'ngx-webstorage';


describe('LoaderService', () => {
  const ngxSpinnerServiceStub = () => ({
    show: () => ({}),
    hide: () => ({})
  });
  beforeEach(() => TestBed.configureTestingModule({
    providers:[
      { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub }
    ],
    imports: [
      NgxSpinnerModule
    ]
  }));

  it('should be created', () => {
    const service: LoaderService = TestBed.inject(LoaderService);
    expect(service).toBeTruthy();
  });

  it('should call show method', () => {
    const service: LoaderService = TestBed.inject(LoaderService);
    spyOn(service, 'show').and.callThrough();
    service.show('show');
    expect(service.show).toHaveBeenCalled();
  });

  it('should call show method with hide', () => {
    const service: LoaderService = TestBed.inject(LoaderService);
    spyOn(service, 'show').and.callThrough();
    service.show('hide');
    expect(service.show).toHaveBeenCalled();
  });
});
