import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from 'src/app/utils';
import { FetchDateInfoService } from 'src/app/utils';
import { CommonService } from 'src/app/utils';
// import { Highcharts } from 'highcharts';
import { FormsModule } from '@angular/forms';
import { FmpDashboardBranchInfoComponent } from './fmp-dashboard-branch-info.component';

describe('FmpDashboardBranchInfoComponent', () => {
  let component: FmpDashboardBranchInfoComponent;
  let fixture: ComponentFixture<FmpDashboardBranchInfoComponent>;

  beforeEach(() => {
    const sharedServiceStub = () => ({
      urlSegmentKeys: () => ({ path: {} }),
      getBranchData: path => ({}),
      displayErrorMessage: statusText => ({})
    });
    const fetchDateInfoServiceStub = () => ({
      dateInfoAdded: { subscribe: f => f({}) }
    });
    const commonServiceStub = () => ({
      getData: arg => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FmpDashboardBranchInfoComponent],
      providers: [
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: FetchDateInfoService, useFactory: fetchDateInfoServiceStub },
        { provide: CommonService, useFactory: commonServiceStub }
      ]
    });
    fixture = TestBed.createComponent(FmpDashboardBranchInfoComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`branchList has default value`, () => {
    expect(component.branchList).toEqual([]);
  });

  // it(`highcharts has default value`, () => {
  //   expect(component.highcharts).toEqual(Highcharts);
  // });

  it(`urlSegmentKeys has default value`, () => {
    expect(component.urlSegmentKeys).toEqual([]);
  });

  it(`roleCollections has default value`, () => {
    expect(component.roleCollections).toEqual([]);
  });

  it(`rangeType has default value`, () => {
    expect(component.rangeType).toEqual(`year`);
  });

  it(`xAxis has default value`, () => {
    expect(component.xAxis).toEqual([]);
  });

  it(`initialGraph has default value`, () => {
    expect(component.initialGraph).toEqual(true);
  });

  it(`updatedGraph has default value`, () => {
    expect(component.updatedGraph).toEqual(false);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'fetchParticularBranchInfo').and.callThrough();
  //     spyOn(component, 'getBranchInfo').and.callThrough();
  //     spyOn(component, 'graphUpdation').and.callThrough();
  //     spyOn(sharedServiceStub, 'urlSegmentKeys').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.fetchParticularBranchInfo).toHaveBeenCalled();
  //     expect(component.getBranchInfo).toHaveBeenCalled();
  //     expect(component.graphUpdation).toHaveBeenCalled();
  //     expect(sharedServiceStub.urlSegmentKeys).toHaveBeenCalled();
  //   });
  // });

  // describe('fetchParticularBranchInfo', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'updateGraph').and.callThrough();
  //     spyOn(sharedServiceStub, 'urlSegmentKeys').and.callThrough();
  //     spyOn(sharedServiceStub, 'getBranchData').and.callThrough();
  //     component.fetchParticularBranchInfo();
  //     expect(component.updateGraph).toHaveBeenCalled();
  //     expect(sharedServiceStub.urlSegmentKeys).toHaveBeenCalled();
  //     expect(sharedServiceStub.getBranchData).toHaveBeenCalled();
  //   });
  // });

  // describe('getBranchInfo', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(component, 'fetchIndex').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getData').and.callThrough();
  //     component.getBranchInfo();
  //     expect(component.fetchIndex).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getData).toHaveBeenCalled();
  //   });
  // });

  // describe('graphUpdation', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(component, 'fetchIndex').and.callThrough();
  //     spyOn(component, 'getGraphInfo').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getData').and.callThrough();
  //     component.graphUpdation();
  //     expect(component.fetchIndex).toHaveBeenCalled();
  //     expect(component.getGraphInfo).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getData).toHaveBeenCalled();
  //   });
  // });
});
