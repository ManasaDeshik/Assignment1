import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FmpDashboardRevenue, FmpDashboardProfit, TotalCollections, FetchDateInfoService, TotalLeads, ProductSold, ReferealGenerated, NewVle, TotalRevenue, GrossMargin, RolePermissionVal, SharedService, CommonService, monthIntInfoCollections } from 'src/app/utils';
import { Router } from '@angular/router';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
NoDataToDisplay(Highcharts);
@Component({
  selector: 'app-fmp-dashboard',
  templateUrl: './fmp-dashboard.component.html',
  styleUrls: ['./fmp-dashboard.component.scss']
})
export class FmpDashboardComponent implements OnInit {
  public highcharts = Highcharts;
  public dashboardOption = new FmpDashboardRevenue();
  public dashboardProfit = new FmpDashboardProfit();
  public initialGraph = true;
  public updatedGraph = false;
  public date = new Date();
  public year = [];
  public Month;
  public quarterInfo: any;
  public tableHeaders: any = [
    { header: 'Name' },
    { header: 'Leads Generated' },
    { header: 'Product Sold' },
    { header: 'Revenue Generated' }
  ];

  public fromData: any;
  public toData: any;
  public numberOfMessagesFromAPI = 1111165;
  public intermediate: any;
  public One: any;
  public two: any;
  public three: any;
  public four: any;
  public five: any;
  public permissionSets: RolePermissionVal = new RolePermissionVal();
  public rangeType: string = 'year';
  public monthArray = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  public xAxis = [];
  public dashboardTotalCollections = new TotalCollections();

  //static data 
  public totalLeads = TotalLeads;
  public totalProductSold = ProductSold;
  public totalReferalGenerated = ReferealGenerated;
  public totalNewVle = NewVle;
  public totalRevenue = TotalRevenue;
  public totalRevenueArray = [];
  public filterBy: number;
  public checkedArray: any;
  public totalGross = GrossMargin;
  public totalRevenue2018 = [97623.31, 547076.58, 122573.04, 344293.25, 605190.92, 373828.4, 1076401.61, 2285621.08, 489410.03296, 4357473.56, 2518247.42, 24386319]
  public totalRevenue2019 = [384001, 367134, 2386782, 7487590, 24738946, 0, 0, 0, 0, 0, 0, 0]

  public totalProfit2018 = [26047.29, 173388.31, 28370.7, 83086, 153822.92, 101395.26, 451912.23, 580107.42, 163944.02296, 1653240.64, 820345.94, 9535265.4742232];
  public totalProfit2019 = [155307.58, 189723.36, 1198772.91, 3298318.5, 7077103.5109091, 0, 0, 0, 0, 0, 0, 0]

  public totalRevenueQuarter = [];
  public totalProfitQuarter = [];
  constructor(private fetchDate: FetchDateInfoService, private router: Router, private sharedService: SharedService, private commonService: CommonService) { }

  ngOnInit() {
    this.fetchDate.dateInfoAdded.subscribe(res => {
      this.fromData = res[0];
      this.toData = res[1];
      this.updatedGraph = res[2];
      this.initialGraph = res[3];
      this.rangeType = res[4];
      this.quarterInfo = res[5];
      this.xAxis = res[6];
      this.getData();
      if (this.quarterInfo) {
        this.getQuarterData();
      }
      if (this.rangeType === 'year' || this.rangeType === 'quarter') {
        this.filterBy = 0;
      } else if (this.rangeType === 'month' || this.rangeType === 'week') {
        this.filterBy = 2;
      }
      this.graphUpdationProfit();
      this.graphUpdation();
      this.getDashboardLogistics();
    });
    this.dashboardOption.chartOptions.xAxis.categories = this.monthArray;
    this.dashboardProfit.chartOptions.xAxis.categories = this.monthArray;
  }

  getData() {
    const fromDate = this.fetchIndex(this.fromData);
    const toDate = this.fetchIndex(this.toData);
    const totalReferalGeneratedSum = this.getStaticData(fromDate, toDate, this.totalReferalGenerated);
    const TotalRevenueSum = this.getStaticData(fromDate, toDate, this.totalRevenue, 'revenue');
    this.dashboardTotalCollections.refereal_generated = totalReferalGeneratedSum;
    this.dashboardTotalCollections.total_revenue = TotalRevenueSum;
    const checkYear = new Date(this.fromData);
    this.checkedArray = checkYear.getFullYear();
  }
  getDashboardLogistics(): void {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone.toString();
    const fromDate = this.fetchIndex(this.fromData);
    const toDate = this.fetchIndex(this.toData);
    const requestSet = '?start_date=' + fromDate + '&end_date=' + toDate + '&timezone=' + timeZone;
    this.commonService.getData('admin/dashboard/logistics' + requestSet).subscribe(res => {
      if (res.success) {
        this.dashboardTotalCollections.total_leads = res.payload.total_leads;
        this.dashboardTotalCollections.new_VLEs = res.payload.new_VLEs;
        this.dashboardTotalCollections.total_VLEs = res.payload.total_VLEs;
        this.dashboardTotalCollections.product_sold = res.payload.product_sold;
      }
    }, err => {
         this.sharedService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  getStaticData(fromDate, toDate, data, type?) {
    let sum = 0;
    const firstIndex = data.findIndex(ele => ele.date === fromDate);
    const lastIndex = data.findIndex(ele => ele.date === toDate);

    data.forEach((ele, index) => {
      if (firstIndex <= index) {
        if (index <= lastIndex) {
          sum += ele.value;
        }
      }
    });
    if (type === 'revenue') {
      this.totalRevenueArray = [];
      data.forEach((ele, index) => {
        if (firstIndex <= index) {
          if (index <= lastIndex) {
            this.totalRevenueArray.push(ele.value);
          }
        }
      });
    }
    return sum;
  }

  getQuarterData() {
    const fromData = new Date(this.fromData);
    let incrementMonth = this.quarterInfo.startMonth;
    const lastMonth = this.quarterInfo.endMonth;
    this.totalRevenueQuarter = [];
    this.totalProfitQuarter = [];
    while (incrementMonth <= lastMonth) {
      let sum = 0;
      let grossSum = 0;
      let lastDayOfMonth;
      const firstDayOfMonth = new Date(fromData.getFullYear(), incrementMonth, this.quarterInfo.startDate);
      if (fromData.getFullYear() === 2019 && incrementMonth === 8) {
        lastDayOfMonth = new Date(fromData.getFullYear(), 8, 1);
      } else {
        lastDayOfMonth = new Date(fromData.getFullYear(), incrementMonth + 1, 0);
      }
      const fromDate = this.fetchIndex(firstDayOfMonth);
      const toDate = this.fetchIndex(lastDayOfMonth);
      const firstIndex = this.totalRevenue.findIndex(ele => ele.date === fromDate);
      const lastIndex = this.totalRevenue.findIndex(ele => ele.date === toDate);
      this.totalRevenue.forEach((ele, index) => {
        if (firstIndex <= index) {
          if (index <= lastIndex) {
            sum += ele.value;
          }
        }
      });
      this.totalGross.forEach((ele, index) => {
        if (firstIndex <= index) {
          if (index <= lastIndex) {
            grossSum += ele.Value;
          }
        }
      });
      incrementMonth++;
      if (sum !== 0) {
        this.totalRevenueQuarter.push(sum);
      }
      if (grossSum !== 0) {
        this.totalProfitQuarter.push(grossSum);
      }
    }
  }

  fetchIndex(date) {
    const calculateDate = new Date(date);
    const resultDate = calculateDate.getMonth() + 1 + '/' + calculateDate.getDate() + '/' + calculateDate.getFullYear();
    return resultDate;
  }

  graphUpdationProfit() {
    let profitUpdate;

    if (this.checkedArray === 2018) {
      profitUpdate = this.totalProfit2018;
    } else {
      profitUpdate = this.totalProfit2019;
    }
    let filterBy = 1;
    if (this.rangeType === 'year' || this.rangeType === 'quarter') {
      filterBy = 2;
    }
    this.switchRangeType(this.rangeType);
  }
  switchRangeType(rangeType): void {
    this.dashboardProfit = new FmpDashboardProfit();
    this.dashboardProfit.chartOptions.series[0].data = [];
    switch (rangeType) {
      case 'week':
        this.dashboardProfit.chartOptions.xAxis.categories = this.xAxis;
        this.dashboardProfit.chartOptions.series[0].name = 'Week';
        break;
      case 'month':
        this.dashboardProfit.chartOptions.series[0].data = [];
        this.dashboardProfit.chartOptions.xAxis.categories = this.xAxis;
        this.dashboardProfit.chartOptions.series[0].name = 'Day';
        break;

      case 'year':
        this.dashboardProfit.chartOptions.xAxis.categories = this.monthArray;
        this.dashboardProfit.chartOptions.series[0].name = 'Year';
        break;
      case 'quarter':
        this.dashboardProfit.chartOptions.xAxis.categories = this.quarterInfo.quarterInfo;
        this.dashboardProfit.chartOptions.series[0].data = this.totalProfitQuarter;
        this.dashboardProfit.chartOptions.series[0].name = this.quarterInfo.quarter;
        break;
    }
  }
  graphUpdation() {
    const fromDate = this.fetchIndex(this.fromData);
    const toDate = this.fetchIndex(this.toData);
    const requestSet = `?from_date=${fromDate}&to_date=${toDate}&filter_by=${this.filterBy}`;
    this.commonService.getData(`admin/statistics/revenue` + requestSet).subscribe(res => {
      this.getGraphInfo(res.payload);
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }


  getGraphInfo(response): void {
    this.dashboardOption = new FmpDashboardRevenue();
    this.dashboardOption.chartOptions.series[0].data = [];
    switch (this.rangeType) {
      case 'week':
        this.dashboardOption.chartOptions.series[0].data = this.setXaxisCategoryData(this.xAxis, response, this.rangeType);
        break;
      case 'month':
        this.dashboardOption.chartOptions.series[0].data = this.setXaxisCategoryData(this.xAxis, response, this.rangeType);
        break;
      case 'year':
        const yearData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.dashboardOption.chartOptions.series[0].data = this.setXaxisCategoryData(yearData, response, 'year');
        break;
      case 'quarter':
        this.dashboardOption.chartOptions.series[0].data = this.setXaxisCategoryData(this.quarterInfo.quarterInfo, response, this.rangeType);
        break;
    }
  }
  setXaxisCategoryData(xAxisListData, response, type) {
    this.dashboardOption.chartOptions.xAxis.categories = xAxisListData;
    this.dashboardOption.chartOptions.series[0].name = 'Revenue Count';
    if (response.length > 0) {
      if (type === 'year' || type === 'quarter') {
        const res = xAxisListData.map(ele => {
          const isFindVal = response.find(val => monthIntInfoCollections[val.filter] === ele);
          if (isFindVal) {
            return isFindVal.revenue;
          } else {
            return 0;
          }
        });
        return res;
      } else {
        const res = xAxisListData.map(ele => {
          const isFindVal = response.find(val => `${val.day} ${monthIntInfoCollections[val.filter]}` === ele);
          if (isFindVal) {
            return isFindVal.revenue;
          } else {
            return 0;
          }
        });
        return res;
      }
    } else {
      return response;
    }
  }
  routeToWarehouse(routeData: string) {
    this.router.navigate([`dashboard/${routeData}`]);
  }

}
