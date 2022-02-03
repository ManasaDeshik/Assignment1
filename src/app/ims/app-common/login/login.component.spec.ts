import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { SharedService } from 'src/app/utils';
import { CommonService } from 'src/app/utils';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../utils/services/auth-service/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const sessionStorageServiceStub = () => ({ clear: () => ({}) });
    const sharedServiceStub = () => ({
      displayErrorMessage: statusText => ({}),
      toCollectModuleIdentifier: moduleDetails => ({ routerLink: {} })
    });
    const commonServiceStub = () => ({
      getDataNew: string => ({ subscribe: f => f({}) })
    });
    const formBuilderStub = () => ({ group: object => ({}) });
    const authServiceStub = () => ({ loginWithCognito: data => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        {
          provide: SessionStorageService,
          useFactory: sessionStorageServiceStub
        },
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  // it('can load instance', () => {
  //   expect(component).toBeTruthy();
  // });

  // it(`inputType has default value`, () => {
  //   expect(component.inputType).toEqual(`password`);
  // });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const sessionStorageServiceStub: SessionStorageService = fixture.debugElement.injector.get(
  //       SessionStorageService
  //     );
  //     spyOn(component, 'formValidation').and.callThrough();
  //     spyOn(sessionStorageServiceStub, 'clear').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.formValidation).toHaveBeenCalled();
  //     expect(sessionStorageServiceStub.clear).toHaveBeenCalled();
  //   });
  // });

  // describe('formValidation', () => {
  //   it('makes expected calls', () => {
  //     const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
  //       FormBuilder
  //     );
  //     spyOn(formBuilderStub, 'group').and.callThrough();
  //     component.formValidation();
  //     expect(formBuilderStub.group).toHaveBeenCalled();
  //   });
  // });

  // describe('showHide', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'showHide').and.callThrough();
  //     component.showHide('hide');
  //     expect(component.showHide).toHaveBeenCalled();
  //   });

  //   it('makes expected calls', () => {
  //     spyOn(component, 'showHide').and.callThrough();
  //     component.showHide('show');
  //     expect(component.showHide).toHaveBeenCalled();
  //   });
  // });
});
