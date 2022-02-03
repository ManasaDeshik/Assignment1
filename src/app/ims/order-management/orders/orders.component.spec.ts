import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from 'src/app/utils';
import { FetchUserTabDetailsService } from 'src/app/utils';
import { LoaderService } from 'src/app/utils';
import { CommonService } from 'src/app/utils';
import { RecordList } from 'src/app/utils';
import { SideNavService } from 'src/app/utils';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { orderTableHeadersCollections } from 'src/app/utils';
import { orderTabCollections } from 'src/app/utils';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './orders.component';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  beforeEach(() => {
    const sharedServiceStub = () => ({
      toCheckAllPermissionRights: order => ({}),
      displayErrorMessage: statusText => ({}),
      formateDate: event => ({}),
      sendClickEvent: selectedBtnVal => ({}),
      displaySuccessMessage: string => ({})
    });
    const fetchUserTabDetailsServiceStub = () => ({
      setSelectedOrderStatus: subscribeData => ({})
    });
    const loaderServiceStub = () => ({});
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) }),
      putDataNew: (string, data) => ({ subscribe: f => f({}) }),
      patchDataNew: (string, requestObj) => ({ subscribe: f => f({}) }),
      putData: (string, data) => ({ subscribe: f => f({}) })
    });
    const sideNavServiceStub = () => ({
      getSubText: () => ({ subscribe: f => f({}) })
    });
    const matDialogStub = () => ({
      open: (confirmationDialogComponent, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    const routerStub = () => ({
      url: { includes: () => ({}) },
      navigate: array => ({})
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OrdersComponent],
      providers: [
        { provide: SharedService, useFactory: sharedServiceStub },
        {
          provide: FetchUserTabDetailsService,
          useFactory: fetchUserTabDetailsServiceStub
        },
        { provide: LoaderService, useFactory: loaderServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: SideNavService, useFactory: sideNavServiceStub },
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    spyOn(OrdersComponent.prototype, 'makeActive');
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
  });

  // it('can load instance', () => {
  //   expect(component).toBeTruthy();
  // });

  // it(`selectedBtnVal has default value`, () => {
  //   expect(component.selectedBtnVal).toEqual(0);
  // });

  // it(`selectedBtn has default value`, () => {
  //   expect(component.selectedBtn).toEqual(`Received`);
  // });

  // it(`isValueCheck has default value`, () => {
  //   expect(component.isValueCheck).toEqual(false);
  // });

  // it(`tableHeaders has default value`, () => {
  //   expect(component.tableHeaders).toEqual(orderTableHeadersCollections);
  // });

  // it(`assigneeOE has default value`, () => {
  //   expect(component.assigneeOE).toEqual(`expand`);
  // });

  // it(`addChallan has default value`, () => {
  //   expect(component.addChallan).toEqual(`expand`);
  // });

  // it(`showIndividualData has default value`, () => {
  //   expect(component.showIndividualData).toEqual(false);
  // });

  // it(`showChallanData has default value`, () => {
  //   expect(component.showChallanData).toEqual(false);
  // });

  // it(`oeArray has default value`, () => {
  //   expect(component.oeArray).toEqual([]);
  // });

  // it(`totalAmount has default value`, () => {
  //   expect(component.totalAmount).toEqual(0);
  // });

  // it(`selectedOrderArray has default value`, () => {
  //   expect(component.selectedOrderArray).toEqual([]);
  // });

  // it(`totalQuanity has default value`, () => {
  //   expect(component.totalQuanity).toEqual(0);
  // });

  // it(`orderTabs has default value`, () => {
  //   expect(component.orderTabs).toEqual(orderTabCollections);
  // });

  // it(`selectedTabDate has default value`, () => {
  //   expect(component.selectedTabDate).toEqual(`Received`);
  // });

  // it(`allowedWarehouse has default value`, () => {
  //   expect(component.allowedWarehouse).toEqual([]);
  // });

  // it(`SCName has default value`, () => {
  //   expect(component.SCName).toEqual(`TM ID, Mobile No, Name`);
  // });

  // it(`roleTabs has default value`, () => {
  //   expect(component.roleTabs).toEqual([]);
  // });

  // it(`userTabs has default value`, () => {
  //   expect(component.userTabs).toEqual([]);
  // });

  // it(`TMTabs has default value`, () => {
  //   expect(component.TMTabs).toEqual([]);
  // });

  // it(`delivery_days has default value`, () => {
  //   expect(component.delivery_days).toEqual([, , , , , ,]);
  // });

  // it(`delivery_day has default value`, () => {
  //   expect(component.delivery_day).toEqual(`Delivery Day`);
  // });

  // it(`showUser has default value`, () => {
  //   expect(component.showUser).toEqual(false);
  // });

  // it(`Sahelis has default value`, () => {
  //   expect(component.Sahelis).toEqual([]);
  // });

  // it(`ssName has default value`, () => {
  //   expect(component.ssName).toEqual(`Saheli ID, Mobile No`);
  // });

  // it(`isReciveFromTM has default value`, () => {
  //   expect(component.isReciveFromTM).toEqual(false);
  // });

  // describe('constructor', () => {
  //   it('makes expected calls', () => {
  //     expect(OrdersComponent.prototype.makeActive).toHaveBeenCalled();
  //   });
  // });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'clickMe').and.callThrough();
  //     spyOn(component, 'getCurrentWarehouse').and.callThrough();
  //     spyOn(component, 'modulePermissionSets').and.callThrough();
  //     spyOn(component, 'searchRoleData').and.callThrough();
  //     spyOn(component, 'searchRoleDataForTM').and.callThrough();
  //     (<jasmine.Spy>component.makeActive).calls.reset();
  //     component.ngOnInit();
  //     expect(component.clickMe).toHaveBeenCalled();
  //     expect(component.getCurrentWarehouse).toHaveBeenCalled();
  //     expect(component.modulePermissionSets).toHaveBeenCalled();
  //     expect(component.searchRoleData).toHaveBeenCalled();
  //     expect(component.searchRoleDataForTM).toHaveBeenCalled();
  //     expect(component.makeActive).toHaveBeenCalled();
  //   });
  // });

  // describe('modulePermissionSets', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(sharedServiceStub, 'toCheckAllPermissionRights').and.callThrough();
  //     component.modulePermissionSets();
  //     expect(sharedServiceStub.toCheckAllPermissionRights).toHaveBeenCalled();
  //   });
  // });

  // describe('getOrderList', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
  //       FetchUserTabDetailsService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'setSelectedOrderStatus'
  //     ).and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getOrderList();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.setSelectedOrderStatus
  //     ).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

  // describe('getCurrentWarehouse', () => {
  //   it('makes expected calls', () => {
  //     const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
  //       FetchUserTabDetailsService
  //     );
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'setSelectedOrderStatus'
  //     ).and.callThrough();
  //     component.getCurrentWarehouse();
  //     expect(
  //       fetchUserTabDetailsServiceStub.setSelectedOrderStatus
  //     ).toHaveBeenCalled();
  //   });
  // });

  // describe('search', () => {
  //   it('makes expected calls', () => {
  //     const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
  //       FetchUserTabDetailsService
  //     );
  //     spyOn(component, 'getOrderList').and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'setSelectedOrderStatus'
  //     ).and.callThrough();
  //     component.search();
  //     expect(component.getOrderList).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.setSelectedOrderStatus
  //     ).toHaveBeenCalled();
  //   });
  // });

  // describe('getRoleList', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(component, 'expand').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getRoleList();
  //     expect(component.expand).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

  // describe('scanItem', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const matDialogStub: MatDialog = fixture.debugElement.injector.get(
  //       MatDialog
  //     );
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     component.scanItem();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //   });
  // });

  // describe('recieveCash', () => {
  //   it('makes expected calls', () => {
  //     const matDialogStub: MatDialog = fixture.debugElement.injector.get(
  //       MatDialog
  //     );
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     component.recieveCash();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //   });
  // });

  // describe('searchRoleData', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.searchRoleData();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

  // describe('searchRoleDataForTM', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(component, 'selectedRoleDataForTM').and.callThrough();
  //     spyOn(component, 'selectedRoleDataForSS').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.searchRoleDataForTM();
  //     expect(component.selectedRoleDataForTM).toHaveBeenCalled();
  //     expect(component.selectedRoleDataForSS).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

  // describe('resetAll', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'getCurrentWarehouse').and.callThrough();
  //     spyOn(component, 'getOrderList').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.resetAll();
  //     expect(component.getCurrentWarehouse).toHaveBeenCalled();
  //     expect(component.getOrderList).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });
});
