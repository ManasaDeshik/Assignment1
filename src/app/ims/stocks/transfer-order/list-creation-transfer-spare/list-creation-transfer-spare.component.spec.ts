import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from 'src/app/utils';
import { StoreTransportSpareArray } from 'src/app/utils';
import { CommonService } from 'src/app/utils';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ListCreationTransferSpareComponent } from './list-creation-transfer-spare.component';

describe('ListCreationTransferSpareComponent', () => {
  let component: ListCreationTransferSpareComponent;
  let fixture: ComponentFixture<ListCreationTransferSpareComponent>;

  beforeEach(() => {
    const sharedServiceStub = () => ({
      urlSegmentKeys: () => ({ path: {}, length: {} }),
      openDialog: en_name => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      }),
      displayErrorMessage: arg => ({}),
      show: string => ({})
    });
    const commonServiceStub = () => ({
      getData: arg => ({ subscribe: f => f({}) }),
      postData: (string, data) => ({ subscribe: f => f({}) })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const matDialogStub = () => ({
      open: (confirmationDialogComponent, object) => ({
        afterClosed: () => ({ pipe: () => ({ subscribe: f => f({}) }) })
      })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListCreationTransferSpareComponent],
      providers: [
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: MatDialog, useFactory: matDialogStub }
      ]
    });
    fixture = TestBed.createComponent(ListCreationTransferSpareComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`tableHeaders has default value`, () => {
    expect(component.tableHeaders).toEqual([`SL No`, `Spare Name`, `Quantity`]);
  });

  // describe('openDialog', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const storeTransportSpareArrayStub: StoreTransportSpareArray = <any>{};
  //     spyOn(component, 'updateBucketListData').and.callThrough();
  //     spyOn(sharedServiceStub, 'openDialog').and.callThrough();
  //     component.openDialog(storeTransportSpareArrayStub);
  //     expect(component.updateBucketListData).toHaveBeenCalled();
  //     expect(sharedServiceStub.openDialog).toHaveBeenCalled();
  //   });
  // });

  // describe('quantityKeyUp', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const storeTransportSpareArrayStub: StoreTransportSpareArray = <any>{};
  //     spyOn(component, 'updateBucketListData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.quantityKeyUp(storeTransportSpareArrayStub);
  //     expect(component.updateBucketListData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

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
  //     spyOn(sharedServiceStub, 'urlSegmentKeys').and.callThrough();
  //     component.getRouteSegments();
  //     expect(sharedServiceStub.urlSegmentKeys).toHaveBeenCalled();
  //   });
  // });

  // describe('printTransportOrder', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(component, 'validQuantity').and.callThrough();
  //     spyOn(component, 'savePrint').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'postData').and.callThrough();
  //     component.printTransportOrder();
  //     expect(component.validQuantity).toHaveBeenCalled();
  //     expect(component.savePrint).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.postData).toHaveBeenCalled();
  //   });
  // });

  // describe('savePrint', () => {
  //   it('makes expected calls', () => {
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     component.savePrint();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //   });
  // });

  // describe('routeToPurchaseOrderSpare', () => {
  //   it('makes expected calls', () => {
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     const matDialogStub: MatDialog = fixture.debugElement.injector.get(
  //       MatDialog
  //     );
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     component.routeToPurchaseOrderSpare();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //   });
  // });
});
