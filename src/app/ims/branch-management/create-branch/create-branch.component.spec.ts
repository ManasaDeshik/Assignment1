import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from 'src/app/utils';
import { LoaderService } from 'src/app/utils';
import { CommonService } from 'src/app/utils';
import { FetchUserTabDetailsService } from 'src/app/utils';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CreateBranchComponent } from './create-branch.component';

describe('CreateBranchComponent', () => {
  let component: CreateBranchComponent;
  let fixture: ComponentFixture<CreateBranchComponent>;

  beforeEach(() => {
    const sharedServiceStub = () => ({
      urlSegmentKeys: () => ({ path: {}, length: {} }),
      displayErrorMessage: string => ({}),
      displaySuccessMessage: string => ({})
    });
    const loaderServiceStub = () => ({});
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) }),
      postDataNew: (string, branch) => ({ subscribe: f => f({}) }),
      putDataNew: (string, branch) => ({ subscribe: f => f({}) })
    });
    const fetchUserTabDetailsServiceStub = () => ({});
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CreateBranchComponent],
      providers: [
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: LoaderService, useFactory: loaderServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        {
          provide: FetchUserTabDetailsService,
          useFactory: fetchUserTabDetailsServiceStub
        },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(CreateBranchComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isEditMode has default value`, () => {
    expect(component.isEditMode).toEqual(false);
  });

  it(`createUpdateFlag has default value`, () => {
    expect(component.createUpdateFlag).toEqual(true);
  });

  it(`village_statuses has default value`, () => {
    expect(component.village_statuses).toEqual([{ name: 'Active' },{ name: 'Inactive' }]);
  });

  it(`delivery_days has default value`, () => {
    expect(component.delivery_days).toEqual([{ name: 'Monday' },{ name: 'Tuesday' } ,
    { name: 'Wednesday' } , { name: 'Thursday' } , { name: 'Friday' } , { name: 'Saturday' } ,{ name: 'Sunday' }]);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'fetchUrl').and.callThrough();
  //     spyOn(component, 'getBranchDetailsCollection').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.fetchUrl).toHaveBeenCalled();
  //     expect(component.getBranchDetailsCollection).toHaveBeenCalled();
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

  // describe('getEditData', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getEditData();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

  // describe('createBranch', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'postDataNew').and.callThrough();
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     component.createBranch();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.postDataNew).toHaveBeenCalled();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //   });
  // });

  // describe('updateBranch', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'putDataNew').and.callThrough();
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     component.updateBranch();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.putDataNew).toHaveBeenCalled();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //   });
  // });
});
