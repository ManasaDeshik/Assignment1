import { Component, OnInit } from '@angular/core';
import { SessionStorage } from 'ngx-webstorage';
import { CommonService, SharedService, CreationSpareList, SparesArray } from 'src/app/utils';
import { Router } from '@angular/router';
import * as printJS from 'print-js';
import { ConfirmationDialogComponent } from 'src/app/utils/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-creation-po-spare',
  templateUrl: './list-creation-po-spare.component.html',
  styleUrls: ['./list-creation-po-spare.component.scss']
})
export class ListCreationPoSpareComponent implements OnInit {
  public tableHeaders = ['SL No', 'Description of Goods', 'Quantity', 'Rate', 'Per', 'Amount'];
  public creationOfSpareList = new CreationSpareList();
  public productDetailId: string;
  public pdfSrc: any;
  @SessionStorage('bucketSpareList') public bucketSpareList: any;
  constructor(private commonService: CommonService , private sharedService: SharedService , private router: Router , 
     private dialog: MatDialog) { }

  ngOnInit() {
    this.getRouteSegments();
    this.getListCreationSpare();
  }
  getListCreationSpare(): void {
    if (this.bucketSpareList && this.bucketSpareList.spares.length > 0) {
      this.patchSpareArrayList(this.bucketSpareList.spares , false);
    }
  }
  getRouteSegments(): void {
    const urlSegmentKeys = this.sharedService.urlSegmentKeys();
    this.productDetailId = urlSegmentKeys[urlSegmentKeys.length - 1].path;
  }
  fetchTotalPrice(event): void {
    if (event.target.value) {
      this.patchSpareArrayList(this.creationOfSpareList.spare_details , true);
    }

  }
  updateBucketListData(spareDails): void {
    const storeData = this.bucketSpareList;
    storeData.spares = [];
    spareDails.map((ele, index) => {
    storeData.spares.push(new SparesArray(ele , ele.product_spare_id));
    });
    this.bucketSpareList = storeData;
  }
  patchSpareArrayList(sparesList , updateBucket?: boolean): void {
    const obj = {
      spares: sparesList
    };
    this.commonService.patchData('admin/purchaseOrder/spare/price', obj).subscribe(res => {
      if (res.success) {
        this.creationOfSpareList = new CreationSpareList(res.payload);
        if (updateBucket) {
          this.updateBucketListData(this.creationOfSpareList.spare_details);
        }
      }
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }
  openDialog(item): void {
    const dialogRef = this.sharedService.openDialog(item.spare_details.name);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.creationOfSpareList.spare_details = this.creationOfSpareList.spare_details.filter(ele => ele.product_spare_id !== item.product_spare_id);
        this.patchSpareArrayList(this.creationOfSpareList.spare_details , true);
      }
    });
  }
  routeToPurchaseOrderSpare(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: `Spare data stored in bucket list will be lost, would you like to continue` },
      panelClass: 'confirmation-dialog',
    });
    dialogRef.afterClosed().pipe().subscribe(result => {
      if (result) {
        this.router.navigate([`stock/create-purchase-order/${this.productDetailId}/${this.bucketSpareList.warehouse_id}`]);
      }
    });
  }
  printPurchaseOrder(): void {
    const data = this.bucketSpareList;
    data.estimated_arrival_date = new Date(data.estimated_arrival_date).toISOString();
    this.commonService.postData('admin/purchaseOrder/spare', data).subscribe(res => {
      if (res.success) {
        this.pdfSrc = res.payload.images[0];
        this.savePrint();
      }
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }
  savePrint() {
    const link = document.createElement('a');
    link.setAttribute('href', this.pdfSrc);
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    printJS({ printable: this.pdfSrc, type: 'pdf' });
    this.router.navigate([`stock/create-purchase-order/${this.productDetailId}/${this.bucketSpareList.warehouse_id}`]);
  }
}
