import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from 'src/app/utils';
import { CommonService } from 'src/app/utils';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CreateCategoryComponent } from './create-category.component';

describe('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;

  beforeEach(() => {
    const sharedServiceStub = () => ({
      urlSegmentKeys: () => ({ path: {}, length: {} }),
      getListLang: () => ({ then: () => ({}) }),
      setJsonResponse: (string, identity) => ({ then: () => ({}) }),
      show: string => ({}),
      displayErrorMessage: statusText => ({}),
      displaySuccessMessage: string => ({})
    });
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) }),
      uploadImageNew: (string, formData) => ({ subscribe: f => f({}) }),
      updateImageNew: (string, formData) => ({ subscribe: f => f({}) })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const formBuilderStub = () => ({ group: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CreateCategoryComponent],
      providers: [
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: FormBuilder, useFactory: formBuilderStub }
      ]
    });
    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`selectedLang has default value`, () => {
    expect(component.selectedLang).toEqual(`en`);
  });

  it(`availableLang has default value`, () => {
    expect(component.availableLang).toEqual([]);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'fetchUrl').and.callThrough();
  //     spyOn(component, 'createCategoryForm').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.fetchUrl).toHaveBeenCalled();
  //     expect(component.createCategoryForm).toHaveBeenCalled();
  //   });
  // });

  describe('createCategoryForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.createCategoryForm();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  // describe('fetchUrl', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'getLangList').and.callThrough();
  //     spyOn(component, 'getEditData').and.callThrough();
  //     spyOn(sharedServiceStub, 'urlSegmentKeys').and.callThrough();
  //     component.fetchUrl();
  //     expect(component.getLangList).toHaveBeenCalled();
  //     expect(component.getEditData).toHaveBeenCalled();
  //     expect(sharedServiceStub.urlSegmentKeys).toHaveBeenCalled();
  //   });
  // });

  describe('getLangList', () => {
    it('makes expected calls', () => {
      const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
        SharedService
      );
      spyOn(sharedServiceStub, 'getListLang').and.callThrough();
      component.getLangList();
      expect(sharedServiceStub.getListLang).toHaveBeenCalled();
    });
  });

  // describe('createUpdateCategory', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     spyOn(component, 'toCheckFormValidAndCompleted').and.callThrough();
  //     spyOn(component, 'setRecentSelectedFormData').and.callThrough();
  //     spyOn(component, 'checkAndFetchCategoryVal').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'uploadImageNew').and.callThrough();
  //     spyOn(commonServiceStub, 'updateImageNew').and.callThrough();
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     component.createUpdateCategory();
  //     expect(component.toCheckFormValidAndCompleted).toHaveBeenCalled();
  //     expect(component.setRecentSelectedFormData).toHaveBeenCalled();
  //     expect(component.checkAndFetchCategoryVal).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.uploadImageNew).toHaveBeenCalled();
  //     expect(commonServiceStub.updateImageNew).toHaveBeenCalled();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //   });
  // });
  
});