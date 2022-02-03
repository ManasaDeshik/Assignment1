import { Component, OnInit } from '@angular/core';
import { TableViewRequestSet, FmpDashboardRevenue, NewVLEPieChart, BranchInfoSet, SharedService, FetchDateInfoService, CommonService, monthIntInfoCollections } from 'src/app/utils';
import * as Highcharts from 'highcharts';
import { UrlSegment } from '@angular/router';
@Component({
  selector: 'app-fmp-dashboard-branch-info',
  templateUrl: './fmp-dashboard-branch-info.component.html',
  styleUrls: ['./fmp-dashboard-branch-info.component.scss']
})
export class FmpDashboardBranchInfoComponent implements OnInit {
  public branchList = [];
  public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
  public fmpBranchInfo: BranchInfoSet = new BranchInfoSet();
  public highcharts = Highcharts;
  public urlSegmentKeys: UrlSegment[] = [];
  public roleCollections = [];
  public roleName: string;
  public dashboardOption: any;
  public filterBy: number;
  public fromData: any;
  public toData: any;
  public rangeType: string = 'year';
  public xAxis = [];
  public initialGraph = true;
  public updatedGraph = false;
  public quarterInfo: any;
  public graphType: string;
  constructor(private sharedService: SharedService, private fetchDate: FetchDateInfoService, private commonService: CommonService) { }

  ngOnInit() {
    this.fetchParticularBranchInfo();
    this.urlSegmentKeys = this.sharedService.urlSegmentKeys();
    this.fetchDate.dateInfoAdded.subscribe(res => {
      this.fromData = res[0];
      this.toData = res[1];
      this.updatedGraph = res[2];
      this.initialGraph = res[3];
      this.rangeType = res[4];
      this.quarterInfo = res[5];
      this.xAxis = res[6];
      if (this.rangeType === 'year' || this.rangeType === 'quarter') {
        this.filterBy = 0;
      } else if (this.rangeType === 'month' || this.rangeType === 'week') {
        this.filterBy = 2;
      }
      this.fmpBranchInfo.currentPage = 1;
      this.fmpBranchInfo.totalRecords = 0;
      this.getBranchInfo();
      if (this.graphType === 'revenueGraph') {
        this.graphUpdation();
      }
    });
  }


  /**
   * @method - fetchParticularBranchInfo()
   * @description - the following fetchParticularBranchInfo() method is used to fetch particular branch information based on current route
   * @author amitha.shetty and karan
   */
  fetchParticularBranchInfo(): void {
    const routeSegment = this.sharedService.urlSegmentKeys();
    this.fmpBranchInfo = this.sharedService.getBranchData(routeSegment[2].path);
    this.graphType = this.fmpBranchInfo.graphType;
    if (this.graphType === 'revenueGraph') {
      this.dashboardOption = new FmpDashboardRevenue();
      this.updateGraph();
    } else if (this.graphType === 'circularGraph') {
      this.dashboardOption = new NewVLEPieChart();
    }
  }
  getBranchInfo(): void {
    const fromDate = this.fetchIndex(this.fromData);
    const toDate = this.fetchIndex(this.toData);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone.toString();
    const requestSet = `?start_date=${fromDate}&end_date=${toDate}&timezone=${timeZone}&branch_id=${this.urlSegmentKeys[this.urlSegmentKeys.length - 1].path}&records_per_page=10&page_number=${this.fmpBranchInfo.currentPage}`
    this.commonService.getData(`admin/dashboard/${this.fmpBranchInfo.apiEndPoint}` + requestSet).subscribe(res => {
      if (this.fmpBranchInfo.apiEndPoint === 'fmuser') {
        this.fmpBranchInfo.graphInfo = res.payload;
        this.dashboardOption = new NewVLEPieChart(res.payload.new_VLEs_count);
        this.dashboardOption.chartOptions.series[0].data[0].y = res.payload.new_VLEs_count;
        this.dashboardOption.chartOptions.series[0].data[1].y = res.payload.total_ace;
        this.dashboardOption.chartOptions.series[0].data[2].y = res.payload.total_standard;
        this.dashboardOption.chartOptions.series[0].data[3].y = res.payload.total_rookies;
        this.fmpBranchInfo.branchInfoData = res.payload.new_VLEs;
      } else {
        const paraName = `${this.fmpBranchInfo.apiEndPoint}s`;
        this.fmpBranchInfo.branchInfoData = res.payload[paraName];
        this.fmpBranchInfo.totalRecords = res.payload.page_info.total_pages * 10;
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  updateGraph(): void {
    this.dashboardOption.chartOptions.series[0].color = this.fmpBranchInfo.graphColor;
    this.dashboardOption.chartOptions.xAxis.crosshair.color = this.fmpBranchInfo.graphColorBar;
  }

  graphUpdation() {
    const fromDate = this.fetchIndex(this.fromData);
    const toDate = this.fetchIndex(this.toData);
    const requestSet = `?from_date=${fromDate}&to_date=${toDate}&branch_id=${this.urlSegmentKeys[this.urlSegmentKeys.length - 1].path}&filter_by=${this.filterBy}`;
    this.commonService.getData(`admin/statistics/${this.fmpBranchInfo.apiEndPoint}` + requestSet).subscribe(res => {
      this.getGraphInfo(res.payload);
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }

  fetchIndex(date) {
    const calculateDate = new Date(date);
    const resultDate = calculateDate.getMonth() + 1 + '/' + calculateDate.getDate() + '/' + calculateDate.getFullYear();
    return resultDate;
  }
  getGraphInfo(response): void {
    this.dashboardOption = new FmpDashboardRevenue();
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
    this.dashboardOption.chartOptions.series[0].name = this.fmpBranchInfo.graphXaxisInfo;
    if (response.length > 0) {
      if (type === 'year' || type === 'quarter') {
        const res = xAxisListData.map(ele => {
          const isFindVal = response.find(val => monthIntInfoCollections[val.filter] === ele);
          if (isFindVal) {
            return isFindVal[this.fmpBranchInfo.graphResponseParam];
          } else {
            return 0;
          }
        });
        return res;
      } else {
        const res = xAxisListData.map(ele => {
          const isFindVal = response.find(val => `${val.day} ${monthIntInfoCollections[val.filter]}` === ele);
          if (isFindVal) {
            return isFindVal[this.fmpBranchInfo.graphResponseParam];
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
  getPage(event: number): void {
    if (event > 0 && event <= this.fmpBranchInfo.totalRecords) {
      this.fmpBranchInfo.currentPage = event;
      this.getBranchInfo();
    }
  }
  getBranchName() {
    return this.urlSegmentKeys[this.urlSegmentKeys.length - 2].path;
  }
}
