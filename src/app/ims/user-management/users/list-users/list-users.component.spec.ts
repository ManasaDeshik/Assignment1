import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FetchUserTabDetailsService } from '../../../../../../src/app/utils';
import { SharedService } from '../../../../../../src/app/utils';
import { LoaderService } from '../../../../../../src/app/utils';
import { CommonService } from '../../../../../../src/app/utils';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { userTableHeaderCollections } from '../../../../../../src/app/utils';
import { ListUsersComponent } from './list-users.component';
import { PaginatePipe, PaginationService } from 'ngx-pagination';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;

  beforeEach(() => {
    const fetchUserTabDetailsServiceStub = () => ({
      getUpdateList: () => ({ subscribe: f => f({}) }),
      getSelectedUserRole: () => ({ subscribe: f => f({}) })
    });
    const sharedServiceStub = () => ({
      toCheckAllPermissionRights: user => ({}),
      displayErrorMessage: statusText => ({}),
      displaySuccessMessage: string => ({})
    });
    const loaderServiceStub = () => ({});
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) }),
      deleteDataNew: (string, data) => ({ subscribe: f => f({}) })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const matDialogStub = () => ({
      open: (confirmationDialogComponent, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListUsersComponent, PaginatePipe],
      providers: [
        {
          provide: FetchUserTabDetailsService,
          useFactory: fetchUserTabDetailsServiceStub
        },
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: LoaderService, useFactory: loaderServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        PaginationService,
        { provide: PaginatePipe},
        { provide: Router, useFactory: routerStub },
        { provide: MatDialog, useFactory: matDialogStub }
      ]
    });
    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`tableHeaders has default value`, () => {
    expect(component.tableHeaders).toEqual(userTableHeaderCollections);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
  //       FetchUserTabDetailsService
  //     );
  //     spyOn(component, 'getWarehouse').and.callThrough();
  //     spyOn(component, 'getUsersList').and.callThrough();
  //     spyOn(component, 'observeBehaviorDataChange').and.callThrough();
  //     spyOn(fetchUserTabDetailsServiceStub, 'getUpdateList').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getWarehouse).toHaveBeenCalled();
  //     expect(component.getUsersList).toHaveBeenCalled();
  //     expect(component.observeBehaviorDataChange).toHaveBeenCalled();
  //     expect(fetchUserTabDetailsServiceStub.getUpdateList).toHaveBeenCalled();
  //   });
  // });

  // describe('observeBehaviorDataChange', () => {
  //   it('makes expected calls', () => {
  //     const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
  //       FetchUserTabDetailsService
  //     );
  //     spyOn(component, 'getUsersList').and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'getSelectedUserRole'
  //     ).and.callThrough();
  //     component.observeBehaviorDataChange();
  //     expect(component.getUsersList).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.getSelectedUserRole
  //     ).toHaveBeenCalled();
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

  // describe('getUsersList', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(component, 'modulePermissionSets').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getUsersList();
  //     expect(component.modulePermissionSets).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

  // describe('getWarehouse', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(component, 'getUsersList').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getWarehouse();
  //     expect(component.getUsersList).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });
});
