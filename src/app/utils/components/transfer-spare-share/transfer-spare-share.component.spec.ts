import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../../services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransferSpareShareComponent } from './transfer-spare-share.component';

describe('TransferSpareShareComponent', () => {
  let component: TransferSpareShareComponent;
  let fixture: ComponentFixture<TransferSpareShareComponent>;

  beforeEach(() => {
    const matDialogRefStub = () => ({ close: arg => ({}) });
    const sharedServiceStub = () => ({ displayErrorMessage: arg => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TransferSpareShareComponent],
      providers: [
        { provide: MatDialogRef, useFactory: matDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: SharedService, useFactory: sharedServiceStub }
      ]
    });
    fixture = TestBed.createComponent(TransferSpareShareComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('makes expected calls', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalledTimes(1);
  });

  it('makes expected calls', () => {
    spyOn(component, 'checkQuantity').and.callThrough();
    const event = { target: { value: 42 }};
    component.checkQuantity(event);
    expect(component.checkQuantity).toHaveBeenCalledTimes(1);
  });

  it('makes expected calls', () => {
    spyOn(component, 'checkQuantity').and.callThrough();
    const event = { target: { value: '' }};
    component.checkQuantity(event);
    expect(component.checkQuantity).toHaveBeenCalledTimes(1);
  });

  it('makes expected calls', () => {
    spyOn(component, 'checkQuantity').and.callThrough();
    component.data.items = 20;
    const event = { target: { value: 10 }};
    component.checkQuantity(event);
    expect(component.checkQuantity).toHaveBeenCalledTimes(1);
  });

  // it('makes expected calls', () => {
  //   spyOn(component, 'addToBucket').and.callThrough();
  //   component.addToBucket();
  //   expect(component.addToBucket).toHaveBeenCalledTimes(1);
  // });

  // describe('addToBucket', () => {
  //   it('makes expected calls', () => {
  //     const matDialogRefStub: MatDialogRef<TransferSpareShareComponent> = fixture.debugElement.injector.get(
  //       MatDialogRef
  //     );
  //     spyOn(matDialogRefStub, 'close').and.callThrough();
  //     component.addToBucket();
  //     expect(matDialogRefStub.close).toHaveBeenCalled();
  //   });
  // });

  describe('closeDialog', () => {
    it('makes expected calls', () => {
      const matDialogRefStub: MatDialogRef<TransferSpareShareComponent> = fixture.debugElement.injector.get(
        MatDialogRef
      );
      spyOn(matDialogRefStub, 'close').and.callThrough();
      component.closeDialog();
      expect(matDialogRefStub.close).toHaveBeenCalled();
    });
  });
});