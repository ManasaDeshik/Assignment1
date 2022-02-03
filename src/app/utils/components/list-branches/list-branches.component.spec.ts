import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from '../..';
import { Router } from '@angular/router';
import { LoaderService } from '../../services';
import { CommonService } from '../../services';
import { FetchUserTabDetailsService } from '../../services';
import { fmpBranchCollections } from '../..';
import { branchManagementList } from '../..';
import { FormsModule } from '@angular/forms';
import { ListBranchesComponent } from './list-branches.component';
import { PaginatePipe, PaginationService } from 'ngx-pagination';

describe('ListBranchesComponent', () => {
  let component: ListBranchesComponent;
  let fixture: ComponentFixture<ListBranchesComponent>;

  beforeEach(() => {
    const sharedServiceStub = () => ({
      toCheckAllPermissionRights: branch => ({}),
      urlSegmentKeys: () => ({ path: {}, length: {} }),
      displayErrorMessage: statusText => ({})
    });
    const routerStub = () => ({
      url: { includes: () => ({}) },
      navigate: array => ({})
    });
    const loaderServiceStub = () => ({});
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) })
    });
    const fetchUserTabDetailsServiceStub = () => ({
      getUpdateList: () => ({ subscribe: f => f({}) }),
      setBranchSubscribeStatus: subscribeData => ({})
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListBranchesComponent, PaginatePipe],
      providers: [
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: LoaderService, useFactory: loaderServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        PaginationService,
        { provide: PaginatePipe},
        {
          provide: FetchUserTabDetailsService,
          useFactory: fetchUserTabDetailsServiceStub
        }
      ]
    });
    spyOn(ListBranchesComponent.prototype, 'ngOnInit');
    fixture = TestBed.createComponent(ListBranchesComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`fmpDashboard has default value`, () => {
    expect(component.fmpDashboard).toEqual(fmpBranchCollections);
  });

  it(`tableHeaders has default value`, () => {
    expect(component.tableHeaders).toEqual(branchManagementList);
  });

  it(`delivery_days has default value`, () => {
    expect(component.delivery_days).toEqual([{ name: 'Monday' },{ name: 'Tuesday' } ,{ name: 'Wednesday' } ,{ name: 'Thursday' } ,
    { name: 'Friday' } ,{ name: 'Saturday' } ,{ name: 'Sunday' } ,{ name: 'All' }]);
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(ListBranchesComponent.prototype.ngOnInit).toHaveBeenCalled();
    });
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'fetchUrl').and.callThrough();
  //     spyOn(component, 'getBranchDataList').and.callThrough();
  //     spyOn(component, 'modulePermissionSets').and.callThrough();
  //     (<jasmine.Spy>component.ngOnInit).and.callThrough();
  //     component.ngOnInit();
  //     expect(component.fetchUrl).toHaveBeenCalled();
  //     expect(component.getBranchDataList).toHaveBeenCalled();
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

  // describe('fetchUrl', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(sharedServiceStub, 'urlSegmentKeys').and.callThrough();
  //     component.fetchUrl();
  //     expect(sharedServiceStub.urlSegmentKeys).toHaveBeenCalled();
  //   });
  // });

  // describe('getBranchDataList', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getBranchDataList();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

  describe('clearFilter', () => {
    it('makes expected calls', () => {
      const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
        FetchUserTabDetailsService
      );
      spyOn(component, 'getBranchDataList').and.callThrough();
      spyOn(
        fetchUserTabDetailsServiceStub,
        'setBranchSubscribeStatus'
      ).and.callThrough();
      component.clearFilter();
      expect(component.getBranchDataList).toHaveBeenCalled();
      expect(
        fetchUserTabDetailsServiceStub.setBranchSubscribeStatus
      ).toHaveBeenCalled();
    });
  });

  describe('createBranch', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.createBranch();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
