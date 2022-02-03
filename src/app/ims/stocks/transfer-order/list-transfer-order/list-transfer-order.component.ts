import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService, LoaderService, SharedService, FetchUserTabDetailsService, filterPurchaseOrder, StocksTableViewRequestSet, TableOngoingTransist, OngoingTransistDetails, UserInfo, FilterDialogComponent, TableSpareToist, SpareOngoingToRecordList, RolePermissionVal, moduleNameKeys } from 'src/app/utils';
import { PackageRequestPopUpComponent } from 'src/app/utils/components/package-request-pop-up/package-request-pop-up.component';
import { SessionStorage } from 'ngx-webstorage';
import { ConfirmationDialogComponent } from 'src/app/utils/components/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { RequestFilterDate, DownloadSubscribeParams } from 'src/app/utils';


@Component({
  selector: 'app-list-transfer-order',
  templateUrl: './list-transfer-order.component.html',
  styleUrls: ['./list-transfer-order.component.scss']
})
export class ListTransferOrderComponent implements OnInit {
  public tableHeaders: any = [
    { header: 'Item Name' },
    { header: 'Total Units' },
    { header: 'Date' },
    { header: 'Source' },
    { header: 'Source Branch' },
    { header: 'Destination' },
    { header: 'Destination Branch' }
  ];
  public tableTabHeaders = ['Product'];
  public selectedBtnVal = 'Product';
  public filterPurchaseOrder = filterPurchaseOrder;
  public tabelViewSpareRequestData: StocksTableViewRequestSet = new StocksTableViewRequestSet();
  public showIndividualData: boolean = false;
  public spareTableHeaders = ['SL No', 'Description of Goods', 'Quantity', 'Source Warehouse', 'Destination Warehouse', 'Activity'];
  public showPO: boolean = false;
  public productList: TableOngoingTransist = new TableOngoingTransist();
  public spareToList: TableSpareToist = new TableSpareToist();
  public tableViewRequestData: StocksTableViewRequestSet = new StocksTableViewRequestSet();
  public individualProduct: any;
  public openOrderDetails: string = 'collapse';
  public isOrderClosed: boolean = false;
  public categoryList = [];
  public permissionSets: RolePermissionVal = new RolePermissionVal();
  @SessionStorage('userName') public userData: UserInfo;
  @SessionStorage('moduleDetails') public moduleDetails;

  constructor(private dialog: MatDialog,
    private commonService: CommonService,
    private sharedService: SharedService , private router: Router,
    private fetchUserTab: FetchUserTabDetailsService) { }
    public filterDateFields = new RequestFilterDate();
  public subscribeData = new DownloadSubscribeParams();
  public poDateResponse: any;

  ngOnInit() {
    this.getLists();
    this.modulePermissionSets();
  }
  modulePermissionSets(): void {
    this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.transportation);
    // console.log(this.permissionSets)
  }
  applyFilter(name ?:string){
    
    console.log('name',name);
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
}


  getLists() {
    let requestSet: any;
    if (this.moduleDetails.name !== 'superadmin') {
      requestSet = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
        this.tableViewRequestData.pageNumber +'&status=' + 3;
    } else {
      requestSet = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
        this.tableViewRequestData.pageNumber + '&status=' + 3;
    }
    const dataDateRequest = '&from_date=' + this.filterDateFields.orderDateField.fromDate + '&to_date=' + this.filterDateFields.orderDateField.toDate;
    
    this.commonService.getDataNew('stock/transport' + requestSet+dataDateRequest).subscribe(res => {
      // console.log(res)
      this.productList = new TableOngoingTransist(res.payload);
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }

  clearFilter() {
    this.poDateResponse = '';
    this.filterDateFields.orderDateField.fromDate = '';
    this.subscribeData.ongoingPO.orderDateField.fromDate = '';
    this.filterDateFields.orderDateField.toDate = '';
    this.subscribeData.ongoingPO.orderDateField.toDate = '';
    this.fetchUserTab.setOngoingPOSubscribeStatus(this.subscribeData);
    this.getLists();
  }

  /**
 * 
 * @param text : expand or collapse text
 * @param flag 
 * @param id : _id for particular ongoing purhcase order
 * @method expand()
 * @description: if id is there then call API or else no API calls
 * @author karan
 */
  expand(text: string, flag: boolean, item?: any) {
    this.openOrderDetails = text;
    this.isOrderClosed = flag;
    this.showIndividualData = false;
    if (item.id) {
      this.commonService.getDataNew('stock/transport?id=' + item.id).subscribe(res => {
        this.showIndividualData = true;
        this.individualProduct = new OngoingTransistDetails(res.payload.records[0]);
        this.individualProduct.sourceId = res.payload.records[0].source_warehouse;
      }, (err) => {
        this.sharedService.show('hide');
        this.sharedService.displayErrorMessage(err.statusText);
      });
    } else {
      this.showIndividualData = false;
    }
  }

  scan() {
    const dialogRef = this.dialog.open(PackageRequestPopUpComponent, {
      data: {
        message: 'scanOngoing', transportId: this.individualProduct.id,
        quantity: this.individualProduct.quantity
      },
      panelClass: 'scan-stock'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getLists();
      if (result === this.individualProduct.quantity) {
        this.showIndividualData = false;
        this.openOrderDetails = 'collapse';
      }
    });
  }
  transferOrderWithoutScan() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      data: {
        filterName: 'Place Transport Barcode',
        type: 'stockIn',
        quantity: this.individualProduct.quantity,
        transportId: this.individualProduct.id,
        warehouseId: this.individualProduct.destinationId,
        sourceWarehouse: this.individualProduct.sourceId,
        productDetailId: this.individualProduct.itemId
      },
      panelClass: 'filter-pop-up-barcode',
      minWidth:'70%',
      minHeight:'70%',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const obj = {
          status: 4,
          transport_id: this.individualProduct.id
        };
        this.commonService.putDataNew('stock/transport/item-scan/destination', result.responseData).subscribe(res => {
          this.sharedService.displaySuccessMessage('Received Succesfully');
          this.showIndividualData = false;
          this.openOrderDetails = 'collapse';
          this.getLists();
          return false
          this.commonService.putData('admin/transport', obj).subscribe(res => {
            this.sharedService.displaySuccessMessage('Received Succesfully');
            this.getLists();
            this.showIndividualData = false;
            this.openOrderDetails = 'collapse';
          }, err => {
            this.sharedService.displayErrorMessage('');
          });
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
      }
    });
  }
  makeActive(item): void {
    if (item !== this.selectedBtnVal) {
      this.selectedBtnVal = item;
      this.tabelViewSpareRequestData = new StocksTableViewRequestSet();
      this.tableViewRequestData = new StocksTableViewRequestSet();
      if (item === 'Spare') {
        this.getOngoingToSpare();
      }
    }
  }
  getOngoingToSpare(): void {
    const request = `?records_per_page=${this.tabelViewSpareRequestData.recordsPerPage}&page_number=${this.tabelViewSpareRequestData.pageNumber}&status=3`;
    this.commonService.getData('admin/productSpare/transport' + request).subscribe(res => {
      if (res.success) {
        this.spareToList = new TableSpareToist(res.payload);
      }
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }
  getSpareToPage(event: number): void {
    if (event > 0 && event <= this.spareToList.totalRecords) {
      this.tabelViewSpareRequestData.pageNumber = event;
      this.getOngoingToSpare();
    }
  }
  acceptSpareItem(item: SpareOngoingToRecordList) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are You Sure You Want to Approve Spares of', userName: item.productName },
      panelClass: 'confirmation-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const obj = {
          transport_id: item.tranportId,
          status: 4
        };
        this.commonService.putData('admin/productSpare/transport', obj).subscribe(res => {
          if (res.success) {
            this.tabelViewSpareRequestData = new StocksTableViewRequestSet();
            this.getOngoingToSpare();
            this.sharedService.displaySuccessMessage('Approved Successfully');
          }
        }, err => {
          this.sharedService.displayErrorMessage('');
        });
      }
    });
  }
  viewOngoingHistory(): void {
    this.router.navigate([`/stock/ongoing-order-transit/${this.selectedBtnVal}`]);
  }
  getPage(event){
    if (event > 0 && event <= this.productList.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getLists();
    }
  }
}
