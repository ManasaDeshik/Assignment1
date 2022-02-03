import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from 'src/app/utils';
import { CommonService } from 'src/app/utils';
import { Router } from '@angular/router';
import { editTryBuyCollections } from 'src/app/utils';
import { FormsModule } from '@angular/forms';
import { EditTryBuyComponent } from './edit-try-buy.component';

describe('EditTryBuyComponent', () => {
  let component: EditTryBuyComponent;
  let fixture: ComponentFixture<EditTryBuyComponent>;

  beforeEach(() => {
    const sharedServiceStub = () => ({
      urlSegmentKeys: () => ({ path: {}, length: {} }),
      show: string => ({}),
      displayErrorMessage: statusText => ({}),
      displaySuccessMessage: string => ({})
    });
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) }),
      putDataNew: (string, updateTryBuy) => ({ subscribe: f => f({}) })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EditTryBuyComponent],
      providers: [
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(EditTryBuyComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`vleCode has default value`, () => {
    expect(component.vleCode).toEqual([]);
  });

  it(`showData has default value`, () => {
    expect(component.showData).toEqual(false);
  });

  it(`orderTabs has default value`, () => {
    expect(component.orderTabs).toEqual(editTryBuyCollections);
  });

  it(`intrestedProduct has default value`, () => {
    expect(component.intrestedProduct).toEqual([]);
  });

  it(`isBuyDateDisabled has default value`, () => {
    expect(component.isBuyDateDisabled).toEqual(false);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'fetchUrl').and.callThrough();
  //     spyOn(component, 'getProductDetails').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.fetchUrl).toHaveBeenCalled();
  //     expect(component.getProductDetails).toHaveBeenCalled();
  //   });
  // });

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

  // describe('getProductDetails', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'show').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getProductDetails();
  //     expect(sharedServiceStub.show).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

  // describe('getEditData', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(component, 'filterVleCode').and.callThrough();
  //     spyOn(sharedServiceStub, 'show').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getEditData();
  //     expect(component.filterVleCode).toHaveBeenCalled();
  //     expect(sharedServiceStub.show).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

  // describe('updateUser', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'putDataNew').and.callThrough();
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     component.updateUser();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.putDataNew).toHaveBeenCalled();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //   });
  // });
});
