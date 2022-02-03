import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonService } from '../../services/common-service/common.service';
import { LoaderService } from '../../services/loader-service/loader.service';
import { SharedService } from '../../services/shared-service/shared.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ViewOrdersComponent } from './view-orders.component';
import { PaginatePipe, PaginationService } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs/internal/Subject';

describe('ViewOrdersComponent', () => {
  let component: ViewOrdersComponent;
  let fixture: ComponentFixture<ViewOrdersComponent>;
  let router : Router;

  beforeEach(() => {
    const events = new Subject<{}>();
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) })
    });
    const loaderServiceStub = () => ({});
    const sharedServiceStub = () => ({
      urlSegmentKeys: () => ({ path: {}, length: {} }),
      displayErrorMessage: statusText => ({}),
      formateDate: event => ({})
    });
   // const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule,
        RouterTestingModule.withRoutes(
          [{path: '', component: ViewOrdersComponent}],
        )],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ViewOrdersComponent, PaginatePipe],
      providers: [
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: LoaderService, useFactory: loaderServiceStub },
        { provide: SharedService, useFactory: sharedServiceStub },
      //  { provide: Router, useFactory: routerStub },
        PaginationService,
        { provide: PaginatePipe}
      ]
    });
    router = TestBed.inject(Router);
   spyOn(router.events, 'pipe').and.returnValue(events);
   events.next('Result of pipe');
    fixture = TestBed.createComponent(ViewOrdersComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`tableHeaders has default value`, () => {
    expect(component.tableHeaders).toEqual([{header:'VLE ID'},
    { header: 'VLE Name' } ,
    { header: 'Territory Manager' } ,
    { header: 'Warehouse Name' } ,
    { header: 'State' } ,
    { header: 'Customer Name' } ,
    { header: 'Customer No' } ,
    { header: 'Village Name' } ,
    { header: 'Delivery Day' } ,
    { header: 'Delivered Date' } ,
    { header: 'Product Name' } ,
    { header: 'Quantity' } ,
    { header: 'Total Price' }]);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     spyOn(component, 'viewOrders').and.callThrough();
  //     spyOn(sharedServiceStub, 'urlSegmentKeys').and.callThrough();
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.viewOrders).toHaveBeenCalled();
  //     expect(sharedServiceStub.urlSegmentKeys).toHaveBeenCalled();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //   });
  // });

   describe('viewOrders', () => {
    it('makes expected calls', () => {
      const commonServiceStub: CommonService = fixture.debugElement.injector.get(
        CommonService
      );
      const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
        SharedService
      );
      spyOn(commonServiceStub, 'getDataNew').and.callThrough();
      spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
      component.viewOrders();
      expect(commonServiceStub.getDataNew).toHaveBeenCalled();
      expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalledTimes(0);
    });
  });

  describe('search', () => {
    it('makes expected calls', () => {
      component.villageName = 'test';
      spyOn(component, 'search').and.callThrough();
      component.search();
      expect(component.search).toHaveBeenCalled();
    });
  });

  describe('resetAll', () => {
    it('makes expected calls', () => {
      spyOn(component, 'viewOrders').and.callThrough();
      component.resetAll();
      expect(component.viewOrders).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPage', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getPage').and.callThrough();
      component.getPage(2);
      expect(component.getPage).toHaveBeenCalled();
    });
  });

  describe('getPage', () => {
    it('makes expected calls', () => {
      component.orderList.totalRecords = 10;
      spyOn(component, 'getPage').and.callThrough();
      component.getPage(2);
      expect(component.getPage).toHaveBeenCalled();
    });
  });

  describe('searchProductName', () => {
    it('makes expected calls', () => {
     const event = {
      key: 'Enter'
      };
      spyOn(component, 'searchProductName').and.callThrough();
      component.searchProductName(event.key);
      expect(component.searchProductName).toHaveBeenCalled();
    });
  });

  describe('getScheduledTime', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getScheduledTime').and.callThrough();
      component.getScheduledTime('test','from');
      expect(component.getScheduledTime).toHaveBeenCalled();
    });

    it('makes expected calls', () => {
      spyOn(component, 'getScheduledTime').and.callThrough();
      component.getScheduledTime('test','to');
      expect(component.getScheduledTime).toHaveBeenCalled();
    });

    it('makes expected calls', () => {
      spyOn(component, 'getScheduledTime').and.callThrough();
      component.getScheduledTime('test','test');
      expect(component.getScheduledTime).toHaveBeenCalled();
    });
  });
});