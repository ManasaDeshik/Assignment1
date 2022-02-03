import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionStorage } from 'ngx-webstorage';
import { PrintInvoiceOE } from '../../models/order';
import { CommonService } from '../../services/common-service/common.service';
import { LoaderService } from '../../services/loader-service/loader.service';
import { SharedService } from '../../services/shared-service/shared.service';
import { ConfirmationDialogComponent } from 'src/app/utils/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-view-products-dialog',
  templateUrl: './view-products-dialog.component.html',
  styleUrls: ['./view-products-dialog.component.scss']
})
export class ViewProductsDialogComponent implements OnInit {
  itemDetails;
  isEdit: boolean = false;
  isShowCheck: boolean = false;
  selectCheck = false;
  tableHeaders = [
    { header: 'Product Order No' ,width:'20%'}, { header: 'Product',width:'25%' }, { header: 'Quantity',width:'15%' }, { header: 'Price',width:'20%' }, { header: 'Amount',width:'20%' }
  ];
  tableHeadersAssign = [
    { header: 'Product Order No',width:'25%'  }, { header: 'Product',width:'20%'  }, { header: 'Quantity',width:'10%'  }, { header: 'Barcode',width:'20%'  }, { header: 'Expiry Date',width:'13%'  }, { header: 'Activity',width:'10%' }
  ];
  dataChild: any = {
    records: []
  };
  public oeArray = [];
  public printInvoice: PrintInvoiceOE = new PrintInvoiceOE('');
  selectedBarcodeSearchText: any;
  barcodeList: any;
  barcodeCurrentPage: number;
  isScan: boolean = false;
  quantity = 1;
  orderScan = [];
  scannedCount = 0;
  barcodeLength = 0;
  parentOrderNo = '';
  scanner = false;
  @SessionStorage('moduleDetails') public moduleDetails;
  @SessionStorage('registeredWarehouse') public registeredWarehouse: any;
  constructor(public dialogRef: MatDialogRef<ViewProductsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public commonService: CommonService,
    public loaderService: LoaderService, private sharedService: SharedService, public dialog: MatDialog,) {
  }

  ngOnInit() {
    console.log(this.data);
    // if(this.data.type != 'Received' || this.data.type != 'Assign to TM' ){

    // }
    this.itemDetails = this.data.item;
    /*if (this.data.type === 'Rejected') {

    } else*/ if (this.data.type==='Rejected' || this.data.type === 'Ongoing' || this.data.type === 'Dispatched' || this.data.type === 'Delivered'
      || this.data.type === 'RTS' || this.data.type === 'Completed'
      || this.data.type === 'Could not deliver') {
      this.childRetriveByBarcode()
    } else {
      this.childRetrive();
    }


  }

  getImg(data)
  {
    var list=data.filter(val=>val != '')
    console.log(list);
return list[0] ;
  }
  childRetriveByBarcode() {
  //m this.loaderService.show('show');
  let requestSet = { parent_order_id: this.itemDetails.orderId }
  this.commonService.getDataNew('order/childcart' + '?parent_order_id=' + requestSet.parent_order_id).subscribe(response => {

      if (response.success) {
      //m this.loaderService.show('hide');
        this.dataChild = response.payload.records;
        console.log(this.dataChild);
        // this.dataChild.records.forEach((element, i) => {
        //   this.dataChild.records[i]['checked'] = false;
        //   if (this.data.type == 'Assign to TM') {
        //     this.retriveBarCode(element._id, i)
        //   }
        // })
        // console.log(this.dataChild.records);
      }
    }, err => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage('');
    })
  }
  childRetrive() {
    let queryAdd = '';
    if (this.data.type === 'Hold') {
      queryAdd = '&status=10'
    } else if (this.data.type === 'Received') {
      queryAdd = '&status=0'
    } else if (this.data.type === 'Assign to TM') {
      queryAdd = '&status=1'
    }
  //m this.loaderService.show('show');
    let requestSet = { order_id: this.itemDetails.orderId }
    this.commonService.getDataNew('order/child' + '?order_id=' + requestSet.order_id + queryAdd).subscribe(response => {
      if (response.success) {
      //m this.loaderService.show('hide');
        this.dataChild = response.payload;
         console.log(this.dataChild.records)
        this.barcodeLength = 0;
        // this.dataChild.records.forEach((element, i) => {
        // this.dataChild.records[i]['checked'] = false;
        // console.log(this.data.type);
        if (this.data.type == 'Assign to TM') {
         // this.retriveBarCode(this.dataChild.records)
        }
        // })
        // console.log(this.dataChild.records);
      }
    }, err => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage('');
    })
  }
  retriveBarCode(id) {
  //m this.loaderService.show('show');
    //this.commonService.getData('admin/order/barcode' + '?order_id=' + id).subscribe(response => {
     // if (response.success) {
      //m this.loaderService.show('hide');
      //  console.log(response.payload[0])
        // this.dataChild.records
        // if (response.payload[0].items) {
        //   this.dataChild.records[index].barcode = response.payload[0].items[0].items;
        // }
        //  console.log(this.dataChild);
        id.forEach((element, i) => {
          if (this.data.type == 'Assign to TM' && element.items) {
            this.dataChild.records[i].barcode = element.items[0].items
            this.barcodeLength = this.barcodeLength + 1;
          }
          // else if (this.data.type == 'Assign to TM' && element) {
          //   this.dataChild.records[i].barcode.push(element);
          //   this.barcodeLength = this.barcodeLength + 1;
          // }
        })
    //m this.loaderService.show('hide');
  }
  closeDialog(status: boolean) {
    this.dialogRef.close(status);
  }
  makeEdit() {
    this.isEdit = true;
  }
  saveOrder() {
    this.isEdit = false;
    // console.log(this.dataChild);
    let allRecords = {
      parent_order_id: this.itemDetails.orderId,
      child_orders: []
    }
    if (this.dataChild.records.length > 0) {
      this.dataChild.records.forEach((element, i) => {
        console.log(element);
        allRecords.child_orders.push({ order_id: element.id, quantity: element.quantity,value:(element.product_detail.delivery_price*element.quantity)})
      })
    } else {
      this.sharedService.displayErrorMessage('No orders to update');
    //m this.loaderService.show('hide');
    }
  //m this.loaderService.show('show');
    this.commonService.putDataNew('order/childItem', allRecords).subscribe(res => {
      if (res.success) {
      //m this.loaderService.show('hide');
        this.sharedService.displaySuccessMessage('Orders updated successfully.')
        this.dialogRef.close(true);
      }
    }, err => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage('');
    });


  }
  cancel() {
    this.isEdit = false;
  }
  quantityChange(item, action, index) {
     console.log(this.data);
    if (this.dataChild.records[index].quantity > 0) {
      if (action == 'minus' && this.dataChild.records[index].quantity >= 2) {
        this.dataChild.records[index].quantity = Number(this.dataChild.records[index].quantity - 1)
      } else if (action == 'plus') {
      //m this.loaderService.show('show');
        this.commonService.getDataNew('stock/warehouse/stock' +
          "?warehouse_id=" + this.itemDetails.warehouseId + "&product_detail_id=" + item.product_detail.id).subscribe(resProduct => {
            if (resProduct.payload) {
            //m this.loaderService.show('hide');
              if ((this.dataChild.records[index].quantity >= (resProduct.payload.records.stock_count))) {
                this.sharedService.displayErrorMessage('Product stock is not available.');
              } else {
                this.dataChild.records[index].quantity = Number(parseInt(this.dataChild.records[index].quantity) + 1)
              }
            }
          }, err => {
            //m this.loaderService.show('hide');
          })
      }
    }
  }
  selectAll(event) {
    this.selectCheck = event;
    for (let i = 0; i < this.dataChild.records.length; i++) {
      if (!this.dataChild.records[i].isPresent)
        this.dataChild.records[i].checked = this.selectCheck;
    }
  }
  updateCheck(event, index) {
    this.selectAll(false);
    this.dataChild.records[index].checked = event.checked;

  }
  checkIfAllSelected() {
    this.selectCheck = this.dataChild.records.every(function (item: any) {
      return item.checked == true;
    })
  }
  rejectSelected() {
    let allRecords = [];
    if (this.dataChild.records.length > 0) {
      this.dataChild.records.forEach((element, i) => {
        if (element.checked) {
          allRecords.push(element)
        }
      })
    } else {
      this.sharedService.displayErrorMessage('No orders to reject');
    //m this.loaderService.show('hide');
    }
    if (allRecords.length <= 0) {
      this.sharedService.displayErrorMessage('Please select order to reject');
    //m this.loaderService.show('hide');
      return;
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      height: "300px",
      data: { message: 'Are You Sure You Want to ' + 'Reject', userName: name, tab: 'Received', from: 'Orders' },
      panelClass: 'confirmation-dialog'
    });
    // console.log(item, 263)
    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        let updateObj = {
          status: 2,
          order_cart_id: allRecords[0].id,
          remarks: result.remark.id,
          order_id:this.itemDetails.orderId
        }
      //m this.loaderService.show('show');
        this.commonService.putDataNew('order', updateObj).subscribe(res => {
          if (res.success) {
          //m this.loaderService.show('hide');
            this.sharedService.displaySuccessMessage('Selected order rejected.')
            this.dialogRef.close(true);
          }
        }, err => {
        //m this.loaderService.show('hide');
          this.sharedService.displayErrorMessage('');
        });
      }
    })
    return;

    // console.log(allRecords)

  }
  searchFieldKey(event) {
    if (this.moduleDetails.name === 'superadmin') {
      this.printInvoice.warehouse_id = '';
    } else {
      this.printInvoice.warehouse_id = this.registeredWarehouse;
    }
    this.commonService.getDataNew('users?warehouse_id=' + this.printInvoice.warehouse_id + '&is_oe_enabled=' + true + '&search_text=' + event.term).subscribe(res => {
      this.oeArray = res.payload.records;
    });
  }
  selectedFieldKey(event) {
    if (event) {
      this.printInvoice.executive_id = event.id;
    } else {
      this.printInvoice.executive_id = null
    }

  }
  searchBarcode(event): void {
    this.selectedBarcodeSearchText = event.target.value;
    this.barcodeCurrentPage = 1;
    this.getProductBarcodeList();
  }
  getProductBarcodeList(): void {
    this.commonService.getData(`admin/item/barcode?product_detail_id=${this.data.product.id}&warehouse_id=${this.data.warehouse.id}&records_per_page=10&page_number=${this.barcodeCurrentPage}&search_text=${this.selectedBarcodeSearchText}`).subscribe(res => {
      if (res.success) {
        this.barcodeList = res.payload.records;
      }
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }
  cancelAssign() {
    this.dialogRef.close(status);
  }
  assignSelected() {
    let putObj: any = {
      order_cart_id: [],
      parent_order_id: this.itemDetails.orderId,
      executive_id: this.printInvoice.executive_id,
      warehouse_id: this.itemDetails.warehouseId,
      status : 3,
      items : []
    }
    if (this.dataChild.records.length > 0) {
      this.dataChild.records.forEach((element, i) => {
        if (element.checked) {
          putObj.order_cart_id.push(element.id)
        }
      })
    }
    putObj['items'] = putObj.order_cart_id
    if (putObj.order_cart_id.length > 0 && this.printInvoice.executive_id) {
    //m this.loaderService.show('show');
      this.commonService.postDataNew('order/parent', putObj).subscribe(res => {
        if (res.success) {
          setTimeout(() => {
          //m this.loaderService.show('hide');
            this.sharedService.displaySuccessMessage('Selected order assinged.')
            if(res && res.data && res.data.invoice){
            const link = document.createElement('a');
            link.setAttribute('href', res.data.invoice);
            link.setAttribute('download', '');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            }
            this.dialogRef.close(true);
          }, 1000); 
        }
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('');
      });
    } else {
      this.sharedService.displayErrorMessage('Please select atleast one order to assign');
    }
  }
  removeBarcode(item, index) {
    // console.log(item, index, bIndex)
  }
  updateCheckAssign(event, index) {
    this.dataChild.records[index].checked = event.checked;
    this.checkIfAllSelected();
  }
  selectAllAssign(event) {
    // console.log(event);
    this.selectCheck = event.checked;
    for (let i = 0; i < this.dataChild.records.length; i++) {
      if (!this.dataChild.records[i].isPresent)
        this.dataChild.records[i].checked = this.selectCheck;
    }
  }
  scanItem() {
    this.isScan = true;
    // const dialogRef = this.dialog.open(PackageRequestPopUpComponent, {
    //   data: {
    //     message: 'orderScan',
    //     quantity: 1,
    //     type: 'scanIndividually',
    //     warehouseId: this.printInvoice.warehouse_id,
    //     // productDetailId: this.assaignProductId,
    //   },
    //   panelClass: 'request-stock'
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.printInvoice.item_barcode = result;
    //     if (1 === this.printInvoice.item_barcode.length) {
    //       this.sharedService.displaySuccessMessage('Scan Completed');
    //     } else {
    //       this.printInvoice.item_barcode = [];
    //     }
    //   }
    // });
  }
  closeDialogScan() {
    this.isScan = false;
  }
  itemOrderScanBarcode(event) {
    if (event.key === 'Enter') {
      if (this.data.type === 'scanIndividually') {
        const data = {
          warehouse_id: this.data.warehouseId,
          product_detail_id: this.data.productDetailId,
          item_barcodes: [event.target.value]
        };
        this.commonService.putData(`admin/demoOrder/scan`, data).subscribe(res => {
          if (res.payload) {
            console.log(res.payload);
            // this.orderScanDetailsSet(event);
          }
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
      } else {
        // this.orderScanDetailsSet(event);
      }
    }
  }
  displayScanMessage(message, event) {
    event.stopPropagation();
    this.sharedService.displaySuccessMessage(message);
  }
  finishOrderScan() {
    this.dialogRef.close(this.orderScan);
  }
  orderScanDetailsSet(event): void {
    this.orderScan.push(event.target.value);
    // this.activeFinish = true;
    // this.orderScan = this.orderScan.filter((item, index) => {
    //   return this.orderScan.indexOf(item) === index;
    // });
    this.scannedCount = this.orderScan.length;
    // event.target.value = '';
  }
  onGoingInvoice() {
    const link = document.createElement('a');
    link.setAttribute('href', this.itemDetails.invoice);
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.dialogRef.close(true);
  }
}

