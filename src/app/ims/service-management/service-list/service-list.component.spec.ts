import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonService } from 'src/app/utils';
import { LoaderService } from 'src/app/utils';
import { SharedService } from 'src/app/utils';
import { ServiceRecordList } from 'src/app/utils';
import { FetchUserTabDetailsService } from 'src/app/utils';
import { ServiceListStatus } from 'src/app/utils';
import { MatDialog } from '@angular/material/dialog';
import { serviceListStatus } from 'src/app/utils';
import { serviceTrackStatus } from 'src/app/utils';
import { assignSubTabStatus } from 'src/app/utils';
import { pickUpSubTabStatus } from 'src/app/utils';
import { FormsModule } from '@angular/forms';
import { ServiceListComponent } from './service-list.component';
import { PaginatePipe, PaginationService } from 'ngx-pagination';

describe('ServiceListComponent', () => {
  let component: ServiceListComponent;
  let fixture: ComponentFixture<ServiceListComponent>;

  beforeEach(() => {
    const commonServiceStub = () => ({
      getData: arg => ({ subscribe: f => f({}) })
    });
    const loaderServiceStub = () => ({});
    const sharedServiceStub = () => ({
      displayErrorMessage: statusText => ({})
    });
    const fetchUserTabDetailsServiceStub = () => ({
      shareServiceData: data => ({})
    });
    const matDialogStub = () => ({
      open: (serviceActionDialogComponent, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ServiceListComponent, PaginatePipe],
      providers: [
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: LoaderService, useFactory: loaderServiceStub },
        { provide: SharedService, useFactory: sharedServiceStub },
        PaginationService,
        { provide: PaginatePipe},
        {
          provide: FetchUserTabDetailsService,
          useFactory: fetchUserTabDetailsServiceStub
        },
        { provide: MatDialog, useFactory: matDialogStub }
      ]
    });
    fixture = TestBed.createComponent(ServiceListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`serviceStatus has default value`, () => {
    expect(component.serviceStatus).toEqual(serviceListStatus);
  });

  it(`serviceTrack has default value`, () => {
    expect(component.serviceTrack).toEqual(serviceTrackStatus);
  });

  it(`assaignedSubTab has default value`, () => {
    expect(component.assaignedSubTab).toEqual(assignSubTabStatus);
  });

  it(`pickUpSubTab has default value`, () => {
    expect(component.pickUpSubTab).toEqual(pickUpSubTabStatus);
  });

  it(`activeBtn has default value`, () => {
    expect(component.activeBtn).toEqual(`Received`);
  });

  it(`showComplaint has default value`, () => {
    expect(component.showComplaint).toEqual(true);
  });

  it(`showOEName has default value`, () => {
    expect(component.showOEName).toEqual(true);
  });

  it(`showEstimate has default value`, () => {
    expect(component.showEstimate).toEqual(true);
  });

  it(`showAssgDate has default value`, () => {
    expect(component.showAssgDate).toEqual(true);
  });

  it(`showRejectDate has default value`, () => {
    expect(component.showRejectDate).toEqual(true);
  });

  it(`showServiceDate has default value`, () => {
    expect(component.showServiceDate).toEqual(true);
  });

  it(`showRemarks has default value`, () => {
    expect(component.showRemarks).toEqual(true);
  });

  it(`showOtherRemarks has default value`, () => {
    expect(component.showOtherRemarks).toEqual(true);
  });

  it(`showTotalCost has default value`, () => {
    expect(component.showTotalCost).toEqual(false);
  });

  describe('makeActive', () => {
    it('makes expected calls', () => {
      const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
        FetchUserTabDetailsService
      );
      const serviceListStatusStub: ServiceListStatus = <any>{};
      spyOn(component, 'activeTab').and.callThrough();
      spyOn(component, 'arrageTab').and.callThrough();
      spyOn(component, 'getServiceList').and.callThrough();
      spyOn(
        fetchUserTabDetailsServiceStub,
        'shareServiceData'
      ).and.callThrough();
      component.makeActive(serviceListStatusStub);
      expect(component.activeTab).toHaveBeenCalled();
      expect(component.arrageTab).toHaveBeenCalled();
      expect(component.getServiceList).toHaveBeenCalled();
      expect(
        fetchUserTabDetailsServiceStub.shareServiceData
      ).toHaveBeenCalled();
    });
  });

  describe('makeSubActive', () => {
    it('makes expected calls', () => {
      const serviceListStatusStub: ServiceListStatus = <any>{};
      spyOn(component, 'getServiceList').and.callThrough();
      component.makeSubActive(serviceListStatusStub);
      expect(component.getServiceList).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getServiceList').and.callThrough();
      spyOn(component, 'activeTab').and.callThrough();
      spyOn(component, 'arrageTab').and.callThrough();
      component.ngOnInit();
      expect(component.getServiceList).toHaveBeenCalled();
      expect(component.activeTab).toHaveBeenCalled();
      expect(component.arrageTab).toHaveBeenCalled();
    });
  });

  // describe('getServiceList', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
  //       FetchUserTabDetailsService
  //     );
  //     spyOn(commonServiceStub, 'getData').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(
  //       fetchUserTabDetailsServiceStub,
  //       'shareServiceData'
  //     ).and.callThrough();
  //     component.getServiceList();
  //     expect(commonServiceStub.getData).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(
  //       fetchUserTabDetailsServiceStub.shareServiceData
  //     ).toHaveBeenCalled();
  //   });
  // });

  describe('searchFilter', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getServiceList').and.callThrough();
      component.searchFilter();
      expect(component.getServiceList).toHaveBeenCalled();
    });
  });
});
