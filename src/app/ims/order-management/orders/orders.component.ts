import { Component, OnInit } from '@angular/core';
import {
  SharedService, OrderList, TableViewRequestSet, UpdateStatus, FetchUserTabDetailsService, OrderSortFields, DownloadSubscribeParams,
  LoaderService, CommonService, orderTableHeadersCollections, RecordList, PrintInvoiceOE, UserInfo, AddChallan, moduleNameKeys,
  RolePermissionVal, FilterDialogComponent, orderTabCollections, SideNavService, ViewProductsDialogComponent, TableDateFields
} from 'src/app/utils';
import { ConfirmationDialogComponent } from 'src/app/utils/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import * as printJS from 'print-js';
import { PackageRequestPopUpComponent } from 'src/app/utils/components/package-request-pop-up/package-request-pop-up.component';
import { SessionStorage } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public selectedBtnVal = 0;
  public selectedBtn = 'Received';
  public isValueCheck = false;
  public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
  public sortField: OrderSortFields = new OrderSortFields();
  public subscribeData: DownloadSubscribeParams = new DownloadSubscribeParams();
  public searchVleText = '';
  public tableHeaders = orderTableHeadersCollections;
  public assigneeOE: string = 'expand';
  public addChallan: string = 'expand';
  public showIndividualData: boolean = false;
  public showChallanData: boolean = false;
  public orderName: string = '';
  public tabDate = {
    Received: 'Received',
    'Assign to OE': 'Order Approved',
    Ongoing: 'Ongoing',
    Dispatched: 'Dispatched',
    Delivered: 'Delivered',
    RTS: 'RTS',
    Completed: 'Completed',
    Rejected: 'Rejected',
    'On Hold': 'Hold',
    'Could not Deliver': `Could not Deliver`,
  };
  public selectedBranchId: string;
  public oeRoleId: string;
  public selectedScanWarehuseId: string;
  public selectedStatus: number;
  public printInvoice: PrintInvoiceOE = new PrintInvoiceOE('');
  public oeArray = [];
  public totalAmount: number = 0;
  public mywarehouse=[]
  public warehouse = {
    name: '',
    id: '',
    items: []
  };
  public selectedOrderArray :any = [];
  public totalQuanity: number = 0;
  public orderTabs = orderTabCollections;
  public orderList: OrderList = new OrderList();
  public assaignProductId: string;
  public selectedSearchText: string;
  public selectedTabDate = 'Received';
  public permissionSets: RolePermissionVal = new RolePermissionVal();
  public challanArray: AddChallan = new AddChallan('');
  public tableDateFields: TableDateFields = new TableDateFields();
  public maxFromDate: any;
  public minToDate: any;
  @SessionStorage('userName') public userData: UserInfo;
  @SessionStorage('moduleDetails') public moduleDetails;
  public allowedWarehouse: any;
  @SessionStorage('registeredWarehouse') public registeredWarehouse: any;
  productName: string = '';
  FMName: string = '';
  SCName: string = 'TM ID, Mobile No, Name';
  public villageName: string = '';
  public roleTabs: any = [];
  public userTabs: any = [];
  public TMTabs: any = [];
  public role = {
    name: 'Select Role',
    id: '',
    items: []
  };
  public user = {
    name: 'Select User',
    id: '',
    items: []
  };
  public delivery_days = [{ name: 'Monday' }, { name: 'Tuesday' }, { name: 'Wednesday' },
  { name: 'Thursday' }, { name: 'Friday' }, { name: 'Saturday' }, { name: 'Sunday' }];
  public delivery_day: string = 'Delivery Day';
  public eventName;
  fm_user_search: string = '';
  showUser = false;
  public tmRoleId: string;
  public coordinator_id: string = '';
  public role_id = '';
  public subscription: Subscription;
  Sahelis = [];
  ssRoleId: string;
  ssName = 'Saheli ID, Mobile No';
  isReciveFromTM: boolean = false;
  permission: any;

  constructor(private commonService: CommonService, private sharedService: SharedService,
    public dialog: MatDialog, private orderDetails: FetchUserTabDetailsService,
    private sidenavService: SideNavService, public loaderService: LoaderService, private router: Router, private storage:SessionStorageService ) {
    this.subscription = this.sidenavService.getSubText().subscribe(message => {
      // console.log("MESSAGE1",message)
      if (message) {
        // console.log(this.router.url)
        if (this.router.url.includes('/order')) {
          // console.log(message,"MESSAGE1")
          this.selectedBtnVal = message.text.val;
          this.selectedBtn = message.text.name;
          message.text.key = message.text.name;
          this.makeActive(message.text);
        }
      } else {
        // clear messages when empty message received
        this.selectedBtnVal = 0;
      }
    });
  }

  ngOnInit() {
    this.allowedWarehouse=this.storage.retrieve('allowedWarehouse')
   // this.mywarehouse=this.allowedWarehouse
    this.clickMe(0)
    console.log(this.selectedBtn);
    this.tableViewRequestData.status = [0];
    this.getCurrentWarehouse();
    this.modulePermissionSets();
    this.searchRoleData();
    this.searchRoleDataForTM();

    
    let lead = this.orderTabs;
    this.orderTabs = [];
    this.moduleDetails.roles.forEach(sub => {
      if (sub.name == 'Order Management' && (sub.sub_module ? sub.sub_module.length : 0) > 0) {
        sub.sub_module.map(data => {
          lead.forEach(data1 => {
             console.log(data,"DATA")
            if (data.name == data1.name) {
              data1['permission'] = data;
              // console.log(data1)
              this.orderTabs.push(data1);
            }
            if (data.name === "RTS" && data1.name === "RTS") {
              this.isReciveFromTM = true;
            }
          })
          this.orderTabs[data.name] = data.name;
        })
      }
    });
    this.makeActive(this.orderTabs[0]);
  }
  /**
  * @method modulePermissionSets()
  * @description - the following modulePermissionSets() method is used set crud operations for module.
  * @uses toCheckAllPermissionRights() - the function toCheckAllPermissionRights returns right permissions for the
  * module passing module name as a params.
  * @author amitha.shetty
  */
  modulePermissionSets(): void {
    this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.order);
  }

  /**
  * @method getOrderList()
  * @description: the following getOrderList() method is used get order list details
  * @author amitha.shetty
  */
  getOrderList() {
    this.orderList = new OrderList();
    // //m this.loaderService.show('show');
    let deliveryString = '';
    this.delivery_day == 'Delivery Day' ? deliveryString = '' : deliveryString = this.delivery_day;
    let array = [0, 1, 10];
    console.log(array.includes(this.tableViewRequestData.status), this.tableViewRequestData.status.toString())
    if(!this.warehouse.id) this.warehouse.id = ''
    if (array.includes(Number(this.tableViewRequestData.status)))
      var url = 'order/getorder';
    else
      var url = 'order/parent';

    let requestSet: any;
    requestSet = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
      this.tableViewRequestData.pageNumber + '&search_fm_user_name=' + this.searchVleText + '&status=' +
      this.tableViewRequestData.status + '&sort_by_fm_user_name=' + this.sortField.fmUserName + '&product_name=' + this.productName +
      '&fm_user_firstname=' + this.FMName + '&fm_user_village=' + this.villageName + '&delivery_day=' + deliveryString +
      '&start_date=' + this.tableDateFields.fromDate + '&end_date=' + this.tableDateFields.toDate +
      this.sortField.fmUserName + '&sort_by_product_name=' + this.sortField.productName + '&sort_by_vle_code=' + this.sortField.vleCode +
      '&sort_by_action=' + this.sortField.action + '&sort_by_branch_name=' + this.sortField.branchName + '&sort_updated_date=' +
      this.sortField.orderDate + '&warehouse_id=' + this.warehouse.id + '&fm_user_search=' + this.fm_user_search +
      '&coordinator_id=' + this.coordinator_id;
    this.commonService.getDataNew(url + requestSet).subscribe(response => {
      if (response.status = 200) {
        //m this.loaderService.show('hide');;
        // console.log(response.payload, '=+++++++')
        this.orderList = new OrderList(response.payload);
        console.log(this.orderList, '=+++++++');
        this.subscribeData.order.warehouseId = this.warehouse.id;
        this.subscribeData.order.start_date = this.tableDateFields.fromDate;
        this.subscribeData.order.end_date = this.tableDateFields.toDate;
        this.subscribeData.order.fm_user_search = this.fm_user_search;
        this.subscribeData.order.coordinator_id = this.coordinator_id;
        this.subscribeData.order.role_id = '';
        this.subscribeData.order.productName = this.productName;
        this.subscribeData.order.villageName = this.villageName;
        this.subscribeData.order.delivery_day = this.delivery_day == 'Delivery Day' ? '' : this.delivery_day;
        this.orderDetails.setSelectedOrderStatus(this.subscribeData);
      } else {
        this.orderList.records = [];
      }
    }, err => {
      console.log(err)
      this.sharedService.displayErrorMessage(err.statusText);
      //m this.loaderService.show('hide');;
    });
  }
  getCurrentWarehouse() {
    this.allowedWarehouse=this.storage.retrieve('allowedWarehouse')
    //console.log(this.moduleDetails.name);
    if (this.moduleDetails.name === 'superadmin' || this.moduleDetails.name === 'ho-operations') {
      this.warehouse.name = 'Warehouse';
      this.subscribeData.order.warehouseId = '';
      this.orderDetails.setSelectedOrderStatus(this.subscribeData);
    } else {
       //console.log(this.allowedWarehouse)
      if (this.allowedWarehouse.length == 0) {
        this.warehouse.id = this.registeredWarehouse;
        this.subscribeData.order.warehouseId = this.warehouse.id;
        this.orderDetails.setSelectedOrderStatus(this.subscribeData);
      } else {
        this.allowedWarehouse=this.storage.retrieve('allowedWarehouse')
        const { name = '' } = this.allowedWarehouse.find(x => x.id === this.registeredWarehouse);
        //this.warehouse.name = name;
       // this.warehouse.id = this.registeredWarehouse;
        this.subscribeData.order.warehouseId = this.warehouse.id;
        this.orderDetails.setSelectedOrderStatus(this.subscribeData);
      }
    }
  }

  /**
  * @method getPage()
  * @description - the following getPage() method is used get the selected page for pagination
  * @param event - contains the selected page number
  * @author amitha.shetty
  */
  getPage(event: number): void {
    if (event > 0 && event <= this.orderList.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getOrderList();
    }
  }
  /**
  * @method searchVleNames()
  * @description - the following searchVleNames() method is used search vle names from the order list
  * @param event - contains the search term
  * @author amitha.shetty
  */
  searchVleNames(event: any) {
    if (event.key === "Enter") {
      this.tableViewRequestData.fm_user_search = event.target.value;
      this.fm_user_search = event.target.value;
      this.tableViewRequestData.status = this.selectedBtnVal;
      this.subscribeData.order.fm_user_search = this.fm_user_search;
      this.subscribeData.order.status = Number(this.selectedBtnVal);
      this.orderDetails.setSelectedOrderStatus(this.subscribeData);
      this.getOrderList();
    }
  }
  searchProductName(event: any) {
    if (event.key === "Enter") {
      this.tableViewRequestData.productName = this.productName
      this.tableViewRequestData.status = this.selectedBtnVal;
      this.getOrderList();
    }
  }
  getScheduledTime(event, type): void {
    if (type === 'from') {
      this.tableDateFields.fromDate = event;
      this.subscribeData.order.start_date = this.sharedService.formateDate(event);
      const date = new Date(this.tableDateFields.fromDate);
      const requiredDate = date.setDate(date.getDate() + 1);
      this.minToDate = new Date(requiredDate);
    } else if (type === 'to') {
      this.tableDateFields.toDate = event;
      this.subscribeData.order.end_date = this.sharedService.formateDate(event);
      const date = new Date(this.tableDateFields.toDate);
      const requiredDate = date.setDate(date.getDate() - 1);
      this.maxFromDate = new Date(requiredDate);
    }
    if (this.tableDateFields.fromDate && this.tableDateFields.toDate) {
      this.orderDetails.setSelectedOrderStatus(this.subscribeData);
      this.getOrderList();
    }
  }
  searchDeliveryDay(event: any) {
    this.delivery_day = event.name;
    this.tableViewRequestData.delivery_day = this.delivery_day;
    this.subscribeData.order.delivery_day = this.delivery_day;
    this.orderDetails.setSelectedOrderStatus(this.subscribeData);
    this.getOrderList();
  }
  searchVillageName(event: any) {
    if (event.key === "Enter") {
      this.tableViewRequestData.villageName = this.villageName;
      this.tableViewRequestData.productName = this.productName;
      this.subscribeData.order.searchFmUser = this.searchVleText;
      this.tableViewRequestData.status = this.selectedBtnVal;
      this.subscribeData.order.searchVillage = this.villageName;
      this.orderDetails.setSelectedOrderStatus(this.subscribeData);
      this.getOrderList();
    }
  }
  search() {
    this.tableViewRequestData.villageName = this.villageName;
    this.tableViewRequestData.status = this.selectedBtnVal;
    this.tableViewRequestData.productName = this.productName;
    this.subscribeData.order.searchFmUser = this.searchVleText;
    this.orderDetails.setSelectedOrderStatus(this.subscribeData);
    this.getOrderList();
  }

  /**
  * @method makeActive()
  * @description - the following makeActive() method is used make status tab active by matching the selected value
  * @param event - contains the search term
  * @author amitha.shetty
  */

  makeActive(tabInfo: any) {
    console.log(tabInfo,"Tabinfo")
    this.permission = (tabInfo.permission&&tabInfo.permission.permission) ? tabInfo.permission.permission : tabInfo.permission;
    this.selectedBtn = tabInfo.key;
    this.selectedTabDate = this.tabDate[tabInfo.name];
    this.showIndividualData = false;
    this.selectedBtnVal = tabInfo.val;
    this.selectedBtnVal ? this.selectedBtnVal : (this.selectedBtnVal = tabInfo.val);
    this.searchVleText = '';
    this.assigneeOE = 'expand';
    this.tableViewRequestData.status = tabInfo.value;
    this.subscribeData.order.status = this.tableViewRequestData.status;
    this.subscribeData.order.selectedOrder = tabInfo.downloadReportName;
    this.subscribeData.order.searchFmUser = '';
    this.subscribeData.order.orderTabStatus = tabInfo.key;
    this.orderDetails.setSelectedOrderStatus(this.subscribeData);
    this.tableViewRequestData.recordsPerPage = 10;
    this.tableViewRequestData.pageNumber = 1;
    if (this.coordinator_id.length == 10 && this.selectedBtnVal != 5) {
      this.coordinator_id = '';
      this.SCName = 'TM ID, Mobile No , Name';
    }
    if (this.selectedBtn == 'Rejected') {
      this.tableHeaders = [
        { header: 'Lead ID', checkBox: true },
        { header: 'Lead Name' },
        { header: 'Lead Mobile No' },
        { header: 'Lead Village Name' },
        { header: 'Village Code' },
        { header: 'Lead Branch' },
        { header: 'Delivery Day' },
        { header: 'Saheli ID' },
        { header: 'Saheli Name' },
        { header: 'TM Name' },
        { header: 'Order Date' },
        { header: 'Rejected Date' },
        { header: 'Quantity' },
        // { header: 'Approved Date' },
        // { header: 'Product Name' },
        { header: 'Total Value' },
        { header: 'Order By Name' },
        { header: 'Order By Role' },
        { header: 'Rejected By Name' },
        { header: 'Rejected By Role' },
        //{ header: 'Product Name' },
        { header: 'View Products' },
      ]
    } else if (this.selectedBtn == 'Assign to TM') {
      this.productName = '';
      this.tableHeaders = [
        { header: 'Lead ID', checkBox: true },
        { header: 'Lead Name' },
        { header: 'Lead Mobile No' },
        { header: 'Lead Village Name' },
        { header: 'Village Code' },
        { header: 'Lead Branch' },
        { header: 'Delivery Day' },
        { header: 'Saheli ID' },
        { header: 'Saheli Name' },
        { header: 'TM Name' },
        { header: 'Order Date' },
        { header: 'Approved Date' },
        { header: 'Quantity' },
        // { header: 'Approved Date' },
        // { header: 'Product Name' },
        { header: 'Total Value' },
        { header: 'Order By Name' },
        { header: 'Order By Role' },
        { header: 'View Products' },
      ]
    } else if (this.selectedBtn == 'Ongoing') {
      this.productName = '';
      this.tableHeaders = [
        { header: 'Lead ID', checkBox: true },
        { header: 'Lead Name' },
        { header: 'Lead Mobile No' },
        { header: 'Lead Village Name' },
        { header: 'Village Code' },
        { header: 'Lead Branch' },
        { header: 'Delivery Day' },
        { header: 'Saheli ID' },
        { header: 'Saheli Name' },
        { header: 'TM Name' },
        { header: 'Order Date' },
        { header: 'Assigned Date' },
        // { header: 'Assigned Date' },
        { header: 'Quantity' },
        // { header: 'Approved Date' },
        // { header: 'Product Name' },
        { header: 'Total Value' },
        { header: 'Order By Name' },
        { header: 'Order By Role' },
        { header: 'View Products' },
      ]
    } else if (this.selectedBtn == 'Dispatched') {
      this.productName = '';
      this.tableHeaders = [
        { header: 'Lead ID', checkBox: true },
        { header: 'Lead Name' },
        { header: 'Lead Mobile No' },
        { header: 'Lead Village Name' },
        { header: 'Village Code' },
        { header: 'Lead Branch' },
        { header: 'Delivery Day' },
        { header: 'Saheli ID' },
        { header: 'Saheli Name' },
        { header: 'TM Name' },
        { header: 'Order Date' },
        { header: 'Dispatched Date' },
        { header: 'Quantity' },
        // { header: 'Approved Date' },
        // { header: 'Product Name' },
        { header: 'Total Value' },
        { header: 'Order By Name' },
        { header: 'Order By Role' },
        { header: 'View Products' },
      ]
    } else if (this.selectedBtn == 'Delivered') {
      this.productName = '';
      this.tableHeaders = [
        { header: 'Lead ID', checkBox: true },
        { header: 'Lead Name' },
        { header: 'Lead Mobile No' },
        { header: 'Lead Village Name' },
        { header: 'Village Code' },
        { header: 'Lead Branch' },
        { header: 'Delivery Day' },
        { header: 'Saheli ID' },
        { header: 'Saheli Name' },
        { header: 'TM Name' },
        { header: 'Order Date' },
        { header: 'Delivered Date' },
        { header: 'Quantity' },
        // { header: 'Approved Date' },
        // { header: 'Product Name' },
        { header: 'Total Value' },
        { header: 'Order By Name' },
        { header: 'Order By Role' },
        { header: 'View Products' },
      ]
    } else if (this.selectedBtn == 'RTS') {
      this.productName = '';
      this.tableHeaders = [
        { header: 'Lead ID', checkBox: true },
        { header: 'Lead Name' },
        { header: 'Lead Mobile No' },
        { header: 'Lead Village Name' },
        { header: 'Village Code' },
        { header: 'Lead Branch' },
        { header: 'Delivery Day' },
        { header: 'Saheli ID' },
        { header: 'Saheli Name' },
        { header: 'TM Name' },
        { header: 'Order Date' },
        { header: 'RTS Date' },
        { header: 'Quantity' },
        // { header: 'Approved Date' },
        { header: 'Total Value' },
        { header: 'Order By Name' },
        { header: 'Order By Role' },
        { header: 'View Products' },
      ]
    } else if (this.selectedBtn == 'Completed') {
      this.resetAll();
      this.tableHeaders = [
        { header: 'Lead ID', checkBox: true },
        { header: 'Lead Name' },
        { header: 'Lead Mobile No' },
        { header: 'Lead Village Name' },
        { header: 'Village Code' },
        { header: 'Lead Branch' },
        { header: 'Delivery Day' },
        { header: 'Saheli ID' },
        { header: 'Saheli Name' },
        { header: 'TM Name' },
        { header: 'Order Date' },
        { header: 'Completed Date' },
        { header: 'Quantity' },
        // { header: 'Approved Date' },
        // { header: 'Product Name' },
        { header: 'Total Value' },
        { header: 'TID' },
        { header: 'Payment Method' },
        { header: 'Order By Name' },
        { header: 'Order By Role' },
       // { header: 'Product Name' },
        {header:'View products'}
      ]
    } else if (this.selectedBtn == 'Could not deliver') {
      this.productName = '';
      this.tableHeaders = [
        { header: 'Lead ID', checkBox: true },
        { header: 'Lead Name' },
        { header: 'Lead Mobile No' },
        { header: 'Lead Village Name' },
        { header: 'Village Code' },
        { header: 'Lead Branch' },
        { header: 'Delivery Day' },
        { header: 'Saheli ID' },
        { header: 'Saheli Name' },
        { header: 'TM Name' },
        { header: 'Order Date' },
        { header: 'Returned Date' },
        { header: 'Quantity' },
        // { header: 'Approved Date' },
        // { header: 'Product Name' },
        { header: 'Total Value' },
        { header: 'Order By Name' },
        { header: 'Order By Role' },
        { header: 'View Products' },
      ]
    } else if (this.selectedBtn == 'Hold') {
      this.productName = '';
      this.tableHeaders = [
        { header: 'Lead ID', checkBox: true },
        { header: 'Lead Name' },
        { header: 'Lead Mobile No' },
        { header: 'Lead Village Name' },
        { header: 'Village Code' },
        { header: 'Lead Branch' },
        { header: 'Delivery Day' },
        { header: 'Saheli ID' },
        { header: 'Saheli Name' },
        { header: 'TM Name' },
        { header: 'Order Date' },
        { header: 'Hold Date' },
        { header: 'Quantity' },
        // { header: 'Approved Date' },
        // { header: 'Product Name' },
        { header: 'Total Value' },
        { header: 'Order By Name' },
        { header: 'Order By Role' },
        { header: 'View Products' },
      ]
    } else {
      this.productName = '';
      this.tableHeaders = [
        { header: 'Lead ID', checkBox: true },
        { header: 'Lead Name' },
        { header: 'Lead Mobile No' },
        { header: 'Lead Village Name' },
        { header: 'Village Code' },
        { header: 'Lead Branch' },
        { header: 'Delivery Day' },
        { header: 'Saheli ID' },
        { header: 'Saheli Name' },
        { header: 'TM Name' },
        { header: 'Order Date' },
        // { header: 'Recieved Date' },
        { header: 'Quantity' },
        // { header: 'Approved Date' },
        // { header: 'Product Name' },
        { header: 'Total Value' },
        { header: 'Order By Name' },
        { header: 'Order By Role' },
        { header: 'View Products' },
      ]
    }
    this.getOrderList();
    this.clickMe(this.selectedBtnVal)
    console.log("PP",this.permission)
    // console.log(this.selectedBtn, this.permission);
  }
  clickMe(selectedBtnVal) {
    this.sharedService.sendClickEvent(selectedBtnVal);
  }
  /**
  * @method acceptRejectItem()
  * @description - the following acceptRejectItem() method is used perform set of actions by passing type as a parameter
  * @param item - contains the data of particular order list
  * @param status - contains the status tab info
  * @param type - contains the type of actRejectedion to be performed
  * @author amitha.shetty
  */
  acceptRejectItem(item: RecordList, status: number, type: string) {
    let callAgain = false;
    let details;
    let width;
    let height;
    if (status == 4) {
      callAgain = true;
    }
    if (type == 'Reject') {
      details = { message: 'Are You Sure You Want to ' + type, userName: name, tab: this.selectedBtn, from: 'Orders' };
      width = '400px';
      height = "350px";
    } else {
      details = { message: 'Are You Sure You Want to ' + type, userName: name, tab: this.selectedBtn };
      width = '250px';
      height = '150px';
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: width,
      height: height,
      data: details,
      panelClass: 'confirmation-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
       console.log(result);
      const data = new UpdateStatus(item.orderId, status, item.warehouseId, item.type);
      if (type == 'Reject') {
        if (result ? (result.status) : false) {

          if (this.selectedBtn == 'Ongoing' || this.selectedBtn == 'Dispatched') {
            delete data.warehouse_id;
            // let barcode = data.order_id;
            delete data.order_id;
            // data.barcode = barcode;
          }
          data.remarks = result.remark.id;
          if (this.selectedBtn === 'Assign to TM') {
           //m this.loaderService.show('show');
            this.commonService.getDataNew('order/child?order_id=' + data.order_id).subscribe(response => {
              if (response.status = 200) {
                let rejectData = {
                  "child_orders": [],
                  "remarks": data.remarks
                }
                response.payload.records.forEach(data => {
                  rejectData.child_orders.push(data.id)
                })
                // console.log(rejectData);
                this.commonService.putDataNew('order', data).subscribe(response => {
                  if (response.payload.records.status=='2') {
                  //m this.loaderService.show('hide');;
                    this.sharedService.displaySuccessMessage('Order Rejected Successfully');
                    this.getOrderList();
                  }
                  if(response.status && response.status == 'error' && response.message && response.message[0]){
                    this.sharedService.displaySuccessMessage(response.message[0]);
                    this.getOrderList();
                  }
                }, (err) => {
                  //m this.loaderService.show('hide');
                })
              }
            }, (err) => {
              //m this.loaderService.show('hide');
            })
          } else {
            data['id'] = item.orderId;
           // data['barcode'] = item.barcode;
           data['reason_id'] = result.remark.id;
            //data['warehouse_id']=item.warehouseId;
            //data['status']= this.selectedBtnVal;
            if(this.selectedBtn == 'Received' || this.selectedBtn == 'Hold'){
                data['status'] = 2;
            }
            else if(this.selectedBtn == 'Assign to TM'){
              data['status']=this.selectedBtnVal;
            }
            if (this.selectedBtn == 'Received' || this.selectedBtn == 'Assign to TM' || this.selectedBtn == 'Hold') {
            this.commonService.putDataNew('order', data).subscribe(response => {
              if (response.status = 200) {
                if (status === 3) {
                  this.sharedService.displaySuccessMessage('Order Approved Successfully');
                } else if (status === 2) {
                  this.sharedService.displaySuccessMessage('Order Rejected Successfully');
                } else if (status === 5) {
                  this.sharedService.displaySuccessMessage('Order Completed Successfully');
                } else if (status === 9) {
                  this.sharedService.displaySuccessMessage('Order Delivered Successfully');
                } else {
                  this.sharedService.displaySuccessMessage('Order Dispatched Successfully');
                }
                if (callAgain) {
                  const data1 = new UpdateStatus(item.orderId, '9', item.warehouseId, item.type);
                  this.commonService.putDataNew('order', data1).subscribe(response => {
                    if (response.status = 200) {
                    }
                  })
                }
                this.getOrderList();
              }
            }, err => {
          console.log(err);
              this.sharedService.displayErrorMessage(err.statusText);
            });
          }
          else {
            if(this.selectedBtn == 'Ongoing') {
              console.log(result,"RESULT")
              var requestObj;
              if(result.remark){
                requestObj = {
                  status : (this.selectedBtn == 'Ongoing' )? "2" : "4" ,
                  id : data.order_id || data.id,
                  reason_id : result.remark.id
                }
              }
              else{
                requestObj = {
                  status : (this.selectedBtn == 'Ongoing' )? "2" : "4" ,
                  id : data.order_id || data.id
                }
              }
              
              this.commonService.patchDataNew('order/parent', requestObj).subscribe(response => {
                if (response.status = 200) {
                  console.log('768', response);
                  if (status === 3) {
                    this.sharedService.displaySuccessMessage('Order Approved Successfully');
                  } else if (status === 2) {
                    this.sharedService.displaySuccessMessage('Order Rejected Successfully');
                  } else if (status === 5) {
                    this.sharedService.displaySuccessMessage('Order Completed Successfully');
                  } else if (status === 9) {
                    this.sharedService.displaySuccessMessage('Order Delivered Successfully');
                  } else {
                    this.sharedService.displaySuccessMessage('Order Dispatched Successfully');
                  }
                  if (callAgain) {
                    const data1 = new UpdateStatus(item.orderId, '9', item.warehouseId, item.type);
                    this.commonService.putDataNew('order', data1).subscribe(response => {
                      if (response.status = 200) {
                      }
                    })
                  }
                  this.getOrderList();
                }
              }, err => {
                this.sharedService.displayErrorMessage(err.statusText);
              });
            }
          }
          }

        }
      } else {
        if (result) {
          if (this.selectedBtn == 'Ongoing' || this.selectedBtn == 'Dispatched') {
            if(result.remark){
              requestObj = {
                status : (this.selectedBtn == 'Ongoing' )? "2" : "4" ,
                id : data.order_id || data.id,
                reason_id : result.remark.id
              }
            }
            else{
              requestObj = {
                status : (this.selectedBtn == 'Ongoing' )? "6" : "4" ,
                id : data.order_id || data.id
              }
            }
            this.commonService.patchDataNew('order/parent', requestObj).subscribe(response => {
              if (response.status = 200) {
                console.log('768', response);
                // console.log(callAgain,269)
                if (status === 3) {
                  this.sharedService.displaySuccessMessage('Order Approved Successfully');
                } else if (status === 2) {
                  this.sharedService.displaySuccessMessage('Order Rejected Successfully');
                } else if (status === 5) {
                  this.sharedService.displaySuccessMessage('Order Completed Successfully');
                } else if (status === 9) {
                  this.sharedService.displaySuccessMessage('Order Delivered Successfully');
                } else {
                  this.sharedService.displaySuccessMessage('Order Dispatched Successfully');
                }
                if (callAgain) {
                  const data1 = new UpdateStatus(item.orderId, '9', item.warehouseId, item.type);
                  this.commonService.putDataNew('order', data1).subscribe(response => {
                    if (response.status = 200) {
                    }
                  })
                }
                this.getOrderList();
              }
            }, err => {
              this.sharedService.displayErrorMessage(err.statusText);
            });
          } else {
            data.remarks = result.remark.id;
            console.log(data, result);
            this.commonService.putDataNew('order', data).subscribe(response => {
              if (response.status = 200) {
                console.log('768', response);
                if (status === 3) {
                  this.sharedService.displaySuccessMessage('Order Approved Successfully');
                } else if (status === 2) {
                  this.sharedService.displaySuccessMessage('Order Rejected Successfully');
                } else if (status === 5) {
                  this.sharedService.displaySuccessMessage('Order Completed Successfully');
                } else if (status === 9) {
                  this.sharedService.displaySuccessMessage('Order Delivered Successfully');
                } else {
                  this.sharedService.displaySuccessMessage('Order Dispatched Successfully');
                }
                if (callAgain) {
                  const data1 = new UpdateStatus(item.orderId, '9', item.warehouseId, item.type);
                  this.commonService.putDataNew('order', data1).subscribe(response => {
                    if (response.status = 200) {
                    }
                  })
                }
                this.getOrderList();
              }
            }, err => {
              this.sharedService.displayErrorMessage(err.statusText);
            });
          }
        }
      }
    });
  }
  /**
  * @method sorting()
  * @description - the following sorting() method is used to sort the particular fields in order list table
  * @param sortText - contains selected text for sorting
  * @param sortValue - contains number -1 for descending and 1 for ascending
  * @author amitha.shetty
  */
  sorting(sortText: string, sortValue: number) {
    switch (sortText) {
      case 'productName':
        this.sortField.productName = sortValue;
        this.getOrderList();
        break;
      case 'vleCode':
        this.sortField.vleCode = sortValue;
        this.getOrderList();
        break;
      case 'fmUserName':
        this.sortField.fmUserName = sortValue;
        this.getOrderList();
        break;
      case 'branchName':
        this.sortField.branchName = sortValue;
        this.getOrderList();
        break;
      case 'orderDate':
        this.sortField.orderDate = sortValue;
        this.getOrderList();
        break;
      case 'action':
        this.sortField.action = sortValue;
        this.getOrderList();
        break;
      default:
        break;
    }
  }

  expand(txt: string, value: boolean) {
    this.assigneeOE = txt;
    this.showIndividualData = value;
  }

  closeAndRemove(txt: string, value: boolean) {
    this.selectedOrderArray = [];
    this.orderList.records.map(ele => {
      ele.itemValue = false;
    });
    this.totalAmount = 0;
    this.isValueCheck = false;
    this.addChallan = 'collapse';
    this.assigneeOE = 'collapse';
    this.showChallanData = true;
    this.expandCollapseChallan();
  }

  /**
  * @method updateOE()
  * @description - the following updateOE() method is used perform set of actions by passing type as a parameter
  * @param item - contains the data of particular order list
  * @param status - contains the status tab info
  * @param type - contains the type of action to be performed
  * @description - this is to assignee an OE after approving an order
  * @author karan
  */
  updateOE(item: RecordList, status: number, type: string) {
    if (type === 'Assign to TM') {
      const dialogRef = this.dialog.open(ViewProductsDialogComponent, {
        data: {
          message: 'View Products',
          item: item,
          type: 'Assign to TM',
        },
        minHeight: '100%',
        height: '100%',
        width: '60%',
        position: { left: '40%' }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.selectedBtn = 'Assign to TM'
        this.getOrderList()
      });
      this.selectedBtn = 'Assign to TM'
    }
    // else if (type === 'Assign to OE') {
    //   this.commonService.getData('admin/stock/order/count?warehouse_id=' + item.warehouseId + '&order_id=' + item.orderId).subscribe(res => {
    //     if (item.quantity <= res.payload.count) {
    //       this.orderName = item.productName;
    //       this.totalQuanity = item.quantity;
    //       this.printInvoice.order_id = item.orderId;
    //       this.printInvoice.warehouse_id = item.warehouseId;
    //       this.printInvoice.type = item.type;
    //       this.assaignProductId = item.productId;

    //       this.getOrderList()
    //     } else {
    //       const data = new UpdateStatus(item.orderId, 10, item.warehouseId, item.type);
    //       this.commonService.putData('admin/order', data).subscribe(res => {
    //         this.sharedService.displayErrorMessage('Stocks Not avalible , Order On Hold');
    //         this.getOrderList();
    //       }, err => {
    //       });
    //     }
    //   });
    // }
    else {

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '250px',
        data: { message: 'Are You Sure You Want to ' + type, userName: name },
        panelClass: 'confirmation-dialog',
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const data = new UpdateStatus(item.orderId, 1, item.warehouseId, item.type);
          this.commonService.putDataNew('order', data).subscribe(res => {
            console.log('913', res);
            if (status === 1) {
              this.getOrderList();
              this.sharedService.displaySuccessMessage('Order Approved Successfully and Please Assignee OE');
            }
          }, err => {
            console.log(err.error)
            if(err.error.status == 'error' && err.error.message[0])
            this.sharedService.displayErrorMessage(err.error.message[0]);
            else
            this.sharedService.displayErrorMessage(err.statusText);
            this.getOrderList();
          });
        }
      });
    }

  }
  getRoleList(): void {
    this.commonService.getDataNew('users/role?search_text=Operations Executive').subscribe(response => {
      if (response.status = 200) {
        if (response.payload.records.length > 0 && response.payload.records[0].name === 'Operations Executive') {
          this.oeRoleId = response.payload.records[0]._id;
          this.expand('collapse', true);
        } else {
          this.sharedService.displayErrorMessage('Please Create an Operations Executive Role');
        }
      }
    }, err => {
      this.sharedService.displayErrorMessage('Please Create an Operations Executive Role');
    });
  }
  /**
  * @method assigneOE()
  * @description - the following assigneOE() method is used perform set of actions by passing type as a parameter
  * @param item - contains the data of particular order list
  * @param status - contains the status tab info
  * @param type - contains the type of action to be performed
  * @description - this is to assignee an OE after approving an order
  * @author karan
  */
  assigneOE(item: RecordList, status: number, type: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are You Sure You Want to ' + type, userName: name },
      panelClass: 'confirmation-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      const data = new UpdateStatus(item.orderId, status, item.warehouseId, item.type);
      if (result) {
        this.commonService.putDataNew('order', data).subscribe(response => {
          if (response.status = 200) {
            this.orderName = item.productName;
            this.printInvoice.warehouse_id = item.warehouseId;
            this.printInvoice.type = item.type;
            this.selectedStatus = status;
            this.printInvoice.order_id = item.orderId;
            this.expand('collapse', true);
            if (status === 1) {
              this.sharedService.displaySuccessMessage('Order Approved Successfully and Please Assignee OE');
            }
          }
        }, err => {
          this.getOrderList();
          this.sharedService.displayErrorMessage(err.statusText);
        });
      }
    });
  }

  /**
  * @method searchFieldKey()
  * @param event - search event
  * @description - search OE and asign to oeArray
  * @author karan
  */
  searchFieldKey(event) {
    this.commonService.getDataNew('users?warehouse_id=' + this.printInvoice.warehouse_id + '&is_oe_enabled=' + true + '&search_text=' + event.term).subscribe(res => {
      this.oeArray = res.payload.records;
    });
  }

  /**
  * @method selectedFieldKey()
  * @param event - search event
  * @description - assign _id to model
  * @author karan
  */
  selectedFieldKey(event) {
    this.printInvoice.executive_id = event._id;
  }

  /**
  * @method itemBarcode()
  * @param event : barcode scanner event 
  * @description: fetch event for item and call an API. if pakcage barcode is not there then show error message
  * @author karan
  */
  itemBarcode(event) {
    if (event.key === 'Enter') {
      if (this.printInvoice.item_barcode.length < this.totalQuanity) {
        this.printInvoice.item_barcode.push(event.target.value);
        this.sharedService.displaySuccessMessage('Scan Completed');
        event.target.value = '';
        if (this.totalQuanity === this.printInvoice.item_barcode.length) {
          this.sharedService.displaySuccessMessage('Scan Completed and take print out');
        }
      } else {
        if (this.printInvoice.executive_id === '') {
          this.sharedService.displayErrorMessage('Please Assign OE');
        } else {
          this.sharedService.displayErrorMessage('Quantity is only ' + this.totalQuanity);
        }
      }
    }
  }

  scanItem() {
    if (this.printInvoice.executive_id) {
      if (this.printInvoice.type !== 0) {
        this.router.navigate([`orders/combo-offer-scan/${this.printInvoice.executive_id}/${this.printInvoice.warehouse_id}/${this.printInvoice.order_id}`]);
      } else {
        const dialogRef = this.dialog.open(PackageRequestPopUpComponent, {
          data: {
            message: 'orderScan',
            quantity: this.totalQuanity,
            type: 'scanIndividually',
            warehouseId: this.printInvoice.warehouse_id,
            productDetailId: this.assaignProductId,
          },
          panelClass: 'request-stock'
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.printInvoice.item_barcode = result;
            if (this.totalQuanity === this.printInvoice.item_barcode.length) {
              this.sharedService.displaySuccessMessage('Scan Completed and take print out');
            } else {
              this.printInvoice.item_barcode = [];
            }
          }
        });
      }
    } else {
      this.sharedService.displayErrorMessage('Please Select OE');
    }

  }

  recieveCash() {

    this.dialog.open(PackageRequestPopUpComponent, {
      data: 'recieveCash',
      // panelClass: 'request-stock',
      minHeight: '100%',
      height: '100%',
      width: '60%',
      position: { left: '40%' }
    });
  }

  /**
  * @method scan()
  * @description - making two API call 1) for order to confirm. 2) assign OE scan the item and expand the collapseable
  * @author karan
  */
  scan(txt: String) {
    if (txt === 'invoice') {
      this.updateBarcode(txt);
    } else if (txt === 'noInvoice') {
      if (this.printInvoice.executive_id) {
        let typefilterName = 'Select Barcode';
        let className = 'filter-pop-up-barcode';
        if (this.printInvoice.type === 1) {
          typefilterName = 'Select Combo Product Barcode';
          className = 'filter-pop-up-combo-barcode';
        }
        const dialogRef = this.dialog.open(FilterDialogComponent, {
          data: {
            filterName: typefilterName,
            orderId: this.printInvoice.order_id,
            warehouseId: this.printInvoice.warehouse_id,
            productDetailId: this.assaignProductId,
            quantity: this.totalQuanity
          },
          panelClass: className
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.sharedService.displaySuccessMessage('Finalize the scanned items');
            this.printInvoice.item_barcode = result.responseData;
            this.updateBarcode(txt);
          }
        });
      } else {
        this.sharedService.displayErrorMessage('Please Select OE');
      }
      // this.commonService.putData('admin/order', data).subscribe(res => {
      // this.commonService.putData('admin/order/item', this.printInvoice).subscribe(res => {
      // this.getOrderList();
      // this.assigneeOE = 'expand';
      // this.showIndividualData = false;
      // const link = document.createElement('a');
      // link.setAttribute('href', res.payload.invoice);
      // link.setAttribute('download', '');
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      // printJS({ printable: res.payload.invoice, type: 'pdf' });
      // }, err => {
      // this.printInvoice.item_barcode = [];
      // this.sharedService.displayErrorMessage(err.error.message);
      // });
      // });
    } else {
      this.sharedService.displaySuccessMessage('Could not scan properly');
    }
  }
  updateBarcode(txt) {
    if (this.printInvoice.item_barcode.length > 0) {
      const data = new UpdateStatus(this.printInvoice.order_id, 1, this.printInvoice.warehouse_id, this.printInvoice.type);
      this.commonService.putData('admin/order', data).subscribe(res => {
        this.commonService.putData('admin/order/item', this.printInvoice).subscribe(res => {
          this.getOrderList();
          if (txt === 'invoice') {
            printJS({ printable: res.payload.invoice, type: 'pdf' });
          }
          this.assigneeOE = 'expand';
          this.showIndividualData = false;
          this.printInvoice = new PrintInvoiceOE('');
          const link = document.createElement('a');
          link.setAttribute('href', res.payload.invoice);
          link.setAttribute('download', '');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, err => {
          this.printInvoice.item_barcode = [];
          this.sharedService.displayErrorMessage(err.statusText);
        });
      }, err => {
        this.sharedService.displayErrorMessage('');
      });
    }
  }

  /**
  * RECIEVED CASH ORDER TAB
  */

  /**
  * @method selectedOrderExpand()
  * @param item : selected event
  * @param event : input event of checkbox to make that as checked
  * @description: if new checkbox is checked then push to array or else remove from array
  * @author karan
  */
  selectedOrderExpand(item: any, event) {
    if (event.target.checked) {
      this.selectedOrderArray.push(item);
      this.totalAmount += item.totalPrice;
    } else {
      this.selectedOrderArray.forEach((ele, index) => {
        if (ele === item) {
          this.selectedOrderArray.splice(index, 1);
          this.totalAmount -= item.totalPrice;
        }
      });
    }
    this.expandCollapseChallan();
  }

  /**
  * @method selectAll()
  * @param event :: input event of checkbox to make that as checked
  * @description: if user select select all then eveythign in that page should be checked and if user uncheck then remove everything from array
  * @author karan
  */
  selectAll(event) {
    if (this.isValueCheck !== event.target.checked) {
      this.totalAmount = 0;
      this.isValueCheck = event.target.checked;
      this.orderList.records.forEach(ele => {
        ele.itemValue = event.target.checked;
      });
      if (event.target.checked) {
        this.orderList.records.forEach(element => {
          this.selectedOrderArray.push(element);
          this.totalAmount += element.totalPrice;
          this.selectedOrderArray = this.selectedOrderArray.filter((item, index) => {
            return this.selectedOrderArray.indexOf(item) === index;
          });
        });
        this.showChallanData = false;
      } else {
        this.addChallan = 'collapse';
        this.assigneeOE = 'collapse';
        this.showChallanData = true;
        this.orderList.records.forEach(ele => {
          this.selectedOrderArray.forEach((element, index) => {
            if (element.id === ele.id) {
              this.selectedOrderArray.splice(index, 1);
            }
          });
        });
      }
      this.expandCollapseChallan();
    }
  }

  /**
  * @method expandCollapseChallan()
  * @description : handle expand and collpase for challan based on array length
  * @author karan
  */
  expandCollapseChallan() {
    if (this.selectedOrderArray.length === 0) {
      this.addChallan = 'expand';
      this.assigneeOE = 'expand';
      this.showChallanData = false;
    } else {
      this.addChallan = 'collapse';
      this.assigneeOE = 'collapse';
      this.showChallanData = true;
    }
  }

  /**
  * @method addingChallan()
  * @description: making an API call for challan
  * @author karan
  */
  addingChallan(event: MouseEvent) {
    (event.target as HTMLButtonElement).disabled = true;
    //m this.loaderService.show('show');
    this.challanArray.id = [];
    this.selectedOrderArray.forEach(ele => {
      this.challanArray.id.push(ele.id);
    });

    const obj = {
      id: this.challanArray.id
    };

    this.commonService.patchDataNew('order/totalAmount', obj).subscribe(res => {
        this.commonService.putDataNew('order/challan', this.challanArray).subscribe(res => {
          //m this.loaderService.show('hide');;
          this.sharedService.displaySuccessMessage('Challan Updated Succesfully');
          this.selectedOrderArray = [];
          this.expandCollapseChallan();
          this.getOrderList();
          this.challanArray.challan_no = '';
          this.challanArray.id = [];
          this.totalAmount = 0;
        }, err => {
          //m this.loaderService.show('hide');;
          if(err.error.error == '"challan_no" must be a number')
            this.sharedService.displayErrorMessage('Please enter the valid challan number');
          else 
            this.sharedService.displayErrorMessage('');
        });
      // } else {
      //   this.sharedService.displayErrorMessage('Money not matching');
      // }
    }, err => {
      //m this.loaderService.show('hide');;
      this.sharedService.displayErrorMessage('');
    });
  }
  selectedWarehouseData(event) {
    // this.tableViewRequestData = new TableViewRequestSet();
    this.tableViewRequestData.status = this.selectedBtnVal;
    if (event) {
      this.warehouse.id = event.id;
      this.warehouse.name = event.name;
      this.registeredWarehouse = event.id;
      this.subscribeData.order.warehouseId = this.warehouse.id;
      this.orderDetails.setSelectedOrderStatus(this.subscribeData);
      this.getOrderList();
    } else {
      // this.orderList = new OrderList();
    }
  }
  searchRoleData() {
    //m this.loaderService.show('show');;
    const requestSet = '?records_per_page=' + 1000 + '&page_number=' +
      1 + '&search_text=' + '';
    this.commonService.getDataNew(`users/roles${requestSet}`).subscribe(response => {
      if (response.status = 200) {
        this.roleTabs = response.payload.records;
        this.roleTabs.push({
          name: 'All',
          _id: ''
        });
      }
      //m this.loaderService.show('hide');;
    }, err => {
     //m this.loaderService.show('hide');;
      this.sharedService.displayErrorMessage('');
    });
  }

  searchRoleDataForTM() {
    //m this.loaderService.show('show');;
    const requestSet = '?records_per_page=' + 1000 + '&page_number=' +
      1 + '&search_text=' + '';
    this.commonService.getDataNew(`users/roles${requestSet}`).subscribe(response => {
      if (response.status = 200) {
        //m this.loaderService.show('hide');;
        if (response.payload.records.length > 0) {
          response.payload.records.forEach(elem => {
            if (elem.name == 'Territory Manager') {
              this.tmRoleId = elem.id;
              this.selectedRoleDataForTM("")
            }
            if (elem.name == 'Solar Saheli') {
              this.ssRoleId = elem.id;
              this.role_id = elem.id;
              this.selectedRoleDataForSS("")
            }
          });
        } else {
          //m this.loaderService.show('hide');;
          this.sharedService.displayErrorMessage('Please create Territory Manager Role');
        }
      }
      //m this.loaderService.show('hide');;
    }, err => {
    //m this.loaderService.show('hide');;
      this.sharedService.displayErrorMessage('');
    });
  }

  selectedUserData(event) {
    if (event.role ? (event.role.name == 'Territory Manager') : false) {
      this.selectedTM(event);
    } else if (this.eventName && event._id) {
      this.getOrderList();
    } else {
      this.warehouse.id = '';
      // this.search_user_id = '';
      this.role_id = '';
    }
  }

  searchWarehouseList(event) {
    console.log(this.moduleDetails.name);
    if (this.moduleDetails.name === 'superadmin' || this.moduleDetails.name === 'ho-operations') {
      if (this.selectedSearchText) {
        this.tableViewRequestData.searchText = this.selectedSearchText;
      }
      //console.log(event);
      if (event.term) {
        const requestSet = '?search_text=' + event.term;
        this.commonService.getDataNew('users/warehouse' + requestSet).subscribe(res => {
          this.allowedWarehouse = res.payload.records;
          this.allowedWarehouse.push({
            name: 'All',
            _id: ''
          });
        }, err => {
        });
      } else {
        // this.orderList = new OrderList();
      }
    }
  }
  selectedRoleData(event) {
    this.eventName = event.name;
    this.userTabs = [];
    this.user = {
      name: 'Select User',
      id: '',
      items: []
    }
    this.role_id = event._id;
    if (event.name != 'All') {
      if (event._id) {
        const requestSet = '?records_per_page=' + 100 + '&page_number=' +
          1 + '&role_id=' + event._id;
        this.commonService.getDataNew('users' + requestSet).subscribe(res => {
          if (res.success) {
            this.userTabs = res.payload.records;
            this.userTabs.push({
              first_name: 'All',
              _id: ''
            });
          }
        }, err => {
        });
      } else if (event.name == 'Operations Executive') {
        const requestSet = '?records_per_page=' + 100 + '&page_number=' +
          1 + '&is_oe_enabled=' + true;
        this.commonService.getDataNew('users' + requestSet).subscribe(res => {
          if (res.success) {
            this.userTabs = res.payload.records;
            this.userTabs.push({
              first_name: 'All',
              _id: ''
            });
          }
        }, err => {
        });
      }
      else {
        // this.orderList = new OrderList();
      }
    } else {
      this.showUser = false;
      this.userTabs = [];
      this.warehouse.id = '';
      this.role_id = '';
      this.getOrderList();
    }

  }
  resetAll() {
    if (this.searchVleText != '' || (this.warehouse.id != '') || this.fm_user_search != '' || this.role_id != ''
      || this.productName != '' || this.SCName != 'TM ID, Mobile No' || this.villageName != '' || this.ssName != 'Saheli ID, Mobile No' ||
      this.delivery_day != 'Delivery Day' || this.coordinator_id != '' || this.tableDateFields.fromDate != ''
      || this.tableDateFields.toDate != '') {
      this.showUser = false;
      this.userTabs = [];
      this.searchVleText = '';
      this.warehouse.id = '';
      this.fm_user_search = '';
      this.role_id = '';
      this.productName = '';
      this.SCName = '';
      this.villageName = '';
      this.FMName = '';
      this.ssName = ''
      this.allowedWarehouse = [];
      this.role = {
        name: 'Select Role',
        id: '',
        items: []
      }
      this.user = {
        name: 'Select User',
        id: '',
        items: []
      }
      this.warehouse = {
        name: 'Warehouse',
        id: '',
        items: []
      };
      this.delivery_day = '';
      this.coordinator_id = '';
      this.tableDateFields.fromDate = '';
      this.tableDateFields.toDate = '';
      if (this.moduleDetails.name != 'superadmin') {
        this.getCurrentWarehouse();
        this.getOrderList();
        this.ssName = 'Saheli ID, Mobile No';
        this.delivery_day = 'Delivery Day';
        this.SCName = 'TM ID, Mobile No , Name';
      } else {
        this.getOrderList();
        this.ssName = 'Saheli ID, Mobile No';
        this.delivery_day = 'Delivery Day';
        this.SCName = 'TM ID, Mobile No , Name';
      }

    }
    else {
      this.sharedService.displayErrorMessage('No items to clear');
    }


  }
  selectedRoleDataForTM(event) {
    this.TMTabs = [];
    if (this.tmRoleId) {
      const requestSet = '?records_per_page=' + 100 + '&page_number=' +
        1 + '&role_id=' + this.tmRoleId;
      this.commonService.getDataNew('users' + requestSet).subscribe(res => {
        if (res.success) {
          this.TMTabs = res.payload.records;
          this.TMTabs.map((element, i) => {
            // console.log(element)
            this.TMTabs[i].first_name = element.vle_code + ",   " + element.phone_number + ",  " + element.first_name;
          })
          this.TMTabs.push({
            first_name: 'All',
            _id: ''
          });
        }
      }, err => {
      });
    } 
  }
  selectedTM(event) {
    console.log(this.selectedBtnVal, event)
    if (event.id) {
      this.coordinator_id = event.id;
      this.getOrderList();
    } else if (event._id && this.selectedBtnVal == 5) {
      this.coordinator_id = event.phone_number;
      this.getOrderList();
    } else {
      this.warehouse.id = '';
      this.coordinator_id = '';
    }
  }
  view(item) {
    if (this.selectedBtn == 'Assign to TM') {
      this.selectedBtn = 'View'
    }
    const dialogRef = this.dialog.open(ViewProductsDialogComponent, {
      data: {
        message: 'View Products',
        item: item,
        type: this.selectedBtn,
        permission: this.permission
      },
      minHeight: '100%',
      height: '100%',
      width: '60%',
      position: { left: '40%' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (this.selectedBtn == 'Assign to TM') {
        // console.log(result);
      }
      if (this.selectedBtn == 'View') {
        this.selectedBtn = 'Assign to TM';
        this.getOrderList()
      } else {
        this.getOrderList()
      }
    });
  }
  selectedRoleDataForSS(event) {
    this.Sahelis = [];
    if (this.ssRoleId) {
      //m this.loaderService.show('show');
      const requestSet = '?records_per_page=' + 200 + '&page_number=' +
        1 + '&role_id=' + this.ssRoleId;
      this.commonService.getDataNew('users' + requestSet).subscribe(res => {
        if (res.success) {
          //m this.loaderService.show('hide');;
          this.Sahelis = res.payload.records;
          this.Sahelis.map((element, i) => {
            this.Sahelis[i].first_name = element.vle_code + "   " + element.phone_number;
          })
          this.Sahelis.push({
            first_name: 'All',
            _id: ''
          });
        }
      }, err => {
      //m this.loaderService.show('hide');;
      });
    }
  }
  selectedSaheli(event) {
    if (event._id) {
      this.getOrderList();
    } else {
      this.warehouse.id = '';
    }
  }
  viewPayment(item) {
    if (item.payment_method == 5) {
      const dialogRef = this.dialog.open(ViewProductsDialogComponent, {
        data: {
          message: 'View Products',
          item: item,
          type: this.selectedBtn,
        },
        height: '35%',
        width: '40%',
        position: { left: '30%' }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      });
    }
  }
}
