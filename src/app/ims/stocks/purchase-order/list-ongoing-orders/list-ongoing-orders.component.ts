import { Component, OnInit, ViewChild } from '@angular/core';
import { PackageRequestPopUpComponent } from 'src/app/utils/components/package-request-pop-up/package-request-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import {
  CommonService, LoaderService, SharedService, TableOngoingPurchaseOrderlist, StocksTableViewRequestSet, CatgeoryRequest,
  OngoingPruchaseOrderSortFields, OngoingPruchaseOrderRequest, OngoingPurchaseOrder, FetchUserTabDetailsService, CatgeoryTableViewRequestSet, filterPurchaseOrder, UserInfo, DownloadSubscribeParams, FilterDialogComponent, POTableViewFilterRequestSet, RequestFilterDate, RolePermissionVal, moduleNameKeys, TableSparePoOngoingList, SpareOngoingPORecordList, SnackBarSuccessMessage
} from 'src/app/utils';
import { ViewPoComponent } from 'src/app/utils/components/view-po/view-po.component';
import { SessionStorage } from 'ngx-webstorage';
import { environment } from 'src/environments/environment.prod';
import { ConfirmationDialogComponent } from 'src/app/utils/components/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { SocketService } from 'src/app/service/socket.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-list-ongoing-orders',
  templateUrl: './list-ongoing-orders.component.html',
  styleUrls: ['./list-ongoing-orders.component.scss']
})
export class ListOngoingOrdersComponent implements OnInit {
  public tableHeaders: any = [
    { header: 'Item Name' },
    { header: 'Total Units' },
    { header: 'Order Date', sortText: 'orderedDate' },
    { header: 'Manufacturer' },
    { header: 'Warehouse' },
    { header: 'Category' },
    { header: 'Estimated Arrival', sortText: 'estimatedArrivalDate' },
    { header: 'Total Amount' }
  ];

  public type: string = 'component';
  public filterPurchaseOrder = filterPurchaseOrder;
  public tableTabHeaders = ['Product'];
  public spareTableHeaders = ['SL No', 'Description of Goods', 'Quantity', 'Amount', 'Activity'];
  public selectedBtnVal = 'Product';
  public showIndividualData: boolean = false;
  public filterDateFields = new RequestFilterDate();
  public showPO: boolean = false;
  public filterPoRequest = new POTableViewFilterRequestSet();
  public poCollections = ['branch', 'category', 'manufacture', 'warehouse'];
  public productList: TableOngoingPurchaseOrderlist = new TableOngoingPurchaseOrderlist();
  public tableViewRequestData: StocksTableViewRequestSet = new StocksTableViewRequestSet();
  public tabelViewSpareRequestData: StocksTableViewRequestSet = new StocksTableViewRequestSet();
  public categoryRequestData: CatgeoryTableViewRequestSet = new CatgeoryTableViewRequestSet();
  public sortField: OngoingPruchaseOrderSortFields = new OngoingPruchaseOrderSortFields();
  public subscribeData = new DownloadSubscribeParams();
  public sparePoOngoinglist: TableSparePoOngoingList = new TableSparePoOngoingList();
  public individualProduct: any;
  public openOrderDetails: string = 'collapse';
  public permissionSets: RolePermissionVal = new RolePermissionVal();
  public isOrderClosed: boolean = false;
  public poResponse: any;
  public poDateResponse: any;
  public categoryList = [];
  public isPackageBarCode: boolean = false;
  public isProductBarCode: boolean = false;
  public isStockManual: boolean = false;
  public isDownloadProduct = false;
  public isRefresh = false;
  public purchaseOrderID = '';
  public stockInCount = 0;
  public stockInPercentage: any = 0;
  public searchText = '';
  public subscription : Subscription
  
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;
  @ViewChild('psBottom') psBottom: PerfectScrollbarDirective;

  @SessionStorage('userName') public userData: UserInfo;
  @SessionStorage('moduleDetails') public moduleDetails;
  constructor(private dialog: MatDialog,
    private commonService: CommonService,
    private loaderService: LoaderService,
    private sharedService: SharedService,
    private fetchUserTab: FetchUserTabDetailsService,
    private router: Router,
    private socketService : SocketService
  ) { }

  ngOnInit() {
    this.getLists();
    this.modulePermissionSets();
    this.socketService.reconnect()
    this.subscription = this.socketService.getMessages.subscribe((data : any)=>{
      if(data.type=="stockevent"&&data.data.purchase_order_id){
          console.log(new SnackBarSuccessMessage("Product Barcode generated successfully"))
          this.sharedService.openSnackBar(new SnackBarSuccessMessage({body : "Product Barcode generated successfully" ,type : 'OK' }))
          this.isStockManual = true;
          this.isDownloadProduct = true;
          this.isProductBarCode = false;
          this.isRefresh = false;
          this.isPackageBarCode = false;
          this.stockInPercentage = 100;
      }
    })
  }
  /**
     * @method  modulePermissionSets()
     * @description - the following modulePermissionSets() method is used set crud operations for module.
     * @uses toCheckAllPermissionRights() - the function toCheckAllPermissionRights returns right permissions for the
     *  module passing module name  as a params.
     * @author amitha.shetty
     */
  modulePermissionSets(): void {
    this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.purchaseOrder);
  }
  /**
   * @method getLists()
   * @description: fetch all the list of ongoing purhcase order
   * @author karan
   */
  getLists() {
    //m this.loaderService.show('show');
    this.sortField.status = 2;
    if (this.moduleDetails.name !== 'superadmin') {
      this.filterPoRequest.warehouse = this.userData.warehouse_id;
    }
    const data = new OngoingPruchaseOrderRequest(this.tableViewRequestData, this.sortField);
    const dataFilterRequest = '&manufacturer_id=' + this.filterPoRequest.manufacture + '&branch_id=' + this.filterPoRequest.branch + '&warehouse_id=' +
      this.filterPoRequest.warehouse + '&category_id=' + this.filterPoRequest.category;
    const dataDateRequest = '&ordered_from_date=' + this.filterDateFields.orderDateField.fromDate + '&ordered_to_date=' + this.filterDateFields.orderDateField.toDate + '&arrival_from_date=' + this.filterDateFields.arrivalDateField.fromDate + '&arrival_to_date=' + this.filterDateFields.arrivalDateField.toDate;
    this.commonService.getDataNew('stock/purchase' + data.requestSet + dataFilterRequest + dataDateRequest).subscribe(res => {
      console.log('111',res);
    //m this.loaderService.show('hide');
      this.productList = new TableOngoingPurchaseOrderlist(res.payload);
      console.log('113',this.productList);
    }, err => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage('');
    });
  }


  getCategories() {
    const data = new CatgeoryRequest(this.categoryRequestData);
    this.commonService.getDataNew('api/category' + data.requestSet).subscribe(res => {
      this.categoryList = res.payload.records;
    });
  }


  /** FILTER EVENTS */


  selectedFilterKey(event) {
    if (event === undefined) {
      this.sortField.searchAplhablets = '';
      this.sortField.itemprice = '';
    } else {
      if (event.name === 'A-Z' || event.name === 'Z-A') {
        this.sortField.searchAplhablets = event.value;
        this.sortField.itemprice = '';
      } else {
        this.sortField.itemprice = event.value;
        this.sortField.searchAplhablets = '';
      }
    }
    this.getLists();
  }
  clearFilter() {
    this.poDateResponse = '';
    this.filterDateFields.orderDateField.fromDate = '';
    this.subscribeData.ongoingPO.orderDateField.fromDate = '';
    this.filterDateFields.orderDateField.toDate = '';
    this.subscribeData.ongoingPO.orderDateField.toDate = '';
    this.filterDateFields.arrivalDateField.fromDate = '';
    this.subscribeData.ongoingPO.arrivalDateField.fromDate = '';
    this.filterDateFields.arrivalDateField.toDate = '';
    this.subscribeData.ongoingPO.arrivalDateField.toDate = '';
    this.tableViewRequestData.searchItem = '';
    this.subscribeData.ongoingPO.searchProduct = '';
    this.searchText = '';
    this.filterPoRequest.manufacture = ''
    this.filterPoRequest.branch = ''
    this.filterPoRequest.warehouse = ''
    this.filterPoRequest.category = ''
    if(this.poResponse){
      this.poResponse.branch = null;
      this.poResponse.category = null;
      this.poResponse.warehouse = null;
      this.poResponse.manufacture = null;
    }
   
    this.fetchUserTab.setOngoingPOSubscribeStatus(this.subscribeData);
    this.getLists();
  }

  /**
   * @method  searchCategoryKey()
   * @description - the following searchCategoryKey() method is used search item.
   * @param event - search event when the user search item
   * @author karan
   */
  searchCategoryKey(event) {
    this.categoryRequestData = new CatgeoryTableViewRequestSet();
    this.categoryRequestData.searchItem = event.term;
    this.getCategories();
  }

  /** FILTER EVENTS */

  /**
   * @method  fetchItems()
   * @description - the following fetchItems() method is used search item.
   * @param event - search event when the user search item
   * @author karan
   */
  fetchItems(event) {
    this.tableViewRequestData = new StocksTableViewRequestSet();
    this.tableViewRequestData.searchItem = event.target.value;
    this.subscribeData.ongoingPO.searchProduct = event.target.value;
    this.fetchUserTab.setOngoingPOSubscribeStatus(this.subscribeData);
    this.getLists();
  }

  /**
    * @method  sorting()
    * @description - the following sorting() method is used to sort the particular fields in lead list table
    * @param sortText - contains selected text for sorting
    * @param sortValue - contains number -1 for descending and 1 for ascending
    * @author karan
    */
  sorting(sortText: string, sortValue: number) {
    this.sortField[sortText] = sortValue;
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
  expand(text: string, flag: boolean, id?: string) {
    this.openOrderDetails = text;
    this.isOrderClosed = flag;
    if (id) {
      this.purchaseOrderID = id;
      this.stockInCount = 0;
      this.commonService.getDataNew('stock/purchase/search?id=' + id).subscribe(res => {
        // console.log(res)
        this.individualProduct = new OngoingPurchaseOrder(res.payload);
      
        if (res.payload.stockin_status === 2) {
          this.isPackageBarCode = false;
          this.isProductBarCode = false;
          this.isRefresh = true;
          this.isStockManual = false;
          this.isDownloadProduct = false;
          this.statusCheck();
        } else if (res.payload.stockin_status === 1) {
          this.isProductBarCode = true;
          this.isPackageBarCode = true;
          this.isStockManual = false;
          this.isRefresh = false;
          this.isDownloadProduct = false;
        } else if (res.payload.stockin_status === 3) {
          this.isStockManual = true;
          this.isDownloadProduct = true;
          this.isProductBarCode = false;
          this.isRefresh = false;
          this.isPackageBarCode = false;
          this.stockInPercentage = 100;
        } else {
          this.isPackageBarCode = true;
          this.isProductBarCode = true;
          this.isStockManual = true;
          this.isRefresh = false;
          this.isDownloadProduct = false;
        }
        setTimeout(()=>{
          this.showIndividualData = true;
        },400)
      }, err => {
        this.sharedService.displayErrorMessage('');
      });
    } else {
      this.purchaseOrderID = '';
      this.showIndividualData = false;
    }
  }
  statusCheck() {
    this.commonService.getDataNew('stock/purchase/status?purchaseId=' + this.purchaseOrderID).subscribe(res => {
      if (res.data.purchase.stockin_status === 2) {
        this.isPackageBarCode = false;
        this.isProductBarCode = false;
        this.isRefresh = true;
        this.isStockManual = false;
        this.isDownloadProduct = false;
        // this.stockInPercentage = (100 - (((res.data.purchase.quantity - res.data.stockin_count) * 100) / res.data.purchase.quantity)).toFixed(2)
        // setTimeout(() => {
        //   this.statusCheck();
        // }, 5000);
      //  this.stockInPercentage = (100 - (((10 - 5) * 100) / 5)).toFixed(2);
        this.stockInCount = res.data.stockin_count;
      } else if (res.data.purchase.stockin_status === 1) {
        this.isProductBarCode = true;
        this.isPackageBarCode = true;
        this.isStockManual = false;
        this.isRefresh = false;
        this.isDownloadProduct = false;
        this.stockInCount = 0;
        this.stockInPercentage = 0;
      } else if (res.data.purchase.stockin_status === 3) {
        this.isStockManual = true;
        this.isDownloadProduct = true;
        this.isProductBarCode = false;
        this.isRefresh = false;
        this.isPackageBarCode = false;
        this.stockInCount = 0;
        this.stockInPercentage = 100;
      } else {
        this.isPackageBarCode = true;
        this.isProductBarCode = true;
        this.isStockManual = true;
        this.isRefresh = false;
        this.isDownloadProduct = false;
        this.stockInCount = 0;
        this.stockInPercentage = 0;
      }
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }

  downloadBarcode() {
    this.commonService.fileDownloadNew('stock/purchase/barcode?purchase_id=' + this.purchaseOrderID).subscribe(response => {
      if (response) {
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
        const link = document.createElement('a');
        link.setAttribute('href', window.URL.createObjectURL(blob));
        link.setAttribute('download', 'item_barcodes.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.scrollToBottom();
      //m this.loaderService.show('hide');
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }

  /**
   * @method viewPO()
   * @description: open viewpo popup to view pdf
   * @author karan
   */
  viewPO() {
    const dialogRef = this.dialog.open(ViewPoComponent, {
      data: { message: this.individualProduct.image[0] },
    });
    this.showPO = true;
  }
  /**
   * @method  getPage()
   * @description - the following getPage() method is used get the selected page for pagination
   * @param event - contains the selected page number
   * @author amitha.shetty
   */
  getPage(event: number): void {
    if (event > 0 && event <= this.productList.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getLists();
    }
  }
  getSparePage(event: number): void {
    if (event > 0 && event <= this.sparePoOngoinglist.totalRecords) {
      this.tabelViewSpareRequestData.pageNumber = event;
      this.getOngoingPOSpare();
    }
  }
  generatePackage() {
    const obj = {
      purchaseId: this.individualProduct.id,
      quantity: 1
    };
    //m this.loaderService.show('show');
    if (environment.baseUrl === window['stagingUrl'] || environment.baseUrl === window['prodUrl']) {
      this.commonService.fileDataDownloadNew('stock/item/barcode', obj).subscribe(response => {
        if (response) {
          const blob = new Blob([response.body], { type: 'application/vnd.ms-excel' });
          const link = document.createElement('a');
          link.setAttribute('href', window.URL.createObjectURL(blob));
          link.setAttribute('download', 'package_barcode.xlsx');
          document.body.appendChild(link);
          link.click();
         // this.scrollToBottom();
          document.body.removeChild(link);
        //m this.loaderService.show('hide');
        }
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('');
      });
    } else {
      this.commonService.postDataNew('stock/item/barcode', obj).subscribe(res => {
        this.fetchUserTab.setBarCode(res.payload);
      //m this.loaderService.show('hide');
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('');
      });
    }
  }


  generateItemBarocode(event: MouseEvent) {
    (event.target as HTMLButtonElement).disabled = true;
    const obj = {
      purchaseId: this.individualProduct.id,
    };
     //m this.loaderService.show('show');
    // this.showIndividualData = false;
    // this.openOrderDetails = 'collapse';
    // this.isOrderClosed = false;
    if (environment.baseUrl === window['stagingUrl'] || environment.baseUrl === window['prodUrl']) {
      this.commonService.fileDataDownloadNew('stock/item/barcode', obj).subscribe(response => {
        if (response) {
          // const blob = new Blob([response.json()], { type: 'application/vnd.ms-excel' });
          // const link = document.createElement('a');
          // link.setAttribute('href', window.URL.createObjectURL(blob));
          // link.setAttribute('download', 'product_barcode.xlsx');
          // document.body.appendChild(link);
          // link.click();
          // document.body.removeChild(link);
          this.statusCheck()
        //m this.loaderService.show('hide');
        }
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('');
      });
    } else {
      this.commonService.postDataNew('stock/item/barcode', obj).subscribe(res => {
        this.fetchUserTab.setBarCode(res.payload);
      //m this.loaderService.show('hide');
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('');
      });
    }
  }
  // generatePackage() {
  //   // const obj = {
  //   //   purchase_order_id: this.individualProduct.id,
  //   //   quantity: 1
  //   // };
  //   this.commonService.fileDownload('api/stock/package/barcode').subscribe(response => {
  //     if (response) {
  //       const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
  //       const link = document.createElement('a');
  //       link.setAttribute('href', window.URL.createObjectURL(blob));
  //       link.setAttribute('download', 'Package');
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //       //m this.loaderService.show('hide');
  //     }
  //   }, err => {
  //     this.sharedService.displayErrorMessage(err.error.message);
  //     //m this.loaderService.show('hide');
  //   });
  // }
  scan() {
    const dialogRef = this.dialog.open(PackageRequestPopUpComponent, {
      data: {
        message: 'scan', warehouseId: this.individualProduct.wareHouseId,
        purhcaseOrderId: this.individualProduct.id, quantity: this.individualProduct.quantity
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
  applyFilter(name?: string) {
    console.log('name',name);
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      data: {
        filterName: name,
        poResponse: this.poResponse,
        dateResponse: this.poDateResponse
      },
      panelClass: 'filter-pop-up'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.responseData) {
          console.log(result.responseData,"Response data")
          this.tableViewRequestData = new StocksTableViewRequestSet();
          if (result.type === 'Apply Filter') {
            this.filterPoRequest = new POTableViewFilterRequestSet();
            this.poResponse = result.responseData;
            this.poCollections.map(ele => {
              if (this.poResponse[ele]) {
                //this.filterPoRequest[ele] = this.poResponse[ele].category_code;
                this.filterPoRequest[ele] = this.poResponse[ele].id;
                if(ele == 'category')
                this.filterPoRequest[ele] = this.poResponse[ele].category_code;
               // this.filterPoRequest.manufacture = this.poResponse[ele].id;
                this.subscribeData.ongoingPO[ele] = this.poResponse[ele].id;
              }
            });

          } else if (result.type === 'Date Filter') { 
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
          }
          this.getLists();
          this.fetchUserTab.setOngoingPOSubscribeStatus(this.subscribeData);
        }
      }
    });
  }
  openDialog(id, name): void {
    this.showIndividualData = false;
    this.openOrderDetails = 'collapse';
    this.isOrderClosed = false;
    const dialogRef = this.sharedService.openDialog(name);
    dialogRef.afterClosed().subscribe(result => {
      const data = {
        purchase_id: id
      };
      if (result) {
        this.commonService.deleteDataNew('stock/purchase', data).subscribe(response => {
          if (response.status = 200) {
            this.sharedService.displaySuccessMessage('Deleted Successfully');
            this.getLists();
          }
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
      }
    });
  }
  makeActive(item): void {
    this.fetchUserTab.shareServiceData(item);
    if (item !== this.selectedBtnVal) {
      this.selectedBtnVal = item;
      this.tabelViewSpareRequestData = new StocksTableViewRequestSet();
      this.tableViewRequestData = new StocksTableViewRequestSet();
      if (item === 'Spare') {
        this.getOngoingPOSpare();
      }
    }
  }
  getOngoingPOSpare(): void {
    const request = `?records_per_page=${this.tabelViewSpareRequestData.recordsPerPage}&page_number=${this.tabelViewSpareRequestData.pageNumber}&status=2`;
    this.commonService.getData('admin/purchaseOrder/spare' + request).subscribe(res => {
      if (res.success) {
        this.sparePoOngoinglist = new TableSparePoOngoingList(res.payload);
      }
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }
  acceptSpareItem(item: SpareOngoingPORecordList) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are You Sure You Want to Approve Spares of', userName: item.productName },
      panelClass: 'confirmation-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const obj = {
          spares: item.spares.map(ele => {
            const spareObj = {
              quantity: ele.quantity,
              product_spare_id: ele.product_spare_id
            };
            return spareObj;
          }),
          purchase_order_id: item.purchaseOrderId,
        };
        this.commonService.putData('admin/productSpare/accept', obj).subscribe(res => {
          if (res.success) {
            this.tabelViewSpareRequestData = new StocksTableViewRequestSet();
            this.getOngoingPOSpare();
            this.sharedService.displaySuccessMessage('Approved Successfully');
          }
        }, err => {
          this.sharedService.displayErrorMessage('');
        });
      }
    });
  }
  viewOngoingHistory(): void {
    this.router.navigate([`/stock/order-history/${this.selectedBtnVal}`]);
  }
  stockInManually(): void {
    this.isStockManual = true;
    const obj = {
      purchaseId: this.individualProduct.id
    };
    // console.log(this.individualProduct)
    //m this.loaderService.show('show');
    this.commonService.postDataNew('stock/item/stockinManually', obj).subscribe(res => {
      if (res.success) {
        this.getLists();
        this.showIndividualData = false;
        this.openOrderDetails = 'collapse';
      //m this.loaderService.show('hide');
        // console.log(this.individualProduct)
        this.sharedService.displaySuccessMessage('Stock In succesfull for ' + this.individualProduct.quantity + ' ' + this.individualProduct.title)
      }
    }, err => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage('');
    });
  }
  public scrollToBottom(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.scrollToBottom();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.scrollToBottom();
    }
    setTimeout(() => {
      this.psBottom.scrollToBottom(0, 500);
   }, 100);
  }

  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe()
  }
}
