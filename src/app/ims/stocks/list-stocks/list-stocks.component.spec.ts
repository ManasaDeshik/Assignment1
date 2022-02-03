import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/utils';
import { SharedService } from 'src/app/utils';
import { LoaderService } from 'src/app/utils';
import { StockService } from 'src/app/utils';
import { SideNavService } from 'src/app/utils';
import { filterstockOrder } from 'src/app/utils';
import { FormsModule } from '@angular/forms';
import { ListStocksComponent } from './list-stocks.component';
import { of } from 'rxjs/internal/observable/of';

describe('ListStocksComponent', () => {
  let component: ListStocksComponent;
  let fixture: ComponentFixture<ListStocksComponent>;
  let records: {test};

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const matDialogStub = () => ({
      open: (packageRequestPopUpComponent, object) => ({})
    });
    const commonServiceStub = () => ({
      getDataNew: string => ({ subscribe: f => f({}) })
    });
    const sharedServiceStub = () => ({
      displayErrorMessage: string => ({}),
      toCheckAllPermissionRights: ele => ({})
    });
    const loaderServiceStub = () => ({});
    const stockServiceStub = () => ({ changeMessage: itemCount => ({}) });
    const sideNavServiceStub = () => ({});
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListStocksComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: CommonService, useFactory: commonServiceStub, useValue : {records, getDataNew : ()=> of({}) }},
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: LoaderService, useFactory: loaderServiceStub },
        { provide: StockService, useFactory: stockServiceStub },
        { provide: SideNavService, useFactory: sideNavServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ListStocksComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`tableHeaders has default value`, () => {
    expect(component.tableHeaders).toEqual([{ header: 'Item Name' }, { header: 'Price' } , { header: 'In Stock' } , { header: 'View' }]);
  });

  it(`selectedList has default value`, () => {
    expect(component.selectedList).toEqual(`allitems`);
  });

  it(`viewType has default value`, () => {
    expect(component.viewType).toEqual(`grid`);
  });

  it(`categoryList has default value`, () => {
    expect(component.categoryList).toEqual([]);
  });

  it(`filterPurchaseOrder has default value`, () => {
    expect(component.filterPurchaseOrder).toEqual(filterstockOrder);
  });

  it(`allowedStockWarehouse has default value`, () => {
    expect(component.allowedStockWarehouse).toEqual([]);
  });

  it(`moduleKeys has default value`, () => {
    expect(component.moduleKeys).toEqual(['franchise' , 'manufacturer' , 'transportation' , 'purchaseorder']);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getCategories').and.callThrough();
  //     spyOn(component, 'getCurrentWarehouse').and.callThrough();
  //     spyOn(component, 'modulePermissionSets').and.callThrough();
  //     spyOn(component, 'getStockCount').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getCategories).toHaveBeenCalled();
  //     expect(component.getCurrentWarehouse).toHaveBeenCalled();
  //     expect(component.modulePermissionSets).toHaveBeenCalled();
  //     expect(component.getStockCount).toHaveBeenCalled();
  //   });
  // });

  // describe('getCategories', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getCategories();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

  // describe('getStockCount', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getStockCount();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

  describe('searchStocks', () => {
    it('makes expected calls', () => {
      const event = {target : {value: 'Enter'}};
      spyOn(component, 'searchStocks').and.callThrough();
      component.searchStocks(event);
      expect(component.searchStocks).toHaveBeenCalled();
    });
  });

  // describe('searchFieldKey', () => {
  //   it('makes expected calls', () => {
  //     component.moduleDetails.name = 'superadmin';
  //     const event = {term : 'Enter'};
  //     spyOn(component, 'searchFieldKey').and.callThrough();
  //     component.searchFieldKey(event);
  //     expect(component.searchFieldKey).toHaveBeenCalled();
  //   });
  // });

  // describe('getCurrentWarehouse', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'getCurrentWarehouseStocks').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getCurrentWarehouse();
  //     expect(component.getCurrentWarehouseStocks).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('getStockList', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'getCurrentWarehouseStocks').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getStockList();
  //     expect(component.getCurrentWarehouseStocks).toHaveBeenCalledTimes(0);
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
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

  // describe('getCurrentWarehouseStocks', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getCurrentWarehouseStocks();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
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

  describe('searchFilter', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getCurrentWarehouseStocks').and.callThrough();
      component.searchFilter();
      expect(component.getCurrentWarehouseStocks).toHaveBeenCalled();
    });
  });

  // describe('resetAll', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getCurrentWarehouseStocks').and.callThrough();
  //     component.resetAll();
  //     expect(component.getCurrentWarehouseStocks).toHaveBeenCalled();
  //   });
  // });

  describe('requestforPO', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      component.requestforPO();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });
});
