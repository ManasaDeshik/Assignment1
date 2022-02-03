import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonService } from 'src/app/utils';
import { SharedService } from 'src/app/utils';
import { LoaderService } from 'src/app/utils';
import { StockService } from 'src/app/utils';
import { FetchUserTabDetailsService } from 'src/app/utils';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CreateTransferOrderComponent } from './create-transfer-order.component';
import { of } from 'rxjs/internal/observable/of';

describe('CreateTransferOrderComponent', () => {
  let component: CreateTransferOrderComponent;
  let fixture: ComponentFixture<CreateTransferOrderComponent>;
  let records: {'test'};

  beforeEach(() => {
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) }),
      postDataNew: (string, transport) => ({ subscribe: f => f({}) }),
      fileDownloadNew: arg => ({ subscribe: f => f({}) }),
      fileDownload: arg => ({ subscribe: f => f({}) }),
      putDataNew: (string, responseData) => ({ subscribe: f => f({}) }),
      getData: arg => ({ subscribe: f => f({}) }),
      putData: (string, scanItems) => ({ subscribe: f => f({}) }),
      uploadExcel: (string, formData) => ({ subscribe: f => f({}) })
    });
    const sharedServiceStub = () => ({
      urlSegmentKeys: () => ({ path: {}, length: {} }),
      displayErrorMessage: string => ({}),
      displaySuccessMessage: string => ({})
    });
    const loaderServiceStub = () => ({ show: string => ({}) });
    const stockServiceStub = () => ({});
    const fetchUserTabDetailsServiceStub = () => ({
      setBarCode: packageBarcodes => ({})
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const matDialogStub = () => ({
      open: (packageRequestPopUpComponent, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CreateTransferOrderComponent],
      providers: [
        { provide: CommonService, useFactory: commonServiceStub, useValue: {records, getDataNew : ()=> of({}),
        getData : ()=> of({}), putData : ()=> of({}) } },
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: LoaderService, useFactory: loaderServiceStub },
        { provide: StockService, useFactory: stockServiceStub },
        {
          provide: FetchUserTabDetailsService,
          useFactory: fetchUserTabDetailsServiceStub
        },
        { provide: Router, useFactory: routerStub },
        { provide: MatDialog, useFactory: matDialogStub }
      ]
    });
    fixture = TestBed.createComponent(CreateTransferOrderComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isScannerClosed has default value`, () => {
    expect(component.isScannerClosed).toEqual(true);
  });

  it(`openOrderDetails has default value`, () => {
    expect(component.openOrderDetails).toEqual(`collapse`);
  });

  it(`scan has default value`, () => {
    expect(component.scan).toEqual(`create`);
  });

  it(`scannedItems has default value`, () => {
    expect(component.scannedItems).toEqual(0);
  });

  it(`franchiseCollections has default value`, () => {
    expect(component.franchiseCollections).toEqual([]);
  });

  it(`finishBtn has default value`, () => {
    expect(component.finishBtn).toEqual(false);
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
  //     spyOn(component, 'getStockCount').and.callThrough();
  //     spyOn(sharedServiceStub, 'urlSegmentKeys').and.callThrough();
  //     component.getRouteSegments();
  //     expect(component.getWarehouseBranchDetail).toHaveBeenCalled();
  //     expect(component.getProductDetail).toHaveBeenCalled();
  //     expect(component.getStockCount).toHaveBeenCalled();
  //     expect(sharedServiceStub.urlSegmentKeys).toHaveBeenCalled();
  //   });
  // });

  // describe('getWarehouseBranchDetail', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getWarehouseBranchDetail();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('getProductDetail', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getProductDetail();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('getStockCount', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getStockCount();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('scanPackageInput', () => {
  //   it('makes expected calls', () => {
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     const matDialogStub: MatDialog = fixture.debugElement.injector.get(
  //       MatDialog
  //     );
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     component.scanPackageInput();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //   });
  // });

  // describe('transferOrderWithoutScan', () => {
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
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     const matDialogStub: MatDialog = fixture.debugElement.injector.get(
  //       MatDialog
  //     );
  //     spyOn(commonServiceStub, 'putDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(loaderServiceStub, 'show').and.callThrough();
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     component.transferOrderWithoutScan();
  //     expect(commonServiceStub.putDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(loaderServiceStub.show).toHaveBeenCalled();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //     expect(matDialogStub.open).toHaveBeenCalled();
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

  // describe('finish', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     spyOn(commonServiceStub, 'putData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     component.finish();
  //     expect(commonServiceStub.putData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //   });
  // });

  // describe('getBranchWarehouseList', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getBranchWarehouseList();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('getBranchWarehouseToList', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getBranchWarehouseToList();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });
});