import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../../services';
import { SessionStorage } from 'ngx-webstorage';
import { StoreTransportSpare } from '../../models/stock';

@Component({
  selector: 'app-transfer-spare-share',
  templateUrl: './transfer-spare-share.component.html',
  styleUrls: ['./transfer-spare-share.component.scss']
})
export class TransferSpareShareComponent implements OnInit {
  public spareQuantity: number;
  @SessionStorage('bucketToSpareList') public bucketToSpareList: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private sharedService: SharedService , 
    public dialogRef: MatDialogRef<TransferSpareShareComponent>) { }

  ngOnInit() {
  }

  checkQuantity(event): void {
    if (event.target.value) {
      if (event.target.value > 0 && event.target.value <= this.data.items) {
      } else {
        this.spareQuantity = null;
        this.sharedService.displayErrorMessage(`Quantity in between 1 to ${this.data.items}`);
      }
    }
  }
  addToBucket(): void {
    const spareData = new StoreTransportSpare();
    if (this.bucketToSpareList && this.bucketToSpareList.items && this.bucketToSpareList.items.length > 0) {
      spareData.items = this.bucketToSpareList.items;
    }
    spareData.source_warehouse = this.data.sourceWarehouse;
    spareData.items.push({
       product_spare_id: this.data.spareId,
        en_name: this.data.name,
       quantity: this.spareQuantity,
       limitedQuantity: this.data.items
    });
    this.bucketToSpareList = spareData;
    this.dialogRef.close(true);

}
closeDialog() {
  this.dialogRef.close();
}

}
