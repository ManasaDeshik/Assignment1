import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonService, SharedService } from '../../services';

@Component({
  selector: 'app-add-spare',
  templateUrl: './add-spare.component.html',
  styleUrls: ['./add-spare.component.scss']
})
export class AddSpareComponent implements OnInit {
  public isNoWarranty = false;
  public currentPageAction = {
    headerName: 'Add Spare',
    buttonName: 'Add Spare'
  };
  public spareTypeDetails = [
    {
      name: 'Specific',
      description: 'Only for this varient'
    }, {
      name: 'Common',
      description: 'For all the varients'
    }];
  public currentSpareType = 'Specific';
  public addSpareForm: FormGroup; // product and varients form
  constructor(public dialogRef: MatDialogRef<AddSpareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private commonService: CommonService, private sharedService: SharedService) { }

  ngOnInit() {
    this.addSpareForm = this.createSpareForm();
    if (this.data.spareId) {
      this.currentPageAction.buttonName = 'Update',
        this.currentPageAction.headerName = 'Edit Spare';
      this.getParticularSparePart();
    }
  }

  createSpareForm() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^\S/)]],
      actual_price: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      extra_price: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      final_price: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      warranty: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      product_detail_id: [this.data.productDetailId],
      product_id: [this.data.productId],
      product_spare_id: this.data.spareId,
      tax_details: this.formBuilder.array([this.createTaxDetails()])
    });
  }
  createTaxDetails() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^\S/)]],
      percent: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
    });
  }
  get addSpareValidationControl() { return this.addSpareForm.controls; }
  get taxValidationControl(): FormArray { return this.addSpareForm.controls.tax_details as FormArray; }
  generateTaxDetails() {
    this.taxValidationControl.push(this.createTaxDetails());
  }
  deleteTaxInputData(index): void {
    this.taxValidationControl.removeAt(index);
  }
  closeDialog(status) {
    this.dialogRef.close(status);
  }
  addEditSpareParts(): void {
    this.setSpareTypeAction();
    if (this.data.spareId) {
      this.commonService.putData('admin/productSpare', this.addSpareForm.value).subscribe(response => {
        if (response.success) {
          this.sharedService.displaySuccessMessage('Spare Updated Successfully');
          this.closeDialog(true);
        } else {
        }
      }, err => {
        this.sharedService.displayErrorMessage(err.statusText);
      });
    } else {
      delete this.addSpareForm.value.product_spare_id;
      this.commonService.postData('admin/productSpare', this.addSpareForm.value).subscribe(response => {
        if (response.success) {
          this.sharedService.displaySuccessMessage('Spare Created Successfully');
          this.closeDialog(true);
        } else {
        }
      }, err => {
        this.sharedService.displayErrorMessage(err.statusText);
      });
    }

  }
  getParticularSparePart(): void {
    const requestSet = `?product_id=${this.data.productId}&product_detail_id=${this.data.productDetailId}&_id=${this.data.spareId}`;
    this.commonService.getData('admin/productSpare?' + requestSet).subscribe(response => {
      if (response.success && response.payload) {
        this.addSpareForm.patchValue(response.payload);
        this.warrantyInputCheck();
        this.spareTypeCheck(response.payload);
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  spareRadioChange(event): void {
    this.currentSpareType = event.value;
  }
  onChangeWarrantyCheck(event): void {
    this.isNoWarranty = event.checked;
    if (event.checked) {
      this.addSpareValidationControl['warranty'].setValue(0);
    } else {
      this.addSpareValidationControl['warranty'].reset();
    }
  }
  warrantyInputCheck(): void {
    if (this.addSpareValidationControl['warranty'].value <= 0 && this.addSpareValidationControl['warranty'].valid) {
      this.isNoWarranty = true;
    } else {
      this.isNoWarranty = false;
    }
  }
  setSpareTypeAction(): void {
    if (this.currentSpareType === 'Common') {
      if (this.data.spareId ) {
       this.addSpareForm.value.product_detail_id = null;
      } else {
        delete this.addSpareForm.value.product_detail_id;
      }
    }
  }
  spareTypeCheck(res): void {
    if (res.product_detail_id) {
     this.currentSpareType = 'Specific';
    } else {
      this.currentSpareType = 'Common';
      this.addSpareForm.value.product_detail_id = this.data.productDetailId;
    }
  }
}
