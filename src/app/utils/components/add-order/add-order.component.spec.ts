import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../../services';
import { SharedService } from '../../services';
import { FormsModule } from '@angular/forms';
import { AddOrderComponent } from './add-order.component';

describe('AddOrderComponent', () => {
  let component: AddOrderComponent;
  let fixture: ComponentFixture<AddOrderComponent>;

  beforeEach(() => {
    const matDialogStub = () => ({
      open: (confirmationDialogComponent, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    const matDialogRefStub = () => ({ close: () => ({}) });
    const formBuilderStub = () => ({});
    const commonServiceStub = () => ({
      getdevNew: arg => ({ subscribe: f => f({}) }),
      getDataNew: arg => ({ subscribe: f => f({}) }),
      getData: arg => ({ subscribe: f => f({}) }),
      postDataNew: (string, obj) => ({ subscribe: f => f({}) })
    });
    const sharedServiceStub = () => ({
      show: string => ({}),
      displayErrorMessage: statusText => ({}),
      displaySuccessMessage: string => ({})
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AddOrderComponent],
      providers: [
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: MatDialogRef, useFactory: matDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: SharedService, useFactory: sharedServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AddOrderComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`oneDisable has default value`, () => {
    expect(component.oneDisable).toEqual(false);
  });

  it(`twoDisable has default value`, () => {
    expect(component.twoDisable).toEqual(true);
  });

  it(`threeDisable has default value`, () => {
    expect(component.threeDisable).toEqual(true);
  });

  it(`oneView has default value`, () => {
    expect(component.oneView).toEqual(true);
  });

  it(`twoView has default value`, () => {
    expect(component.twoView).toEqual(false);
  });

  it(`threeView has default value`, () => {
    expect(component.threeView).toEqual(false);
  });

  it(`deliver has default value`, () => {
    expect(component.deliver).toEqual([`Deliver to lead`, `Deliver to Saheli`]);
  });

  it(`products has default value`, () => {
    expect(component.products).toEqual([]);
  });

  it(`tableHeaders has default value`, () => {
    expect(component.tableHeaders).toEqual([{ header: 'Product Name' }, { header: 'Quantity' } , { header: 'Price' } ,
    { header: 'Amount' } ,{ header: 'Activity' }]);
  });

  it(`productsFrom has default value`, () => {
    expect(component.productsFrom).toEqual([{ title: '', quantity: 1 }]);
  });

  it(`totalAmount has default value`, () => {
    expect(component.totalAmount).toEqual(0);
  });

  it(`delivery has default value`, () => {
    expect(component.delivery).toEqual([
      `Advance`,
      `Cash on delivery`,
      `Cash Withdrawal`,
      `Online Payment`,
      `EMI`
    ]);
  });

  it(`delivery_option has default value`, () => {
    expect(component.delivery_option).toEqual(1);
  });

  it(`payment_method has default value`, () => {
    expect(component.payment_method).toEqual(1);
  });

  describe('closeDialog', () => {
    it('makes expected calls', () => {
      const matDialogRefStub: MatDialogRef<AddOrderComponent> = fixture.debugElement.injector.get(
        MatDialogRef
      );
      spyOn(matDialogRefStub, 'close').and.callThrough();
      component.closeDialog();
      expect(matDialogRefStub.close).toHaveBeenCalled();
    });
  });

  describe('removeAll', () => {
    it('makes expected calls', () => {
      spyOn(component, 'totalAmountCalculate').and.callThrough();
      component.removeAll();
      expect(component.totalAmountCalculate).toHaveBeenCalled();
    });
  });

  // describe('confirm', () => {
  //   it('makes expected calls', () => {
  //     const matDialogStub: MatDialog = fixture.debugElement.injector.get(
  //       MatDialog
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'removeAll').and.callThrough();
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(commonServiceStub, 'getData').and.callThrough();
  //     spyOn(commonServiceStub, 'postDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'show').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     component.confirm();
  //     expect(component.removeAll).toHaveBeenCalled();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(commonServiceStub.getData).toHaveBeenCalled();
  //     expect(commonServiceStub.postDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.show).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('placeOrder', () => {
  //   it('makes expected calls', () => {
  //     const matDialogRefStub: MatDialogRef<AddOrderComponent> = fixture.debugElement.injector.get(
  //       MatDialogRef
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(matDialogRefStub, 'close').and.callThrough();
  //     spyOn(commonServiceStub, 'postDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'show').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.placeOrder();
  //     expect(matDialogRefStub.close).toHaveBeenCalled();
  //     expect(commonServiceStub.postDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.show).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });
});
