import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SideNavService } from 'src/app/utils';
import { SharedService } from 'src/app/utils';
import { FetchUserTabDetailsService } from 'src/app/utils';
import { LoaderService } from 'src/app/utils';
import { CommonService } from 'src/app/utils';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SocketService } from 'src/app/service/socket.service';
import { HeaderComponent } from './header.component';
import { MatMenuModule } from '@angular/material/menu';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({});
    const sideNavServiceStub = () => ({ setSideNav: arg => ({}) });
    const sharedServiceStub = () => ({
      toCheckAllPermissionRights: moduleName => ({}),
      displayErrorMessage: statusText => ({}),
      displaySuccessMessage: string => ({})
    });
    const fetchUserTabDetailsServiceStub = () => ({
      getSelectedUserRole: () => ({ subscribe: f => f({}) }),
      getSelectedOrderStatus: () => ({ subscribe: f => f({}) }),
      getCustomerStatus: () => ({ subscribe: f => f({}) }),
      getTryBuyStatus: () => ({ subscribe: f => f({}) }),
      getBranchSubscribeStatus: () => ({ subscribe: f => f({}) }),
      getSelectedLeadStatus: () => ({ subscribe: f => f({}) }),
      getManufactureSubscribeStatus: () => ({ subscribe: f => f({}) }),
      getWarehouseSubscribeStatus: () => ({ subscribe: f => f({}) }),
      getFranchiseSubscribeStatus: () => ({ subscribe: f => f({}) }),
      getProductsSubscribeStatus: () => ({ subscribe: f => f({}) }),
      getCategorySubscribeStatus: () => ({ subscribe: f => f({}) }),
      getOngoingPOSubscribeStatus: () => ({ subscribe: f => f({}) }),
      getDemoProductSubscribeStatus: () => ({ subscribe: f => f({}) }),
      currentMessage: { subscribe: f => f({}) },
      leadDataMessage: { subscribe: f => f({}) },
      customerDataMessage: { subscribe: f => f({}) },
      setUpdateList: string => ({})
    });
    const loaderServiceStub = () => ({ show: string => ({}) });
    const commonServiceStub = () => ({
      getDataNew: string => ({ subscribe: f => f({}) }),
      fileDownload: arg => ({ subscribe: f => f({}) }),
      uploadExcel: (apiEndPoint, formData) => ({ subscribe: f => f({}) }),
      fileDataDownloadNew: (apiEndPoint, formData) => ({
        subscribe: f => f({})
      }),
      uploadExcelPutNew: (apiEndPoint, formData) => ({ subscribe: f => f({}) }),
      uploadExcelPut: (apiEndPoint, formData) => ({ subscribe: f => f({}) }),
      fileDownloadNew: templateLocation => ({ subscribe: f => f({}) })
    });
    const sessionStorageServiceStub = () => ({ clear: () => ({}) });
    const routerStub = () => ({
      events: { subscribe: f => f({}) },
      navigate: array => ({}),
      url: { includes: () => ({}) }
    });
    const matDialogStub = () => ({
      open: (filterDialogComponent, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    const socketServiceStub = () => ({
      reconnect: () => ({}),
      getMessages: { subscribe: f => f({}) }
    });
    TestBed.configureTestingModule({
      imports: [MatMenuModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HeaderComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: SideNavService, useFactory: sideNavServiceStub },
        { provide: SharedService, useFactory: sharedServiceStub },
        {
          provide: FetchUserTabDetailsService,
          useFactory: fetchUserTabDetailsServiceStub
        },
        { provide: LoaderService, useFactory: loaderServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        {
          provide: SessionStorageService,
          useFactory: sessionStorageServiceStub
        },
        { provide: Router, useFactory: routerStub },
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: SocketService, useFactory: socketServiceStub }
      ]
    });
    spyOn(HeaderComponent.prototype, 'setDataOnRoute');
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`downloadInvoice has default value`, () => {
    expect(component.downloadInvoice).toEqual(false);
  });

  it(`downloadAll has default value`, () => {
    expect(component.downloadAll).toEqual(false);
  });

  it(`downloadDemoProduct has default value`, () => {
    expect(component.downloadDemoProduct).toEqual(false);
  });

  it(`downloadCustomer has default value`, () => {
    expect(component.downloadCustomer).toEqual(false);
  });

  it(`side has default value`, () => {
    expect(component.side).toEqual(false);
  });

  it(`isDemoReturnProduct has default value`, () => {
    expect(component.isDemoReturnProduct).toEqual(false);
  });

  it(`isUploadTemplate has default value`, () => {
    expect(component.isUploadTemplate).toEqual(false);
  });

  it(`downloadRole has default value`, () => {
    expect(component.downloadRole).toEqual(false);
  });

  it(`leadDownloadAccess has default value`, () => {
    expect(component.leadDownloadAccess).toEqual(true);
  });

  it(`isUploadPopUp has default value`, () => {
    expect(component.isUploadPopUp).toEqual(false);
  });

  it(`notification has default value`, () => {
    expect(component.notification).toEqual([]);
  });

  // describe('constructor', () => {
  //   it('makes expected calls', () => {
  //     expect(HeaderComponent.prototype.setDataOnRoute).toHaveBeenCalled();
  //   });
  // });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const socketServiceStub: SocketService = fixture.debugElement.injector.get(
  //       SocketService
  //     );
  //     spyOn(component, 'observeBehaviorDataChange').and.callThrough();
  //     spyOn(socketServiceStub, 'reconnect').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.observeBehaviorDataChange).toHaveBeenCalled();
  //     expect(socketServiceStub.reconnect).toHaveBeenCalled();
  //   });
  // });

  describe('readNotification', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.readNotification();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  // describe('setDataOnRoute', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'downloadAndUploadPermissionSets').and.callThrough();
  //     spyOn(component, 'leadSubscribe').and.callThrough();
  //     (<jasmine.Spy>component.setDataOnRoute).and.callThrough();
  //     component.setDataOnRoute();
  //     expect(component.downloadAndUploadPermissionSets).toHaveBeenCalled();
  //     expect(component.leadSubscribe).toHaveBeenCalled();
  //   });
  // });

  // describe('observeBehaviorDataChange', () => {
  //   it('makes expected calls', () => {
  //     const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
  //       FetchUserTabDetailsService
  //     );
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'getSelectedUserRole'
  //     ).and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'getSelectedOrderStatus'
  //     ).and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'getCustomerStatus'
  //     ).and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'getTryBuyStatus'
  //     ).and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'getBranchSubscribeStatus'
  //     ).and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'getSelectedLeadStatus'
  //     ).and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'getManufactureSubscribeStatus'
  //     ).and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'getWarehouseSubscribeStatus'
  //     ).and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'getFranchiseSubscribeStatus'
  //     ).and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'getProductsSubscribeStatus'
  //     ).and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'getCategorySubscribeStatus'
  //     ).and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'getOngoingPOSubscribeStatus'
  //     ).and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'getDemoProductSubscribeStatus'
  //     ).and.callThrough();
  //     component.observeBehaviorDataChange();
  //     expect(
  //       fetchUserTabDetailsServiceStub.getSelectedUserRole
  //     ).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.getSelectedOrderStatus
  //     ).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.getCustomerStatus
  //     ).toHaveBeenCalled();
  //     expect(fetchUserTabDetailsServiceStub.getTryBuyStatus).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.getBranchSubscribeStatus
  //     ).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.getSelectedLeadStatus
  //     ).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.getManufactureSubscribeStatus
  //     ).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.getWarehouseSubscribeStatus
  //     ).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.getFranchiseSubscribeStatus
  //     ).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.getProductsSubscribeStatus
  //     ).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.getCategorySubscribeStatus
  //     ).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.getOngoingPOSubscribeStatus
  //     ).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.getDemoProductSubscribeStatus
  //     ).toHaveBeenCalled();
  //   });
  // });

  // describe('servicePOData', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'downloadAndUploadPermissionSets').and.callThrough();
  //     component.servicePOData();
  //     expect(component.downloadAndUploadPermissionSets).toHaveBeenCalled();
  //   });
  // });

  // describe('excelDownload', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const matDialogStub: MatDialog = fixture.debugElement.injector.get(
  //       MatDialog
  //     );
  //     spyOn(component, 'serviceSubscribe').and.callThrough();
  //     spyOn(component, 'servicePOData').and.callThrough();
  //     spyOn(component, 'demoSubscribe').and.callThrough();
  //     spyOn(component, 'leadSubscribe').and.callThrough();
  //     spyOn(component, 'customerSubscribe').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     component.excelDownload();
  //     expect(component.serviceSubscribe).toHaveBeenCalled();
  //     expect(component.servicePOData).toHaveBeenCalled();
  //     expect(component.demoSubscribe).toHaveBeenCalled();
  //     expect(component.leadSubscribe).toHaveBeenCalled();
  //     expect(component.customerSubscribe).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //   });
  // });

  describe('excelDownloadDemo', () => {
    it('makes expected calls', () => {
      const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
        SharedService
      );
      const loaderServiceStub: LoaderService = fixture.debugElement.injector.get(
        LoaderService
      );
      const commonServiceStub: CommonService = fixture.debugElement.injector.get(
        CommonService
      );
      spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
      spyOn(loaderServiceStub, 'show').and.callThrough();
      spyOn(commonServiceStub, 'getDataNew').and.callThrough();
      component.excelDownloadDemo();
      expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
      expect(loaderServiceStub.show).toHaveBeenCalled();
      expect(commonServiceStub.getDataNew).toHaveBeenCalled();
    });
  });

  // describe('excelDownloadAll', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'fileDownload').and.callThrough();
  //     component.excelDownloadAll();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.fileDownload).toHaveBeenCalled();
  //   });
  // });

  // describe('clickUpload', () => {
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
  //     const matDialogStub: MatDialog = fixture.debugElement.injector.get(
  //       MatDialog
  //     );
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(fetchUserTabDetailsServiceStub, 'setUpdateList').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(commonServiceStub, 'fileDataDownloadNew').and.callThrough();
  //     spyOn(commonServiceStub, 'uploadExcelPutNew').and.callThrough();
  //     spyOn(commonServiceStub, 'uploadExcel').and.callThrough();
  //     spyOn(commonServiceStub, 'uploadExcelPut').and.callThrough();
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     component.clickUpload();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(fetchUserTabDetailsServiceStub.setUpdateList).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(commonServiceStub.fileDataDownloadNew).toHaveBeenCalled();
  //     expect(commonServiceStub.uploadExcelPutNew).toHaveBeenCalled();
  //     expect(commonServiceStub.uploadExcel).toHaveBeenCalled();
  //     expect(commonServiceStub.uploadExcelPut).toHaveBeenCalled();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //   });
  // });

  describe('toggleMenu', () => {
    it('makes expected calls', () => {
      const sideNavServiceStub: SideNavService = fixture.debugElement.injector.get(
        SideNavService
      );
      spyOn(sideNavServiceStub, 'setSideNav').and.callThrough();
      component.toggleMenu();
      expect(sideNavServiceStub.setSideNav).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('makes expected calls', () => {
      const sessionStorageServiceStub: SessionStorageService = fixture.debugElement.injector.get(
        SessionStorageService
      );
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(sessionStorageServiceStub, 'clear').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      component.logout();
      expect(sessionStorageServiceStub.clear).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('filterDownloadInvoice', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      component.filterDownloadInvoice();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });

  // describe('downloadTemplate', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'fileDownloadNew').and.callThrough();
  //     component.downloadTemplate();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.fileDownloadNew).toHaveBeenCalled();
  //   });
  // });
});
