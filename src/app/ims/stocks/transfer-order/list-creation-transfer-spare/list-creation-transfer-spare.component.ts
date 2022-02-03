import { Component, OnInit } from '@angular/core';
import { StoreTransportSpare, SharedService, StoreTransportSpareArray, CommonService } from 'src/app/utils';
import { SessionStorage } from 'ngx-webstorage';
import * as printJS from 'print-js';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/utils/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-creation-transfer-spare',
  templateUrl: './list-creation-transfer-spare.component.html',
  styleUrls: ['./list-creation-transfer-spare.component.scss']
})
export class ListCreationTransferSpareComponent implements OnInit {
  public tableHeaders = ['SL No', 'Spare Name', 'Quantity'];
  public destinationWarehouseData = {
    collections: [],
    id: '',
    name: undefined
  };
  public pdfSrc: any;
  public productDetailId: string;
  @SessionStorage('bucketToSpareList') public bucketToSpareList: any;
  public creationOfToSpareList: StoreTransportSpare = new StoreTransportSpare();
  constructor(private sharedService: SharedService, private commonService: CommonService,
    private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.getRouteSegments();
    this.creationOfToSpareList = this.bucketToSpareList;

  }
  getRouteSegments(): void {
    const urlSegmentKeys = this.sharedService.urlSegmentKeys();
    this.productDetailId = urlSegmentKeys[urlSegmentKeys.length - 1].path;
  }
  openDialog(item: StoreTransportSpareArray): void {
    const dialogRef = this.sharedService.openDialog(item.en_name);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.creationOfToSpareList.items = this.creationOfToSpareList.items.filter(ele => ele.product_spare_id !== item.product_spare_id);
        this.updateBucketListData(this.creationOfToSpareList.items);
      }
    });
  }
  quantityKeyUp(data: StoreTransportSpareArray): void {
    if (0 < data.quantity && data.quantity <= data.limitedQuantity) {
      this.updateBucketListData(this.creationOfToSpareList.items);
    } else {
      this.sharedService.displayErrorMessage(`Quantity must be in between 1 to ${data.limitedQuantity}`);
      data.quantity = null;
    }
  }

  updateBucketListData(items: StoreTransportSpareArray[]): void {
    const storeData = this.bucketToSpareList;
    storeData.items = [];
    items.map(ele => {
      storeData.items.push(new StoreTransportSpareArray(ele));
    });
    this.bucketToSpareList = storeData;
  }

  getBranchWarehouseList(event) {
    this.destinationWarehouseData.collections = [];
    const requestSet = '?search_text=' + event.term;
    this.commonService.getData('admin/warehouse' + requestSet).subscribe(res => {
      if (res.success) {
        this.destinationWarehouseData.collections = res.payload.records;
      }
    }, (err) => {
       this.sharedService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  selectedFieldKey(event): void {
    this.destinationWarehouseData.id = '';
    if (event) {
      if (event._id !== this.bucketToSpareList.source_warehouse) {
        this.destinationWarehouseData.id = event._id;
      } else {
        this.destinationWarehouseData.name = undefined;
        this.sharedService.displayErrorMessage('Source and Destination warehouse cannot be same');
      }
    }
  }
  printTransportOrder(): void {
    const toCheckQuantityEntered = this.validQuantity(this.creationOfToSpareList.items);
    // const toCheckQuantityEntered = this.validQuantity(this.creationOfToSpareList.items,this.destinationWarehouseData.name);
    if (toCheckQuantityEntered) {
      if (this.destinationWarehouseData.id) {
        const data = this.bucketToSpareList;
        data.items = data.items.map(({ limitedQuantity, ...rest }) => ({ ...rest }));
        data.destination_warehouse = this.destinationWarehouseData.id;
        this.commonService.postData('admin/productSpare/transport', data).subscribe(res => {
          if (res.success) {
            this.pdfSrc = res.payload.images[0];
            this.savePrint();
          }
        }, err => {
          this.sharedService.displayErrorMessage('');
        });
      } else {
        this.sharedService.displayErrorMessage('Please Select Destination Warehouse');
      }
    } else {
      this.sharedService.displayErrorMessage('Please fill the quantity');
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
    this.router.navigate([`stock/create-purchase-order/${this.productDetailId}/${this.bucketToSpareList.source_warehouse}`]);
  }
  routeToPurchaseOrderSpare(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: `Spare data stored in bucket list will be lost, would you like to continue` },
      panelClass: 'confirmation-dialog',
    });
    dialogRef.afterClosed().pipe().subscribe(result => {
      if (result) {
        this.router.navigate([`stock/create-purchase-order/${this.productDetailId}/${this.bucketToSpareList.source_warehouse}`]);
      }
    });
  }
  validQuantity(items: StoreTransportSpareArray[]) {
    // console.log(items,dataWareHouse);
    // let data ={
      
    // }
    // this.commonService.postData('admin/productSpare/transport', data).subscribe(res => {
    //   if (res.success) {
    //     this.pdfSrc = res.payload.images[0];
    //     this.savePrint();
    //   }
    // }, err => {
    //   this.sharedService.displayErrorMessage('');
    // });
    if (items.find(ele => ele.quantity === null)) {
      return false;
    }
    return true;
  }
}
