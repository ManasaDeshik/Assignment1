import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonService } from 'src/app/utils';
import { SharedService } from 'src/app/utils';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CreateRolesComponent } from './create-roles.component';

describe('CreateRolesComponent', () => {
  let component: CreateRolesComponent;
  let fixture: ComponentFixture<CreateRolesComponent>;

  beforeEach(() => {
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) }),
      postDataNew: (string, createUpdateRole) => ({ subscribe: f => f({}) }),
      putDataNew: (string, createUpdateRole) => ({ subscribe: f => f({}) })
    });
    const sharedServiceStub = () => ({
      urlSegmentKeys: () => ({ path: {} }),
      displayErrorMessage: statusText => ({}),
      displaySuccessMessage: string => ({})
    });
    const formBuilderStub = () => ({ group: object => ({}) });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CreateRolesComponent],
      providers: [
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(CreateRolesComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`moduleData has default value`, () => {
    expect(component.moduleData).toEqual([]);
  });

  it(`userLoggedInCheck has default value`, () => {
    expect(component.userLoggedInCheck).toEqual([{ name: 'is_admin_login_enabled', label: 'Admin Login', value: false },
    { name: 'is_saheli_login_enabled', label: 'Saheli Login', value: false } ,
    { name: 'is_OE_login_enabled', label: 'OE Login', value: false } ,
    { name: 'is_saheli_coordinator_login_enabled', label: 'TM Login', value: false }]);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'createRoleForm').and.callThrough();
  //     spyOn(component, 'getModuleDetails').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.createRoleForm).toHaveBeenCalled();
  //     expect(component.getModuleDetails).toHaveBeenCalled();
  //   });
  // });

  describe('createRoleForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.createRoleForm();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  // describe('getModuleDetails', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getRouteSegment').and.callThrough();
  //     component.getModuleDetails();
  //     expect(component.getRouteSegment).toHaveBeenCalled();
  //   });
  // });

  // describe('getRouteSegment', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'getEditRoleData').and.callThrough();
  //     spyOn(sharedServiceStub, 'urlSegmentKeys').and.callThrough();
  //     component.getRouteSegment();
  //     expect(component.getEditRoleData).toHaveBeenCalled();
  //     expect(sharedServiceStub.urlSegmentKeys).toHaveBeenCalled();
  //   });
  // });

  // describe('saveModule', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     spyOn(commonServiceStub, 'postDataNew').and.callThrough();
  //     spyOn(commonServiceStub, 'putDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     component.saveModule();
  //     expect(commonServiceStub.postDataNew).toHaveBeenCalled();
  //     expect(commonServiceStub.putDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //   });
  // });
});
