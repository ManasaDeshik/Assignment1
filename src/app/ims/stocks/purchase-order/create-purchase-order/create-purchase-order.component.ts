import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderService, SharedService, CommonService, StockService, PurchaseOrder, SparePurchaseOrderFormat, ViewSpareParts, SparesArray, TransferSpareShareComponent, GeTSpareList } from 'src/app/utils';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as printJS from 'print-js';
import { SessionStorage, SessionStorageService } from 'ngx-webstorage';
import { ConfirmationDialogComponent } from 'src/app/utils/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.scss']
})
export class CreatePurchaseOrderComponent implements OnInit {
  public estimatedMinDate = new Date();
  public purchaseOrder: PurchaseOrder = new PurchaseOrder('');
  public franchiseCollections = [];
  public franchiseAddressCollections = [];
  public totalPrice: number;
  public pdfSrc: any;
  public sparePageInfo = {
    currentPage: 1,
    recordsPerPage: 10
  };
  // spare po
  public currentPoTab = 'Product';
  public isSparePlaceOrder = false;
  public viewSpareParts: GeTSpareList = new GeTSpareList();
  public selectedSpareId = '';
  @ViewChild('purchaseForm') form: any;
  @SessionStorage('bucketSpareList') public bucketSpareList: any;
  @SessionStorage('bucketToSpareList') public bucketToSpareList: any;
  constructor(private commonService: CommonService,
    private sharedService: SharedService,
    private loaderService: LoaderService,
    private router: Router,
    private stockService: StockService,
    private dialog: MatDialog,
    public datepipe: DatePipe,
    private san: DomSanitizer, private storage: SessionStorageService) { }

  ngOnInit() {
    this.getRouteSegments();
    this.stockService.getManufacturerId().subscribe(res => {
      this.purchaseOrder.manufacturer_id = res;
      console.log('46',this.purchaseOrder.manufacturer_id,res);
    });
    this.storage.clear('bucketSpareList');
    this.storage.clear('bucketToSpareList');
  }

  /**
 * @method getRouteSegments()
 * @description: productDetailId contains productdetails_id and routeSegmentId contains branchWarehouseId
 * @author karan
 */
  getRouteSegments(): void {
    const urlSegmentKeys = this.sharedService.urlSegmentKeys();
    this.purchaseOrder.product_detail_id = urlSegmentKeys[urlSegmentKeys.length - 2].path;
    this.purchaseOrder.warehouse_id = urlSegmentKeys[urlSegmentKeys.length - 1].path;
  }


  fetchTotalPrice() {
    if (this.purchaseOrder.order_value !== '') {
      if (!this.isSparePlaceOrder) {
        const obj = {
          product_detail_id: this.purchaseOrder.product_detail_id,
          quantity: this.purchaseOrder.quantity,
          order_value: this.purchaseOrder.order_value
        };
        this.commonService.patchDataNew('stock/purchase/price', obj).subscribe(res => {
          this.totalPrice = res.data.total_value;
        }, err => {
          this.sharedService.displayErrorMessage('');
        });
      }  else {
        const obj = {
          spares: [{
            product_spare_id: this.selectedSpareId,
            quantity: this.purchaseOrder.quantity,
            order_value: this.purchaseOrder.order_value
          }
          ]
        };
        this.commonService.patchData('admin/purchaseOrder/spare/price', obj).subscribe(res => {
          this.totalPrice = res.payload.spare_details[0].price_details.total_value;
        }, err => {
          this.sharedService.displayErrorMessage('');
        });
      }

    }
  }

  savePrint() {
    const link = document.createElement('a');
    link.setAttribute('href', this.pdfSrc);
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    printJS({ printable: this.pdfSrc, type: 'pdf' });
    this.router.navigate(['stock/list-stocks']);
  }

  printPurchaseOrder() 
  {
    console.log('111',this.purchaseOrder.estimated_arrival_date);
    this.purchaseOrder.estimated_arrival_date = this.datepipe.transform(this.purchaseOrder.estimated_arrival_date, 'dd/MM/yyyy');
    console.log('114',this.purchaseOrder.estimated_arrival_date);
    this.purchaseOrder.ordered_date = new Date().toISOString();
    this.purchaseOrder.ordered_date = this.datepipe.transform(this.purchaseOrder.ordered_date, 'dd/MM/yyyy');
    //m this.loaderService.show('show');
    console.log(this.purchaseOrder)
    if (this.purchaseOrder.payment_terms.trim() == '' || this.purchaseOrder.product_name.trim() == '') {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage('Please enter valid details.');
      return;
    }
    this.purchaseOrder.payment_terms = this.purchaseOrder.payment_terms.trim()
    this.purchaseOrder.product_name = this.purchaseOrder.product_name.trim()
    // verify after cognito integration
    this.commonService.postDataNew('stock/purchaseOrder', this.purchaseOrder).subscribe(res => {
    //m this.loaderService.show('hide');
     this.pdfSrc = res.data.images;
      this.savePrint();

    }, err => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage('');
    });
  }

  photoURL() {
    return this.san.bypassSecurityTrustResourceUrl(this.pdfSrc);
  }
  searchFranchiseFieldKey(event): void {
    this.commonService.getDataNew(`users/franchise`).subscribe(res => {
      this.franchiseCollections = res.payload.records;
    }, err => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage('');
    });
  }
  selectedFieldKey(event): void {
    this.purchaseOrder.franchise_address_id = undefined;
    if (event) {
      this.franchiseAddressCollections = [];
      this.commonService.getDataNew(`users/getFranchise/${event.id}`).subscribe(res => {
        this.franchiseAddressCollections = res.payload.franchises_addresses;
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('');
      });
    }
  }
  changePoTab(currentStatus): void {
    const isChangeTab = this.setTabInfo(currentStatus);
    if (isChangeTab) {
      this.currentPoTab = currentStatus;
      this.clearTab();
    }
  }
  clearTab(): void {
    this.isSparePlaceOrder = false;
    this.totalPrice = undefined;
    const purchaseData = new PurchaseOrder(this.purchaseOrder, true);
    this.sparePageInfo.currentPage = 1;
    this.purchaseOrder = purchaseData;
  }
  setTabInfo(currentStatus): boolean {
    if (this.currentPoTab !== currentStatus) {
      if (currentStatus === 'Product') {
        if ((this.bucketSpareList && this.bucketSpareList.spares.length > 0) ||
          (this.bucketToSpareList && this.bucketToSpareList.items.length > 0)) {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '250px',
            data: { message: `Spare data stored in bucket list will be lost, would you like to continue` },
            panelClass: 'confirmation-dialog',
          });
          dialogRef.afterClosed().pipe().subscribe(result => {
            if (result) {
              this.storage.clear('bucketSpareList');
              this.storage.clear('bucketToSpareList');
              this.currentPoTab = currentStatus;
              this.clearTab();
              return true;
            }
          });
        } else {
          return true;
        }
      } else {
        this.getSparePurchaseOrderList();
        return true;
      }
    }
    return false;
  }

  onPlaceOrder(data: any): void {
    const toCheckIsSpareExistInBucket = this.checkSpareBucket(data, this.bucketSpareList, 'spares');
    if (toCheckIsSpareExistInBucket) {
      if (this.bucketSpareList && this.bucketSpareList.spares && this.bucketSpareList.spares.length > 0) {
        const storeData = this.bucketSpareList;
        delete storeData['Spares'];
        this.purchaseOrder = storeData;
      }
      this.isSparePlaceOrder = true;
      this.selectedSpareId = data.spareId;
      this.purchaseOrder.product_name = data.name;
      this.getRouteSegments();
    } else {
      this.sharedService.displayErrorMessage('Spare Already Exist in the bucket list');
    }

  }
  checkSpareBucket(data, spareList, type): boolean {
    if (spareList && spareList[type] && spareList[type].length > 0) {
      if (spareList[type].find(element => element.product_spare_id === data.spareId)) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  }
  onSpareShareStock(spareData: any): void {
    const toCheckIsSpareExistInBucket = this.checkSpareBucket(spareData, this.bucketToSpareList, 'items');
    if (toCheckIsSpareExistInBucket) {
      const dialogRef = this.dialog.open(TransferSpareShareComponent, {
        panelClass: 'transport-spare-style',
        data: {
          name: spareData.name,
          items: spareData.items,
          spareId: spareData.spareId,
          sourceWarehouse: this.purchaseOrder.warehouse_id
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
        }
      });
    } else {
      this.sharedService.displayErrorMessage('Spare Already Exist in the bucket list');
    }
  }

  getSparePurchaseOrderList(): void {
    this.viewSpareParts = new GeTSpareList();
    const requestSet = `?records_per_page=${this.sparePageInfo.recordsPerPage}&page_number=${this.sparePageInfo.currentPage}&warehouse_id=${this.purchaseOrder.warehouse_id}&product_detail_id=${this.purchaseOrder.product_detail_id}`;
    this.commonService.getData(`admin/productSpare/stock` + requestSet).subscribe(response => {
      if (response.success && response.payload.records && response.payload.records.length > 0) {
        this.viewSpareParts = new GeTSpareList(response.payload);
        // console.log(this.viewSpareParts);
      }
    }, err => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage('');
    });
  }
  addToBucketSparePO(): void {
    const spareData = new SparePurchaseOrderFormat(this.purchaseOrder);
    if (this.bucketSpareList && this.bucketSpareList.spares && this.bucketSpareList.spares.length > 0) {
      spareData.spares = this.bucketSpareList.spares;
    }
    spareData.spares.push(new SparesArray(this.purchaseOrder, this.selectedSpareId));
    this.bucketSpareList = spareData;
    this.goSpareListTab();
  }
  routeCreationOfSpare(): void {
    if (this.bucketSpareList && this.bucketSpareList.spares.length) {
      this.router.navigate([`/stock/list-create-po-spare/${this.purchaseOrder.product_detail_id}`]);
    } else {
      this.sharedService.displayErrorMessage('No Spare added to bucket list');
    }
  }
  routeCreationOfToSpare(): void {
    if (this.bucketToSpareList && this.bucketToSpareList.items.length) {
      this.router.navigate([`/stock/list-create-transfer-spare/${this.purchaseOrder.product_detail_id}`]);
    } else {
      this.sharedService.displayErrorMessage('No Spare added to bucket list');
    }
  }
  goSpareListTab(): void {
    this.currentPoTab = 'Spare';
    this.isSparePlaceOrder = false;
  }
  getPage(event: number): void {
    if (event > 0 && event <= this.viewSpareParts.totalRecords) {
      this.sparePageInfo.currentPage = event;
      this.getSparePurchaseOrderList();
    }
  }
  viewOngoingHistory(): void {
    this.router.navigate([`/stock/order-history/${this.currentPoTab}`]);
  }
  downloadSpare() {
    //m this.loaderService.show('show');
    console.log(this.purchaseOrder, this.viewSpareParts)
    let requset = '?warehouse_id=' + this.purchaseOrder.warehouse_id + "&manufacturer_id=" + this.purchaseOrder.manufacturer_id;
    this.commonService.fileDownload('admin/purchaseOrder/spare/excel' + requset).subscribe(response => {
      if (response) {
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
        const link = document.createElement('a');
        link.setAttribute('href', window.URL.createObjectURL(blob));
        link.setAttribute('download', 'spares');
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
}
