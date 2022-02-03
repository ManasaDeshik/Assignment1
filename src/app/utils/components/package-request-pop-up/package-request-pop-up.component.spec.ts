import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../services';
import { LoaderService } from '../../services';
import { SharedService } from '../../services';
import { FormsModule } from '@angular/forms';
import { PackageRequestPopUpComponent } from './package-request-pop-up.component';
import { of } from 'rxjs/internal/observable/of';

describe('PackageRequestPopUpComponent', () => {
  let component: PackageRequestPopUpComponent;
  let fixture: ComponentFixture<PackageRequestPopUpComponent>;

  beforeEach(() => {
    const matDialogRefStub = () => ({
      disableClose: {},
      close: comboProductList => ({}),
      afterClosed: () => ({ subscribe: f => f({}) })
    });
    const matDialogStub = () => ({
      open: (confirmationDialogComponent, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) }),
        close: () => ({})
      })
    });
    const commonServiceStub = () => ({
      getData: arg => ({ subscribe: f => f({}) }),
      getDataNew: string => ({ subscribe: f => f({}) }),
      putData: (string, obj) => ({ subscribe: f => f({}) }),
      postData: (string, scanItems) => ({ subscribe: f => f({}) }),
      putDataNew: (string, executiveId) => ({ subscribe: f => f({}) })
    });
    const loaderServiceStub = () => ({});
    const sharedServiceStub = () => ({
      displayErrorMessage: string => ({}),
      displaySuccessMessage: string => ({})
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PackageRequestPopUpComponent],
      providers: [
        { provide: MatDialogRef, useFactory: matDialogRefStub, useValue: {afterClosed : ()=> of({}), close : ()=> of({})} },
        { provide: MatDialog, useFactory: matDialogStub, useValue: {afterClosed : ()=> of({}), close : ()=> of({}), open : ()=> of({})} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: LoaderService, useFactory: loaderServiceStub },
        { provide: SharedService, useFactory: sharedServiceStub }
      ]
    });
    fixture = TestBed.createComponent(PackageRequestPopUpComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`scannedCount has default value`, () => {
    expect(component.scannedCount).toEqual(0);
  });

  it(`changeStatus has default value`, () => {
    expect(component.changeStatus).toEqual(false);
  });

  it(`activeFinish has default value`, () => {
    expect(component.activeFinish).toEqual(false);
  });

  it(`OECollections has default value`, () => {
    expect(component.OECollections).toEqual([]);
  });

  it(`amount has default value`, () => {
    expect(component.amount).toEqual(0);
  });

  it(`orderScan has default value`, () => {
    expect(component.orderScan).toEqual([]);
  });

  it(`disableReceiveCash has default value`, () => {
    expect(component.disableReceiveCash).toEqual(false);
  });

  it(`isScan has default value`, () => {
    expect(component.isScan).toEqual(false);
  });

  it(`tableHeaders has default value`, () => {
    expect(component.tableHeaders).toEqual([{ header: 'Product' },{ header: 'Quantity' } ,{ header: 'value' }]);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     component.data.message = 'scan';
  //     spyOn(component, 'getScannedCount').and.callThrough();
  //     spyOn(component, 'getScannedOngoingCount').and.callThrough();
  //     spyOn(component, 'getTransferOrderScannedCount').and.callThrough();
  //     spyOn(component, 'getOERoleId').and.callThrough();
  //     spyOn(component, 'isActiveFinish').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getScannedCount).toHaveBeenCalled();
  //     expect(component.getScannedOngoingCount).toHaveBeenCalled();
  //     expect(component.getTransferOrderScannedCount).toHaveBeenCalled();
  //     expect(component.getOERoleId).toHaveBeenCalled();
  //     expect(component.isActiveFinish).toHaveBeenCalled();
  //   });

  //   it('makes expected calls', () => {
  //     component.data.message = 'scanOngoing';
  //     spyOn(component, 'getScannedCount').and.callThrough();
  //     spyOn(component, 'getScannedOngoingCount').and.callThrough();
  //     spyOn(component, 'getTransferOrderScannedCount').and.callThrough();
  //     spyOn(component, 'getOERoleId').and.callThrough();
  //     spyOn(component, 'isActiveFinish').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getScannedCount).toHaveBeenCalled();
  //     expect(component.getScannedOngoingCount).toHaveBeenCalled();
  //     expect(component.getTransferOrderScannedCount).toHaveBeenCalled();
  //     expect(component.getOERoleId).toHaveBeenCalled();
  //     expect(component.isActiveFinish).toHaveBeenCalled();
  //   });

  //   it('makes expected calls', () => {
  //     component.data.message = 'createTransferOrder';
  //     spyOn(component, 'getScannedCount').and.callThrough();
  //     spyOn(component, 'getScannedOngoingCount').and.callThrough();
  //     spyOn(component, 'getTransferOrderScannedCount').and.callThrough();
  //     spyOn(component, 'getOERoleId').and.callThrough();
  //     spyOn(component, 'isActiveFinish').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getScannedCount).toHaveBeenCalled();
  //     expect(component.getScannedOngoingCount).toHaveBeenCalled();
  //     expect(component.getTransferOrderScannedCount).toHaveBeenCalled();
  //     expect(component.getOERoleId).toHaveBeenCalled();
  //     expect(component.isActiveFinish).toHaveBeenCalled();
  //   });

  //   it('makes expected calls', () => {
  //     component.data = 'recieveCash';
  //     spyOn(component, 'getScannedCount').and.callThrough();
  //     spyOn(component, 'getScannedOngoingCount').and.callThrough();
  //     spyOn(component, 'getTransferOrderScannedCount').and.callThrough();
  //     spyOn(component, 'getOERoleId').and.callThrough();
  //     spyOn(component, 'isActiveFinish').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getScannedCount).toHaveBeenCalled();
  //     expect(component.getScannedOngoingCount).toHaveBeenCalled();
  //     expect(component.getTransferOrderScannedCount).toHaveBeenCalled();
  //     expect(component.getOERoleId).toHaveBeenCalled();
  //     expect(component.isActiveFinish).toHaveBeenCalled();
  //   });

  //   it('makes expected calls', () => {
  //     component.data.message = 'comboScan';
  //     spyOn(component, 'getScannedCount').and.callThrough();
  //     spyOn(component, 'getScannedOngoingCount').and.callThrough();
  //     spyOn(component, 'getTransferOrderScannedCount').and.callThrough();
  //     spyOn(component, 'getOERoleId').and.callThrough();
  //     spyOn(component, 'isActiveFinish').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getScannedCount).toHaveBeenCalled();
  //     expect(component.getScannedOngoingCount).toHaveBeenCalled();
  //     expect(component.getTransferOrderScannedCount).toHaveBeenCalled();
  //     expect(component.getOERoleId).toHaveBeenCalled();
  //     expect(component.isActiveFinish).toHaveBeenCalled();
  //   });
  // });

  // describe('getScannedCount', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getScannedCount();
  //     expect(commonServiceStub.getData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('getScannedOngoingCount', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getScannedOngoingCount();
  //     expect(commonServiceStub.getData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('getTransferOrderScannedCount', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(commonServiceStub, 'getData').and.callThrough();
  //     component.getTransferOrderScannedCount();
  //     expect(commonServiceStub.getData).toHaveBeenCalled();
  //   });
  // });

  // describe('getOERoleId', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getOERoleId();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('finish', () => {
  //   it('makes expected calls', () => {
  //     const matDialogRefStub: MatDialogRef<PackageRequestPopUpComponent> = fixture.debugElement.injector.get(
  //       MatDialogRef
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(matDialogRefStub, 'close').and.callThrough();
  //     spyOn(commonServiceStub, 'putData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.finish();
  //     expect(matDialogRefStub.close).toHaveBeenCalled();
  //     expect(commonServiceStub.putData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('finalize', () => {
  //   it('makes expected calls', () => {
  //     const matDialogRefStub: MatDialogRef<PackageRequestPopUpComponent> = fixture.debugElement.injector.get(
  //       MatDialogRef
  //     );
  //     const matDialogStub: MatDialog = fixture.debugElement.injector.get(
  //       MatDialog
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(matDialogRefStub, 'afterClosed').and.callThrough();
  //     spyOn(matDialogRefStub, 'close').and.callThrough();
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     spyOn(commonServiceStub, 'putData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.finalize();
  //     expect(matDialogRefStub.afterClosed).toHaveBeenCalled();
  //     expect(matDialogRefStub.close).toHaveBeenCalled();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //     expect(commonServiceStub.putData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('finishCreateTransist', () => {
  //   it('makes expected calls', () => {
  //     const matDialogRefStub: MatDialogRef<PackageRequestPopUpComponent> = fixture.debugElement.injector.get(
  //       MatDialogRef
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(matDialogRefStub, 'close').and.callThrough();
  //     spyOn(commonServiceStub, 'putData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.finishCreateTransist();
  //     expect(matDialogRefStub.close).toHaveBeenCalled();
  //     expect(commonServiceStub.putData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('finishTransist', () => {
  //   it('makes expected calls', () => {
  //     const matDialogRefStub: MatDialogRef<PackageRequestPopUpComponent> = fixture.debugElement.injector.get(
  //       MatDialogRef
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(matDialogRefStub, 'close').and.callThrough();
  //     spyOn(commonServiceStub, 'putData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.finishTransist();
  //     expect(matDialogRefStub.close).toHaveBeenCalled();
  //     expect(commonServiceStub.putData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('receieveCashFinal', () => {
  //   it('makes expected calls', () => {
  //     const matDialogRefStub: MatDialogRef<PackageRequestPopUpComponent> = fixture.debugElement.injector.get(
  //       MatDialogRef
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(matDialogRefStub, 'close').and.callThrough();
  //     spyOn(commonServiceStub, 'putDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.receieveCashFinal();
  //     expect(matDialogRefStub.close).toHaveBeenCalled();
  //     expect(commonServiceStub.putDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  describe('finishOrderScan', () => {
    it('makes expected calls', () => {
      const matDialogRefStub: MatDialogRef<PackageRequestPopUpComponent> = fixture.debugElement.injector.get(
        MatDialogRef
      );
      spyOn(matDialogRefStub, 'close').and.callThrough();
      component.finishOrderScan();
      expect(matDialogRefStub.close).toHaveBeenCalled();
    });
  });

  // describe('returnItemWithoutCash', () => {
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
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     spyOn(commonServiceStub, 'putDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.returnItemWithoutCash();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //     expect(commonServiceStub.putDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  describe('finishComboOrderScan', () => {
    it('makes expected calls', () => {
      const matDialogRefStub: MatDialogRef<PackageRequestPopUpComponent> = fixture.debugElement.injector.get(
        MatDialogRef
      );
      spyOn(matDialogRefStub, 'close').and.callThrough();
      component.finishComboOrderScan();
      expect(matDialogRefStub.close).toHaveBeenCalled();
    });
  });
});
