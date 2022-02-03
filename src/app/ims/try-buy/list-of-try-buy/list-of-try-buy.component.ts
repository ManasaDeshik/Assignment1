import { Component, OnInit } from '@angular/core';
import { TableViewRequestSet, TableListTryBuy, FetchUserTabDetailsService, SharedService, tryBuyCollections, DownloadSubscribeParams, LoaderService, CommonService, UserInfo, TryAndBuySortFields, RolePermissionVal, moduleNameKeys } from 'src/app/utils';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionStorage } from 'ngx-webstorage';


@Component({
  selector: 'app-list-of-try-buy',
  templateUrl: './list-of-try-buy.component.html',
  styleUrls: ['./list-of-try-buy.component.scss']
})
export class ListOfTryBuyComponent implements OnInit {
  public tableHeaders: any = [
    { header: 'Product' , sortText: 'productName' },
    { header: 'VLE Name', sortText: 'vleName' },
    { header: 'VLE ID', sortText: 'vleId' },
    { header: 'Branch Name', sortText: 'branchName' },
    { header: 'State' , sortText: 'stateName' },
    { header: 'Customer Name' , sortText: 'customerName'},
    { header: 'Customer Phone Number' , sortText: 'customerPhoneNo' },
    { header: 'Customer Village' },
    { header: 'Territory Manager' },
    { header: 'Registered Date' , sortText: 'registrationDate'},
    { header: 'Start Date' , sortText: 'startDate'},
    { header: 'End Date' ,  sortText: 'endDate' },
    { header: 'Try & Buy Status' },
    { header: 'Buying Date / Status Date' },
    { header: 'Status Reason' , sortText: 'status'}
  ];
  public orderTabs = tryBuyCollections;
  public selectedStatus = '';
  public subscribeData = new DownloadSubscribeParams();
  public leadList: TableListTryBuy = new TableListTryBuy();
  public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
  public sortField: TryAndBuySortFields = new TryAndBuySortFields();
  public selectedSearchVLEText = '';
  public permissionSets: RolePermissionVal = new RolePermissionVal();
  public selectedSearchProduct = '';
  public branchName = '';
  public villageName = '';
  @SessionStorage('userName') public userData: UserInfo;
  @SessionStorage('registeredWarehouse') public registeredWarehouse: any;
  @SessionStorage('allowedWarehouse') public allowedWarehouse: any;
  @SessionStorage('moduleDetails') public moduleDetails;
  constructor(private commonService: CommonService,
    private fetchDetails: FetchUserTabDetailsService,
    public dialog: MatDialog,
    private sharedService: SharedService,
    private loaderService: LoaderService,
    private router: Router) { }

  ngOnInit() {
    this.getData();
    this.modulePermissionSets();
  }
  /**
   * @method  modulePermissionSets()
   * @description - the following modulePermissionSets() method is used set crud operations for module.
   * @uses toCheckAllPermissionRights() - the function toCheckAllPermissionRights returns right permissions for the
   *  module passing module name  as a params.
   * @author amitha.shetty
   */
  modulePermissionSets(): void {
    this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.tryAndBuy);
  }
  getFormattedDate(returned_date) {
    return new Date(returned_date).toISOString().substring(0, new Date(returned_date).toISOString().length - 1);
}
  getData() {
    // mthis.loaderService.show('show');
    let request: any;
    let warehouseList = [];
    for(var i of this.allowedWarehouse){
      console.log(i.id,"allowed warehouse");
      warehouseList.push(i.id);
    }
    if (this.moduleDetails.name !== 'superadmin' || this.moduleDetails.name !== 'branchoperationmanager') {
      request = '?records_per_page=' + this.tableViewRequestData.recordsPerPage +'&page_number='+this.tableViewRequestData.pageNumber
      + '&product_name=' + this.selectedSearchProduct + '&status=' + this.selectedStatus +'&branch_name='+this.branchName
      + '&branch_village='+this.villageName + '&search_fm_user=' + this.selectedSearchVLEText;//'&warehouse_id=' + warehouseList.toString();
    } else {
      // request = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
      //   this.tableViewRequestData.pageNumber + '&search_fm_user=' + this.selectedSearchVLEText + '&status='
      //   + this.selectedStatus + '&branch_name='+this.branchName+ '&branch_village='+this.villageName+
      //    '&product_name=' + this.selectedSearchProduct;
      request = '?records_per_page=' + this.tableViewRequestData.recordsPerPage +'&page_number='+this.tableViewRequestData.pageNumber
      + '&product_name=' + this.selectedSearchProduct + '&status=' + this.selectedStatus +'&branch_name='+this.branchName
      + '&branch_village='+this.villageName + '&search_fm_user=' + this.selectedSearchVLEText ; //'&warehouse_id='+warehouseList.toString(); 
    }
    const sortRequest = '&sort_by_fm_user_name=' + this.sortField.vleName + '&sort_by_fm_user_vle_code=' +
    this.sortField.vleId + '&sort_by_product_name=' + this.sortField.productName +
     '&sort_by_branch_name=' + this.sortField.branchName + '&sort_by_state=' + this.sortField.stateName + '&sort_by_customer_name=' 
     + this.sortField.customerName + '&sort_by_customer_phone=' +  this.sortField.customerPhoneNo + '&sort_by_registration_date=' 
     + this.sortField.registrationDate + '&sort_by_status=' + this.sortField.status + '&sort_by_start_date=' + this.sortField.startDate 
     + '&sort_by_end_date=' + this.sortField.endDate + '&sort_updated_date=' + this.sortField.updatedDate;
    this.commonService.getDataNew('tryAndBuy/lists' + request + sortRequest).subscribe(res => {
    //this.commonService.getDataNew('tryAndBuy/lists?records_per_page=10&product_name=&status=1&branch_name=&branch_village=&search_fm_user=&sort_by_fm_user_name=1&sort_by_fm_user_vle_code=1&sort_by_product_name=1&sort_by_branch_name=1&sort_by_state=1&sort_by_customer_name=1&sort_by_customer_phone=1&sort_by_registration_date=&sort_by_status=1&sort_by_start_date=1&sort_by_end_date=1&sort_updated_date=1').subscribe(res => {  
    this.leadList = new TableListTryBuy(res.payload);
      //m this.loaderService.show('hide');
    }, err => {
      //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }

  setNames(event, type, isSearch): void {
    this.tableViewRequestData = new TableViewRequestSet();
    this.subscribeData.tryBuy[type] = event.target.value;
    if (event.key === "Enter" || isSearch){
      this.fetchDetails.setTryBuyStatus(this.subscribeData);
      this.getData();
    }    
  }

  setStatusData(event): void {
    this.tableViewRequestData = new TableViewRequestSet();
    this.selectedStatus = event.value;
    this.subscribeData.tryBuy.status = event.value;
    this.fetchDetails.setTryBuyStatus(this.subscribeData);
    this.getData();
  }

  sorting(sortText: string, sortValue: number) {
    this.sortField[sortText] = sortValue;
    this.getData();
  }

  getPage(event): void {
    if (event > 0 && event <= this.leadList.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getData();
    }
  }

  openDialog(id, leadName): void {
    const dialogRef = this.sharedService.openDialog(leadName);
    dialogRef.afterClosed().subscribe(result => {
      const data = {
        id: id
      };
      if (result) {
        this.commonService.deleteDataNew('tryAndBuy', data).subscribe(response => {
          if (response.status = 200) {
            this.sharedService.displaySuccessMessage('Deleted Successfully');
            this.getData();
          }
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
      }
    });
  }

  editUser(id) {
    console.log('id',id);
    this.router.navigate([`try-buy/view/${id}`]);
  }
}
