import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonService } from 'src/app/utils';
import { SharedService } from 'src/app/utils';
import { FetchUserTabDetailsService } from 'src/app/utils';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ListDemoProductComponent } from './list-demo-product.component';
import { PaginatePipe, PaginationService } from 'ngx-pagination';

describe('ListDemoProductComponent', () => {
  let component: ListDemoProductComponent;
  let fixture: ComponentFixture<ListDemoProductComponent>;

  beforeEach(() => {
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) }),
      postDataNew: (string, result) => ({ subscribe: f => f({}) }),
      putDataNew: (string, requestData) => ({ subscribe: f => f({}) })
    });
    const sharedServiceStub = () => ({
      toCheckAllPermissionRights: demoProduct => ({}),
      displaySuccessMessage: arg => ({}),
      displayErrorMessage: statusText => ({})
    });
    const fetchUserTabDetailsServiceStub = () => ({
      shareServiceData: selectedBtnVal => ({}),
      setDemoProductSubscribeStatus: subscribeData => ({})
    });
    const matDialogStub = () => ({
      open: (filterDialogComponent, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListDemoProductComponent, PaginatePipe],
      providers: [
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: SharedService, useFactory: sharedServiceStub },
        {
          provide: FetchUserTabDetailsService,
          useFactory: fetchUserTabDetailsServiceStub
        },
        { provide: MatDialog, useFactory: matDialogStub },
        PaginationService,
        { provide: PaginatePipe}
      ]
    });
    fixture = TestBed.createComponent(ListDemoProductComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`selectedBtnVal has default value`, () => {
    expect(component.selectedBtnVal).toEqual(4);
  });

  it(`tableHeaders has default value`, () => {
    expect(component.tableHeaders).toEqual([{ header: 'Product Name' }, { header: 'Assigned by' } , { header: 'Warehouse' },
    { header: 'Branch' } , { header: 'Assigned to' } , { header: 'Mobile No' } , { header: 'Village' } , { header: 'Role' } ,
    { header: 'Quantity' } , { header: 'Returned Quantity' } ,{ header: 'Price' } , { header: 'Issued Date' }, { header: 'Received Date' }]);
  });

  it(`demoListStatus has default value`, () => {
    expect(component.demoListStatus).toEqual([{ name: 'Issued', val: 4 },{ name: 'Returned', val: 5 }]);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getDemoProducts').and.callThrough();
  //     spyOn(component, 'modulePermissionSets').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getDemoProducts).toHaveBeenCalled();
  //     expect(component.modulePermissionSets).toHaveBeenCalled();
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

  // describe('getDemoProducts', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getDemoProducts();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });

  // describe('searchFilter', () => {
  //   it('makes expected calls', () => {
  //     const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
  //       FetchUserTabDetailsService
  //     );
  //     spyOn(component, 'getDemoProducts').and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'setDemoProductSubscribeStatus'
  //     ).and.callThrough();
  //     component.searchFilter();
  //     expect(component.getDemoProducts).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.setDemoProductSubscribeStatus
  //     ).toHaveBeenCalled();
  //   });
  // });

  // describe('applyFilter', () => {
  //   it('makes expected calls', () => {
  //     const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
  //       FetchUserTabDetailsService
  //     );
  //     const matDialogStub: MatDialog = fixture.debugElement.injector.get(
  //       MatDialog
  //     );
  //     spyOn(component, 'getDemoProducts').and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'setDemoProductSubscribeStatus'
  //     ).and.callThrough();
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     component.applyFilter();
  //     expect(component.getDemoProducts).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.setDemoProductSubscribeStatus
  //     ).toHaveBeenCalled();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //   });
  // });
});
