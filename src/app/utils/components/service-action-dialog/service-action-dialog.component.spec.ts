import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../services';
import { SharedService } from '../../services';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ServiceActionDialogComponent } from './service-action-dialog.component';

describe('ServiceActionDialogComponent', () => {
  let component: ServiceActionDialogComponent;
  let fixture: ComponentFixture<ServiceActionDialogComponent>;
  let spares: {test};

  beforeEach(() => {
    const matDialogRefStub = () => ({ close: status => ({}) });
    const commonServiceStub = () => ({
      putData: (string, updateServiceData) => ({ subscribe: f => f({}) }),
      getData: arg => ({ subscribe: f => f({}) })
    });
    const sharedServiceStub = () => ({
      displaySuccessMessage: arg => ({}),
      displayErrorMessage: statusText => ({})
    });
    const formBuilderStub = () => ({
      group: object => ({executive_user_id: '10', service_charge: '10', service_id: '10', status: 'test', spares:['test','test']}),
      array: array => (['test','test'])
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ServiceActionDialogComponent],
      providers: [
        { provide: MatDialogRef, useFactory: matDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: FormBuilder, useFactory: formBuilderStub }
      ]
    });
    fixture = TestBed.createComponent(ServiceActionDialogComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`serviceRemarks has default value`, () => {
    expect(component.serviceRemarks).toEqual([{ name: 'RESOLVED_ON_REMOTE', val: 1 },{ name: 'REJECTED_ON_REMOTE', val: 1 }]);
  });

  it(`productSpareList has default value`, () => {
    expect(component.productSpareList).toEqual([]);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     component.data.identifier = 'toOutOfDeliveryfromAdmin';
  //     component.data.actionType = 'rejectServiceInStation';
  //     spyOn(component, 'createServiceStationForm').and.callThrough();
  //     spyOn(component, 'getRoleList').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.createServiceStationForm).toHaveBeenCalled();
  //    // expect(component.getRoleList).toHaveBeenCalledTimes(1);
  //   });

  //   it('makes expected calls', () => {
  //     component.data.identifier = 'directDeliverByOe';
  //     spyOn(component, 'createServiceStationForm').and.callThrough();
  //     spyOn(component, 'getRoleList').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.createServiceStationForm).toHaveBeenCalled();
  //    // expect(component.getRoleList).toHaveBeenCalledTimes(1);
  //   });
  // });

  describe('createServiceStationForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      spyOn(formBuilderStub, 'array').and.callThrough();
      component.createServiceStationForm();
      expect(formBuilderStub.group).toHaveBeenCalled();
      expect(formBuilderStub.array).toHaveBeenCalled();
    });
  });

  describe('spareDetails', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.spareDetails();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  // describe('generateSpareDetails', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'spareDetails').and.callThrough();
  //     component.generateSpareDetails();
  //     expect(component.spareDetails).toHaveBeenCalled();
  //   });
  // });

  // describe('updateData', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'closeDialog').and.callThrough();
  //     spyOn(commonServiceStub, 'putData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.updateData();
  //     expect(component.closeDialog).toHaveBeenCalled();
  //     expect(commonServiceStub.putData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('approveInServiceData', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'updateProductSpareParts').and.callThrough();
  //     spyOn(commonServiceStub, 'putData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.approveInServiceData();
  //     expect(component.updateProductSpareParts).toHaveBeenCalled();
  //     expect(commonServiceStub.putData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('updateProductSpareParts', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'calculateServicePrice').and.callThrough();
  //     spyOn(commonServiceStub, 'putData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.updateProductSpareParts();
  //     expect(component.calculateServicePrice).toHaveBeenCalled();
  //     expect(commonServiceStub.putData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('calculateServicePrice', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.calculateServicePrice();
  //     expect(commonServiceStub.getData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('generateInvoice', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'updateServiceToDeliver').and.callThrough();
  //     spyOn(commonServiceStub, 'getData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.generateInvoice();
  //     expect(component.updateServiceToDeliver).toHaveBeenCalled();
  //     expect(commonServiceStub.getData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('updateServiceToDeliver', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'closeDialog').and.callThrough();
  //     spyOn(commonServiceStub, 'putData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.updateServiceToDeliver();
  //     expect(component.closeDialog).toHaveBeenCalled();
  //     expect(commonServiceStub.putData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('getRoleList', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getRoleList();
  //     expect(commonServiceStub.getData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });
});