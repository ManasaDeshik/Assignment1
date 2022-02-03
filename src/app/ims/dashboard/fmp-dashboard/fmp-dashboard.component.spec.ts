import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FetchDateInfoService } from 'src/app/utils';
import { SharedService } from 'src/app/utils';
import { CommonService } from 'src/app/utils';
import { Router } from '@angular/router';
 //import { Highcharts } from 'highcharts';
// import { NoDataToDisplay } from 'highcharts/modules/no-data-to-display';
import { TotalLeads } from 'src/app/utils';
import { ProductSold } from 'src/app/utils';
import { ReferealGenerated } from 'src/app/utils';
import { NewVle } from 'src/app/utils';
import { TotalRevenue } from 'src/app/utils';
import { GrossMargin } from 'src/app/utils';
import { FmpDashboardComponent } from './fmp-dashboard.component';

describe('FmpDashboardComponent', () => {
  let component: FmpDashboardComponent;
  let fixture: ComponentFixture<FmpDashboardComponent>;

  beforeEach(() => {
    const fetchDateInfoServiceStub = () => ({
      dateInfoAdded: { subscribe: f => f({}) }
    });
    const sharedServiceStub = () => ({
      show: string => ({}),
      displayErrorMessage: statusText => ({})
    });
    const commonServiceStub = () => ({
      getData: arg => ({ subscribe: f => f({}) })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FmpDashboardComponent],
      providers: [
        { provide: FetchDateInfoService, useFactory: fetchDateInfoServiceStub },
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(FmpDashboardComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  // it(`highcharts has default value`, () => {
  //   expect(component.highcharts).toEqual(Highcharts);
  // });

  it(`initialGraph has default value`, () => {
    expect(component.initialGraph).toEqual(true);
  });

  it(`updatedGraph has default value`, () => {
    expect(component.updatedGraph).toEqual(false);
  });

  it(`year has default value`, () => {
    expect(component.year).toEqual([]);
  });

  it(`tableHeaders has default value`, () => {
    expect(component.tableHeaders).toEqual([{ header: 'Name' }, { header: 'Leads Generated' } ,{ header: 'Product Sold' } ,{ header: 'Revenue Generated' }]);
  });

  it(`numberOfMessagesFromAPI has default value`, () => {
    expect(component.numberOfMessagesFromAPI).toEqual(1111165);
  });

  it(`rangeType has default value`, () => {
    expect(component.rangeType).toEqual(`year`);
  });

  it(`monthArray has default value`, () => {
    expect(component.monthArray).toEqual([
      `Apr`,
      `May`,
      `Jun`,
      `Jul`,
      `Aug`,
      `Sep`,
      `Oct`,
      `Nov`,
      `Dec`,
      `Jan`,
      `Feb`,
      `Mar`
    ]);
  });

  it(`xAxis has default value`, () => {
    expect(component.xAxis).toEqual([]);
  });

  it(`totalLeads has default value`, () => {
    expect(component.totalLeads).toEqual(TotalLeads);
  });

  it(`totalProductSold has default value`, () => {
    expect(component.totalProductSold).toEqual(ProductSold);
  });

  it(`totalReferalGenerated has default value`, () => {
    expect(component.totalReferalGenerated).toEqual(ReferealGenerated);
  });

  it(`totalNewVle has default value`, () => {
    expect(component.totalNewVle).toEqual(NewVle);
  });

  it(`totalRevenue has default value`, () => {
    expect(component.totalRevenue).toEqual(TotalRevenue);
  });

  it(`totalRevenueArray has default value`, () => {
    expect(component.totalRevenueArray).toEqual([]);
  });

  it(`totalGross has default value`, () => {
    expect(component.totalGross).toEqual(GrossMargin);
  });

  it(`totalRevenue2018 has default value`, () => {
    expect(component.totalRevenue2018).toEqual([
      97623.31,
      547076.58,
      122573.04,
      344293.25,
      605190.92,
      373828.4,
      1076401.61,
      2285621.08,
      489410.03296,
      4357473.56,
      2518247.42,
      24386319
    ]);
  });

  it(`totalRevenue2019 has default value`, () => {
    expect(component.totalRevenue2019).toEqual([
      384001,
      367134,
      2386782,
      7487590,
      24738946,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ]);
  });

  it(`totalProfit2018 has default value`, () => {
    expect(component.totalProfit2018).toEqual([
      26047.29,
      173388.31,
      28370.7,
      83086,
      153822.92,
      101395.26,
      451912.23,
      580107.42,
      163944.02296,
      1653240.64,
      820345.94,
      9535265.4742232
    ]);
  });

  it(`totalProfit2019 has default value`, () => {
    expect(component.totalProfit2019).toEqual([
      155307.58,
      189723.36,
      1198772.91,
      3298318.5,
      7077103.5109091,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ]);
  });

  it(`totalRevenueQuarter has default value`, () => {
    expect(component.totalRevenueQuarter).toEqual([]);
  });

  it(`totalProfitQuarter has default value`, () => {
    expect(component.totalProfitQuarter).toEqual([]);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getData').and.callThrough();
  //     spyOn(component, 'getQuarterData').and.callThrough();
  //     spyOn(component, 'graphUpdationProfit').and.callThrough();
  //     spyOn(component, 'graphUpdation').and.callThrough();
  //     spyOn(component, 'getDashboardLogistics').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getData).toHaveBeenCalled();
  //     expect(component.getQuarterData).toHaveBeenCalled();
  //     expect(component.graphUpdationProfit).toHaveBeenCalled();
  //     expect(component.graphUpdation).toHaveBeenCalled();
  //     expect(component.getDashboardLogistics).toHaveBeenCalled();
  //   });
  // });

  describe('getData', () => {
    it('makes expected calls', () => {
      spyOn(component, 'fetchIndex').and.callThrough();
      spyOn(component, 'getStaticData').and.callThrough();
      component.getData();
      expect(component.fetchIndex).toHaveBeenCalled();
      expect(component.getStaticData).toHaveBeenCalled();
    });
  });

  // describe('getDashboardLogistics', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(component, 'fetchIndex').and.callThrough();
  //     spyOn(sharedServiceStub, 'show').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getData').and.callThrough();
  //     component.getDashboardLogistics();
  //     expect(component.fetchIndex).toHaveBeenCalled();
  //     expect(sharedServiceStub.show).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getData).toHaveBeenCalled();
  //   });
  // });

  // describe('getQuarterData', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'fetchIndex').and.callThrough();
  //     component.getQuarterData();
  //     expect(component.fetchIndex).toHaveBeenCalled();
  //   });
  // });

  describe('graphUpdationProfit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'switchRangeType').and.callThrough();
      component.graphUpdationProfit();
      expect(component.switchRangeType).toHaveBeenCalled();
    });
  });

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
