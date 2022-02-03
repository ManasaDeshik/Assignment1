import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from 'src/app/utils';
import { FetchUserTabDetailsService } from 'src/app/utils';
import { LoaderService } from 'src/app/utils';
import { CommonService } from 'src/app/utils';
import { SideNavService } from 'src/app/utils';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { leadTableHeaderCollections } from 'src/app/utils';
import { tableLeadStatusCollections } from 'src/app/utils';
import { leadTabCollections } from 'src/app/utils';
import { FormsModule } from '@angular/forms';
import { LeadManagementComponent } from './lead-management.component';

describe('LeadManagementComponent', () => {
  let component: LeadManagementComponent;
  let fixture: ComponentFixture<LeadManagementComponent>;

  beforeEach(() => {
    const sharedServiceStub = () => ({
      displayErrorMessage: statusText => ({}),
      toCheckAllPermissionRights: lead => ({}),
      formateDate: fromDate => ({}),
      openDialog: leadName => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      }),
      displaySuccessMessage: string => ({}),
      show: string => ({}),
      sendClickEvent: selectedBtnVal => ({})
    });
    const fetchUserTabDetailsServiceStub = () => ({
      shareLeadData: data => ({}),
      setSelectedLeadStatus: subscribeData => ({})
    });
    const loaderServiceStub = () => ({});
    const commonServiceStub = () => ({
      getDataNew: string => ({ subscribe: f => f({}) }),
      deleteDataNew: (string, data) => ({ subscribe: f => f({}) }),
      putDataNew: (string, moveTo) => ({ subscribe: f => f({}) })
    });
    const sideNavServiceStub = () => ({
      getSubText: () => ({ subscribe: f => f({}) })
    });
    const matDialogStub = () => ({
      open: (addOrderComponent, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LeadManagementComponent],
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
    spyOn(LeadManagementComponent.prototype, 'makeActive');
    fixture = TestBed.createComponent(LeadManagementComponent);
    component = fixture.componentInstance;
  });

  // it('can load instance', () => {
  //   expect(component).toBeTruthy();
  // });

  // it(`tableHeaders has default value`, () => {
  //   expect(component.tableHeaders).toEqual(leadTableHeaderCollections);
  // });

  // it(`orderTabs has default value`, () => {
  //   expect(component.orderTabs).toEqual(tableLeadStatusCollections);
  // });

  // it(`showData has default value`, () => {
  //   expect(component.showData).toEqual(true);
  // });

  // it(`delivery_day has default value`, () => {
  //   expect(component.delivery_day).toEqual(`Delivery Day`);
  // });

  // it(`notEditStage has default value`, () => {
  //   expect(component.notEditStage).toEqual(true);
  // });

  // it(`delivery_days has default value`, () => {
  //   expect(component.delivery_days).toEqual([, , , , , , ,]);
  // });

  // it(`customer_activity has default value`, () => {
  //   expect(component.customer_activity).toEqual([]);
  // });

  // it(`customer_stage has default value`, () => {
  //   expect(component.customer_stage).toEqual([]);
  // });

  // it(`move_to_unaware has default value`, () => {
  //   expect(component.move_to_unaware).toEqual([, ,]);
  // });

  // it(`move_to_aware has default value`, () => {
  //   expect(component.move_to_aware).toEqual([, ,]);
  // });

  // it(`move_from_to_be_considered has default value`, () => {
  //   expect(component.move_from_to_be_considered).toEqual([, ,]);
  // });

  // it(`move_from_consider has default value`, () => {
  //   expect(component.move_from_consider).toEqual([, ,]);
  // });

  // it(`customerActivity has default value`, () => {
  //   expect(component.customerActivity).toEqual([]);
  // });

  // it(`customerStage has default value`, () => {
  //   expect(component.customerStage).toEqual(`Select stage`);
  // });

  // it(`userTabs has default value`, () => {
  //   expect(component.userTabs).toEqual([]);
  // });

  // it(`SCName has default value`, () => {
  //   expect(component.SCName).toEqual(`TM search`);
  // });

  // it(`leadTabs has default value`, () => {
  //   expect(component.leadTabs).toEqual(leadTabCollections);
  // });

  // it(`selectedBtn has default value`, () => {
  //   expect(component.selectedBtn).toEqual(`Directory`);
  // });

  // it(`selectedBtnVal has default value`, () => {
  //   expect(component.selectedBtnVal).toEqual(0);
  // });

  // it(`selectedTabData has default value`, () => {
  //   expect(component.selectedTabData).toEqual(`Directory`);
  // });

  // it(`tagList has default value`, () => {
  //   expect(component.tagList).toEqual([]);
  // });

  // it(`stageList has default value`, () => {
  //   expect(component.stageList).toEqual([]);
  // });

  // it(`ivrList has default value`, () => {
  //   expect(component.ivrList).toEqual([]);
  // });

  // it(`smsList has default value`, () => {
  //   expect(component.smsList).toEqual([]);
  // });

  // it(`tmList has default value`, () => {
  //   expect(component.tmList).toEqual([]);
  // });

  // it(`totalRecords has default value`, () => {
  //   expect(component.totalRecords).toEqual(0);
  // });

  // it(`movingTo has default value`, () => {
  //   expect(component.movingTo).toEqual([]);
  // });

  // describe('constructor', () => {
  //   it('makes expected calls', () => {
  //     expect(LeadManagementComponent.prototype.makeActive).toHaveBeenCalled();
  //   });
  // });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getRoleList').and.callThrough();
  //     (<jasmine.Spy>component.makeActive).calls.reset();
  //     spyOn(component, 'getDropdownList').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getRoleList).toHaveBeenCalled();
  //     expect(component.makeActive).toHaveBeenCalled();
  //     expect(component.getDropdownList).toHaveBeenCalled();
  //   });
  // });

  // describe('getDropdownList', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getDropdownList();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
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
  //     const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
  //       FetchUserTabDetailsService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(component, 'modulePermissionSets').and.callThrough();
  //     spyOn(sharedServiceStub, 'formateDate').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(fetchUserTabDetailsServiceStub, 'shareLeadData').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getLeadList();
  //     expect(component.modulePermissionSets).toHaveBeenCalled();
  //     expect(sharedServiceStub.formateDate).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(fetchUserTabDetailsServiceStub.shareLeadData).toHaveBeenCalled();
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
  //     spyOn(component, 'getLeadList').and.callThrough();
  //     component.searchFilter();
  //     expect(component.getLeadList).toHaveBeenCalled();
  //   });
  // });

  // describe('create', () => {
  //   it('makes expected calls', () => {
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     component.create();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //   });
  // });

  // describe('resetFilter', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'selectStage').and.callThrough();
  //     spyOn(component, 'getLeadList').and.callThrough();
  //     component.resetFilter();
  //     expect(component.selectStage).toHaveBeenCalled();
  //     expect(component.getLeadList).toHaveBeenCalled();
  //   });
  // });
});
