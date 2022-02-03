import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FetchUserTabDetailsService } from 'src/app/utils';
import { SharedService } from 'src/app/utils';
import { LoaderService } from 'src/app/utils';
import { CommonService } from 'src/app/utils';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tryBuyCollections } from 'src/app/utils';
import { FormsModule } from '@angular/forms';
import { ListOfTryBuyComponent } from './list-of-try-buy.component';
import { PaginatePipe, PaginationService } from 'ngx-pagination';

describe('ListOfTryBuyComponent', () => {
  let component: ListOfTryBuyComponent;
  let fixture: ComponentFixture<ListOfTryBuyComponent>;

  beforeEach(() => {
    const fetchUserTabDetailsServiceStub = () => ({
      setTryBuyStatus: subscribeData => ({})
    });
    const sharedServiceStub = () => ({
      toCheckAllPermissionRights: tryAndBuy => ({}),
      displayErrorMessage: statusText => ({}),
      openDialog: leadName => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      }),
      displaySuccessMessage: string => ({})
    });
    const loaderServiceStub = () => ({});
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) }),
      deleteDataNew: (string, data) => ({ subscribe: f => f({}) })
    });
    const matDialogStub = () => ({});
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListOfTryBuyComponent, PaginatePipe],
      providers: [
        {
          provide: FetchUserTabDetailsService,
          useFactory: fetchUserTabDetailsServiceStub
        },
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: LoaderService, useFactory: loaderServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        PaginationService,
        { provide: PaginatePipe},
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(ListOfTryBuyComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`tableHeaders has default value`, () => {
    expect(component.tableHeaders).toEqual([{ header: 'Product', sortText: 'productName' }, { header: 'VLE Name', sortText: 'vleName' },
    { header: 'VLE ID', sortText: 'vleId' } ,{ header: 'Branch Name', sortText: 'branchName' } ,{ header: 'State', sortText: 'stateName' } ,
    { header: 'Customer Name', sortText: 'customerName' } ,{ header: 'Customer Phone Number', sortText: 'customerPhoneNo' } ,
    { header: 'Customer Village' } ,{ header: 'Territory Manager' } ,{ header: 'Registered Date', sortText: 'registrationDate' } ,
    { header: 'Start Date', sortText: 'startDate' } ,{ header: 'End Date', sortText: 'endDate' } ,{ header: 'Try & Buy Status' } ,
    { header: 'Buying Date / Status Date' } ,{ header: 'Status Reason', sortText: 'status' }]);
  });

  it(`orderTabs has default value`, () => {
    expect(component.orderTabs).toEqual(tryBuyCollections);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getData').and.callThrough();
  //     spyOn(component, 'modulePermissionSets').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getData).toHaveBeenCalled();
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

  // describe('getData', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     component.getData();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //   });
  // });
});
