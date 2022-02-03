import { Component, OnInit } from '@angular/core';
import { BranchDetails, TableViewRequestSet, CommonService, SharedService, UserInfo, LoaderService, BranchWarehouse, ProductDetail, StockService, Transport, FetchUserTabDetailsService, TransportBarcode, FilterDialogComponent } from 'src/app/utils';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SessionStorage } from 'ngx-webstorage';
import * as printJS from 'print-js';
import { PackageRequestPopUpComponent } from 'src/app/utils/components/package-request-pop-up/package-request-pop-up.component';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-create-transfer-order',
  templateUrl: './create-transfer-order.component.html',
  styleUrls: ['./create-transfer-order.component.scss']
})
export class CreateTransferOrderComponent implements OnInit {
  public isScannerClosed = true;
  public openOrderDetails = 'collapse';
  public scan: string = 'create';
  public fromWarehouse: string;
  public toWarehouse: string;
  public branchFromWarehouseData: BranchDetails = new BranchDetails();
  public branchToWarehouseData: BranchDetails = new BranchDetails();
  public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
  public branchWarehouse: BranchWarehouse = new BranchWarehouse('');
  public productDetails: ProductDetail = new ProductDetail('');
  public scanItems: TransportBarcode = new TransportBarcode('');
  public stockCount: any;
  public transport: Transport = new Transport('');
  public routeSegmentId: string;
  public productDetailId: String;
  public transportId: string;
  public itemToBeScanned: number;
  public scannedItems: number = 0;
  public franchiseCollections = [];
  public uploadExcelInfo: any;
  public finishBtn: boolean = false;
  @SessionStorage('userName') public userData: UserInfo;

  constructor(private router: Router,
    private dialog: MatDialog,
    private commonService: CommonService,
    private sharedService: SharedService,
    private loaderService: LoaderService,
    public shareStockService: StockService,
    private fetchUserTab: FetchUserTabDetailsService) { }

  ngOnInit() {
    this.getRouteSegments();
  }


  /**
   * @method getRouteSegments()
   * @description: productDetailId contains productdetails_id and routeSegmentId contains branchWarehouseId
   * @author karan
   */
  getRouteSegments(): void {
    const urlSegmentKeys = this.sharedService.urlSegmentKeys();
    this.routeSegmentId = urlSegmentKeys[urlSegmentKeys.length - 1].path;
    this.productDetailId = urlSegmentKeys[urlSegmentKeys.length - 2].path;
    this.getWarehouseBranchDetail();
    this.getProductDetail();
    this.getStockCount();
  }

  /**
   * @method getWarehouseBranchDetail()
   * @description: we will fetch the warehouse id from the url and store in routeSegmentId
   * @author karan
   */
  getWarehouseBranchDetail() {
  //  this.loaderService.show('');
    this.commonService.getDataNew('users/getWarehouseDetails/' + this.routeSegmentId).subscribe(res => {
      console.log(res.payload)
      this.branchWarehouse = new BranchWarehouse(res.payload);
      this.transport.source_warehouse = this.branchWarehouse._id;
      this.fromWarehouse = this.branchWarehouse.name;
    //m this.loaderService.show('hide');
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }

  /**
   * @method: getProductDetail()
   * @description: to fetch the product detial from prduct details and need id while posting
   * @author: karan
   */
  getProductDetail() {
   // this.loaderService.show('');
    this.commonService.getDataNew('stock/getsingleproduct/' + this.productDetailId).subscribe(res => {
     // console.log(res.payload.records[0]);
      this.productDetails = new ProductDetail(res.data);
      console.log(this.productDetails);
      this.transport.items[0].product_detail_id = this.productDetails.id;
      console.log(this.transport.items[0]);
    //m this.loaderService.show('hide');
    }, (err) => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }

  getStockCount() {
    this.commonService.getDataNew('stock/warehouseCount?product_detail_id=' + this.productDetailId +
      '&warehouse_id=' + this.routeSegmentId).subscribe(res => {
        this.stockCount = res.data.stock_count;
      }, (err) => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage(err.statusText);
      });
  }

  checkQuantity(event: any) {
    this.scan = 'create';
    if (event.target.value > parseInt(this.stockCount)) {
      this.sharedService.displayErrorMessage('Quantity should be less then the stocks available');
      event.target.value = '';
    }
  }

  expand(text: string, flag: boolean) {
    this.openOrderDetails = text;
    this.isScannerClosed = flag;
  }

  createPackage(text: string, flag: boolean) {
    console.log(this.transport);
    if (this.transport.items[0].en_name.trim() == '' || Number(this.transport.items[0].quantity) <= 0) {
      this.sharedService.displayErrorMessage('Please enter valid details.');
      return
    }
    this.transport.items[0].en_name = this.transport.items[0].en_name.trim();
    if (environment.baseUrl === window['stagingUrl'] || environment.baseUrl === window['prodUrl']) {

      this.commonService.postDataNew('stock/transport', this.transport).subscribe(res => {
        this.scan = 'package';
        this.scanItems.transport_id = res.data.id;
        this.itemToBeScanned = res.data.items[0].quantity;
        this.commonService.fileDownloadNew('stock/transport/barcode?id=' + res.data.id).subscribe(response => {
          if (response) {
            const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
            const link = document.createElement('a');
            link.setAttribute('href', window.URL.createObjectURL(blob));
            link.setAttribute('download', 'package_barcode_transport.xlsx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          //m this.loaderService.show('hide');
          }
        }, err => {
          this.sharedService.displayErrorMessage('');
        });
      }, err => {
        this.sharedService.displayErrorMessage('');
        this.expand('collapse', false);
      });
    } else {
      this.commonService.postDataNew('stock/transport', this.transport).subscribe(res => {
        this.scan = 'package';
        this.scanItems.transport_id = res.data.id;
        this.itemToBeScanned = res.data.items[0].quantity;
        this.commonService.fileDownload('stock/transport/barcode?transport_id=' + res.data.id).subscribe(response => {
          if (response) {
            this.fetchUserTab.setBarCode(res.payload.packageBarcodes);
          }
        }, err => {
          this.sharedService.displayErrorMessage('');
        });
      }, err => {
        this.sharedService.displayErrorMessage('');
        this.expand('collapse', false);
      });
    }
  }

  // createPackage(text: string, flag: boolean) {
  //   this.commonService.postData('admin/transport', this.transport).subscribe(res => {
  //     this.scan = 'package';
  //     this.scanItems.transport_id = res.payload.transport._id;
  //     this.itemToBeScanned = res.payload.transport.items[0].quantity;
  //     this.commonService.fileDownload('admin/transport/barcode?transport_id=' + res.payload.transport._id).subscribe(response => {
  //       if (response) {
  //         this.fetchUserTab.setBarCode(res.payload.packageBarcodes);
  //       }
  //     }, err => {
  //       this.sharedService.displayErrorMessage('');
  //     });
  //   }, err => {
  //     this.sharedService.displayErrorMessage('');
  //     this.expand('collapse', false);
  //   });
  // }


  scanPackageInput() {
    const dialogRef = this.dialog.open(PackageRequestPopUpComponent, {
      data: {
        message: 'createTransferOrder', createTransferDetails: this.scanItems,
        quantity: this.itemToBeScanned
      },
      panelClass: 'scan-stock'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === this.itemToBeScanned) {
        this.router.navigate(['stock/list-stocks']);
      }
    });
  }
  transferOrderWithoutScan() {
    console.log({
      filterName: 'Place Transport Barcode',
      type: 'stockOut',
      quantity: Number(this.transport.items[0].quantity),
      destinationWarehouse: this.transport.destination_warehouse,
      warehouseId: this.routeSegmentId,
      transportId: this.scanItems.transport_id,
      productDetailId: this.productDetailId
    })
    // console.log(this.transport.items[0].quantity)
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      data: {
        filterName: 'Place Transport Barcode',
        type: 'stockOut',
        quantity: Number(this.transport.items[0].quantity),
        destinationWarehouse: this.transport.destination_warehouse,
        warehouseId: this.routeSegmentId,
        transportId: this.scanItems.transport_id,
        productDetailId: this.productDetailId
      },
      minWidth: '70%',
      minHeight: '70%',
      panelClass: 'filter-pop-up-barcode'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const obj = {
          status: 3,
          transfer_order_id: this.scanItems.transport_id
        };
        this.loaderService.show('show');
        this.commonService.putDataNew('stock/transport/item-scan/source', result.responseData).subscribe(res => {
          //m this.loaderService.show('hide');
          this.router.navigate(['stock/list-stocks']);
          this.commonService.putDataNew('stock/transport', obj).subscribe(res => {
            this.sharedService.displaySuccessMessage('Transport created');
            printJS({ printable: res.payload.invoice, type: 'pdf' });
            this.router.navigate(['stock/list-stocks']);
          }, (err) => {
          //m this.loaderService.show('hide');
            this.sharedService.displayErrorMessage(err.statusText);
          });
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
        // this.printInvoice.item_barcode = result.responseData;
        // this.updateBarcode(txt);
      }
    });
  }


  getScannedCount() {
    this.commonService.getData('stock/transport/item/count?transport_id=' + this.scanItems.transport_id + '&status=' + 1).subscribe(res => {
      this.scannedItems = res.payload.count;
    }, (err) => {
       //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }

  /**
   * @method packageBarcodes()
   * @param event: event of barcode scanner and store in model and clear the input
   * @author karan
   */
  packageBarcodes(event) {
    if (event.key === 'Enter') {
      this.scanItems.package_barcode = '';
      this.scanItems.package_barcode = event.target.value;
      this.sharedService.displaySuccessMessage('Scan Complete');
      this.expand('expand', true);
      event.target.value = '';
    }
  }

  /**
 * @method itemBarcode()
 * @param event : barcode scanner event 
 * @description: fetch event for item and call an API. if pakcage barcode is not there then show error message
 * @author karan
 */
  itemBarcode(event) {
    let checkstatus = true;
    if (event.key === 'Enter') {
      this.scanItems.item_Barcodes.push(event.target.value);
      this.scanItems.item_Barcodes.forEach(element => {
        if (element === this.scanItems.package_barcode) {
          checkstatus = false;
        } else {
        }
      });
      // this.scanItems.transport_id = '5de772a9e0bb5e732da26bba';
      event.target.value = '';
      if (checkstatus) {
        this.commonService.putData('admin/transport/item-scan/source', this.scanItems).subscribe(res => {
          this.getScannedCount();
          this.scanItems.item_Barcodes = [];
          this.sharedService.displaySuccessMessage('Scan Complete');
          this.finishBtn = true;
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
          this.scanItems.item_Barcodes = [];
        });
      }
    }
  }

  finish() {
    const obj = {
      status: 3,
      transport_id: this.scanItems.transport_id
    };
    this.commonService.putData('admin/transport', obj).subscribe(res => {
      this.sharedService.displaySuccessMessage('Transport created');
      this.router.navigate(['stock/list-stocks']);
      printJS({ printable: res.payload.invoice, type: 'pdf' });

    }, (err) => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }

  /**
* @method searchFieldKey()
* @description: to get branch details collections from the searched text
* @param event: contains selected  text
* @param type: contains type of dropdown (village , state , district , name)
* @author amitha.shetty
*/
  searchFieldKey(event: any) {
    if (event.term) {
      this.branchFromWarehouseData.branch.searchRequest = event.term;
      this.getBranchWarehouseList();
    }
  }

  /**
* @method searchFieldKey()
* @description: to get branch details collections from the searched text
* @param event: contains selected  text
* @param type: contains type of dropdown (village , state , district , name)
* @author amitha.shetty
*/
  searchFieldToKey(event: any) {
    if (event.term) {
      this.branchToWarehouseData.branch.searchRequest = event.term;
      this.getBranchWarehouseToList();
    }
  }


  /**
   * @method selectedFieldKey()
   * @param event : selected event object
   * @description store _id to warehouse id and will help for PO
   */
  selectedFieldKey(event: any) {
    this.branchWarehouse._id = event.id;
  }

  /**
 * @method selectedFieldKey()
 * @param event : selected event object
 * @description store _id to warehouse id and will help for PO
 */
  selectedFieldToKey(event: any) {
    console.log(event)
    if (this.branchWarehouse._id === event.id) {
      this.sharedService.displayErrorMessage('From Warehouse and To Warehouse cannot be same');
      this.toWarehouse = '';
    } else {
      this.transport.destination_warehouse = event.id;
      this.toWarehouse = event.name;
    }
  }

  uploadExcel(event) {
    if (event.target.files[0].name) {
      this.uploadExcelInfo = event.target.files[0];
    }
    const formData: FormData = new FormData();
    formData.append('bilty', this.uploadExcelInfo);
    formData.append('transport_id', this.scanItems.transport_id);
  //  this.loaderService.show('');
    this.commonService.uploadExcel('admin/transport/upload/bilty', formData).subscribe(res => {
    //m this.loaderService.show('hide');
      this.finishBtn = true;
      this.sharedService.displaySuccessMessage('Bilty uploaded successfully');
    }, (err) => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }

  getBranchWarehouseList() {
    const requestSet = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
      this.tableViewRequestData.pageNumber + '&search_text=' + this.branchFromWarehouseData.branch.searchRequest;
    this.commonService.getDataNew('users/warehouse' + requestSet).subscribe(res => {
      this.branchFromWarehouseData.branch.collections = res.payload.records;
    }, (err) => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }

  getBranchWarehouseToList() {
    const requestSet = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
      this.tableViewRequestData.pageNumber + '&search_text=' + this.branchToWarehouseData.branch.searchRequest+'&moduletype=sharestock';
    this.commonService.getDataNew('users/warehouse' + requestSet).subscribe(res => {
      this.branchToWarehouseData.branch.collections = res.payload.records;
    }, (err) => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  searchFranchiseFieldKey(event): void {
    if (event.term) {
      this.commonService.getData(`admin/franchise?search_text=${event.term}`).subscribe(res => {
        this.franchiseCollections = res.payload.records;
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('');
      });
    } else {
      this.franchiseCollections = [];
    }
  }
}
