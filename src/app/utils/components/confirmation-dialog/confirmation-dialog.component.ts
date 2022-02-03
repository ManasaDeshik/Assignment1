import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  CommonService
} from 'src/app/utils';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  remarks = [];
  remark;
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private commonService: CommonService) {
  }

  ngOnInit() {
    console.log(this.data);

    if (this.data.from == 'Orders') {
      if (this.data.tab == "Received") {
        this.commonService.getDataNew('order/reasons?type=4').subscribe(response => {
          if (response.status = 200) {
            this.remarks=response.data.rows;
          }
          })
      
      } else if (this.data.tab == "Assign to TM" || this.data.tab == "Ongoing" || this.data.tab == "Hold") {
        /*this.remarks = [
          "Village not approachable (lockdown etc.)",
          "Customer cancelled – can’t wait for the order",
          "Product Not available","Tech Breakdown","Old Orders - Not Relevant",
          "Duplicate /Double Order from Customer","Customer Denied for delivery","Not for Sale Product",
          "Customer actual village/location is different","Others"]*/
          this.commonService.getDataNew('order/reasons?type=4').subscribe(response => {
            if (response.status = 200) {
              this.remarks=response.data.rows;
            }
            })
      }
    }else if(this.data.from =="Survey"){
      this.remark = ''
    } else {
      this.remark = 'NA'
    }

  }
  remarkChange(event) {
    this.remark = event;
    // console.log(event);
  }

  closeDialogConfirm(status: boolean,) {
    this.dialogRef.close({ status: status, remark: this.remark });
  }
  closeDialog(status: boolean,) {
    this.dialogRef.close(status);
  }
  selectedFieldKey(event){
    this.dialogRef.close({ status: true, data: event });
  }
}
