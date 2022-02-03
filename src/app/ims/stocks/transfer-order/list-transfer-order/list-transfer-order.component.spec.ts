import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/utils';
import { SharedService } from 'src/app/utils';
import { SpareOngoingToRecordList } from 'src/app/utils';
import { Router } from '@angular/router';
import { filterPurchaseOrder } from 'src/app/utils';
import { FormsModule } from '@angular/forms';
import { ListTransferOrderComponent } from './list-transfer-order.component';

describe('ListTransferOrderComponent', () => {
  let component: ListTransferOrderComponent;
  let fixture: ComponentFixture<ListTransferOrderComponent>;

  beforeEach(() => {
    const matDialogStub = () => ({
      open: (packageRequestPopUpComponent, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) }),
      putDataNew: (string, responseData) => ({ subscribe: f => f({}) }),
      putData: (string, obj) => ({ subscribe: f => f({}) }),
      getData: arg => ({ subscribe: f => f({}) })
    });
    const sharedServiceStub = () => ({
      toCheckAllPermissionRights: transportation => ({}),
      displayErrorMessage: string => ({}),
      show: string => ({}),
      displaySuccessMessage: string => ({})
    });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListTransferOrderComponent],
      providers: [
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(ListTransferOrderComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`tableHeaders has default value`, () => {
    expect(component.tableHeaders).toEqual([{ header: 'Item Name' },{ header: 'Total Units' } ,{ header: 'Date' } ,
    { header: 'Source' } ,{ header: 'Source Branch' } ,{ header: 'Destination' } ,{ header: 'Destination Branch' }]);
  });

  it(`tableTabHeaders has default value`, () => {
    expect(component.tableTabHeaders).toEqual([`Product`]);
  });

  it(`selectedBtnVal has default value`, () => {
    expect(component.selectedBtnVal).toEqual(`Product`);
  });

  it(`filterPurchaseOrder has default value`, () => {
    expect(component.filterPurchaseOrder).toEqual(filterPurchaseOrder);
  });

  it(`showIndividualData has default value`, () => {
    expect(component.showIndividualData).toEqual(false);
  });

  it(`spareTableHeaders has default value`, () => {
    expect(component.spareTableHeaders).toEqual([
      `SL No`,
      `Description of Goods`,
      `Quantity`,
      `Source Warehouse`,
      `Destination Warehouse`,
      `Activity`
    ]);
  });

  it(`showPO has default value`, () => {
    expect(component.showPO).toEqual(false);
  });

  it(`openOrderDetails has default value`, () => {
    expect(component.openOrderDetails).toEqual(`collapse`);
  });

  it(`isOrderClosed has default value`, () => {
    expect(component.isOrderClosed).toEqual(false);
  });

  it(`categoryList has default value`, () => {
    expect(component.categoryList).toEqual([]);
  });

  // describe('acceptSpareItem', () => {
  //   it('makes expected calls', () => {
  //     const matDialogStub: MatDialog = fixture.debugElement.injector.get(
  //       MatDialog
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const spareOngoingToRecordListStub: SpareOngoingToRecordList = <any>{};
  //     spyOn(component, 'getOngoingToSpare').and.callThrough();
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     spyOn(commonServiceStub, 'putData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.acceptSpareItem(spareOngoingToRecordListStub);
  //     expect(component.getOngoingToSpare).toHaveBeenCalled();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //     expect(commonServiceStub.putData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getLists').and.callThrough();
  //     spyOn(component, 'modulePermissionSets').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getLists).toHaveBeenCalled();
  //     expect(component.modulePermissionSets).toHaveBeenCalled();
  //   });
  // });

  describe('modulePermissionSets', () => {
    it('makes expected calls', () => {
      const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
        SharedService
      );
      spyOn(sharedServiceStub, 'toCheckAllPermissionRights').and.callThrough();
      component.modulePermissionSets();
      expect(sharedServiceStub.toCheckAllPermissionRights).toHaveBeenCalled();
    });
  });

  // describe('getLists', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getLists();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('scan', () => {
  //   it('makes expected calls', () => {
  //     const matDialogStub: MatDialog = fixture.debugElement.injector.get(
  //       MatDialog
  //     );
  //     spyOn(component, 'getLists').and.callThrough();
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     component.scan();
  //     expect(component.getLists).toHaveBeenCalled();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //   });
  // });

  // describe('transferOrderWithoutScan', () => {
  //   it('makes expected calls', () => {
  //     const matDialogStub: MatDialog = fixture.debugElement.injector.get(
  //       MatDialog
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'getLists').and.callThrough();
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     spyOn(commonServiceStub, 'putDataNew').and.callThrough();
  //     spyOn(commonServiceStub, 'putData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.transferOrderWithoutScan();
  //     expect(component.getLists).toHaveBeenCalled();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //     expect(commonServiceStub.putDataNew).toHaveBeenCalled();
  //     expect(commonServiceStub.putData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('getOngoingToSpare', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getOngoingToSpare();
  //     expect(commonServiceStub.getData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  describe('viewOngoingHistory', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.viewOngoingHistory();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
