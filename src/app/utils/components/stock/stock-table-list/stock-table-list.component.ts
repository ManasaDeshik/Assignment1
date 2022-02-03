import { Component, OnInit } from '@angular/core';
import { StockTableListTypeInfo, TableOngoingPurchaseOrderlist, StocksTableViewRequestSet, OngoingPruchaseOrderSortFields, OngoingPruchaseOrderRequest, TableOngoingTransist, UserInfo, TableSparePoOngoingList, TableSpareToist } from 'src/app/utils/models';
import { SharedService, CommonService, LoaderService } from 'src/app/utils/services';
import { FilterDialogComponent, RequestFilterDate, DownloadSubscribeParams, FetchUserTabDetailsService } from 'src/app/utils';
import { stockProductTableTypeCollections } from 'src/app/utils/enums';
import { SessionStorage } from 'ngx-webstorage';
import { UrlSegment } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-stock-table-list',
  templateUrl: './stock-table-list.component.html',
  styleUrls: ['./stock-table-list.component.scss']
})
export class StockTableListComponent implements OnInit {
  public dataList = [];
  public tableTypeData: StockTableListTypeInfo = new StockTableListTypeInfo();
  public productListTransist: any;
  public tableViewRequestData: StocksTableViewRequestSet = new StocksTableViewRequestSet();
  public sortField: OngoingPruchaseOrderSortFields = new OngoingPruchaseOrderSortFields();
  public productList: any;
  public urlSegments: UrlSegment[] = [];
  public filterDateFields = new RequestFilterDate();
  public subscribeData = new DownloadSubscribeParams();
  public poDateResponse: any;
  @SessionStorage('userName') public userData: UserInfo;
  @SessionStorage('moduleDetails') public moduleDetails;
  constructor(
    private commonService: CommonService,
    private loaderService: LoaderService,
    private sharedService: SharedService,
    private fetchUserTab: FetchUserTabDetailsService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.setTableInfoDetails();
  }
  
  applyFilter(name ?:string){
    
      console.log('name',name);
     switch(name){
       case 'Date':{
        const dialogRef = this.dialog.open(FilterDialogComponent, {
          data: {
            filterName: name,
            //poResponse: this.poResponse,
          dateResponse: this.poDateResponse
          },
          panelClass: 'filter-pop-up'
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (result.responseData) {
              console.log(result.responseData,"Response data")
              this.tableViewRequestData = new StocksTableViewRequestSet();
                this.filterDateFields = new RequestFilterDate();
                this.poDateResponse = result.responseData;
                this.filterDateFields.orderDateField.fromDate = this.sharedService.formateDate(result.responseData.orderDateField.fromDate);
                this.subscribeData.ongoingPO.orderDateField.fromDate = this.filterDateFields.orderDateField.fromDate;
                this.filterDateFields.orderDateField.toDate = this.sharedService.formateDate(result.responseData.orderDateField.toDate);
                this.subscribeData.ongoingPO.orderDateField.toDate = this.filterDateFields.orderDateField.toDate;
                this.filterDateFields.arrivalDateField.fromDate = this.sharedService.formateDate(result.responseData.arrivalDateField.fromDate);
                this.subscribeData.ongoingPO.arrivalDateField.fromDate = this.filterDateFields.arrivalDateField.fromDate;
                this.filterDateFields.arrivalDateField.toDate = this.sharedService.formateDate(result.responseData.arrivalDateField.toDate);
                this.subscribeData.ongoingPO.arrivalDateField.toDate = this.filterDateFields.arrivalDateField.toDate;
              
              this.getTransistHistory();
              this.fetchUserTab.setOngoingPOSubscribeStatus(this.subscribeData);
            }
          }
        });
  
         break;
       }
       case 'Date Filter':{
        const dialogRef = this.dialog.open(FilterDialogComponent, {
          data: {
            filterName: name,
            //poResponse: this.poResponse,
          dateResponse: this.poDateResponse
          },
          panelClass: 'filter-pop-up'
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (result.responseData) {
              console.log(result.responseData,"Response data")
              this.tableViewRequestData = new StocksTableViewRequestSet();
                this.filterDateFields = new RequestFilterDate();
                this.poDateResponse = result.responseData;
                this.filterDateFields.orderDateField.fromDate = this.sharedService.formateDate(result.responseData.orderDateField.fromDate);
                this.subscribeData.ongoingPO.orderDateField.fromDate = this.filterDateFields.orderDateField.fromDate;
                this.filterDateFields.orderDateField.toDate = this.sharedService.formateDate(result.responseData.orderDateField.toDate);
                this.subscribeData.ongoingPO.orderDateField.toDate = this.filterDateFields.orderDateField.toDate;
                this.filterDateFields.arrivalDateField.fromDate = this.sharedService.formateDate(result.responseData.arrivalDateField.fromDate);
                this.subscribeData.ongoingPO.arrivalDateField.fromDate = this.filterDateFields.arrivalDateField.fromDate;
                this.filterDateFields.arrivalDateField.toDate = this.sharedService.formateDate(result.responseData.arrivalDateField.toDate);
                this.subscribeData.ongoingPO.arrivalDateField.toDate = this.filterDateFields.arrivalDateField.toDate;
              
              this.getLists();
              this.fetchUserTab.setOngoingPOSubscribeStatus(this.subscribeData);
            }
          }
        });
  
         break;
       }
     }
        }
 

  setTableInfoDetails(): void {
    this.urlSegments = this.sharedService.urlSegmentKeys();
    const identifier = `${this.urlSegments[1].path}/${this.urlSegments[this.urlSegments.length - 1].path}`;
    this.tableTypeData = new StockTableListTypeInfo(stockProductTableTypeCollections[identifier]);
    if (this.urlSegments[1].path === 'order-history') {
      this.getLists();
    } else {
      this.getTransistHistory();
    }
  }


  /**
  * @method getLists()
  * @description: fetch all the list of ongoing purhcase order
  * @author karan
  */
  getLists() {
    if (this.urlSegments[this.urlSegments.length - 1].path === 'Product') {
      this.productList = new TableOngoingPurchaseOrderlist();
      //m this.loaderService.show('show');
      this.sortField.status = 3;
      if (this.moduleDetails.name !== 'superadmin') {
        this.sortField.warehouse_id = this.userData.warehouse_id;
      }
      const data = new OngoingPruchaseOrderRequest(this.tableViewRequestData, this.sortField);
      var dataDateRequest;
      if (this.urlSegments[this.urlSegments.length - 2].path === 'order-history') {
        dataDateRequest = '&ordered_from_date=' + this.filterDateFields.orderDateField.fromDate + '&ordered_to_date=' + this.filterDateFields.orderDateField.toDate + '&arrival_from_date=' + this.filterDateFields.arrivalDateField.fromDate + '&arrival_to_date=' + this.filterDateFields.arrivalDateField.toDate;
      }
      else{
        dataDateRequest = '&from_date=' + this.filterDateFields.orderDateField.fromDate + '&to_date=' + this.filterDateFields.orderDateField.toDate;
      }
     // const dataDateRequest = '&ordered_from_date=' + this.filterDateFields.orderDateField.fromDate + '&ordered_to_date=' + this.filterDateFields.orderDateField.toDate + '&arrival_from_date=' + this.filterDateFields.arrivalDateField.fromDate + '&arrival_to_date=' + this.filterDateFields.arrivalDateField.toDate;
      this.commonService.getDataNew(this.tableTypeData.apiEndPoint + data.requestSet+dataDateRequest).subscribe(res => {
      //m this.loaderService.show('hide');
        this.productList = new TableOngoingPurchaseOrderlist(res.payload);
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('');
      });
    } else {
      this.productList = new TableSparePoOngoingList();
      const request = `?records_per_page=${this.tableViewRequestData.recordsPerPage}&page_number=${this.tableViewRequestData.pageNumber}&status=3`;
      this.commonService.getData(this.tableTypeData.apiEndPoint + request).subscribe(res => {
        if (res.payload && res.success) {
          this.productList = new TableSparePoOngoingList(res.payload);
        }
      }, err => {
        this.sharedService.displayErrorMessage('');
      });
    }

  }
clearFilter() {
  this.poDateResponse = '';
  this.filterDateFields.arrivalDateField.fromDate = '';
  this.filterDateFields.arrivalDateField.toDate = '';
  this.filterDateFields.orderDateField.fromDate = '';
  this.subscribeData.ongoingPO.orderDateField.fromDate = '';
  this.filterDateFields.orderDateField.toDate = '';
  this.subscribeData.ongoingPO.orderDateField.toDate = '';
  this.fetchUserTab.setOngoingPOSubscribeStatus(this.subscribeData);
  //this.getLists();
  this.setTableInfoDetails();
}
  getTransistHistory() {
    if (this.urlSegments[this.urlSegments.length - 1].path === 'Product') {
      //m this.loaderService.show('show');
      this.productListTransist = new TableOngoingTransist();
      this.sortField.status = 4;
      let requestSet: any;
      if (this.moduleDetails.name !== 'superadmin') {
        requestSet = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
          this.tableViewRequestData.pageNumber + '&status=' + 4;
      } else {
        requestSet = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
          this.tableViewRequestData.pageNumber + '&status=' + 4;
      }
      var dataDateRequest;
      if (this.urlSegments[this.urlSegments.length - 2].path === 'order-history') {
        dataDateRequest = '&ordered_from_date=' + this.filterDateFields.orderDateField.fromDate + '&ordered_to_date=' + this.filterDateFields.orderDateField.toDate + '&arrival_from_date=' + this.filterDateFields.arrivalDateField.fromDate + '&arrival_to_date=' + this.filterDateFields.arrivalDateField.toDate;
      }
      else{
        dataDateRequest = '&from_date=' + this.filterDateFields.orderDateField.fromDate + '&to_date=' + this.filterDateFields.orderDateField.toDate;
      }
      this.commonService.getDataNew(this.tableTypeData.apiEndPoint + requestSet +dataDateRequest).subscribe(res => {
      //m this.loaderService.show('hide');
        this.productListTransist = new TableOngoingTransist(res.payload);
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('');
      });
    } else {
      this.productListTransist = new TableSpareToist();
      const request = `?records_per_page=${this.tableViewRequestData.recordsPerPage}&page_number=${this.tableViewRequestData.pageNumber}&status=4`;
      this.commonService.getData(this.tableTypeData.apiEndPoint + request).subscribe(res => {
        this.productListTransist = new TableSpareToist(res.payload);
      }, err => {
        this.sharedService.displayErrorMessage('');
      });
    }

  }
  /**
  * @method  getPage()
  * @description - the following getPage() method is used get the selected page for pagination
  * @param event - contains the selected page number
  * @author amitha.shetty
  */
  getOngoingPage(event: number): void {
    if (event > 0 && event <= this.productList.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getLists();
    }
  }
  getTransistPage(event: number): void {
    if (event > 0 && event <= this.productListTransist.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getTransistHistory();
    }
  }
}
