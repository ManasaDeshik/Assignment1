import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { SharedService } from 'src/app/utils';
import { LoaderService } from 'src/app/utils';
import { FetchUserTabDetailsService } from 'src/app/utils';
import { Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/utils/services/common-service/common.service';
import { FormsModule } from '@angular/forms';
import { ListProductsComponent } from './list-products.component';
import { of } from 'rxjs/internal/observable/of';

describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;
  let records: {'test'}

  beforeEach(() => {
    const sessionStorageServiceStub = () => ({ clear: string => ({}) });
    const sharedServiceStub = () => ({
      toCheckAllPermissionRights: product => ({}),
      getListLang: () => ({ then: () => ({}) }),
      displayErrorMessage: statusText => ({}),
      setJsonResponse: (string, selectedLang) => ({ then: () => ({}) }),
      show: string => ({}),
      displaySuccessMessage: string => ({})
    });
    const loaderServiceStub = () => ({});
    const fetchUserTabDetailsServiceStub = () => ({
      setProductsSubscribeStatus: subscribeData => ({})
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const matDialogStub = () => ({
      open: (sequenceDialogComponent, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) }),
      getData: arg => ({ subscribe: f => f({}) }),
      getDataModified: string => ({ subscribe: f => f({}) }),
      putData: (string, dataPusheToBranch) => ({ subscribe: f => f({}) }),
      putDataNew: (string, dataPusheToBranch) => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListProductsComponent],
      providers: [
        {
          provide: SessionStorageService,
          useFactory: sessionStorageServiceStub
        },
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: LoaderService, useFactory: loaderServiceStub },
        {
          provide: FetchUserTabDetailsService,
          useFactory: fetchUserTabDetailsServiceStub
        },
        { provide: Router, useFactory: routerStub },
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: CommonService, useFactory: commonServiceStub, useValue: {records, getDataModified : ()=> of({}),
         getDataNew  : ()=> of({}), putData : ()=> of({}), putDataNew  : ()=> of({}),  } }
      ]
    });
    fixture = TestBed.createComponent(ListProductsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  // it(`tableHeaders has default value`, () => {
  //   expect(component.tableHeaders).toEqual([, , ,]);
  // });

  // it(`tableBranchHeaders has default value`, () => {
  //   expect(component.tableBranchHeaders).toEqual([, ,]);
  // });

  // it(`branch has default value`, () => {
  //   expect(component.branch).toEqual([, , ,]);
  // })

  it(`availableLang has default value`, () => {
    expect(component.availableLang).toEqual([]);
  });

  it(`categoryList has default value`, () => {
    expect(component.categoryList).toEqual([]);
  });

  it(`selectedLang has default value`, () => {
    expect(component.selectedLang).toEqual(`en`);
  });

  it(`options has default value`, () => {
    expect(component.options).toEqual([
      `One`,
      `Two`,
      `Three`,
      `Four`,
      `Five`,
      `Six`
    ]);
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

  it(`isSaveProduct has default value`, () => {
    expect(component.isSaveProduct).toEqual(true);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const sessionStorageServiceStub: SessionStorageService = fixture.debugElement.injector.get(
  //       SessionStorageService
  //     );
  //     spyOn(component, 'modulePermissionSets').and.callThrough();
  //     spyOn(component, 'getLangList').and.callThrough();
  //     spyOn(component, 'getProductDetails').and.callThrough();
  //     spyOn(component, 'searchFieldKey').and.callThrough();
  //     spyOn(component, 'getCategoryList').and.callThrough();
  //     spyOn(sessionStorageServiceStub, 'clear').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.modulePermissionSets).toHaveBeenCalled();
  //     expect(component.getLangList).toHaveBeenCalled();
  //     expect(component.getProductDetails).toHaveBeenCalled();
  //     expect(component.searchFieldKey).toHaveBeenCalled();
  //     expect(component.getCategoryList).toHaveBeenCalled();
  //     expect(sessionStorageServiceStub.clear).toHaveBeenCalled();
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

  // describe('selectedFieldKey', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'setFilterData').and.callThrough();
  //     spyOn(component, 'filteredData').and.callThrough();
  //     component.selectedFieldKey();
  //     expect(component.setFilterData).toHaveBeenCalled();
  //     expect(component.filteredData).toHaveBeenCalled();
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
  //     spyOn(component, 'selectBranch').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getProductDetails();
  //     expect(component.selectBranch).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
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
  //     spyOn(commonServiceStub, 'getDataModified').and.callThrough();
  //     component.getBranchList();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataModified).toHaveBeenCalled();
  //   });
  // });

  // describe('moveToBranch', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const matDialogStub: MatDialog = fixture.debugElement.injector.get(
  //       MatDialog
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(component, 'selectBranch').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     spyOn(commonServiceStub, 'putData').and.callThrough();
  //     component.moveToBranch();
  //     expect(component.selectBranch).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //     expect(commonServiceStub.putData).toHaveBeenCalled();
  //   });
  // });

  // describe('saveProduct', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(component, 'selectBranch').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'putDataNew').and.callThrough();
  //     component.saveProduct();
  //     expect(component.selectBranch).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.putDataNew).toHaveBeenCalled();
  //   });
  // });

  // describe('removeProduct', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(component, 'selectBranch').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(commonServiceStub, 'putDataNew').and.callThrough();
  //     component.removeProduct();
  //     expect(component.selectBranch).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(commonServiceStub.putDataNew).toHaveBeenCalled();
  //   });
  // });

  // describe('getAllBranchProducts', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getAllBranchProducts();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });
});