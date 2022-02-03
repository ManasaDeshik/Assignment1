import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from 'src/app/utils';
import { CommonService } from 'src/app/utils';
import { LoaderService } from 'src/app/utils';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CreateEditLeadComponent } from './create-edit-lead.component';

describe('CreateEditLeadComponent', () => {
  let component: CreateEditLeadComponent;
  let fixture: ComponentFixture<CreateEditLeadComponent>;

  beforeEach(() => {
    const sharedServiceStub = () => ({
      displayErrorMessage: statusText => ({}),
      urlSegmentKeys: () => ({ path: {}, length: {} }),
      show: string => ({}),
      displaySuccessMessage: string => ({})
    });
    const commonServiceStub = () => ({
      getDataNew: string => ({ subscribe: f => f({}) }),
      postDataNew: (string, createForm) => ({ subscribe: f => f({}) }),
      putDataNew: (string, editForm) => ({ subscribe: f => f({}) })
    });
    const loaderServiceStub = () => ({});
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CreateEditLeadComponent],
      providers: [
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: LoaderService, useFactory: loaderServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(CreateEditLeadComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`status has default value`, () => {
    expect(component.status).toEqual([]);
  });

  it(`isOptionsSet has default value`, () => {
    expect(component.isOptionsSet).toEqual(true);
  });

  it(`tag has default value`, () => {
    expect(component.tag).toEqual([]);
  });

  it(`intrestedProduct has default value`, () => {
    expect(component.intrestedProduct).toEqual([]);
  });

  it(`isEditMode has default value`, () => {
    expect(component.isEditMode).toEqual(false);
  });

  it(`bindIntrestedProduct has default value`, () => {
    expect(component.bindIntrestedProduct).toEqual([]);
  });

  it(`tagOtherProdcuts has default value`, () => {
    expect(component.tagOtherProdcuts).toEqual([]);
  });

  it(`vleCode has default value`, () => {
    expect(component.vleCode).toEqual([]);
  });

  it(`customer_activity has default value`, () => {
    expect(component.customer_activity).toEqual([]);
  });

  it(`customer_stage has default value`, () => {
    expect(component.customer_stage).toEqual([]);
  });

  it(`ivr_result has default value`, () => {
    expect(component.ivr_result).toEqual([]);
  });

  it(`sjs_input has default value`, () => {
    expect(component.sjs_input).toEqual([]);
  });

  it(`tm_input has default value`, () => {
    expect(component.tm_input).toEqual([]);
  });

  it(`sms_result has default value`, () => {
    expect(component.sms_result).toEqual([]);
  });

  it(`type_of_phone has default value`, () => {
    expect(component.type_of_phone).toEqual([]);
  });

  it(`disableIVR has default value`, () => {
    expect(component.disableIVR).toEqual(true);
  });

  it(`disableSJS has default value`, () => {
    expect(component.disableSJS).toEqual(true);
  });

  it(`disableSMS has default value`, () => {
    expect(component.disableSMS).toEqual(true);
  });

  it(`disableTM has default value`, () => {
    expect(component.disableTM).toEqual(true);
  });

  it(`disableStatus has default value`, () => {
    expect(component.disableStatus).toEqual(false);
  });

  it(`disableInterestedProducts has default value`, () => {
    expect(component.disableInterestedProducts).toEqual(false);
  });

  it(`isDisable has default value`, () => {
    expect(component.isDisable).toEqual(false);
  });

  it(`isAware has default value`, () => {
    expect(component.isAware).toEqual(false);
  });

  it(`isConsider has default value`, () => {
    expect(component.isConsider).toEqual(false);
  });

  it(`warehouses has default value`, () => {
    expect(component.warehouses).toEqual([]);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getProductDetails').and.callThrough();
  //     spyOn(component, 'getBranchDetailsCollection').and.callThrough();
  //     spyOn(component, 'getDropdownList').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getProductDetails).toHaveBeenCalled();
  //     expect(component.getBranchDetailsCollection).toHaveBeenCalled();
  //     expect(component.getDropdownList).toHaveBeenCalled();
  //   });
  // });

  // describe('getDropdownList', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(component, 'setLeadOptions').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getDropdownList();
  //     expect(component.setLeadOptions).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
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
  //     spyOn(component, 'fetchUrl').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getProductDetails();
  //     expect(component.fetchUrl).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
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

  // describe('getBranchList', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getBranchList();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

  // describe('createUser', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     spyOn(sharedServiceStub, 'show').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'postDataNew').and.callThrough();
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     component.createUser();
  //     expect(sharedServiceStub.show).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.postDataNew).toHaveBeenCalled();
  //     expect(routerStub.navigate).toHaveBeenCalled();
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
  //     spyOn(component, 'stageChangeCustom').and.callThrough();
  //     spyOn(component, 'filterStatus').and.callThrough();
  //     spyOn(component, 'filterTag').and.callThrough();
  //     spyOn(component, 'filterIntrestedProdcuts').and.callThrough();
  //     spyOn(component, 'filterOtherProdcuts').and.callThrough();
  //     spyOn(component, 'filterBranch').and.callThrough();
  //     spyOn(component, 'filterVleCode').and.callThrough();
  //     spyOn(sharedServiceStub, 'show').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getEditData();
  //     expect(component.stageChangeCustom).toHaveBeenCalled();
  //     expect(component.filterStatus).toHaveBeenCalled();
  //     expect(component.filterTag).toHaveBeenCalled();
  //     expect(component.filterIntrestedProdcuts).toHaveBeenCalled();
  //     expect(component.filterOtherProdcuts).toHaveBeenCalled();
  //     expect(component.filterBranch).toHaveBeenCalled();
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
  //     spyOn(sharedServiceStub, 'show').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'putDataNew').and.callThrough();
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     component.updateUser();
  //     expect(sharedServiceStub.show).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.putDataNew).toHaveBeenCalled();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //   });
  // });
});
