import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../services';
import { SharedService } from '../../services';
import { LoaderService } from '../../services';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { FilterDialogComponent } from './filter-dialog.component';

describe('FilterDialogComponent', () => {
  let component: FilterDialogComponent;
  let fixture: ComponentFixture<FilterDialogComponent>;

  beforeEach(() => {
    const matDialogRefStub = () => ({ close: () => ({}) });
    const commonServiceStub = () => ({
      getData: arg => ({ subscribe: f => f({}) }),
      getDataNew: arg => ({ subscribe: f => f({}) }),
      fileDownload: arg => ({ subscribe: f => f({}) }),
      deleteDataNew: arg => ({ subscribe: f => f({}) })
    });
    const sharedServiceStub = () => ({
      displayErrorMessage: string => ({}),
      toCheckAllPermissionRights: stocks => ({}),
      formateDate: fromDate => ({}),
      openDialog: name => ({ afterClosed: () => ({ subscribe: f => f({}) }) }),
      displaySuccessMessage: string => ({}),
      formateIndianDate: fromDate => ({})
    });
    const loaderServiceStub = () => ({ show: string => ({}) });
    const matDialogStub = () => ({});
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FilterDialogComponent],
      providers: [
        { provide: MatDialogRef, useFactory: matDialogRefStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: LoaderService, useFactory: loaderServiceStub },
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    });
    fixture = TestBed.createComponent(FilterDialogComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`poCollections has default value`, () => {
    expect(component.poCollections).toEqual([
      `branch`,
      `category`,
      `warehouse`,
      `manufacture`
    ]);
  });

  it(`demoFilterCollections has default value`, () => {
    expect(component.demoFilterCollections).toEqual([
      `productDetail`,
      `frontierMarketingUser`,
      `warehouse`
    ]);
  });

  it(`tableHeaders has default value`, () => {
    expect(component.tableHeaders).toEqual([`Barcode`]);
  });

  it(`invoiceCollections has default value`, () => {
    expect(component.invoiceCollections).toEqual([{ name: 'Warehouse', key: 'warehouse', bindLabel: 'name', bindVal: 'id' },
    { name: 'Status', key: 'status', bindLabel: 'key', bindVal: 'value' }]);
  });

  it(`barcodeCollections has default value`, () => {
    expect(component.barcodeCollections).toEqual([]);
  });

  it(`uploadedEmail has default value`, () => {
    expect(component.uploadedEmail).toEqual([]);
  });

  it(`transportBarcodeCollections has default value`, () => {
    expect(component.transportBarcodeCollections).toEqual([]);
  });

  it(`barcodeTotalRecords has default value`, () => {
    expect(component.barcodeTotalRecords).toEqual(0);
  });

  it(`barcodeCurrentPage has default value`, () => {
    expect(component.barcodeCurrentPage).toEqual(1);
  });

  it(`transportBarcodeItemCollections has default value`, () => {
    expect(component.transportBarcodeItemCollections).toEqual([]);
  });

  it(`bindBarcode has default value`, () => {
    expect(component.bindBarcode).toEqual([]);
  });

  it(`bindReturnCashBarcode has default value`, () => {
    expect(component.bindReturnCashBarcode).toEqual([]);
  });

  it(`barcodeList has default value`, () => {
    expect(component.barcodeList).toEqual([]);
  });

  it(`activeFinalizeBtn has default value`, () => {
    expect(component.activeFinalizeBtn).toEqual(false);
  });

  it(`selectedtransportItemName has default value`, () => {
    expect(component.selectedtransportItemName).toEqual([]);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'getReturnItems').and.callThrough();
  //     spyOn(component, 'getComboProductDetail').and.callThrough();
  //     spyOn(component, 'getProductBarcodeList').and.callThrough();
  //     spyOn(component, 'getTransportBarcode').and.callThrough();
  //     spyOn(component, 'getTransportItemBarcode').and.callThrough();
  //     spyOn(commonServiceStub, 'getData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'toCheckAllPermissionRights').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getReturnItems).toHaveBeenCalled();
  //     expect(component.getComboProductDetail).toHaveBeenCalled();
  //     expect(component.getProductBarcodeList).toHaveBeenCalled();
  //     expect(component.getTransportBarcode).toHaveBeenCalled();
  //     expect(component.getTransportItemBarcode).toHaveBeenCalled();
  //     expect(commonServiceStub.getData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.toCheckAllPermissionRights).toHaveBeenCalled();
  //   });
  // });

  describe('closeDialog', () => {
    it('makes expected calls', () => {
      const matDialogRefStub: MatDialogRef<FilterDialogComponent> = fixture.debugElement.injector.get(
        MatDialogRef
      );
      spyOn(matDialogRefStub, 'close').and.callThrough();
      component.closeDialog();
      expect(matDialogRefStub.close).toHaveBeenCalled();
    });
  });

  // describe('getTransportBarcode', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getTransportBarcode();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('getTransportItemBarcode', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getTransportItemBarcode();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('applyFilter', () => {
  //   it('makes expected calls', () => {
  //     const matDialogRefStub: MatDialogRef<FilterDialogComponent> = fixture.debugElement.injector.get(
  //       MatDialogRef
  //     );
  //     spyOn(component, 'comboNewArray').and.callThrough();
  //     spyOn(matDialogRefStub, 'close').and.callThrough();
  //     component.applyFilter();
  //     expect(component.comboNewArray).toHaveBeenCalled();
  //     expect(matDialogRefStub.close).toHaveBeenCalled();
  //   });
  // });

  // describe('applyDownload', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'closeDialog').and.callThrough();
  //     spyOn(commonServiceStub, 'fileDownload').and.callThrough();
  //     spyOn(sharedServiceStub, 'formateDate').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.applyDownload();
  //     expect(component.closeDialog).toHaveBeenCalled();
  //     expect(commonServiceStub.fileDownload).toHaveBeenCalled();
  //     expect(sharedServiceStub.formateDate).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('getProductBarcodeList', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getProductBarcodeList();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  describe('viewBarcodeCompleted', () => {
    it('makes expected calls', () => {
      const matDialogRefStub: MatDialogRef<FilterDialogComponent> = fixture.debugElement.injector.get(
        MatDialogRef
      );
      spyOn(matDialogRefStub, 'close').and.callThrough();
      component.viewBarcodeCompleted();
      expect(matDialogRefStub.close).toHaveBeenCalled();
    });
  });

  // describe('Download', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const loaderServiceStub: LoaderService = fixture.debugElement.injector.get(
  //       LoaderService
  //     );
  //     spyOn(component, 'closeDialog').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'formateIndianDate').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(loaderServiceStub, 'show').and.callThrough();
  //     component.Download();
  //     expect(component.closeDialog).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.formateIndianDate).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(loaderServiceStub.show).toHaveBeenCalled();
  //   });
  // });
});
