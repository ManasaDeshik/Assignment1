import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { timingSafeEqual } from 'crypto';
import { CommonService } from '../../services/common-service/common.service';
import { LoaderService } from '../../services/loader-service/loader.service';
import { SharedService } from '../../services/shared-service/shared.service';

@Component({
  selector: 'app-sequence-dialog',
  templateUrl: './sequence-dialog.component.html',
  styleUrls: ['./sequence-dialog.component.scss']
})
export class SequenceDialogComponent implements OnInit {
  sequence = 1;
  maxSequence = 1;
  maxSequenceC = 1;
  seletedProdut = [];
  constructor(public dialogRef: MatDialogRef<SequenceDialogComponent>,
    private commonService: CommonService,
    private loaderService: LoaderService,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    // console.log(this.data);
    this.maxSequence = this.data.item.product_sequance ? (this.data.item.product_sequance.length + 1) : 1;
    this.maxSequenceC = this.data.item.category_sequance ? (this.data.item.category_sequance.length + 1) : 1;
    if (this.data.item.newProducts.length > 0) {
      this.data.item.newProducts.forEach(element => {
        this.seletedProdut.unshift(element);
      })
    } else {
      this.dialogRef.close(false)
      this.sharedService.displayErrorMessage('Select the category that has atleast one product');
    }
  }
  // sequenceChange(event) {
  //   console.log(this.sequence)
  // }
  closeDialog() {
    this.dialogRef.close()
  }
  saveSequence() {
    //m this.loaderService.show('show');
   console.log(this.data.item.product_sequance,"sequence")
    let dataPusheToBranch = {
      warehouse_id: this.data.item.warehouse_id,
      product_sequance: this.data.item.product_sequance,
    }
    this.data.item.newProducts.forEach((element, i) => {
      console.log(element,'dialog');
      if(element._id)
      dataPusheToBranch.product_sequance.splice(this.sequence - 1, 0, element._id);
    })
    console.log(dataPusheToBranch,"dataPusheToBarnch")
   

    // console.log(dataPusheToBranch);
    this.commonService.putDataNew('product/warehouseProductDetails', dataPusheToBranch).subscribe(res => {
      if (res.success) {
      //m this.loaderService.show('hide');
        this.dialogRef.close(true)
        this.sharedService.displaySuccessMessage('Branch and product updated successfully.')
      }
    }, err => {
     //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage('');
      this.dialogRef.close(false)
    });



  }
  saveCategorySequence() {
    //m this.loaderService.show('show');
    let dataPusheToBranch = {
      warehouse_id: this.data.item.warehouse_id,
      category_sequance: this.data.item.category_sequance,
    }
    this.data.item.newProducts.forEach((element, i) => {
      if(element.category_code)
      dataPusheToBranch.category_sequance.splice(this.sequence - 1, 0, element.category_code);
    })
    // console.log(dataPusheToBranch);
    // return
    this.commonService.putDataNew('product/warehouseCategory', dataPusheToBranch).subscribe(res => {
      if (res.success) {
       //m this.loaderService.show('hide');
        this.dialogRef.close(true)
        this.sharedService.displaySuccessMessage('Branch and Category updated successfully.')
      }
    }, err => {
     //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage('');
      this.dialogRef.close(false)
    });



  }

}
