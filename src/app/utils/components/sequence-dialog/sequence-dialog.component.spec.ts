import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../services/common-service/common.service';
import { LoaderService } from '../../services/loader-service/loader.service';
import { SharedService } from '../../services/shared-service/shared.service';
import { FormsModule } from '@angular/forms';
import { SequenceDialogComponent } from './sequence-dialog.component';

describe('SequenceDialogComponent', () => {
  let component: SequenceDialogComponent;
  let fixture: ComponentFixture<SequenceDialogComponent>;

  beforeEach(() => {
    const matDialogRefStub = () => ({ close: arg => ({}) });
    const commonServiceStub = () => ({
      putDataNew: (string, dataPusheToBranch) => ({ subscribe: f => f({}) })
    });
    const loaderServiceStub = () => ({});
    const sharedServiceStub = () => ({
      displayErrorMessage: string => ({}),
      displaySuccessMessage: string => ({})
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SequenceDialogComponent],
      providers: [
        { provide: MatDialogRef, useFactory: matDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {product_sequance : 10} },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: LoaderService, useFactory: loaderServiceStub },
        { provide: SharedService, useFactory: sharedServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SequenceDialogComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`sequence has default value`, () => {
    expect(component.sequence).toEqual(1);
  });

  it(`maxSequence has default value`, () => {
    expect(component.maxSequence).toEqual(1);
  });

  it(`maxSequenceC has default value`, () => {
    expect(component.maxSequenceC).toEqual(1);
  });

  it(`seletedProdut has default value`, () => {
    expect(component.seletedProdut).toEqual([]);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const matDialogRefStub: MatDialogRef<SequenceDialogComponent> = fixture.debugElement.injector.get(
  //       MatDialogRef
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     component.data.product_sequance =  10;
  //     component.data.category_sequance  =  10;
  //     spyOn(matDialogRefStub, 'close').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.ngOnInit();
  //     expect(matDialogRefStub.close).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  describe('closeDialog', () => {
    it('makes expected calls', () => {
      const matDialogRefStub: MatDialogRef<SequenceDialogComponent> = fixture.debugElement.injector.get(
        MatDialogRef
      );
      spyOn(matDialogRefStub, 'close').and.callThrough();
      component.closeDialog();
      expect(matDialogRefStub.close).toHaveBeenCalled();
    });
  });

  // describe('saveSequence', () => {
  //   it('makes expected calls', () => {
  //     const matDialogRefStub: MatDialogRef<SequenceDialogComponent> = fixture.debugElement.injector.get(
  //       MatDialogRef
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(matDialogRefStub, 'close').and.callThrough();
  //     spyOn(commonServiceStub, 'putDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.saveSequence();
  //     expect(matDialogRefStub.close).toHaveBeenCalled();
  //     expect(commonServiceStub.putDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('saveCategorySequence', () => {
  //   it('makes expected calls', () => {
  //     const matDialogRefStub: MatDialogRef<SequenceDialogComponent> = fixture.debugElement.injector.get(
  //       MatDialogRef
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     component.data.item.warehouse_id = 1234
  //     spyOn(matDialogRefStub, 'close').and.callThrough();
  //     spyOn(commonServiceStub, 'putDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.saveCategorySequence();
  //     expect(matDialogRefStub.close).toHaveBeenCalled();
  //     expect(commonServiceStub.putDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });
});