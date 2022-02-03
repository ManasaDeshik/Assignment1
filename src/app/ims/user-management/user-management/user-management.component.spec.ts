import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FetchUserTabDetailsService } from 'src/app/utils';
import { SharedService } from 'src/app/utils';
import { CommonService } from 'src/app/utils';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserManagementComponent } from './user-management.component';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;

  beforeEach(() => {
    const routerStub = () => ({
      events: { subscribe: f => f({}) },
      navigate: array => ({})
    });
    const fetchUserTabDetailsServiceStub = () => ({
      setSelectedUserRole: subscribeData => ({}),
      setRoleStatusListRole: value => ({})
    });
    const sharedServiceStub = () => ({
      toCheckAllPermissionRights: role => ({}),
      urlSegmentKeys: () => ({}),
      formateDate: event => ({}),
      displayErrorMessage: string => ({})
    });
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UserManagementComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        {
          provide: FetchUserTabDetailsService,
          useFactory: fetchUserTabDetailsServiceStub
        },
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: CommonService, useFactory: commonServiceStub }
      ]
    });
    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
  });

  // it('can load instance', () => {
  //   expect(component).toBeTruthy();
  // });

  // it(`urlSegment has default value`, () => {
  //   expect(component.urlSegment).toEqual([]);
  // });

  // it(`roleCollections has default value`, () => {
  //   expect(component.roleCollections).toEqual([]);
  // });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'modulePermissionSets').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.modulePermissionSets).toHaveBeenCalled();
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

  // describe('searchFilter', () => {
  //   it('makes expected calls', () => {
  //     const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
  //       FetchUserTabDetailsService
  //     );
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'setSelectedUserRole'
  //     ).and.callThrough();
  //     component.searchFilter();
  //     expect(
  //       fetchUserTabDetailsServiceStub.setSelectedUserRole
  //     ).toHaveBeenCalled();
  //   });
  // });
});
