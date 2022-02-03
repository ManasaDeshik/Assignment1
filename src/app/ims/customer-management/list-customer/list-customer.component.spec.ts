import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from 'src/app/utils';
import { FetchUserTabDetailsService } from 'src/app/utils';
import { LoaderService } from 'src/app/utils';
import { CommonService } from 'src/app/utils';
import { SideNavService } from 'src/app/utils';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { customerTableHeaderCollections } from 'src/app/utils';
import { tableLeadStatusCollections } from 'src/app/utils';
import { customerTabCollections } from 'src/app/utils';
import { FormsModule } from '@angular/forms';
import { ListCustomerComponent } from './list-customer.component';

describe('ListCustomerComponent', () => {
  let component: ListCustomerComponent;
  let fixture: ComponentFixture<ListCustomerComponent>;

  beforeEach(() => {
    const sharedServiceStub = () => ({
      toCheckAllPermissionRights: lead => ({}),
      displayErrorMessage: string => ({}),
      formateDate: fromDate => ({}),
      openDialog: leadName => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      }),
      displaySuccessMessage: string => ({}),
      sendClickEvent: selectedBtnVal => ({})
    });
    const fetchUserTabDetailsServiceStub = () => ({
      setCustomerStatus: subscribeData => ({})
    });
    const loaderServiceStub = () => ({});
    const commonServiceStub = () => ({
      getDataNew: string => ({ subscribe: f => f({}) }),
      deleteData: (string, data) => ({ subscribe: f => f({}) })
    });
    const sideNavServiceStub = () => ({});
    const matDialogStub = () => ({});
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListCustomerComponent],
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
    fixture = TestBed.createComponent(ListCustomerComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`tableHeaders has default value`, () => {
    expect(component.tableHeaders).toEqual(customerTableHeaderCollections);
  });

  it(`orderTabs has default value`, () => {
    expect(component.orderTabs).toEqual(tableLeadStatusCollections);
  });

  it(`showData has default value`, () => {
    expect(component.showData).toEqual(true);
  });

  it(`gridVisibility has default value`, () => {
    expect(component.gridVisibility).toEqual(false);
  });

  it(`delivery_day has default value`, () => {
    expect(component.delivery_day).toEqual(`Delivery Day`);
  });

  it(`customer_activity has default value`, () => {
    expect(component.customer_activity).toEqual([
      `Not Available`,
      `Contacted by Phone`,
      `FM Intro IVR`,
      `FM Check in IVR`,
      `E-Catalogue SMS`,
      `B2C Order Form SMS`,
      `Whatsapp`,
      `Met the SJS`,
      `Met the TM`,
      `Loyalty IVR`,
      `TM Visit IVR`,
      `Servicing IVR`,
      `Welcome IVR`
    ]);
  });

  it(`customer_stage has default value`, () => {
    expect(component.customer_stage).toEqual([`Delivery`, `Loyalty`]);
  });

  it(`delivery_days has default value`, () => {
    expect(component.delivery_days).toEqual([{ name: 'Monday' },{ name: 'Tuesday' } ,{ name: 'Wednesday' } ,
    { name: 'Thursday' } , { name: 'Friday' } , { name: 'Saturday' } ,{ name: 'Sunday' }]);
  });

  it(`cartTableHeaders has default value`, () => {
    expect(component.cartTableHeaders).toEqual([{ header: 'Product Order No' }, { header: 'Product' } ,{ header: 'Quantity' } ,
    { header: 'Price' } ,{ header: 'Amount' }]);
  });

  it(`customerActivity has default value`, () => {
    expect(component.customerActivity).toEqual([]);
  });

  it(`customerStage has default value`, () => {
    expect(component.customerStage).toEqual(`Select stage`);
  });

  it(`stage_selected has default value`, () => {
    expect(component.stage_selected).toEqual(`5,6`);
  });

  it(`userTabs has default value`, () => {
    expect(component.userTabs).toEqual([]);
  });

  it(`SCName has default value`, () => {
    expect(component.SCName).toEqual(`TM search`);
  });

  it(`leadTabs has default value`, () => {
    expect(component.leadTabs).toEqual(customerTabCollections);
  });

  it(`selectedBtn has default value`, () => {
    expect(component.selectedBtn).toEqual(`Total Order`);
  });

  it(`selectedBtnVal has default value`, () => {
    expect(component.selectedBtnVal).toEqual(0);
  });

  it(`selectedTabData has default value`, () => {
    expect(component.selectedTabData).toEqual(`Total Order`);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'makeActive').and.callThrough();
  //     spyOn(component, 'getLeadList').and.callThrough();
  //     spyOn(component, 'getRoleList').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.makeActive).toHaveBeenCalled();
  //     expect(component.getLeadList).toHaveBeenCalled();
  //     expect(component.getRoleList).toHaveBeenCalled();
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

  // describe('getRoleList', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(component, 'selectedRoleData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getRoleList();
  //     expect(component.selectedRoleData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

  // describe('getLeadList', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(component, 'modulePermissionSets').and.callThrough();
  //     spyOn(sharedServiceStub, 'formateDate').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getLeadList();
  //     expect(component.modulePermissionSets).toHaveBeenCalled();
  //     expect(sharedServiceStub.formateDate).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

  // describe('setStatusData', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getRoleList').and.callThrough();
  //     spyOn(component, 'setFilterData').and.callThrough();
  //     spyOn(component, 'getLeadList').and.callThrough();
  //     component.setStatusData();
  //     expect(component.getRoleList).toHaveBeenCalled();
  //     expect(component.setFilterData).toHaveBeenCalled();
  //     expect(component.getLeadList).toHaveBeenCalled();
  //   });
  // });

  // describe('searchFilter', () => {
  //   it('makes expected calls', () => {
  //     const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
  //       FetchUserTabDetailsService
  //     );
  //     spyOn(component, 'getLeadList').and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'setCustomerStatus'
  //     ).and.callThrough();
  //     component.searchFilter();
  //     expect(component.getLeadList).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.setCustomerStatus
  //     ).toHaveBeenCalled();
  //   });
  // });

  describe('create', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.create();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  // describe('resetFilter', () => {
  //   it('makes expected calls', () => {
  //     const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
  //       FetchUserTabDetailsService
  //     );
  //     spyOn(component, 'getLeadList').and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'setCustomerStatus'
  //     ).and.callThrough();
  //     component.resetFilter();
  //     expect(component.getLeadList).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.setCustomerStatus
  //     ).toHaveBeenCalled();
  //   });
  // });
});
