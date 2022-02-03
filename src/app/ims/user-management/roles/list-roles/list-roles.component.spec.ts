import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonService } from 'src/app/utils';
import { FetchUserTabDetailsService } from 'src/app/utils';
import { SharedService } from 'src/app/utils';
import { LoaderService } from 'src/app/utils';
import { Router } from '@angular/router';
import { ListRolesComponent } from './list-roles.component';
import { PaginatePipe, PaginationService } from 'ngx-pagination';

describe('ListRolesComponent', () => {
  let component: ListRolesComponent;
  let fixture: ComponentFixture<ListRolesComponent>;

  beforeEach(() => {
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) }),
      deleteDataNew: (string, data) => ({ subscribe: f => f({}) })
    });
    const fetchUserTabDetailsServiceStub = () => ({
      getRoleStatusListRole: () => ({ subscribe: f => f({}) })
    });
    const sharedServiceStub = () => ({
      toCheckAllPermissionRights: role => ({}),
      displayErrorMessage: string => ({}),
      openDialog: roleName => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      }),
      displaySuccessMessage: string => ({})
    });
    const loaderServiceStub = () => ({});
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListRolesComponent, PaginatePipe],
      providers: [
        { provide: CommonService, useFactory: commonServiceStub },
        {
          provide: FetchUserTabDetailsService,
          useFactory: fetchUserTabDetailsServiceStub
        },
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: LoaderService, useFactory: loaderServiceStub },
        PaginationService,
        { provide: PaginatePipe},
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(ListRolesComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`tableHeaders has default value`, () => {
    expect(component.tableHeaders).toEqual([{ header: 'Roles' },{ header: 'Description' }]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getRoles').and.callThrough();
      spyOn(component, 'observeBehaviorDataChange').and.callThrough();
      spyOn(component, 'modulePermissionSets').and.callThrough();
      component.ngOnInit();
      expect(component.getRoles).toHaveBeenCalled();
      expect(component.observeBehaviorDataChange).toHaveBeenCalled();
      expect(component.modulePermissionSets).toHaveBeenCalled();
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

  describe('observeBehaviorDataChange', () => {
    it('makes expected calls', () => {
      const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
        FetchUserTabDetailsService
      );
      spyOn(component, 'getRoles').and.callThrough();
      spyOn(
        fetchUserTabDetailsServiceStub,
        'getRoleStatusListRole'
      ).and.callThrough();
      component.observeBehaviorDataChange();
      expect(component.getRoles).toHaveBeenCalled();
      expect(
        fetchUserTabDetailsServiceStub.getRoleStatusListRole
      ).toHaveBeenCalled();
    });
  });

  // describe('getRoles', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getRoles();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });
});
