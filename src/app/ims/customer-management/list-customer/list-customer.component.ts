import { Component, OnInit } from '@angular/core';
import {
  TableViewRequestSet, SharedService, FetchUserTabDetailsService, DownloadSubscribeParams, 
  CommonService, CustomerListRequestSet, TableDateFields, tableLeadStatusCollections, RolePermissionVal, 
  moduleNameKeys, SideNavService, customerTabCollections, customerTableHeaderCollections, TableListCustomers, CustomerSortFields
} from 'src/app/utils';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionStorage } from 'ngx-webstorage';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/utils/services/loader-service/loader.service';
@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})

export class ListCustomerComponent implements OnInit {
  public tableHeaders = customerTableHeaderCollections;
  public sortField: CustomerSortFields = new CustomerSortFields();
  public selectedStatus: any;
  public selectedSearchText: string;
  public selectedSearchVLEText: string;
  public orderTabs = tableLeadStatusCollections;
  public subscribeData = new DownloadSubscribeParams();
  public permissionSets: RolePermissionVal = new RolePermissionVal();
  public tableDateFields: TableDateFields = new TableDateFields();
  public showData = true;
  public leadList: TableListCustomers = new TableListCustomers();
  public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
  public maxFromDate: any;
  public minToDate: any;
  public gridVisibility: boolean = false;
  public rowId: any;
  public selectedBranchName: string = '';
  public selectedVillageName: string = '';
  public selectedDeliverDay: string = '';
  public search_fm_user_name: string = '';
  public selectedSaheliId: string = '';
  public delivery_day: string = 'Delivery Day';
  public customer_activity = ['Not Available', 'Contacted by Phone', 'FM Intro IVR',
    'FM Check in IVR', 'E-Catalogue SMS', 'B2C Order Form SMS', 'Whatsapp',
    'Met the SJS', 'Met the TM', 'Loyalty IVR', 'TM Visit IVR', 'Servicing IVR', 'Welcome IVR'];
  public customer_stage = ['Delivery', 'Loyalty'];
  delivery_days = [{ name: 'Monday' }, { name: 'Tuesday' }, { name: 'Wednesday' },
  { name: 'Thursday' }, { name: 'Friday' }, { name: 'Saturday' }, { name: 'Sunday' }];
  cartTableHeaders = [
    { header: 'Product Order No' }, { header: 'Product' }, { header: 'Quantity' }, { header: 'Price' }, { header: 'Amount' }
  ];
  public customerActivity: any = [];
  public customerStage: string = 'Select stage';
  @SessionStorage('moduleDetails') public moduleDetails;
  @SessionStorage('registeredWarehouse') public registeredWarehouse: any;
  @SessionStorage('allowedWarehouse') public allowedWarehouse: any;
  oeRoleId: any;
  activities_selected = '';
  stage_selected = '5,6';
  public userTabs: any = [];
  user: { name: string; id: string; items: any[]; };
  SCName = 'TM search';
  public leadTabs = customerTabCollections;
  public selectedBtn = 'Total Order';
  public selectedBtnVal = 0;
  public searchVleText = '';
  public tabData = {
    ' Total Order': 'Total Order',
    'New Customer': 'New Customer',
    'Repeat Customer': 'Repeat Customer',
  };
  public selectedTabData = 'Total Order';
  public subscription = new Subscription();
  constructor(private commonService: CommonService, private sharedService: SharedService,
    private leadDetails: FetchUserTabDetailsService,public loaderService:LoaderService,public dialog: MatDialog, private router: Router,
    public sidenavService: SideNavService, private customerDetails: FetchUserTabDetailsService) {
  }

  ngOnInit() {
    let lead = this.leadTabs;
    this.leadTabs = [];
    this.moduleDetails.roles.forEach(sub => {
      if (sub.name == 'Customer Management' && (sub.sub_module ? sub.sub_module.length : 0) > 0) {
        sub.sub_module.map(data => {
          lead.forEach(data1 => {
            if (data.name == data1.name) {
              this.leadTabs.push(data1);
            }
          })
          this.tabData[data.name] = data.name;
        })
      }
    });
    if (this.leadTabs.length > 0) {
      if (this.leadTabs[0].name == 'Total Orders') {
        this.tableViewRequestData.stage_selected = '5,6';
        this.selectedBtnVal = 0;
      } else if (this.leadTabs[0].name == 'New Customer') {
        this.tableViewRequestData.stage_selected = '5';
        this.selectedBtnVal = 1;
      } else if (this.leadTabs[0].name == 'Repeat Customer') {
        this.tableViewRequestData.stage_selected = '6';
        this.selectedBtnVal = 2;
      }
    }
    let data = localStorage.getItem('/customer-management');
    if (data) {
      let parseData = JSON.parse(data);
      this.selectedBtnVal = parseData.val;
      this.makeActive(parseData);
    } else {
      this.selectedBtnVal = 0;
    }
    this.leadDetails.getUpdateList().subscribe(res => {
      this.getLeadList();
    });
    this.getLeadList();
   

  }
  //   ngDoCheck(): void {
  //     this.sidenavService.change.subscribe(data=>{
  //       this.makeActive(data.text);
  //       console.log(data)
  //     })
  // }
  /**
    * @method  modulePermissionSets()
    * @description - the following modulePermissionSets() method is used set crud operations for module.
    * @uses toCheckAllPermissionRights() - the function toCheckAllPermissionRights returns right permissions for the
    *  module passing module name  as a params.
    * @author amitha.shetty
    */
  modulePermissionSets(): void {
    this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.lead);
  }
  getRoleList(): void {
    this.commonService.getDataNew('users/roles?search_text=Territory Manager').subscribe(response => {
      if (response.success) {
        if (response.payload.records.length > 0) {
          response.payload.records.forEach(elem => {
            if (elem.name == 'Territory Manager') {
              this.oeRoleId = elem.id;
              this.selectedRoleData("")
            }
          });
        } else {
          this.sharedService.displayErrorMessage('Please create Territory Manager Role');
        }
      }
    }, err => {
      this.sharedService.displayErrorMessage('Please create Territory Manager Role');
    });
  }
  /**
   * @method  getLeadList()
   * @description - the following getLeadList() method is used get list of lead details
   * @author amitha.shetty
   */
  getLeadList(): void {
    this.modulePermissionSets();
    this.loaderService.show('show');
    this.showData = false;
    let data: any;
    this.tableViewRequestData.registrated_from = this.sharedService.formateDate(this.tableDateFields.fromDate);
    this.tableViewRequestData.registrated_to = this.sharedService.formateDate(this.tableDateFields.toDate);
    if (this.moduleDetails.name !== 'superadmin') {
      if (this.moduleDetails.name != 'superadmin') {
        if (this.allowedWarehouse.length > 1) {
          this.registeredWarehouse = '';
          this.allowedWarehouse.filter(ele => {
            this.registeredWarehouse = (this.registeredWarehouse != '') ? (this.registeredWarehouse + ',' + ele.id) : ele.id
          });
        } else {
          this.registeredWarehouse;
        }
      } else {
        this.registeredWarehouse = '';
      }
      data = new CustomerListRequestSet(this.tableViewRequestData, this.sortField, this.registeredWarehouse);
    } else {
      data = new CustomerListRequestSet(this.tableViewRequestData, this.sortField, '');
    }
    this.commonService.getDataNew('leads/getCustomer' + data.requestSet).subscribe(response => {
      if (response.success) {
        this.leadList = new TableListCustomers(response.payload);
        console.log(this.leadList,this.tableViewRequestData);
        let data = {
          'search_text': this.tableViewRequestData.searchText ? this.tableViewRequestData.searchText : '',
          'customer_type': this.tableViewRequestData.stage_selected ? this.tableViewRequestData.stage_selected : '5,6',
          'fm_user_search': this.tableViewRequestData.searchsaheliId ? this.tableViewRequestData.searchsaheliId : '',
          'coordinator_id': this.tableViewRequestData.coordinator_id ? this.tableViewRequestData.coordinator_id : '',
          'registrated_from': this.tableViewRequestData.registrated_from ? this.tableViewRequestData.registrated_from : '',
          'registrated_to': this.tableViewRequestData.registrated_to ? this.tableViewRequestData.registrated_to : '',
          'delivery_day': this.tableViewRequestData.deliveryDay ? this.tableViewRequestData.deliveryDay : '',
          'branch_name': this.tableViewRequestData.villageName ? this.tableViewRequestData.villageName : '',
        }
        this.leadDetails.shareCustomerData(data);
        this.showData = true;
      this.loaderService.show('hide');
      this.getRoleList();
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
     this.loaderService.show('hide');
    });
  }

  /**
   * @method  getPage()
   * @description - the following getPage() method is used get the selected page for pagination
   * @param event - contains the selected page number
   * @author amitha.shetty
   */
  getPage(event: number): void {
    if (event > 0 && event <= this.leadList.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getLeadList();
    }
  }
  /**
   * @method  sorting()
   * @description - the following sorting() method is used to sort the particular fields in lead list table
   * @param sortText - contains selected text for sorting
   * @param sortValue - contains number -1 for descending and 1 for ascending
   * @author amitha.shetty
   */
  sorting(sortText: string, sortValue: number) {
    (this.search_fm_user_name != '') ? this.getRoleList() : (this.tableViewRequestData.coordinator_id = '')
    switch (sortText) {
      case 'leadDate':
        this.sortField.leadDate = sortValue;
        this.getLeadList();
        break;
      case 'vleId':
        this.sortField.vleId = sortValue;
        this.getLeadList();
        break;
      case 'vleName':
        this.sortField.vleName = sortValue;
        this.getLeadList();
        break;
      case 'branchName':
        this.sortField.branchName = sortValue;
        this.getLeadList();
        break;
      default:
        break;
    }
  }

  /** FILTER EVENTS */

  /**
   * @method  searchVle()
   * @description - the following searchVle() method is used search vle name from the lead list
   * @param event - search event when the use search vle
   * @author amitha.shetty
   */
  searchVle(event: any): void {
    (this.search_fm_user_name != '') ? this.getRoleList() : (this.tableViewRequestData.coordinator_id = '')
    this.setFilterData();
    this.tableViewRequestData.searchVLE = event.target.value;
    if (event.key === "Enter") {
      this.searchFilter();
    }
  }
  /**
   * @method  searchLead()
   * @description - the following searchLead() method is used search lead name from the lead list
   * @param event - search event when the use search leads
   * @author amitha.shetty
   */
  searchLead(event: any): void {
    (this.search_fm_user_name != '') ? this.getRoleList() : (this.tableViewRequestData.coordinator_id = '')
    this.setFilterData();
    this.tableViewRequestData.searchText = event.target.value;
    if (event.key === "Enter") {
      this.searchFilter();
    }
  }


  selectDeliveryDay(event: any) {
    let day: any = this.delivery_day;
    (this.search_fm_user_name != '') ? this.getRoleList() : (this.tableViewRequestData.coordinator_id = '');
    this.setFilterData();
    this.tableViewRequestData.deliveryDay = day.name;
    this.searchFilter();
  }

  searchSaheli(event: any): void {
    (this.search_fm_user_name != '') ? this.getRoleList() : (this.tableViewRequestData.coordinator_id = '')
    this.setFilterData();
    this.tableViewRequestData.searchsaheliId = event.target.value;
    if (event.key === "Enter") {
      this.searchFilter();
    }
  }

  /**
   * @method  setStatusData()
   * @description - the following setStatusData() method is used set status from list of leads
   * @author amitha.shetty
   */
  setStatusData(): void {
    (this.search_fm_user_name != '') ? this.getRoleList() : (this.tableViewRequestData.coordinator_id = '')
    this.setFilterData();
    this.tableViewRequestData.status = this.selectedStatus.value;
    this.subscribeData.customer.status = this.tableViewRequestData.status;
    this.getLeadList();
  }
  /**
   * @method  setFilterData()
   * @description - the following setFilterData() method is used update the search values and status
   * @author amitha.shetty
   */
  setFilterData() {
    if (this.selectedSearchText) {
      this.tableViewRequestData.searchText = this.selectedSearchText;
    }
    if (this.selectedDeliverDay) {
      this.tableViewRequestData.searchVLE = this.selectedDeliverDay;
    }
    if (this.stage_selected) {
      this.tableViewRequestData.status = this.stage_selected;
    }
    if (this.selectedSaheliId) {
      this.tableViewRequestData.searchsaheliId = this.selectedSaheliId;
    }

    if (this.selectedVillageName) {
      this.tableViewRequestData.villageName = this.selectedVillageName
    }

  }
  /**
 * @method  serchByBranchName()
 * @description - the following searchBranchName() method is used the search by branch Name
 * @author Arul
 */
  searchBranchName(event) {
    (this.search_fm_user_name != '') ? this.getRoleList() : (this.tableViewRequestData.coordinator_id = '')
    this.setFilterData();
    this.tableViewRequestData.branchName = this.selectedBranchName;
    if (event.key === "Enter") {
      this.searchFilter();
    }
  }

  searchVillageName(event) {
    (this.search_fm_user_name != '') ? this.getRoleList() : (this.tableViewRequestData.coordinator_id = '')
    this.setFilterData();
    this.tableViewRequestData.villageName = this.selectedVillageName;
    this.subscribeData.customer.searchVillage = this.tableViewRequestData.villageName
    if (event.key === "Enter") {
      this.searchFilter();
    }
  }
  searchTMName(event) {
    if (event.key === "Enter") {
      this.searchFilter();
    }
  }
  selectStage(event) {
    this.stage_selected = (event == 'Delivery') ? '5' : (event == 'Loyalty') ? '6' : '5,6';
    this.tableViewRequestData.stage_selected = this.stage_selected
    this.subscribeData.customer.stage_selected = this.tableViewRequestData.stage_selected;
    this.searchFilter()
  }
  searchFilter() {
    // console.log(this.villageName != '' || this.searchVleText != '' || this.productName != '')
    if (this.tableViewRequestData.villageName != '' || this.tableViewRequestData.searchText != '' ||
      this.tableViewRequestData.search_fm_user_name != '' || this.selectedSaheliId != '' ||
      this.tableViewRequestData.stage_selected != '' || this.tableViewRequestData.deliveryDay != ''
      || this.tableViewRequestData.coordinator_id != '') {
      this.subscribeData.customer.searchVillage = this.tableViewRequestData.villageName;
      // this.subscribeData.customer.status = this.tableViewRequestData.status;
      this.subscribeData.customer.searchLeadUser = this.tableViewRequestData.searchText;
      this.subscribeData.customer.search_fm_user_name = this.tableViewRequestData.search_fm_user_name;
      this.subscribeData.customer.selectedSaheliId = this.selectedSaheliId;
      this.subscribeData.customer.stage_selected = this.tableViewRequestData.stage_selected;
      this.subscribeData.customer.delivery_day = this.tableViewRequestData.deliveryDay;
      this.subscribeData.customer.coordinator_id = this.tableViewRequestData.coordinator_id;
      this.customerDetails.setCustomerStatus(this.subscribeData);
      this.getLeadList();
    }
  }

  /** CRUD OPERATIONS */
  /**
   * @method  create()
   * @description - the following create() method is used to navigate to create lead for creating lead
   * @author amitha.shetty
   */
  create() {
    this.router.navigate(['lead-management/create-lead']);
  }
  /**
   * @method  viewOrders()
   * @description - the following viewOrders() method is used to navigate to edit lead for editing lead
   * @param id - contains lead id for which lead can be editable
   * @author amitha.shetty
   */
  viewOrders(item) {
    this.router.navigate([`customer-management/view-customer-orders/${item.customer_id}`])
  }
  /**
   * @method  openDialog()
   * @description - the following openDialog() method is used to open dialog box  for delete confirmation.
   * @param id - contains customer id for deletion purpose
   * @param leadName - contains name of the lead
   * @author amitha.shetty
   */
  openDialog(id: string, leadName: string): void {
    const dialogRef = this.sharedService.openDialog(leadName);
    dialogRef.afterClosed().subscribe(result => {
      const data = {
        customer_id: id
      };
      if (result) {
        this.commonService.deleteData('admin/customer', data).subscribe(response => {
          if (response.status = 200) {
            this.sharedService.displaySuccessMessage('User Deleted Successfully');
            this.getLeadList();
          }
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
      }
    });
  }
  getScheduledTime(event, type): void {
    if (type === 'from') {
      this.tableDateFields.fromDate = event;
      this.subscribeData.customer.registerFromDate = this.sharedService.formateDate(event);
      const date = new Date(this.tableDateFields.fromDate);
      const requiredDate = date.setDate(date.getDate() + 1);
      this.minToDate = new Date(requiredDate);
    } else if (type === 'to') {
      this.tableDateFields.toDate = event;
      this.subscribeData.customer.registerToDate = this.sharedService.formateDate(event);
      const date = new Date(this.tableDateFields.toDate);
      const requiredDate = date.setDate(date.getDate() - 1);
      this.maxFromDate = new Date(requiredDate);
    }
    if (this.tableDateFields.fromDate && this.tableDateFields.toDate) {
      this.leadDetails.setCustomerStatus(this.subscribeData);
      this.getLeadList();
    }
  }
  resetFilter() {
    this.selectedBranchName = '';
    this.selectedVillageName = '';
    this.tableViewRequestData.branchName = '';
    this.tableViewRequestData.villageName = '';
    this.search_fm_user_name = '';
    this.tableViewRequestData.search_fm_user_name = this.search_fm_user_name;
    this.oeRoleId = '';
    this.tableViewRequestData.coordinator_id = this.oeRoleId;
    this.customerActivity = [];
    this.activities_selected = '';
    this.tableViewRequestData.activities_selected = this.activities_selected;
    this.customerStage = 'Select stage';
    if (this.selectedBtnVal == 0) {
      this.tableViewRequestData.stage_selected = '5,6';
    } else if (this.selectedBtnVal == 1) {
      this.tableViewRequestData.stage_selected = '5';
    } else if (this.selectedBtnVal == 2) {
      this.tableViewRequestData.stage_selected = '6';
    }
    this.tableViewRequestData.searchsaheliId = '';
    this.tableDateFields.fromDate = ''
    this.tableDateFields.toDate = ''
    this.delivery_day = '';
    this.tableViewRequestData.deliveryDay = '';
    this.selectedSaheliId = '';
    this.selectedSearchText = '';
    this.tableViewRequestData.searchText = this.selectedSearchText;
    this.subscribeData.customer.branch = this.tableViewRequestData.branchName;
    this.subscribeData.customer.searchVillage = this.tableViewRequestData.villageName;
    this.subscribeData.customer.stage_selected = this.tableViewRequestData.stage_selected;
    this.subscribeData.customer.coordinator_id = this.tableViewRequestData.coordinator_id;
    this.subscribeData.customer.selectedSaheliId = this.tableViewRequestData.searchsaheliId;
    this.subscribeData.customer.delivery_day = this.tableViewRequestData.deliveryDay;
    this.customerDetails.setCustomerStatus(this.subscribeData);
    this.selectedStatus = {
      name: 'All',
      value: ''
    },
      this.SCName = 'TM search'
    this.getLeadList();
    this.delivery_day = 'Delivery Day'
  }
  selectedRoleData(event) {
    this.userTabs = [];
    this.user = {
      name: 'Select User',
      id: '',
      items: []
    }
    if (event.name != 'All') {
      if (this.oeRoleId) {
        const requestSet = '?records_per_page=' + 10000 + '&page_number=' +
          1 + '&role_id=' + this.oeRoleId;
        this.commonService.getDataNew('users' + requestSet).subscribe(res => {
          if (res.success) {
            this.userTabs = res.payload.records;
            this.userTabs.push({
              first_name: 'All',
              _id: ''
            });
          }
        }, (err) => {
         //m this.loaderService.show('hide');
        });
      } else {
      }
    } else {
      this.userTabs = [];
      this.getLeadList();
    }
  }
  selectedUserData(event) {
    if (event.id) {
      this.tableViewRequestData.coordinator_id = event.id;
      this.getLeadList();
    } else {
      this.tableViewRequestData.coordinator_id = '';
      this.getLeadList();
    }
  }

  makeActive(tabInfo: any) {
    // console.log(tabInfo)
    if (tabInfo.name == 'Total Orders') {
      this.tableViewRequestData.stage_selected = '5,6';
    } else if (tabInfo.name == 'New Customer') {
      this.tableViewRequestData.stage_selected = '5';
    } else if (tabInfo.name == 'Repeat Customer') {
      this.tableViewRequestData.stage_selected = '6';
    }
    // this.tableViewRequestData = new TableViewRequestSet();
    this.selectedBtn = tabInfo.key;
    this.selectedTabData = this.tabData[tabInfo.name];
    // this.showIndividualData = false;
    this.selectedBtnVal = tabInfo.value;
    this.searchVleText = '';
    this.tableViewRequestData.status = tabInfo.value;
    this.subscribeData.customer.status = this.tableViewRequestData.status;
    this.subscribeData.customer.searchFmUser = '';
    this.subscribeData.customer.orderTabStatus = tabInfo.key;
    this.customerDetails.setCustomerStatus(this.subscribeData);
    this.resetFilter()
    this.clickMe(this.selectedBtnVal)
    // this.getLeadList();
  }

  clickMe(selectedBtnVal) {
    this.sharedService.sendClickEvent(selectedBtnVal);
  }

}

// export class ListCustomerComponent implements OnInit {
//   public selectedBtnVal = 4;
//   public filterDemoRequest = new DemoProductTableViewFilterRequestSet();
//   public subscribeData = new DownloadSubscribeParams();
//   public filterDemoResponse: any;
//   public tableHeaders: any = [
//     { header: 'Product Name' },
//     { header: 'Assigned by' },
//     { header: 'Warehouse' },
//     { header: 'Branch' },
//     { header: 'Assigned to' },
//     { header: 'Mobile No' },
//     { header: 'Village' },
//     { header: 'Role' },
//     { header: 'Quantity' },
//     { header: 'Returned Quantity' },
//     { header: 'Price' },
//     { header: 'Issued Date' },
//     { header: 'Received Date' }
//   ];
//   public demoProductList = new DemoListProduct();
//   public demoListStatus = [{
//     name: 'Issued',
//     val: 4
//   }, {
//     name: 'Returned',
//     val: 5
//   }];
//   public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
//   public permissionSets: RolePermissionVal = new RolePermissionVal();
//   public villageName: string = '';
//   @SessionStorage('userName') public userData: UserInfo;
//   @SessionStorage('moduledetails') public userModule;
//   constructor(private commonService: CommonService, public dialog: MatDialog, public sharedService: SharedService, public fetchUserTab: FetchUserTabDetailsService) { }

//   ngOnInit() {
//     this.getDemoProducts();
//     this.modulePermissionSets();
//   }
//   /**
//      * @method  modulePermissionSets()
//      * @description - the following modulePermissionSets() method is used set crud operations for module.
//      * @uses toCheckAllPermissionRights() - the function toCheckAllPermissionRights returns right permissions for the
//      *  module passing module name  as a params.
//      * @author amitha.shetty
//      */
//   modulePermissionSets(): void {
//     this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.demoProduct);
//   }
//   makeActive(item): void {
//     this.selectedBtnVal = item.val;
//     this.tableViewRequestData = new TableViewRequestSet();
//     this.subscribeData.demoProduct.status = this.selectedBtnVal;
//     this.fetchUserTab.setDemoProductSubscribeStatus(this.subscribeData);
//     this.getDemoProducts();
//   }
//   getDemoProducts(): void {
//     (this.userModule.name == 'superadmin') ? (this.userData.warehouse_id = '') : this.userData.warehouse_id;
//     const requestSet = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
//       this.tableViewRequestData.pageNumber + '&fm_user_village=' + this.villageName + `&status=` + this.selectedBtnVal + '&sort_updated_date=' + -1;
//     const demoFilterRequest = `&fm_user_id=${this.filterDemoRequest.frontierMarketingUser}&product_detail_id=${this.filterDemoRequest.productDetail}&warehouse_id=${(this.filterDemoRequest.warehouse == '') ? this.userData.warehouse_id : this.filterDemoRequest.warehouse}`;
//     this.commonService.getData(`admin/demoOrder` + requestSet + demoFilterRequest).subscribe(res => {
//       if (res.payload) {
//         this.demoProductList = new DemoListProduct(res.payload);
//       }
//     }, err => {
//     });
//   }

//   searchVillageName(event) {
//     this.getDemoProducts();
//   }


//   getPage(event: number): void {
//     if (event > 0 && event <= this.demoProductList.totalRecords) {
//       this.tableViewRequestData.pageNumber = event;
//       this.getDemoProducts();
//     }
//   }

//   // applyFilter() {
//   //   const dialogRef = this.dialog.open(FilterDialogComponent, {
//   //     data: {
//   //       filterName: 'Apply Demo Product Filter',
//   //       demoResponse: this.filterDemoResponse
//   //     },
//   //     panelClass: 'filter-pop-up'
//   //   });

//   //   dialogRef.afterClosed().subscribe(result => {
//   //     if (result && result.responseData) {
//   //       const collections = ['productDetail', 'frontierMarketingUser', 'warehouse'];
//   //       this.filterDemoRequest = new DemoProductTableViewFilterRequestSet();
//   //       this.subscribeData = new DownloadSubscribeParams();
//   //       this.subscribeData.demoProduct.status = this.selectedBtnVal;
//   //       this.filterDemoResponse = result.responseData;
//   //       collections.map(ele => {
//   //         if (this.filterDemoResponse[ele]) {
//   //           this.filterDemoRequest[ele] = this.filterDemoResponse[ele]._id;
//   //           this.subscribeData.demoProduct[ele] = this.filterDemoResponse[ele]._id;
//   //         }
//   //       });
//   //       this.tableViewRequestData = new TableViewRequestSet();
//   //       this.getDemoProducts();
//   //       this.fetchUserTab.setDemoProductSubscribeStatus(this.subscribeData);
//   //     }
//   //   });
//   // }
// }
