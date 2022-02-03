import { TestBed } from '@angular/core/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material//snack-bar';
import { Router } from '@angular/router';
import { HttpService } from '.././http-service/http.service';
import { SharedService } from './shared.service';

describe('SharedService', () => {
  let service: SharedService;

  beforeEach(() => {
    const ngxSpinnerServiceStub = () => ({
      show: () => ({}),
      hide: () => ({})
    });
    const matDialogStub = () => ({
      open: (confirmationDialogComponent, object) => ({})
    });
    const matSnackBarStub = () => ({ open: (body, title, arg) => ({}) });
    const routerStub = () => ({
      parseUrl: url => ({ root: { children: {} } }),
      url: {}
    });
    const httpServiceStub = () => ({
      getNew: string => ({ subscribe: f => f({}) }),
      get: arg => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        SharedService,
        { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub },
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: MatSnackBar, useFactory: matSnackBarStub },
        { provide: Router, useFactory: routerStub },
        { provide: HttpService, useFactory: httpServiceStub }
      ]
    });
    service = TestBed.inject(SharedService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  // describe('urlSegmentKeys', () => {
  //   it('makes expected calls', () => {
  //     const routerStub: Router = TestBed.inject(Router);
  //     spyOn(routerStub, 'parseUrl').and.callThrough();
  //     service.urlSegmentKeys();
  //     expect(routerStub.parseUrl).toHaveBeenCalled();
  //   });
  // });

  describe('getListLang', () => {
    it('makes expected calls', () => {
      const httpServiceStub: HttpService = TestBed.inject(HttpService);
      spyOn(httpServiceStub, 'getNew').and.callThrough();
      service.getListLang();
      expect(httpServiceStub.getNew).toHaveBeenCalled();
    });
  });
});
