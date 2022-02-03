import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from 'src/app/utils';
import { LoaderService } from 'src/app/utils';
import { FetchUserTabDetailsService } from 'src/app/utils';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/utils/services/common-service/common.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { ListCategoryComponent } from './list-category.component';
import { PaginatePipe, PaginationService } from 'ngx-pagination';
import { of } from 'rxjs/internal/observable/of';

describe('ListCategoryComponent', () => {
  let component: ListCategoryComponent;
  let fixture: ComponentFixture<ListCategoryComponent>;
  let records: {test
  }

  beforeEach(() => {
    const sharedServiceStub = () => ({
      toCheckAllPermissionRights: category => ({}),
      getListLang: () => ({ then: () => ({}) }),
      setJsonResponse: (string, selectedLang) => ({ then: () => ({}) }),
      displayErrorMessage: statusText => ({}),
      displaySuccessMessage: string => ({})
    });
    const loaderServiceStub = () => ({});
    const fetchUserTabDetailsServiceStub = () => ({
      setCategorySubscribeStatus: subscribeData => ({})
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const matDialogStub = () => ({
      open: (sequenceDialogComponent, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) }),
      putDataNew: (string, dataPusheToBranch) => ({ subscribe: f => f({}) }),
      getDataModified: string => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListCategoryComponent, PaginatePipe],
      providers: [
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: LoaderService, useFactory: loaderServiceStub },
        {
          provide: FetchUserTabDetailsService,
          useFactory: fetchUserTabDetailsServiceStub
        },
        { provide: Router, useFactory: routerStub },
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: CommonService, useFactory: commonServiceStub, useValue: {records, getDataModified : ()=> of({}), 
        getDataNew : ()=> of({}), putDataNew : ()=> of({})  }  },
        PaginationService,
        { provide: PaginatePipe}
      ]
    });
    fixture = TestBed.createComponent(ListCategoryComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  
  // it(`branchTableHeaders has default value`, () => {
  //   expect(component.branchTableHeaders).toEqual([,]);
  // });

  // it(`tableHeaders has default value`, () => {
  //   expect(component.tableHeaders).toEqual([, ,]);
  // });

  it(`selectedLang has default value`, () => {
    expect(component.selectedLang).toEqual(`en`);
  });

  it(`categoryList has default value`, () => {
    expect(component.categoryList).toEqual([]);
  });

  it(`availableLang has default value`, () => {
    expect(component.availableLang).toEqual([]);
  });

  it(`isSaveProduct has default value`, () => {
    expect(component.isSaveProduct).toEqual(true);
  });

  it(`branchData has default value`, () => {
    expect(component.branchData).toEqual([]);
  });

  it(`isMoveDisable has default value`, () => {
    expect(component.isMoveDisable).toEqual(true);
  });

  it(`isRemoveProduct has default value`, () => {
    expect(component.isRemoveProduct).toEqual(true);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'modulePermissionSets').and.callThrough();
  //     spyOn(component, 'getLangList').and.callThrough();
  //     spyOn(component, 'getCategoryList').and.callThrough();
  //     spyOn(component, 'getBranchList').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.modulePermissionSets).toHaveBeenCalled();
  //     expect(component.getLangList).toHaveBeenCalled();
  //     expect(component.getCategoryList).toHaveBeenCalled();
  //     expect(component.getBranchList).toHaveBeenCalled();
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

  // describe('getCategoryList', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'setJsonResponse').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getCategoryList();
  //     expect(sharedServiceStub.setJsonResponse).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

  // describe('saveCategory', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(component, 'getCategoryList').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'putDataNew').and.callThrough();
  //     component.saveCategory();
  //     expect(component.getCategoryList).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.putDataNew).toHaveBeenCalled();
  //   });
  // });

  // 'describe('getBranchList', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataModified').and.callThrough();
  //     component.getBranchList();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataModified).toHaveBeenCalled();
  //   });awss
  // });'
});