import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { serviceRemarksType, serviceTrackStatus } from '../../enums';
import { UpdateServiceAction } from '../../models/service';
import { CommonService, SharedService } from '../../services';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import * as printJS from 'print-js';
// import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-service-action-dialog',
  templateUrl: './service-action-dialog.component.html',
  styleUrls: ['./service-action-dialog.component.scss']
})
export class ServiceActionDialogComponent implements OnInit {
  public serviceRemarks = [
    {
      name: 'RESOLVED_ON_REMOTE',
      val: 1
    },
    {
      name: 'REJECTED_ON_REMOTE',
      val: 1
    }
  ]
  public updateServiceData: UpdateServiceAction = new UpdateServiceAction();
  public oeData = {
    roleId: '',
    array: [],
    lock: false
  };
  public productSpareList = [];
  public updateInServiceStationForm: FormGroup;
  public pdfSrc: any;
  public servicePriceDetails = {
    isServicePdfDownloadEnable: false,
    serviceData: { total_price: null },
    tableHeaders: ['Sl No', 'Description of Servicing', 'Warranty', 'Quantity', 'Tax per Quantity', 'Total Tax', 'Amount']
  };


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ServiceActionDialogComponent>,
    private commonService: CommonService, private sharedService: SharedService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.updateInServiceStationForm = this.createServiceStationForm();
    this.updateServiceData = new UpdateServiceAction(this.data, this.data.identifier);
    this.data.finalStatusCall === 'Resolved' ? this.serviceRemarks.splice(1, 1) : this.data.finalStatusCall === 'Rejected' ? this.serviceRemarks.splice(0, 1) : this.serviceRemarks.splice(0, 1)
    if (this.data.identifier === 'toAssignService' || this.data.identifier === 'toOutOfDeliveryfromAdmin') {
      if (this.data.identifier === 'toOutOfDeliveryfromAdmin' && this.data.actionType === 'rejectServiceInStation') {
        this.spareValidationControl.removeAt(0);
      }
      this.getRoleList();
    }
    if (this.data.identifier === 'directDeliverByOe') {
      this.oeData.array = [{
        first_name: this.data.executive.name,
        _id: this.data.executive.id
      }
      ];
      this.updateInServiceStationForm.patchValue({
        executive_user_id: this.data.executive.id
      });
      this.serviceInStationValidationControl['executive_user_id'].disable();
    }
  }
  createServiceStationForm() {
    return this.formBuilder.group({
      executive_user_id: [undefined, [Validators.required]],
      service_charge: [null, [Validators.required, Validators.pattern('^[0-9]+')]],
      service_id: this.data.serviceId,
      status: this.data.status,
      spares: this.formBuilder.array([])
    });
  }
  spareDetails() {
    return this.formBuilder.group({
      product_spare_id: [undefined, [Validators.required]],
      quantity: [null, [Validators.required]],
      price: [null, [Validators.required]]
    });
  }
  get serviceInStationValidationControl() { return this.updateInServiceStationForm.controls; }
  get spareValidationControl(): FormArray { return this.updateInServiceStationForm.controls.spares as FormArray; }

  generateSpareDetails() {
    this.spareValidationControl.push(this.spareDetails());
  }
  deleteInputData(index): void {
    this.spareValidationControl.removeAt(index);
  }
  closeDialog(status) {
    this.dialogRef.close(status);
  }

  updateData(): void {
    this.commonService.putData('admin/service', this.updateServiceData).subscribe(response => {
      if (response.success) {
        this.sharedService.displaySuccessMessage(`${this.data.finalStatusCall} Successfully`);
        this.closeDialog(true);
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  approveInServiceData(): void {
    const obj = {
      service_id: this.serviceInStationValidationControl.service_id.value,
      executive_user_id: this.serviceInStationValidationControl.executive_user_id.value
    };
    this.commonService.putData('admin/service', obj).subscribe(response => {
      if (response.success) {
        this.updateProductSpareParts();
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  updateProductSpareParts(): void {
    const spareObj = {
      service_id: this.serviceInStationValidationControl.service_id.value,
      spares: this.spareValidationControl.value
    };
    this.commonService.putData('admin/service', spareObj).subscribe(response => {
      if (response.success) {
        this.calculateServicePrice();
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  calculateServicePrice(): void {
    const serviceChargeObjReq = `?service_id=${this.serviceInStationValidationControl.service_id.value}&service_charge=${this.serviceInStationValidationControl.service_charge.value}`;
    this.commonService.getData('admin/service/price' + serviceChargeObjReq).subscribe(response => {
      if (response.success) {
        this.servicePriceDetails.serviceData = response.payload;
        this.servicePriceDetails.isServicePdfDownloadEnable = true;
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  generateInvoice(): void {
    const serviceObjReq = `?service_id=${this.serviceInStationValidationControl.service_id.value}&service_charge=${this.servicePriceDetails.serviceData.total_price}`;
    this.commonService.getData('admin/service/invoice' + serviceObjReq).subscribe(response => {
      if (response.success) {
        // console.log(response);
        this.pdfSrc = response.payload.invoice;
        const link = document.createElement('a');
        link.setAttribute('href', this.pdfSrc);
        link.setAttribute('download', 'service_invoice.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        printJS({ printable: this.pdfSrc, type: 'pdf' });
        this.updateServiceToDeliver();
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  updateServiceToDeliver(): void {
    const deliverObj = {
      service_id: this.serviceInStationValidationControl.service_id.value,
      status: this.serviceInStationValidationControl.status.value,
      executive_user_id: this.serviceInStationValidationControl.executive_user_id.value
    };
    this.commonService.putData('admin/service', deliverObj).subscribe(response => {
      if (response.success) {
        this.sharedService.displaySuccessMessage(`${this.data.finalStatusCall}`);
        this.closeDialog(true);
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  searchFieldKey(event) {
    this.commonService.getData('admin/frontierMarketingUser?warehouse_id=' + this.data.warehouseId +
    '&is_oe_enabled=' + true + '&search_text=' + event.term).subscribe(res => {
        this.oeData.array = res.payload.records;
      });
  }

  getRoleList(): void {
    this.commonService.getData('admin/role?search_text=Operations Executive').subscribe(response => {
      if (response.success) {
        if (response.payload.records.length > 0 && response.payload.records[0].name === 'Operations Executive') {
          this.oeData.roleId = response.payload.records[0]._id;
        } else {
          this.sharedService.displayErrorMessage('Please Create an Operations Executive Role');
        }
      }
    }, err => {
      this.sharedService.displayErrorMessage('Please Create an Operations Executive Role');
    });
  }
  searchFieldKeySpare(event): void {
    this.commonService.getData('admin/productSpare?product_detail_id=' + this.data.productDetailId +
      '&product_id=' + this.data.productId + '&search_text=' + event.term).subscribe(res => {
        this.productSpareList = res.payload.records;
      });
  }
  changeFieldKeySpare(index, i): void {
    let continueExecution = true;
    if (this.spareValidationControl.value.length > 0) {
      this.spareValidationControl.value.forEach((element1, index1) => {
        this.spareValidationControl.value.forEach((element2, index2) => {
          if ((element1['product_spare_id'] === element2['product_spare_id']) && (index1 != index2)) {
            this.spareValidationControl.removeAt(i);
            this.sharedService.displayErrorMessage(`Spare part duplicate is not allowed`);
            continueExecution = false;
          }
        })
      });
    }
    if(continueExecution){
      this.productSpareList.forEach((d, pi) => {
        if (d._id == index.value.product_spare_id) {
          this.spareValidationControl.at(i).get('price').setValue(d.final_price);
        }
      })
    }
  }

  getSpareCount(event, index): void {
    if (event.target.value) {
      this.commonService.getData('api/spare/count?warehouse_id=' + this.data.warehouseId + '&product_spare_id=' +
        this.spareValidationControl.value[index].product_spare_id).subscribe(res => {
          if (res.success) {
            if (this.spareValidationControl.value[index].quantity <= 0 || this.spareValidationControl.value[index].quantity > res.payload.count) {
              this.spareValidationControl.at(index).patchValue({
                quantity: null
              });
              this.sharedService.displayErrorMessage(`No stocks left in ${res.payload.warehouse.name}`);
            }
          }
        });
    }
  }

}
