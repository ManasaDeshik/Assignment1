import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from 'src/app/utils';
import { CommonService } from 'src/app/utils';
import { Router } from '@angular/router';
import { fmpBranchList } from 'src/app/utils';
import { FmpDashboardBranchComponent } from './fmp-dashboard-branch.component';
import { PaginatePipe, PaginationService } from 'ngx-pagination';

describe('FmpDashboardBranchComponent', () => {
  let component: FmpDashboardBranchComponent;
  let fixture: ComponentFixture<FmpDashboardBranchComponent>;

  beforeEach(() => {
    const sharedServiceStub = () => ({
      toCheckAllPermissionRights: dashboard => ({}),
      displayErrorMessage: statusText => ({}),
      urlSegmentKeys: () => ({ path: {}, length: {} })
    });
    const commonServiceStub = () => ({
      getData: arg => ({ subscribe: f => f({}) })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FmpDashboardBranchComponent, PaginatePipe],
      providers: [
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        PaginationService,
        { provide: PaginatePipe},
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(FmpDashboardBranchComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`tableHeaders has default value`, () => {
    expect(component.tableHeaders).toEqual(fmpBranchList);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'modulePermissionSets').and.callThrough();
      spyOn(component, 'getBranchDataList').and.callThrough();
      component.ngOnInit();
      expect(component.modulePermissionSets).toHaveBeenCalled();
      expect(component.getBranchDataList).toHaveBeenCalled();
    });
  });

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

  // describe('getBranchDataList', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getData').and.callThrough();
  //     component.getBranchDataList();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getData).toHaveBeenCalled();
  //   });
  // });
});
