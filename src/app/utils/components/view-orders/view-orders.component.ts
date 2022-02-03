import { Component, OnInit, Inject } from '@angular/core';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../services/common-service/common.service';
import { LoaderService } from '../../services/loader-service/loader.service';
import { SharedService } from '../../services/shared-service/shared.service';
import { TableViewRequestSet, DownloadSubscribeParams } from '../../models/user';
import { OrderSortFields, OrderList } from '../../models/order';
import { orderTableHeadersCollections } from '../../enums/shared-const';
import { TableDateFields } from '../../models/shared';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {
  sharedData
  customer_id;
  public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
  public sortField: OrderSortFields = new OrderSortFields();
  public subscribeData: DownloadSubscribeParams = new DownloadSubscribeParams();
  public orderList: OrderList = new OrderList();
  public tableHeaders = [
    { header: 'VLE ID' },
    { header: 'VLE Name' },
    { header: 'Territory Manager' },
    { header: 'Warehouse Name' },
    { header: 'State' },
    { header: 'Customer Name' },
    { header: 'Customer No' },
    { header: 'Village Name' },
    { header: 'Delivery Day' },
    { header: 'Delivered Date' },
    { header: 'Completed Date' },
    { header: 'Product Name' },
    { header: 'Quantity' },
    { header: 'Total Price' },
    // { header: 'View Products' },
  ]
  public tableDateFields: TableDateFields = new TableDateFields();
  FMName = '';
  searchVleText = '';
  villageName = '';
  warehouse: '';
  search_user_id = '';
  coordinator_id = '';
  role_id = '';
  productName = '';
  selectedOrderArray: any;
  customerName = '';
  public maxFromDate: any;
  public minToDate: any;
  constructor(private commonService: CommonService,
    public loaderService: LoaderService,
    public sharedService: SharedService,
    private router: Router,) { }

  ngOnInit() {
    const urlSegmentKeys = this.sharedService.urlSegmentKeys();
    this.customer_id = urlSegmentKeys[urlSegmentKeys.length - 1].path;
     console.log(urlSegmentKeys, this.customer_id)
    // console.log(this.data);
    // this.sharedData = this.data.demoResponse;
    if (this.customer_id != 1) {
      this.viewOrders();
    } else {
      this.router.navigate(['/customer-management'])
    }

  }
  viewOrders() {
    //m this.loaderService.show('show');
    let requestSet: any;
    this.minToDate = this.sharedService.formateDate(this.minToDate);
    this.maxFromDate = this.sharedService.formateDate(this.maxFromDate);
    requestSet = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
      this.tableViewRequestData.pageNumber + '&customer_id=' + this.customer_id + '&status=' + '5'
      + '&sort_by_fm_user_name=' + this.sortField.fmUserName + '&product_name=' + this.productName +
      '&fm_user_firstname=' + this.FMName + '&customer_village=' + this.villageName +
      this.sortField.fmUserName + '&sort_by_product_name=' + this.sortField.productName + '&sort_by_vle_code=' + this.sortField.vleCode +
      '&sort_by_action=' + this.sortField.action + '&sort_by_branch_name=' + this.sortField.branchName + '&sort_updated_date=' +
      this.sortField.orderDate + '&search_user_id=' + this.search_user_id +
      '&coordinator_id=' + this.coordinator_id + '&role_id=' + this.role_id +
      "&comp_start_date=" + (this.minToDate ? this.minToDate : '') + "&comp_end_date=" + (this.maxFromDate ? this.maxFromDate : '')
    this.commonService.getDataNew('order/parent' + requestSet).subscribe(response => {
      if (response.success) {
      //m this.loaderService.show('hide');
        this.orderList = new OrderList(response.payload);
        if (response.payload.records.length > 0) {
          this.customerName = response.payload.records[0].first_name;
        }
        console.log(this.orderList);

        //       this.subscribeData.order.search_user_id = this.search_user_id;
        //       this.subscribeData.order.coordinator_id = this.coordinator_id;
        //       this.subscribeData.order.role_id = this.role_id;
        //       this.subscribeData.order.productName = this.productName;
        //       this.orderDetails.setSelectedOrderStatus(this.subscribeData);
        //       const returnStatus = this.tableViewRequestData.status.find(ele => ele === 8 || ele === 7);
        //       if (this.selectedOrderArray.length > 0 || returnStatus) {
        //         this.orderList.records.forEach((ele, index) => {
        //           this.selectedOrderArray.forEach((slectedElement) => {
        //             if (ele.id === slectedElement.id) {
        //               ele.itemValue = slectedElement.itemValue;
        //             }
        //           });
        //           if (returnStatus === 7) {
        //             ele.remarks = orderAccessReturnRequestKeys[ele.remarks];
        //           } else if (returnStatus === 8) {
        //             ele.remarks = orderAccessCouldNotDeliverKeys[ele.remarks];
        //           }
        //         });
        //       }
        //     } else {
        //       this.orderList.records = [];
      }
    //m this.loaderService.show('hide');
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    //m this.loaderService.show('hide');
    });
  }
  search() {
    // console.log(this.villageName != '' || this.searchVleText != '' || this.productName != '')
    if (this.villageName != '' || this.searchVleText != '' || this.productName != '') {
      this.tableViewRequestData = new TableViewRequestSet();
      this.tableViewRequestData.villageName = this.villageName;
      this.tableViewRequestData.productName = this.productName;
      this.subscribeData.order.searchFmUser = this.searchVleText;
      this.viewOrders();
    } else {

    }
    // this.tableViewRequestData = new TableViewRequestSet();
    // this.tableViewRequestData.villageName = this.villageName;
    // this.tableViewRequestData.productName = this.productName;
    // this.subscribeData.order.searchFmUser = this.searchVleText;

    // // this.orderDetails.setSelectedOrderStatus(this.subscribeData);
    // this.viewOrders();
  }
  resetAll() {
    this.searchVleText = '';
    this.search_user_id = '';
    this.role_id = '';
    this.productName = '';
    this.villageName = '';
    this.FMName = '';
    this.coordinator_id = '';
    this.minToDate = '';
    this.maxFromDate = '';
    this.tableDateFields.fromDate = '';
    this.tableDateFields.toDate = '';
    this.viewOrders();
  }
  searchProductName(event: any) {
    if (event.key === "Enter") {
      this.tableViewRequestData = new TableViewRequestSet();
      this.tableViewRequestData.productName = this.productName
      this.subscribeData.order.searchFmUser = this.searchVleText;
      this.viewOrders();
    }
  }
getDateFormat(returned_date){
  return new Date(returned_date);
}
  getScheduledTime(event, type): void {
    this.tableViewRequestData = new TableViewRequestSet();
    
    if (type === 'from') {
      this.tableDateFields.fromDate = event;
      this.subscribeData.customer.registerFromDate = this.sharedService.formateDate(event);
      const date = new Date(this.tableDateFields.fromDate);
      //const requiredDate = date.setDate(date.getDate() + 1);
      console.log(this.tableDateFields.fromDate)
      const reqDate = this.getDateFormat(this.tableDateFields.fromDate);
      this.minToDate = reqDate;
      console.log(reqDate);
    } else if (type === 'to') {
      this.tableDateFields.toDate = event;
      this.subscribeData.customer.registerToDate = this.sharedService.formateDate(event);
      const date = new Date(this.tableDateFields.toDate);
      //const requiredDate = date.setDate(date.getDate() - 1);
      const reqDate = this.getDateFormat(this.tableDateFields.toDate);
      this.maxFromDate = reqDate;//new Date(date);
    }
    if (this.tableDateFields.fromDate && this.tableDateFields.toDate) {
      this.viewOrders();
    }
  }
  getPage(event: number): void {
    if (event > 0 && event <= this.orderList.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.viewOrders();
    }
  }
}
