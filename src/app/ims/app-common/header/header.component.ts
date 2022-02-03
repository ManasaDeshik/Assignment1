import { Component, OnInit, Input, ElementRef,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FormBuilder } from '@angular/forms';
import { SideNavService, UserInfo, FilterDialogComponent, SharedService, FetchUserTabDetailsService, DownloadApiReference, LoaderService, UploadExcelReference, CommonService, TableDateFields, RolePermissionVal, moduleNameKeys } from 'src/app/utils';
import { SessionStorage, SessionStorageService } from 'ngx-webstorage';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SocketService } from 'src/app/service/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public downloadApiDetails: DownloadApiReference;
  public uploadApiDetails: UploadExcelReference;
  public downloadInvoice = false;
  public downloadAll = false;
  public downloadDemoProduct = false;
  public downloadCustomer = false;
  public tableDateFields: TableDateFields = new TableDateFields();
  @SessionStorage('authenticationToken') public authenticationToken;
  @SessionStorage('moduleDetails') public moduleDetails;
  @SessionStorage('userName') public userData: UserInfo;
  @SessionStorage('registeredWarehouse') public registeredWarehouse: any;
  @Input() sidenav: MatSidenav;
  @ViewChild('csvFileInput')
  public myInputVariable: ElementRef;
  public side = false;
  public downloadAndUploadAccess: RolePermissionVal = new RolePermissionVal();
  public uploadExcelInfo: any;
  public isUploadExcel: boolean;
  public isDemoReturnProduct: boolean = false;
  public isUploadTemplate = false;
  public downloadRole = false;
  public customer_stage: any;
  public leadDownloadAccess = true;
  public isUploadPopUp = false;
  public subscription : Subscription
  public notification  = []
  templateLocation;
  constructor(
    private sidenavService: SideNavService,
    public formBuilder: FormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private sessionStorage: SessionStorageService,
    private fetchDetails: FetchUserTabDetailsService,
    private commonService: CommonService,
    private loaderService: LoaderService,
    private dialog: MatDialog,
    private socketService : SocketService
  ) {
    this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        this.setDataOnRoute();
      }
    });
  }
  ngOnInit() {
    this.observeBehaviorDataChange();
    this.socketService.reconnect()
    this.subscription = this.socketService.getMessages.subscribe((data : any)=>{
      console.log(data)
      if(data.type=='notification'){
          this.notification.push(data.data)
      }
    })
  }
  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe()
  }

  readNotification(){
    // this.notification = []
    this.router.navigate(['stock/ongoing-orders'])
  }

  /**
   * @method - setDataOnRoute()
   * @description - the following setDataOnRoute() method is used to set initial data for downlaod and upload details based on current route
   * @author amitha.shetty and Karan
   */
  setDataOnRoute(): void {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone.toString();
    this.downloadAndUploadAccess = new RolePermissionVal();
    this.isUploadExcel = true;
    this.downloadInvoice = false;
    this.downloadAll = false;
    this.downloadDemoProduct = false;
    this.downloadRole = false;
    this.downloadCustomer = false;
    this.isUploadTemplate = false;
    this.isUploadPopUp = false;
    switch (true) {
      case this.router.url === '/orders':
        this.downloadApiDetails = new DownloadApiReference('admin/order/excel', 'orders.xlsx');
        this.downloadApiDetails.requestSet = '?type=order&status=' + 0 + '&sort_updated_date=' + -1 + '&timezone=' + timeZone;
        this.uploadApiDetails = new UploadExcelReference('admin/order/excel', 'Received');
        this.downloadInvoice = true;
        this.isUploadExcel = false;
        this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.order);
        break;
      case this.router.url === '/lead-management':
        this.downloadApiDetails = new DownloadApiReference('admin/customer/excel', 'lead-users.xlsx');
        this.uploadApiDetails = new UploadExcelReference('admin/customer/excel');
        this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.lead);
        this.leadSubscribe();
        this.isUploadTemplate = true;
        this.templateLocation = 'upload/lead-template';
        this.isUploadPopUp = true;
        break;

      case this.router.url === '/customer-management':
        this.downloadApiDetails = new DownloadApiReference('admin/getCustomer/excel', 'customers.xlsx');
        this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.customer);
        //this.downloadApiDetails.requestSet = '?type=customer&status=' + '&sort_updated_date=' + -1 + '&timezone=' + timeZone;
       this.customerSubscribe()
        this.downloadCustomer = true;
        this.isUploadExcel = false;
        break;
      case this.router.url === '/try-buy':
        this.downloadApiDetails = new DownloadApiReference('api/tryAndBuy/excel', 'try-buy.xlsx');
        this.downloadApiDetails.requestSet = '?type=try-buy&status=' + '&sort_updated_date=' + -1 + '&timezone=' + timeZone;
        this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.tryAndBuy);
        this.isUploadExcel = false;
        break;
      case this.router.url.includes('/list-users'):
        this.downloadApiDetails = new DownloadApiReference('upload/usersUpload', 'FM-users.xlsx');
        this.downloadApiDetails.requestSet = '?type=users&timezone=' + timeZone;
        this.uploadApiDetails = new UploadExcelReference('upload/usersUpload');
        this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.user);
        this.isUploadTemplate = true;
        this.templateLocation = 'upload/userTemplate';//admin/frontierMarketingUser/excel/template';
        this.isUploadPopUp = true;
        break;
      case this.router.url.includes('list-manufacturer'):
        this.downloadApiDetails = new DownloadApiReference('admin/manufacturer/excel', 'manufacture.xlsx');
        this.downloadApiDetails.requestSet = '?type=manufacturer';
        this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.manufacturer);
        this.isUploadExcel = false;
        break;
      case this.router.url.includes('list-branches'):
        this.downloadApiDetails = new DownloadApiReference('admin/branch/excel', 'branch.xlsx');
        this.uploadApiDetails = new UploadExcelReference('admin/branch/excel');
        this.downloadApiDetails.requestSet = '?type=branch';
        this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.branch);
        this.isUploadTemplate = true;
        this.isUploadPopUp = true;
        this.templateLocation = 'upload/branchTemplate';
        break;
      case this.router.url.includes('order-history'):
        this.downloadApiDetails = new DownloadApiReference('admin/purchaseOrder/excel', 'order-history.xlsx');
        this.downloadApiDetails.requestSet = '?type=order-history&status=' + 3 + '&timezone=' + timeZone;
        this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.purchaseOrder);
        this.isUploadExcel = false;
        break;
      case this.router.url.includes('ongoing-orders'):
        this.downloadApiDetails = new DownloadApiReference('admin/purchaseOrder/excel', 'ongoing-po.xlsx');
        this.downloadApiDetails.requestSet = '?type=purchase&status=' + 2 + '&timezone=' + timeZone;
        this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.purchaseOrder);
        this.isUploadExcel = false;
        break;
      case this.router.url.includes('ongoing-transit'):
        this.downloadApiDetails = new DownloadApiReference('admin/transport/excel', 'ongoing_transit.xlsx');
        this.downloadApiDetails.requestSet = '?type=transport&status=' + 3;
        this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.stocks);
        this.isUploadExcel = false;
        this.downloadDemoProduct = false;
        break;
      case this.router.url.includes('ongoing-order-transit'):
        this.downloadApiDetails = new DownloadApiReference('admin/transport/excel', 'ongoing_transit.xlsx');
        this.downloadApiDetails.requestSet = '?type=transport&status=' + 4;
        this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.stocks);
        this.isUploadExcel = false;
        this.downloadDemoProduct = false;
        break;
      case this.router.url.includes('list-stocks'):
        this.downloadApiDetails = new DownloadApiReference('admin/stock/excel', 'stock.xlsx');
        this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.stocks);
        this.downloadApiDetails.requestSet = '?type=stock';
        this.isUploadExcel = false;
        this.downloadDemoProduct = true;
        break;
      case this.router.url.includes('list-warehouse'):
        this.downloadApiDetails = new DownloadApiReference('admin/warehouse/excel', 'warehouse.xlsx');
        this.downloadApiDetails.requestSet = '?type=warehouse'
        this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.warehouse);
        this.isUploadExcel = false;
        break;
      case this.router.url.includes('list-franchise'):
        this.downloadApiDetails = new DownloadApiReference('admin/franchise/excel', 'franchise.xlsx');
        this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.franchise);
        this.downloadApiDetails.requestSet = '?type=franchise'
        this.isUploadExcel = false;
        break;
      case this.router.url.includes('list-products'):
        this.downloadApiDetails = new DownloadApiReference('admin/productDetail/excel', 'product_detail.xlsx');
        this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.product);
        this.downloadApiDetails.requestSet = '?type=products';
        this.isUploadExcel = false;
        break;
      case this.router.url.includes('list-category'):
        this.downloadApiDetails = new DownloadApiReference('api/category/excel', 'category.xlsx');
        this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.category);
        this.downloadApiDetails.requestSet = '?type=category';
        this.isUploadExcel = false;
        break;
      case this.router.url.includes('list-demo-products'):
        this.downloadApiDetails = new DownloadApiReference('admin/demoOrder/excel', 'demo-product.xlsx');
        this.uploadApiDetails = new UploadExcelReference('admin/demoOrder/excel', 'demo_upload_template.xlsx');
        this.demoSubscribe()
        this.downloadApiDetails.requestSet = '?type=demo-products&status=' + 1 + '&sort_updated_date=' + -1 + '&timezone=' + timeZone;
        this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.demoProduct);
        this.isUploadExcel = false;
        break;
      case this.router.url.includes('service-management'):
        this.downloadApiDetails = new DownloadApiReference('api/service/excel', 'service.xlsx');
        this.downloadApiDetails.requestSet = '?type=service-management&status=' + 1;
        this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.service);
        break;
      case this.router.url.includes('list-roles'):
        this.downloadApiDetails = new DownloadApiReference('admin/role/excel', 'role.xlsx');
        this.downloadApiDetails.requestSet = '?type=roles'
        this.downloadRole = true;
        break;
      default:
        this.downloadApiDetails = new DownloadApiReference();
        break;
    }
  }

  /**
   * @method  downloadAndUploadPermissionSets()
   * @description - the following downloadAndUploadPermissionSets() method is used set crud operations for module.
   * @uses toCheckAllPermissionRights() - the function toCheckAllPermissionRights returns right permissions for the
   *  module passing module name  as a params.
   * @author amitha.shetty
   */
  downloadAndUploadPermissionSets(moduleName): RolePermissionVal {
    const isAllowedToAccess = this.sharedService.toCheckAllPermissionRights(moduleName);
    return isAllowedToAccess;
  }

  /**
   * @method - observeBehaviorDataChange()
   * @description - the following observeBehaviorDataChange() method is used to subscribe to the observable sequence.
   * so we can update the values
   * @author amitha.shetty and Karan
   */
  observeBehaviorDataChange(): void {

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone.toString();
    this.fetchDetails.getSelectedUserRole().subscribe(roleResponse => {
      this.downloadApiDetails.requestSet = '?role_id=' + roleResponse.fmUser.role +
        '&search_text=' + roleResponse.fmUser.searchFmUser + '&village=' + roleResponse.fmUser.searchVillage + '&registration_date=' + roleResponse.fmUser.registrationDate + '&branch_name=' + roleResponse.fmUser.searchBranch + '&search_district=' + roleResponse.fmUser.searchDistrict + '&timezone=' + timeZone + '&type=users';
    });
    this.fetchDetails.getSelectedOrderStatus().subscribe(orderResponse => {
      this.downloadApiDetails.reportName = `${orderResponse.order.selectedOrder}_orders.xlsx`;
      this.downloadApiDetails.requestSet = '?type=order&status=' + orderResponse.order.status + '&search_fm_user_name='
        + orderResponse.order.searchFmUser + '&sort_updated_date=' + -1 + '&timezone=' + timeZone +
        '&warehouse_id=' + orderResponse.order.warehouseId +
        '&fm_user_search=' + orderResponse.order.fm_user_search +
        '&product_name=' + orderResponse.order.productName +
        '&customer_village=' + orderResponse.order.villageName +
        '&coordinator_id=' + orderResponse.order.coordinator_id +
        '&delivery_day=' + orderResponse.order.delivery_day +
        '&role_id=' + orderResponse.order.role_id;

      if (orderResponse.order.orderTabStatus === 'Received' || orderResponse.order.orderTabStatus === 'Completed') {
        this.uploadApiDetails = new UploadExcelReference('admin/order/excel', orderResponse.order.orderTabStatus);
        this.isUploadExcel = false;
      } else {
        this.uploadApiDetails = new UploadExcelReference('');
        this.isUploadExcel = false;
      }
    });

    this.fetchDetails.getCustomerStatus().subscribe(customerData => {
      this.downloadApiDetails.requestSet = '?status=' + customerData.customer.status + '&search_text='
        + customerData.customer.searchLeadUser
        + '&search_fm_user=' + customerData.customer.searchFmUser + '&sort_updated_date=' + -1 + '&registrated_from=' +
        '&customer_stage=' + customerData.customer.stage_selected ? customerData.customer.stage_selected : '1,2' +
        '&saheli_id_mobile=' + customerData.customer.selectedSaheliId +
        '&village_name_code=' + customerData.customer.villageName +
        '&coordinator_id=' + customerData.customer.coordinator_id +
        // '&role_id='+customerData.customer.roleId +
        '&branch_name=' + customerData.customer.branchName +
        '&delivery_day=' + customerData.customer.delivery_day +
        '&timezone=' + timeZone;
    });

    this.fetchDetails.getTryBuyStatus().subscribe(tryBuyResponse => {
      this.downloadApiDetails.requestSet = '?type=try-buy&status=' + tryBuyResponse.tryBuy.status + '&sort_updated_date=' + -1 +
        '&search_product_name=' + tryBuyResponse.tryBuy.searchProduct +
        '&branch_name=' + tryBuyResponse.tryBuy.branchName + '&branch_village=' + tryBuyResponse.tryBuy.villageName +
        '&search_fm_user=' + tryBuyResponse.tryBuy.searchFmUser + '&timezone=' + timeZone;
    });
    this.fetchDetails.getBranchSubscribeStatus().subscribe(branchResponse => {
      this.downloadApiDetails.requestSet = '?type=branch&sort_updated_date=' + -1 + '&search_by_branch_name=' + branchResponse.branch.searchBranch
        + '&search_by_district=' + branchResponse.branch.searchDistrict + '&search_by_village=' + branchResponse.branch.searchVillage +
        '&search_by_state=' + branchResponse.branch.searchState + '&search_delivery_day=' + branchResponse.branch.delivery_day;
    });
    this.fetchDetails.getSelectedLeadStatus().subscribe((leadStatusResponse: any) => {
      let leadStage;
      leadStage = leadStatusResponse.customer_stage;
      this.downloadApiDetails.requestSet = '?type=leads&status=' + leadStatusResponse.status +
        '&search_text=' + leadStatusResponse.search_text +
        '&coordinator_id=' + leadStatusResponse.coordinator_id
        + '&search_fm_user=' + leadStatusResponse.search_fm_user + '&sort_updated_date=' + '-1' +
        '&registrated_from=' + leadStatusResponse.registrated_from +
        '&registrated_to=' + leadStatusResponse.registrated_to
        + '&customer_activity=' + leadStatusResponse.customer_activity +
        // '&customer_stage=' + leadStatusResponse.stage_selected +
        '&delivery_day=' + leadStatusResponse.delivery_day +
        '&customer_stage=' + leadStatusResponse.customer_stage +
        '&branch_name=' + leadStatusResponse.branch_name +
        '&village_name=' + leadStatusResponse.village_name +
        '&fm_warehouse_id=' + leadStatusResponse.fm_warehouse_id +
        '&timezone=' + timeZone;
    });
    this.fetchDetails.getManufactureSubscribeStatus().subscribe(manufactureResponse => {
      this.downloadApiDetails.requestSet = '?search_text=' + manufactureResponse.manufacture.searchText;
    });
    this.fetchDetails.getWarehouseSubscribeStatus().subscribe(warehouseResponse => {
      this.downloadApiDetails.requestSet = '?search_text=' + warehouseResponse.warehouse.searchText+ '&type=warehouse';
    });
    this.fetchDetails.getFranchiseSubscribeStatus().subscribe(franchiseResponse => {
      this.downloadApiDetails.requestSet = '?search_text=' + franchiseResponse.franchise.searchText;
    });
    this.fetchDetails.getProductsSubscribeStatus().subscribe(productResponse => {
      if (productResponse.products.langSelected !== 'en') {
        this.downloadApiDetails.apiEndPoint = '';
      } else {
        this.downloadApiDetails = new DownloadApiReference('admin/productDetail/excel', 'product_detail.xlsx');
        this.downloadApiDetails.requestSet = '?type=products&search_text=' + productResponse.products.searchText + '&category_id=' + productResponse.products.category;
      }
    });
    this.fetchDetails.getCategorySubscribeStatus().subscribe(categoryResponse => {
      if (categoryResponse.category.langSelected !== 'en') {
        this.downloadApiDetails.apiEndPoint = '';
      } else {
        this.downloadApiDetails = new DownloadApiReference('api/category/excel', 'category.xlsx');
        this.downloadApiDetails.requestSet = '?type=category&search_text=' + categoryResponse.category.searchText;
      }
    });
    this.fetchDetails.getOngoingPOSubscribeStatus().subscribe(ongoingPOResponse => {
      const dataDateRequest = '&ordered_from_date=' + ongoingPOResponse.ongoingPO.orderDateField.fromDate + '&ordered_to_date=' + ongoingPOResponse.ongoingPO.orderDateField.toDate + '&arrival_from_date=' + ongoingPOResponse.ongoingPO.arrivalDateField.fromDate + '&arrival_to_date=' + ongoingPOResponse.ongoingPO.arrivalDateField.toDate;
      this.downloadApiDetails.requestSet = '?manufacturer_id=' + ongoingPOResponse.ongoingPO.manufacture + '&branch_id=' + ongoingPOResponse.ongoingPO.branch + '&warehouse_id=' +
        ongoingPOResponse.ongoingPO.warehouse + '&category_id=' + ongoingPOResponse.ongoingPO.category + '&search_product=' + ongoingPOResponse.ongoingPO.searchProduct + '&status=' + 2 + dataDateRequest + '&timezone=' + timeZone;
    });
    this.fetchDetails.getDemoProductSubscribeStatus().subscribe(demoProductResponse => {
      
        this.downloadApiDetails.requestSet = '?type=demo-products&status=2&demo_product_assigned_fm_user_id='+demoProductResponse.demoProduct.frontierMarketingUser+'&product_detail_id='+demoProductResponse.demoProduct.productDetail+'&warehouse_id='+demoProductResponse.demoProduct.warehouse+'&sort_updated_date='+-1 + '&timezone=' + timeZone;
        if (demoProductResponse.demoProduct.status === 4) {
        this.isUploadExcel = true;
      } else {
        this.isUploadExcel = false;
      }
    });

  }
  serviceSubscribe() {
    this.fetchDetails.currentMessage.subscribe((serviceResponse: any) => {
      if (serviceResponse) {
        this.downloadApiDetails.requestSet = "?status=" + serviceResponse.status +
          "&oe_status=" + serviceResponse.oe_status + "&search_customer_name=" + serviceResponse.search_customer_name +
          "&search_product_name=" + serviceResponse.search_product_name + "&ticket_number=" +
          serviceResponse.ticket_number + "&_id=" + serviceResponse._id;
      }
    })
  }
  servicePOData() {
    this.fetchDetails.currentMessage.subscribe((serviceResponse: any) => {
      if (serviceResponse) {
        if (serviceResponse === 'Spare') {
          this.downloadApiDetails = new DownloadApiReference('admin/purchaseOrder/spare/excel', 'ongoing_spare.xlsx');
          this.downloadApiDetails.requestSet = "?status=" + 2 + '&timezone=' + Intl.DateTimeFormat().resolvedOptions().timeZone.toString();
          this.downloadAndUploadAccess = this.downloadAndUploadPermissionSets(moduleNameKeys.purchaseOrder);
        } 
      }
    })
  }

  demoSubscribe() {
    this.fetchDetails.currentMessage.subscribe((demoResponse: any) => {
      console.log(demoResponse,'dsffffffffffffff')
      if (demoResponse) {
        if (demoResponse == 5) {
          this.downloadApiDetails = new DownloadApiReference('admin/demoOrder/return/excel', 'demo_product_return.xlsx');
        }
      }
    })
  }
  leadSubscribe() {
    let leadStage;          
    this.leadDownloadAccess = false;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone.toString();
    this.fetchDetails.leadDataMessage.subscribe((leadStatusResponse: any) => {
      leadStage = leadStatusResponse.customer_stage;
      this.downloadApiDetails.requestSet = '?type=leads&status=' + leadStatusResponse.status +
        '&search_text=' + leadStatusResponse.search_text +
        '&coordinator_id=' + leadStatusResponse.coordinator_id
        + '&search_fm_user=' + leadStatusResponse.search_fm_user + '&sort_updated_date=' + '-1' +
        '&registrated_from=' + leadStatusResponse.registrated_from +
        '&registrated_to=' + leadStatusResponse.registrated_to
        + '&customer_activity=' + leadStatusResponse.customer_activity +
        // '&customer_stage=' + leadStatusResponse.stage_selected +
        '&delivery_day=' + leadStatusResponse.delivery_day +
        '&customer_stage=' + leadStatusResponse.customer_stage +
        '&branch_name=' + leadStatusResponse.branch_name +
        '&village_name=' + leadStatusResponse.village_name +
        '&fm_warehouse_id=' + leadStatusResponse.fm_warehouse_id +
        '&timezone=' + timeZone;
    });
  }

  customerSubscribe() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone.toString();
    this.fetchDetails.customerDataMessage.subscribe((customerResponse: any) => {
      this.downloadApiDetails.requestSet = '?type=customer&search_text=' + customerResponse.search_text +
        '&customer_stage=' + customerResponse.customer_type
        + '&fm_user_search=' + customerResponse.fm_user_search + '&sort_updated_date=' + '-1' +
        '&registrated_from=' + customerResponse.registrated_from +
        '&registrated_to=' + customerResponse.registrated_to
        + '&branch_name=' + customerResponse.branch_name +
        '&coordinator_id=' + customerResponse.coordinator_id +
        '&delivery_day=' + customerResponse.delivery_day +
        '&timezone=' + timeZone;
    });
  }

  /**
   * @method - excelDownload()
   * @description - the following excelDownload() used to get file from server and download the file
   * Blobs are returned with file type . The following function will accept file type and popup download window
   * @author amitha.shetty
   */
  excelDownload(): void {
    //console.log(this.downloadApiDetails.reportName)
   var myarray=["FM-users.xlsx","stock.xlsx","branch.xlsx","product_detail.xlsx"];
    if(myarray.includes(this.downloadApiDetails.reportName))
    {
      this.commonService.getDataNew(`download/getlist${this.downloadApiDetails.requestSet}`).subscribe(response => {
        if (response) {
          this.sharedService.displayErrorMessage(response.data);
        //   const blob = new Blob([response], { type: 'application/octet-stream' });
        //   const link = document.createElement('a');
        //   link.setAttribute('href', window.URL.createObjectURL(blob));
        //   link.setAttribute('download', this.data.name);
        //   document.body.appendChild(link);
        //   link.click();
          // document.body.removeChild(link);
         this.loaderService.show('hide');
        }
      }, err => {
        this.sharedService.displayErrorMessage('Service Not Found');
      //m this.loaderService.show('hide');
      });
    }else{
    this.commonService.getDataNew('upload/get-user-upload-email').subscribe((response)=>{
      
      const dialogRef = this.dialog.open(FilterDialogComponent, {
        data: {
          filterName: 'Download Filter',
          type: 'download',
          url: this.downloadApiDetails.apiEndPoint,
          req: this.downloadApiDetails.requestSet,
          name: this.downloadApiDetails.reportName,
          uploadedEmail : response.email
        },
        panelClass: 'filter-pop-up-invoice',
        height : "400px"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.file.name) {
            this.uploadExcelInfo = result.file;
          }
      if (this.router.url.includes('service-management')) {
        this.serviceSubscribe();
      } else if (this.router.url.includes('ongoing-orders')) {
        this.servicePOData();
      } else if (this.router.url.includes('list-demo-products')) {
        this.demoSubscribe();
      } else if (this.router.url === '/lead-management') {
        this.leadSubscribe();
        // return;
      } else if (this.router.url === '/customer-management') {
        this.customerSubscribe();
      }
      if (this.router.url.includes('/list-users') || this.router.url.includes('list-branches') ||
        this.router.url.includes('list-stocks') || this.router.url.includes('list-warehouse') ||
        this.router.url.includes('list-franchise') || this.router.url.includes('list-manufacturer') ||
        this.router.url.includes('list-products') || 
        this.router.url.includes('ongoing-order-transit') || this.router.url.includes('list-roles') ||
        this.router.url === '/customer-management' || this.router.url.includes('list-category')) {
        //m this.loaderService.show('show');
        //console.log(this.downloadApiDetails.requestSet);
        this.commonService.getDataNew(`download/getlist/${this.downloadApiDetails.requestSet}`).subscribe(response => {
          if (response) {
            const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
            const link = document.createElement('a');
            link.setAttribute('href', window.URL.createObjectURL(blob));
            link.setAttribute('download', this.downloadApiDetails.reportName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
           //m this.loaderService.show('hide');
          }
        }, err => {
         //m this.loaderService.show('hide');
          this.sharedService.displayErrorMessage(err.statusText);
        });
      } else {
        console.log(this.downloadApiDetails);
        const dialogRef = this.dialog.open(FilterDialogComponent, {
          data: {
            filterName: 'Download Filter',
            type: 'download',
            url: this.downloadApiDetails.apiEndPoint,
            req: this.downloadApiDetails.requestSet,
            name: this.downloadApiDetails.reportName
          },
          panelClass: 'filter-pop-up-invoice'
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
          }
        });
      }
  
        }});
    })
  }
  }
  excelDownloadDemo(): void {
   //m this.loaderService.show('show');
    this.commonService.getDataNew('download/getlist?type=demo-downloads').subscribe(response => {
      if (response) {
        console.log(response)
        this.sharedService.displayErrorMessage(response.data);
      
         this.loaderService.show('hide');
      
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
     //m this.loaderService.show('hide');
    });
  }

  excelDownloadAll() {
   //m this.loaderService.show('show');
    //console.log(this.downloadApiDetails);
    this.commonService.fileDownload(this.downloadApiDetails.apiEndPoint + '?sort_updated_date=' + -1 + '&timezone=' + Intl.DateTimeFormat().resolvedOptions().timeZone.toString()).subscribe(response => {
      if (response) {
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
        const link = document.createElement('a');
        link.setAttribute('href', window.URL.createObjectURL(blob));
        link.setAttribute('download', 'All_Orders.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      //m this.loaderService.show('hide');
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    //m this.loaderService.show('hide');
    });
  }

  /**
   * @method uploadExcel()
   * @param event - file event when the use choose the file
   * @description - if 200 then all data's have been uploaded, if status is 206 then partial data's are uploaded and
   * can able to download the file to correct it.
   * clearing the input type file value once its uploaded.
   * @author karan
   */
  uploadExcel(event) {
    if (event.target.files[0].name) {
      this.uploadExcelInfo = event.target.files[0];
    }
    const formData: FormData = new FormData();
    if (this.uploadApiDetails.requestSet) {
      if (this.uploadApiDetails.requestSet === 'Received') {
        formData.append('order_status', '1');
      } else if (this.uploadApiDetails.requestSet === 'Completed') {
        formData.append('order_status', '0');
      }
    }
    formData.append('xlsx_file', this.uploadExcelInfo);
    //m this.loaderService.show('show');
    this.commonService.uploadExcel(this.uploadApiDetails.apiEndPoint, formData).subscribe(res => {
      if (res.status === 200) {
      //m this.loaderService.show('hide');
        this.sharedService.displaySuccessMessage('Uploaded Successfully');
        this.fetchDetails.setUpdateList('true');
      } else if (res.status === 206) {
        const failedResponse = res.body;
        this.sharedService.displayErrorMessage('Something went wrong');
        const blob = new Blob([failedResponse], { type: 'application/vnd.ms-excel' });
        const link = document.createElement('a');
        link.setAttribute('href', window.URL.createObjectURL(blob));
        link.setAttribute('download', this.downloadApiDetails.reportName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.fetchDetails.setUpdateList('true');
       //m this.loaderService.show('hide');
      }
      this.myInputVariable.nativeElement.value = '';
    },
      err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('Something went wrong');
        this.myInputVariable.nativeElement.value = '';
      }
    );
  }
  clickUpload() {
    this.commonService.getDataNew('upload/get-user-upload-email').subscribe((response)=>{
      const dialogRef = this.dialog.open(FilterDialogComponent, {
        data: {
          filterName: 'Upload',
          type: 'upload',
          uploadedEmail : response.email
        },
        panelClass: 'filter-pop-up-invoice'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const formData: FormData = new FormData();
          if (result.file.name) {
            this.uploadExcelInfo = result.file;
          }
          if (result.email){
            formData.append('email',result.email)
          }else{
            this.sharedService.displayErrorMessage('Email Required');
            return false
          }
          formData.append('xlsx_file', this.uploadExcelInfo);
          if (this.router.url.includes('/list-users')) {
            if (result.isAdd) {
              this.uploadApiDetails.apiEndPoint = 'upload/usersUpload';
             //m this.loaderService.show('show');
              this.commonService.fileDataDownloadNew(this.uploadApiDetails.apiEndPoint, formData).subscribe(res => {
                if (res.status === 200) {
                 //m this.loaderService.show('hide');
                  this.sharedService.displaySuccessMessage('Uploaded Successfully');
                  this.fetchDetails.setUpdateList('true');
                } else if (res.status === 206) {
                  const failedResponse = res.body;
                  this.sharedService.displayErrorMessage('Something went wrong');
                  const blob = new Blob([failedResponse], { type: 'application/vnd.ms-excel' });
                  const link = document.createElement('a');
                  link.setAttribute('href', window.URL.createObjectURL(blob));
                  link.setAttribute('download', this.downloadApiDetails.reportName);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  this.fetchDetails.setUpdateList('true');
                 //m this.loaderService.show('hide');
                }
              }, err => {
               //m this.loaderService.show('hide');
                this.sharedService.displayErrorMessage(err.error.message['0']);
              });
            } else {
              this.uploadApiDetails.apiEndPoint = 'upload/usersUploadUpdate';//'admin/frontierMarketingUser/excel';
             //m this.loaderService.show('show');
              this.commonService.uploadExcelPutNew(this.uploadApiDetails.apiEndPoint, formData).subscribe(res => {
                if (res.status === 200) {
                 //m this.loaderService.show('hide');
                  this.sharedService.displaySuccessMessage('Uploaded Successfully');
                  this.fetchDetails.setUpdateList('true');
                } else if (res.status === 206) {
                  const failedResponse = res.body;
                  this.sharedService.displayErrorMessage('Something went wrong');
                  const blob = new Blob([failedResponse], { type: 'application/vnd.ms-excel' });
                  const link = document.createElement('a');
                  link.setAttribute('href', window.URL.createObjectURL(blob));
                  link.setAttribute('download', this.downloadApiDetails.reportName);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  this.fetchDetails.setUpdateList('true');
                //m this.loaderService.show('hide');
                }
              }, err => {
               //m this.loaderService.show('hide');
               this.sharedService.displayErrorMessage(err.error.message[0]);
              });
            }
  
          } else if (this.router.url === '/lead-management') {
            if (result.isAdd) {
              this.uploadApiDetails.apiEndPoint = 'upload/lead-upload';
             //m this.loaderService.show('show');
              this.commonService.uploadExcelNew(this.uploadApiDetails.apiEndPoint, formData).subscribe(res => {
                if (res.status === 200) {
                 //m this.loaderService.show('hide');
                  this.sharedService.displaySuccessMessage('Uploaded Successfully');
                  this.fetchDetails.setUpdateList('true');
                } else if (res.status === 206) {
                  const failedResponse = res.body;
                  this.sharedService.displayErrorMessage('Something went wrong');
                  const blob = new Blob([failedResponse], { type: 'application/vnd.ms-excel' });
                  const link = document.createElement('a');
                  link.setAttribute('href', window.URL.createObjectURL(blob));
                  link.setAttribute('download', this.downloadApiDetails.reportName);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  this.fetchDetails.setUpdateList('true');
                 //m this.loaderService.show('hide');
                }
              }, err => {
                //m this.loaderService.show('hide');
                this.sharedService.displayErrorMessage(err.error.message[0]);
              });
            } else {
              this.uploadApiDetails.apiEndPoint = 'upload/lead-upload';
              //m this.loaderService.show('show');
              this.commonService.uploadExcelPutNew(this.uploadApiDetails.apiEndPoint, formData).subscribe(res => {
                if (res.status === 200) {
                  //m this.loaderService.show('hide');
                  this.sharedService.displaySuccessMessage('Uploaded Successfully');
                  this.fetchDetails.setUpdateList('true');
                } else if (res.status === 206) {
                  const failedResponse = res.body;
                  this.sharedService.displayErrorMessage('Something went wrong');
                  const blob = new Blob([failedResponse], { type: 'application/vnd.ms-excel' });
                  const link = document.createElement('a');
                  link.setAttribute('href', window.URL.createObjectURL(blob));
                  link.setAttribute('download', this.downloadApiDetails.reportName);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  this.fetchDetails.setUpdateList('true');
                 //m this.loaderService.show('hide');
                }
              }, err => {
              //m this.loaderService.show('hide');
              this.sharedService.displayErrorMessage(err.error.message[0]);
              });
            }
          }
          else if (this.router.url.includes('list-branches')) {
            if (result.isAdd) {
              this.uploadApiDetails.apiEndPoint = 'upload/branchesUpload';
             //m this.loaderService.show('show');
              this.commonService.uploadExcelNew(this.uploadApiDetails.apiEndPoint, formData).subscribe(res => {
                if (res.status === 200) {
                //m this.loaderService.show('hide');
                  this.sharedService.displaySuccessMessage('Uploaded Successfully');
                  this.fetchDetails.setUpdateList('true');
                } else if (res.status === 206) {
                  const failedResponse = res.body;
                  this.sharedService.displayErrorMessage('Something went wrong');
                  const blob = new Blob([failedResponse], { type: 'application/vnd.ms-excel' });
                  const link = document.createElement('a');
                  link.setAttribute('href', window.URL.createObjectURL(blob));
                  link.setAttribute('download', this.downloadApiDetails.reportName);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  this.fetchDetails.setUpdateList('true');
                //m this.loaderService.show('hide');
                }
              }, err => {
              //m this.loaderService.show('hide');
                //this.sharedService.displayErrorMessage("Internal server error");
                this.sharedService.displayErrorMessage(err.error.message['0']);
              });
            } else {
              this.uploadApiDetails.apiEndPoint = 'upload/branchesUploadUpdate';
             //m this.loaderService.show('show');
              this.commonService.uploadExcelPutNew(this.uploadApiDetails.apiEndPoint, formData).subscribe(res => {
                if (res.status === 200) {
                 //m this.loaderService.show('hide');
                  this.sharedService.displaySuccessMessage('Uploaded Successfully');
                  this.fetchDetails.setUpdateList('true');
                } else if (res.status === 206) {
                  const failedResponse = res.body;
                  this.sharedService.displayErrorMessage('Something went wrong');
                  const blob = new Blob([failedResponse], { type: 'application/vnd.ms-excel' });
                  const link = document.createElement('a');
                  link.setAttribute('href', window.URL.createObjectURL(blob));
                 link.setAttribute('download', this.downloadApiDetails.reportName);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  this.fetchDetails.setUpdateList('true');
                 //m this.loaderService.show('hide');
                }
              }, err => {
               //m this.loaderService.show('hide');
               this.sharedService.displayErrorMessage(err.error.message['0']);
              });
            }
          } 
        } 
      });
    })
  }

  // changing the value of sidenav using subject and service to trigger in app-side component
  toggleMenu() {
    if (this.side === false) {
      this.sidenavService.setSideNav(true);
      this.side = true;
    } else {
      this.sidenavService.setSideNav(false);
      this.side = false;
    }
  }

  /**
   * @method logout()
   * @description - method logout() describes the action of signing off of an application.
   * @author amitha.shetty
   */

  logout(): void {
    this.router.navigate(['login']);
    this.sessionStorage.clear();
    localStorage.clear();
  }
  getWarehouseId() {
    if (this.moduleDetails.name === 'superadmin') {
      return '';
    } else {
      return this.registeredWarehouse;
    }
  }
  filterDownloadInvoice() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      data: {
        filterName: 'Invoice Filter',
        type: 'stockIn',
      },
      panelClass: 'filter-pop-up-invoice'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
  downloadTemplate() {
    if (this.router.url.includes('/list-users')) {
      this.commonService.fileDownloadNew(this.templateLocation).subscribe(dataExcel => {
        if (dataExcel) {
          const blob = new Blob([dataExcel], { type: 'application/vnd.ms-excel' });
          const link = document.createElement('a');
          link.setAttribute('href', window.URL.createObjectURL(blob));
          link.setAttribute('download', 'User_Upload.xlsx');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }, err => {
       //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('Something went wrong');
      })
    } else if (this.router.url.includes('list-branches')) {
      this.commonService.fileDownloadNew(this.templateLocation).subscribe(dataExcel => {
        if (dataExcel) {
          const blob = new Blob([dataExcel], { type: 'application/vnd.ms-excel' });
          const link = document.createElement('a');
          link.setAttribute('href', window.URL.createObjectURL(blob));
          link.setAttribute('download', 'Village_Upload.xlsx');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('Something went wrong');
      });
    } else if (this.router.url === '/lead-management') {
      this.commonService.fileDownloadNew(this.templateLocation).subscribe(dataExcel => {
        if (dataExcel) {
          const blob = new Blob([dataExcel], { type: 'application/vnd.ms-excel' });
          const link = document.createElement('a');
          link.setAttribute('href', window.URL.createObjectURL(blob));
          link.setAttribute('download', 'Lead_Upload.xlsx');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }, err => {
       //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('Something went wrong');
      });
    }
  }
}
