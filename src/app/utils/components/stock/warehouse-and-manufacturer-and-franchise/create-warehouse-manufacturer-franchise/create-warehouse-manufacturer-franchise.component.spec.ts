import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonService } from 'src/app/utils';
import { SharedService } from 'src/app/utils';
import { LoaderService } from 'src/app/utils';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CreateWarehouseManufacturerFranchiseComponent } from './create-warehouse-manufacturer-franchise.component';
import { of } from 'rxjs/internal/observable/of';

describe('CreateWarehouseManufacturerFranchiseComponent', () => {
  let component: CreateWarehouseManufacturerFranchiseComponent;
  let fixture: ComponentFixture<CreateWarehouseManufacturerFranchiseComponent>;
  let records: {test
  };

  beforeEach(() => {
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) }),
      postDataNew: (apiEndPoint, data) => ({ subscribe: f => f({}) }),
      putDataNew: (apiEndPoint, data) => ({ subscribe: f => f({}) })
    });
    const sharedServiceStub = () => ({
      urlSegmentKeys: () => ({ path: [], length: [] }),
      displayErrorMessage: string => ({}),
      displaySuccessMessage: arg => ({})
    });
    const loaderServiceStub = () => ({});
    const routerStub = () => ({ navigate: array => ({}) });
    const formBuilderStub = () => ({
      group: object => ({}),
      array: array => ({})
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CreateWarehouseManufacturerFranchiseComponent],
      providers: [
        { provide: CommonService, useFactory: commonServiceStub, useValue: {records, getDataModified : ()=> of({}), 
        getDataNew : ()=> of({}), putDataNew : ()=> of({}), postDataNew : ()=> of({})  }  },
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: LoaderService, useFactory: loaderServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: FormBuilder, useFactory: formBuilderStub }
      ]
    });
    fixture = TestBed.createComponent(
      CreateWarehouseManufacturerFranchiseComponent
    );
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isEditMode has default value`, () => {
    expect(component.isEditMode).toEqual(false);
  });

  it(`franchiseNameCollections has default value`, () => {
    expect(component.franchiseNameCollections).toEqual([]);
  });

  it(`franchiseAddressCollections has default value`, () => {
    expect(component.franchiseAddressCollections).toEqual([]);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'createFranchiseForm').and.callThrough();
  //     spyOn(component, 'fetchUrl').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.createFranchiseForm).toHaveBeenCalled();
  //     expect(component.fetchUrl).toHaveBeenCalled();
  //   });
  // });

  describe('createFranchiseForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(component, 'createFranchise').and.callThrough();
      spyOn(formBuilderStub, 'group').and.callThrough();
      spyOn(formBuilderStub, 'array').and.callThrough();
      component.createFranchiseForm();
      expect(component.createFranchise).toHaveBeenCalled();
      expect(formBuilderStub.group).toHaveBeenCalled();
      expect(formBuilderStub.array).toHaveBeenCalled();
    });
  });

  // describe('fetchUrl', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'getEditData').and.callThrough();
  //     spyOn(sharedServiceStub, 'urlSegmentKeys').and.callThrough();
  //     component.fetchUrl();
  //     expect(component.getEditData).toHaveBeenCalled();
  //     expect(sharedServiceStub.urlSegmentKeys).toHaveBeenCalled();
  //   });
  // });

  describe('createFranchise', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.createFranchise();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  // describe('getBranchList', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getBranchList();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('getEditData', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
  //       FormBuilder
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(formBuilderStub, 'array').and.callThrough();
  //     spyOn(formBuilderStub, 'group').and.callThrough();
  //     component.getEditData();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(formBuilderStub.array).toHaveBeenCalled();
  //     expect(formBuilderStub.group).toHaveBeenCalled();
  //   });
  // });

  // describe('createWarehouseManufacturerFranchise', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'routeToParentLink').and.callThrough();
  //     spyOn(commonServiceStub, 'postDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     component.createWarehouseManufacturerFranchise();
  //     expect(component.routeToParentLink).toHaveBeenCalled();
  //     expect(commonServiceStub.postDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('updateWarehouseManufacturerFranchise', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'routeToParentLink').and.callThrough();
  //     spyOn(commonServiceStub, 'putDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     component.updateWarehouseManufacturerFranchise();
  //     expect(component.routeToParentLink).toHaveBeenCalled();
  //     expect(commonServiceStub.putDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //   });
  // });

  describe('routeToParentLink', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.routeToParentLink();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  // describe('generateFranchise', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'createFranchise').and.callThrough();
  //     component.generateFranchise();
  //     expect(component.createFranchise).toHaveBeenCalled();
  //   });
  // });

  // describe('generateFranchise', () => {
  //   it('makes expected calls', () => {
  //     let testData = spyOnProperty(component.franchiseValidationControl, 'valid', 'get').and.returnValue(true);
  //     spyOn(component, 'generateFranchise').and.callThrough();
  //     component.generateFranchise();
  //     expect(component.generateFranchise).toHaveBeenCalled();
  //   });
  // });

  //  describe('searchFranchiseFieldKey', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'searchFranchiseFieldKey').and.callThrough();
  //     component.searchFranchiseFieldKey('test');
  //     expect(component.searchFranchiseFieldKey).toHaveBeenCalled();
  //   });
  // });

  //  describe('searchFieldKey', () => {
  //   it('makes expected calls', () => {
  //     const event = { term: 'test' }; 
  //     spyOn(component, 'searchFieldKey').and.callThrough();
  //     component.searchFieldKey(event);
  //     expect(component.searchFieldKey).toBeTruthy();
  //   });
  // });

});