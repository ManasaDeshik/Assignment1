import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/utils';
import { LoaderService } from 'src/app/utils';
import { SharedService } from 'src/app/utils';
import { FetchUserTabDetailsService } from 'src/app/utils';
import { SpareOngoingPORecordList } from 'src/app/utils';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/service/socket.service';
import { filterPurchaseOrder } from 'src/app/utils';
import { FormsModule } from '@angular/forms';
import { ListOngoingOrdersComponent } from './list-ongoing-orders.component';
import { of } from 'rxjs/internal/observable/of';

describe('ListOngoingOrdersComponent', () => {
  let component: ListOngoingOrdersComponent;
  let fixture: ComponentFixture<ListOngoingOrdersComponent>;
  let records: {'test'};

  beforeEach(() => {
    const matDialogStub = () => ({
      open: (viewPoComponent, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) }),
      fileDownloadNew: arg => ({ subscribe: f => f({}) }),
      fileDataDownloadNew: (string, obj) => ({ subscribe: f => f({}) }),
      postDataNew: (string, obj) => ({ subscribe: f => f({}) }),
      deleteDataNew: (string, data) => ({ subscribe: f => f({}) }),
      getData: arg => ({ subscribe: f => f({}) }),
      putData: (string, obj) => ({ subscribe: f => f({}) })
    });
    const loaderServiceStub = () => ({});
    const sharedServiceStub = () => ({
      openSnackBar: arg => ({}),
      toCheckAllPermissionRights: purchaseOrder => ({}),
      displayErrorMessage: string => ({}),
      formateDate: fromDate => ({}),
      openDialog: name => ({ afterClosed: () => ({ subscribe: f => f({}) }) }),
      displaySuccessMessage: string => ({})
    });
    const fetchUserTabDetailsServiceStub = () => ({
      setOngoingPOSubscribeStatus: subscribeData => ({}),
      setBarCode: payload => ({}),
      shareServiceData: item => ({})
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const socketServiceStub = () => ({
      reconnect: () => ({}),
      getMessages: { subscribe: f => f({}) }
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListOngoingOrdersComponent],
      providers: [
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: CommonService, useFactory: commonServiceStub, useValue : {records, getDataNew : ()=> of({}),
        fileDownloadNew : ()=> of({}), fileDataDownloadNew : ()=> of({}), getData : ()=> of({}), postDataNew : ()=> of({}) } },
        { provide: LoaderService, useFactory: loaderServiceStub },
        { provide: SharedService, useFactory: sharedServiceStub },
        {
          provide: FetchUserTabDetailsService,
          useFactory: fetchUserTabDetailsServiceStub
        },
        { provide: Router, useFactory: routerStub },
        { provide: SocketService, useFactory: socketServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ListOngoingOrdersComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`tableHeaders has default value`, () => {
    expect(component.tableHeaders).toEqual([{ header: 'Item Name' },
    { header: 'Total Units' } ,
    { header: 'Order Date', sortText: 'orderedDate' } ,
    { header: 'Manufacturer' } ,
    { header: 'Warehouse' } ,
    { header: 'Category' } ,
    { header: 'Estimated Arrival', sortText: 'estimatedArrivalDate' } ,
    { header: 'Total Amount' }]);
  });

  it(`type has default value`, () => {
    expect(component.type).toEqual(`component`);
  });

  it(`filterPurchaseOrder has default value`, () => {
    expect(component.filterPurchaseOrder).toEqual(filterPurchaseOrder);
  });

  it(`tableTabHeaders has default value`, () => {
    expect(component.tableTabHeaders).toEqual([`Product`]);
  });

  it(`spareTableHeaders has default value`, () => {
    expect(component.spareTableHeaders).toEqual([
      `SL No`,
      `Description of Goods`,
      `Quantity`,
      `Amount`,
      `Activity`
    ]);
  });

  it(`selectedBtnVal has default value`, () => {
    expect(component.selectedBtnVal).toEqual(`Product`);
  });

  it(`showIndividualData has default value`, () => {
    expect(component.showIndividualData).toEqual(false);
  });

  it(`showPO has default value`, () => {
    expect(component.showPO).toEqual(false);
  });

  it(`poCollections has default value`, () => {
    expect(component.poCollections).toEqual([
      `branch`,
      `category`,
      `manufacture`,
      `warehouse`
    ]);
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

  it(`isPackageBarCode has default value`, () => {
    expect(component.isPackageBarCode).toEqual(false);
  });

  it(`isProductBarCode has default value`, () => {
    expect(component.isProductBarCode).toEqual(false);
  });

  it(`isStockManual has default value`, () => {
    expect(component.isStockManual).toEqual(false);
  });

  it(`isDownloadProduct has default value`, () => {
    expect(component.isDownloadProduct).toEqual(false);
  });

  it(`isRefresh has default value`, () => {
    expect(component.isRefresh).toEqual(false);
  });

  it(`stockInCount has default value`, () => {
    expect(component.stockInCount).toEqual(0);
  });

  it(`stockInPercentage has default value`, () => {
    expect(component.stockInPercentage).toEqual(0);
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
  //     const spareOngoingPORecordListStub: SpareOngoingPORecordList = <any>{};
  //     spyOn(component, 'getOngoingPOSpare').and.callThrough();
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     spyOn(commonServiceStub, 'putData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.acceptSpareItem(spareOngoingPORecordListStub);
  //     expect(component.getOngoingPOSpare).toHaveBeenCalled();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //     expect(commonServiceStub.putData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const socketServiceStub: SocketService = fixture.debugElement.injector.get(
  //       SocketService
  //     );
  //     spyOn(component, 'getLists').and.callThrough();
  //     spyOn(component, 'modulePermissionSets').and.callThrough();
  //     spyOn(sharedServiceStub, 'openSnackBar').and.callThrough();
  //     spyOn(socketServiceStub, 'reconnect').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getLists).toHaveBeenCalled();
  //     expect(component.modulePermissionSets).toHaveBeenCalled();
  //     expect(sharedServiceStub.openSnackBar).toHaveBeenCalled();
  //     expect(socketServiceStub.reconnect).toHaveBeenCalled();
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

  // describe('clearFilter', () => {
  //   it('makes expected calls', () => {
  //     const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
  //       FetchUserTabDetailsService
  //     );
  //     spyOn(component, 'getLists').and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'setOngoingPOSubscribeStatus'
  //     ).and.callThrough();
  //     component.clearFilter();
  //     expect(component.getLists).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.setOngoingPOSubscribeStatus
  //     ).toHaveBeenCalled();
  //   });
  // });

  // describe('statusCheck', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.statusCheck();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('downloadBarcode', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'fileDownloadNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.downloadBarcode();
  //     expect(commonServiceStub.fileDownloadNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('viewPO', () => {
  //   it('makes expected calls', () => {
  //     const matDialogStub: MatDialog = fixture.debugElement.injector.get(
  //       MatDialog
  //     );
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     component.viewPO();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //   });
  // });

  // describe('generatePackage', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
  //       FetchUserTabDetailsService
  //     );
  //     spyOn(commonServiceStub, 'fileDataDownloadNew').and.callThrough();
  //     spyOn(commonServiceStub, 'postDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(fetchUserTabDetailsServiceStub, 'setBarCode').and.callThrough();
  //     component.generatePackage();
  //     expect(commonServiceStub.fileDataDownloadNew).toHaveBeenCalled();
  //     expect(commonServiceStub.postDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(fetchUserTabDetailsServiceStub.setBarCode).toHaveBeenCalled();
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

  // describe('getOngoingPOSpare', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getOngoingPOSpare();
  //     expect(commonServiceStub.getData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('viewOngoingHistory', () => {
  //   it('makes expected calls', () => {
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     component.viewOngoingHistory();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //   });
  // });

  // describe('stockInManually', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'getLists').and.callThrough();
  //     spyOn(commonServiceStub, 'postDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.stockInManually();
  //     expect(component.getLists).toHaveBeenCalled();
  //     expect(commonServiceStub.postDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });


});