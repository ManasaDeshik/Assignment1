import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonService } from 'src/app/utils';
import { SharedService } from 'src/app/utils';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ListCreationPoSpareComponent } from './list-creation-po-spare.component';

describe('ListCreationPoSpareComponent', () => {
  let component: ListCreationPoSpareComponent;
  let fixture: ComponentFixture<ListCreationPoSpareComponent>;

  beforeEach(() => {
    const commonServiceStub = () => ({
      patchData: (string, obj) => ({ subscribe: f => f({}) }),
      postData: (string, data) => ({ subscribe: f => f({}) })
    });
    const sharedServiceStub = () => ({
      urlSegmentKeys: () => ({ path: {}, length: {} }),
      displayErrorMessage: string => ({}),
      openDialog: name => ({ afterClosed: () => ({ subscribe: f => f({}) }) })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const matDialogStub = () => ({
      open: (confirmationDialogComponent, object) => ({
        afterClosed: () => ({ pipe: () => ({ subscribe: f => f({}) }) })
      })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListCreationPoSpareComponent],
      providers: [
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: MatDialog, useFactory: matDialogStub }
      ]
    });
    fixture = TestBed.createComponent(ListCreationPoSpareComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`tableHeaders has default value`, () => {
    expect(component.tableHeaders).toEqual([
      `SL No`,
      `Description of Goods`,
      `Quantity`,
      `Rate`,
      `Per`,
      `Amount`
    ]);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getRouteSegments').and.callThrough();
  //     spyOn(component, 'getListCreationSpare').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getRouteSegments).toHaveBeenCalled();
  //     expect(component.getListCreationSpare).toHaveBeenCalled();
  //   });
  // });

  // describe('getListCreationSpare', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'patchSpareArrayList').and.callThrough();
  //     component.getListCreationSpare();
  //     expect(component.patchSpareArrayList).toHaveBeenCalled();
  //   });
  // });

  // describe('getRouteSegments', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(sharedServiceStub, 'urlSegmentKeys').and.callThrough();
  //     component.getRouteSegments();
  //     expect(sharedServiceStub.urlSegmentKeys).toHaveBeenCalled();
  //   });
  // });

  // describe('routeToPurchaseOrderSpare', () => {
  //   it('makes expected calls', () => {
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     const matDialogStub: MatDialog = fixture.debugElement.injector.get(
  //       MatDialog
  //     );
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     component.routeToPurchaseOrderSpare();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //   });
  // });

  // describe('printPurchaseOrder', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'savePrint').and.callThrough();
  //     spyOn(commonServiceStub, 'postData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.printPurchaseOrder();
  //     expect(component.savePrint).toHaveBeenCalled();
  //     expect(commonServiceStub.postData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('savePrint', () => {
  //   it('makes expected calls', () => {
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     component.savePrint();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //   });
  // });

});