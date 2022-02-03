import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from 'src/app/utils/services';
import { CommonService } from 'src/app/utils/services';
import { LoaderService } from 'src/app/utils/services';
import { StockService } from 'src/app/utils/services';
import { FormsModule } from '@angular/forms';
import { StockProductInfoComponent } from './stock-product-info.component';
import { of } from 'rxjs/internal/observable/of';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';

describe('StockProductInfoComponent', () => {
  let component: StockProductInfoComponent;
  let fixture: ComponentFixture<StockProductInfoComponent>;
  let records: {test
  };
  let router : Router;

  beforeEach(() => {
    const events = new Subject<{}>();
    const sharedServiceStub = () => ({
      urlSegmentKeys: () => ({ path: {}, length: {} }),
      displayErrorMessage: string => ({})
    });
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) })
    });
    const loaderServiceStub = () => ({});
    const stockServiceStub = () => ({ setManufacturerId: id => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StockProductInfoComponent],
      providers: [
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: CommonService, useFactory: commonServiceStub, useValue: {records, getDataModified : ()=> of({}), 
        getDataNew : ()=> of({}) }},
        { provide: LoaderService, useFactory: loaderServiceStub },
        { provide: StockService, useFactory: stockServiceStub },
        { provide: Router, useValue: { navigate : jasmine.createSpy("navigate"), events: of(new NavigationEnd(0, 'test/url', 'test/url'))}},
      ]
    });
    fixture = TestBed.createComponent(StockProductInfoComponent);
    component = fixture.componentInstance;
    // router = TestBed.inject(Router);
    // spyOn(router.events, 'pipe').and.returnValue(events);
    // events.next('Result of pipe');
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isProductDetailPath has default value`, () => {
    expect(component.isProductDetailPath).toEqual(false);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getRouteSegments').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getRouteSegments).toHaveBeenCalled();
  //   });
  // });

  // describe('getRouteSegments', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'getWarehouseBranchDetail').and.callThrough();
  //     spyOn(component, 'getProductDetail').and.callThrough();
  //     spyOn(sharedServiceStub, 'urlSegmentKeys').and.callThrough();
  //     component.getRouteSegments();
  //     expect(component.getWarehouseBranchDetail).toHaveBeenCalled();
  //     expect(component.getProductDetail).toHaveBeenCalled();
  //     expect(sharedServiceStub.urlSegmentKeys).toHaveBeenCalled();
  //   });
  // });

  // describe('getProductDetail', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getProductDetail();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

  // describe('getWarehouseBranchDetail', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getWarehouseBranchDetail();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

  // describe('getManufacturer', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getManufacturer();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

});