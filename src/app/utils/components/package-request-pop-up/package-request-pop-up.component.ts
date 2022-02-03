import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ScanBarcode, OESelection, ReceiveCash, TransportProduct, Transport, TransportBarcode } from '../../models/stock';
import { CommonService, LoaderService, SharedService } from '../../services';
import * as printJS from 'print-js';
import { SessionStorage } from 'ngx-webstorage';
import { UserInfo, FilterDialogComponent, ComboProductList, ComboItemScan } from '../..';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-package-request-pop-up',
  templateUrl: './package-request-pop-up.component.html',
  styleUrls: ['./package-request-pop-up.component.scss']
})
export class PackageRequestPopUpComponent implements OnInit {
  public scanItems: ScanBarcode = new ScanBarcode();
  public ongoginScanItems: TransportBarcode = new TransportBarcode('');
  public createTransferOrderDetails: TransportBarcode = new TransportBarcode('');
  public purchaseOrderId: string;
  public quantity: number;
  public scannedCount: number = 0;
  public changeStatus: boolean = false;
  public activeFinish = false;
  public OECollections = [];
  public executiveId = new OESelection('');
  public oeRoleId: string;
  public amount = 0;
  public cashReceived: ReceiveCash = new ReceiveCash('');
  public orderScan = [];
  public comboProductList: ComboProductList = new ComboProductList();
  public comboItemScan = new ComboItemScan();
  public disableReceiveCash = false;
  isScan: boolean = false;
  selectedBarcodeSearchText: any;
  tableHeaders = [
    // { header: 'Invoice No' },
    { header: 'Product' }, { header: 'Quantity' },
    { header: 'value' },
    // { header: 'Expiry Date' }
  ];

  @SessionStorage('userName') public userData: UserInfo;
  @SessionStorage('moduleDetails') public moduleDetails;

  constructor(public dialogRef: MatDialogRef<PackageRequestPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: CommonService,
    private sharedService: SharedService,
    private dialog: MatDialog,
    private loaderService: LoaderService) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {

    this.quantity = this.data.quantity;
    if (this.data.message === 'scan') {
      this.scanItems.warehouse_id = this.data.warehouseId;
      this.scanItems.purchase_order_id = this.data.purhcaseOrderId;
      this.getScannedCount();
    } else if (this.data.message === 'scanOngoing') {
      this.ongoginScanItems.transport_id = this.data.transportId;
      this.getScannedOngoingCount();
    } else if (this.data.message === 'createTransferOrder') {
      this.getTransferOrderScannedCount();
      this.createTransferOrderDetails.transport_id = this.data.createTransferDetails.transport_id;
    } else if (this.data === 'recieveCash') {
      this.getOERoleId();
    } else if (this.data.message === 'comboScan') {
      this.scannedCount = this.data.particularProductDetail.count;
      this.comboItemScan.product_detail_id = this.data.particularProductDetail.product_detail_id;
      this.comboItemScan.order_id = this.data.itemScan.order_id;
      this.comboItemScan.warehouse_id = this.data.itemScan.warehouse_id;
      this.comboProductList = this.data.productList;
      this.isActiveFinish();
    }
  }

  /**
   * @method getScannedCount()
   * @description: fetch how many items has been scanned for purchase order
   * @author karan
   */
  getScannedCount() {
    this.commonService.getData('admin/stock/item/count?purchase_order_id=' + this.scanItems.purchase_order_id).subscribe(res => {
      this.scannedCount = res.payload.count;
      if (this.scannedCount === this.quantity) {
        this.activeFinish = true;
      }
    }, err => {
      this.sharedService.displayErrorMessage('Could not find the scanned items, try again!!!');
    });
  }
  /**
   * @method getScannedOngoingCount()
   * @description: fetch how many items has been scanned for list transfer order
   * @author karan
   */
  getScannedOngoingCount() {
    this.commonService.getData('admin/transport/item/count?status=2&transport_id=' + this.ongoginScanItems.transport_id).subscribe(res => {
      this.scannedCount = res.payload.count;
      if (this.scannedCount === this.quantity) {
        this.activeFinish = true;
      }
    }, err => {
      this.sharedService.displayErrorMessage('Could not find the scanned items, try again!!!');
    });
  }

  /**
   * @method getTransferOrderScannedCount()
   * @description: fetch how many items has been scanned for creating transfer order
   * @author karan
   */
  getTransferOrderScannedCount() {
    this.commonService.getData('admin/transport/item/count?transport_id=' + this.data.createTransferDetails.transport_id +
      '&status=' + 1).subscribe(res => {
        this.scannedCount = res.payload.count;
        if (this.scannedCount === this.quantity) {
          this.activeFinish = true;
        }
      });
  }

  closeDialog(status?: boolean) {
    if (this.data.message === 'comboScan') {
      this.dialogRef.close(this.comboProductList);
    } else {
      this.dialogRef.close(status);
    }
  }
  getOERoleId(): void {
    this.commonService.getDataNew('users/roles?search_text=Territory Manager').subscribe(response => {
      if (response.success) {
        if (response.payload.records.length > 0 && response.payload.records[0].name === 'OperationsExecutive') {
          this.oeRoleId = response.payload.records[0].id;
        }
      }
    }, err => {
      //this.sharedService.displayErrorMessage('Please Create an Operations Executive Role');
    });
  }

  /**
   * @method finish()
   * @description: when the use clicks on finish then checking whether he is scanned all items or not
   * @author karan
   */
  finish() {
    const obj = {
      purchase_order_id: this.scanItems.purchase_order_id,
      status: 3
    };
    if (this.quantity === this.scannedCount) {
      this.commonService.putData('admin/purchaseOrder', obj).subscribe(res => {
        this.dialogRef.close(this.scannedCount);
      }, err => {
        this.sharedService.displayErrorMessage('');
      });
    } else {
      this.dialogRef.close(this.scannedCount);
    }
  }

  /**
   * @method finalize()
   * @author karan
   * @description: if the item are not scanned full, user can click on finalize to compelte the scan packages
   */
  finalize() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: `By clicking Finalize, Order will be completed inspite scanning is in progress.` },
      panelClass: 'confirmation-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const obj = {
          purchase_order_id: this.scanItems.purchase_order_id,
          status: 3
        };
        this.commonService.putData('admin/purchaseOrder', obj).subscribe(res => {
          this.dialogRef.close(this.scannedCount);
        }, err => {
          this.sharedService.displayErrorMessage('');
        });
      }
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
      this.changeStatus = true;
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
      this.scanItems.item_barcode.push(event.target.value);
      this.scanItems.item_barcode.forEach(element => {
        if (element === this.scanItems.package_barcode) {
          checkstatus = false;
        } else {
        }
      });

      if (checkstatus) {
        this.commonService.postData('api/stock/item/scan', this.scanItems).subscribe(res => {
          this.getScannedCount();
          this.activeFinish = true;
          this.scanItems.item_barcode = [];
          this.sharedService.displaySuccessMessage('Scan Complete');
        }, err => {
          if (this.quantity >= 0) {
            this.sharedService.displayErrorMessage(err.statusText);
          } else {
            this.sharedService.displayErrorMessage('');
          }
          if (err.resultCode === 53) {
            this.scanItems.package_barcode = '';
            this.changeStatus = false;
          }
          this.scanItems.item_barcode = [];
        });
      } else {
        this.sharedService.displayErrorMessage('Scan Item please');
        this.scanItems.item_barcode = [];
      }
      event.target.value = '';
    }
  }



  /**
   * @method packageBarcodesCreateTransist()
   * @param event: event of barcode scanner and store in model and clear the input
   * @author karan
   */
  packageBarcodesCreateTransist(event) {
    if (event.key === 'Enter') {
      this.createTransferOrderDetails.package_barcode = '';
      this.createTransferOrderDetails.package_barcode = event.target.value;
      this.sharedService.displaySuccessMessage('Scan Complete');
      this.changeStatus = true;
      event.target.value = '';
    }
  }

  /**
   * @method itemBarcode()
   * @param event : barcode scanner event
   * @description: fetch event for item and call an API. if pakcage barcode is not there then show error message
   * @author karan
   */
  itemBarcodeCreateTransist(event) {
    let checkstatus = true;
    if (event.key === 'Enter') {
      this.createTransferOrderDetails.item_Barcodes.push(event.target.value);
      this.createTransferOrderDetails.item_Barcodes.forEach(element => {
        if (element === this.createTransferOrderDetails.package_barcode) {
          checkstatus = false;
        } else {
        }
      });
      event.target.value = '';
      if (checkstatus) {
        this.commonService.putData('admin/transport/item-scan/source', this.createTransferOrderDetails).subscribe(res => {
          this.getTransferOrderScannedCount();
          this.createTransferOrderDetails.item_Barcodes = [];
          this.sharedService.displaySuccessMessage('Scan Complete');
          this.activeFinish = true;
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
          this.createTransferOrderDetails.item_Barcodes = [];
        });
      } else {
        this.sharedService.displayErrorMessage('Scan Item please');
        this.createTransferOrderDetails.item_Barcodes = [];
      }
    }
  }

  finishCreateTransist() {
    const obj = {
      status: 3,
      transport_id: this.createTransferOrderDetails.transport_id
    };
    this.commonService.putData('admin/transport', obj).subscribe(res => {
      this.sharedService.displaySuccessMessage('Transport created');
      this.dialogRef.close(this.scannedCount);
      printJS({ printable: res.payload.invoice, type: 'pdf' });
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }

  /**
   * @method packageBarcodesTransist()
   * @param event: event of barcode scanner and store in model and clear the input
   * @author karan
   */
  packageBarcodesTransist(event) {
    if (event.key === 'Enter') {
      this.ongoginScanItems.package_barcode = '';
      this.ongoginScanItems.package_barcode = event.target.value;
      this.sharedService.displaySuccessMessage('Scan Complete');
      event.target.value = '';
      this.changeStatus = true;
    }
  }

  /**
   * @method itemBarcode()
   * @param event : barcode scanner event
   * @description: fetch event for item and call an API. if pakcage barcode is not there then show error message
   * @author karan
   */
  itemBarcodeTransist(event) {
    let checkstatus = true;
    if (event.key === 'Enter') {
      this.ongoginScanItems.item_Barcodes.push(event.target.value);
      this.ongoginScanItems.item_Barcodes.forEach(element => {
        if (element === this.ongoginScanItems.package_barcode) {
          checkstatus = false;
        } else {
        }
      });

      if (checkstatus) {
        this.activeFinish = true;
        this.commonService.putData('admin/transport/item-scan/destination', this.ongoginScanItems).subscribe(res => {
          this.getScannedOngoingCount();
          this.ongoginScanItems.item_Barcodes = [];
          this.sharedService.displaySuccessMessage('Scan Complete');
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
          this.ongoginScanItems.item_Barcodes = [];
        });
      }
      event.target.value = '';
    }
  }

  finishTransist() {
    const obj = {
      status: 4,
      transport_id: this.ongoginScanItems.transport_id
    };
    this.commonService.putData('admin/transport', obj).subscribe(res => {
      this.sharedService.displaySuccessMessage('Received Succesfully');
      this.dialogRef.close(this.scannedCount);
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }

  /**
   * @method searchOE()
   * @param event :search event for searching OE
   * @author karan
   */
  searchOE(event: any) {
    let data: any;
    if (this.moduleDetails.name !== 'superadmin') {
      if(this.oeRoleId)
      data = '?records_per_page=10&search_text=' + event.term + '&role=' + this.oeRoleId + '&warehouse_id=' + this.userData.warehouse_id;
      else
      data = '?records_per_page=10&search_text=' + event.term + '&is_oe_enabled=true&warehouse_id=' + this.userData.warehouse_id;
    } else {
      data = '?records_per_page=10&search_text=' + event.term + '&is_oe_enabled=true';
    }
    this.commonService.getDataNew('users' + data).subscribe(res => {
      this.OECollections = res.payload.records;
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }

  /**
   * @method selectedOE()
   * @param event : selected OE in dropdown after search
   * @author karan
   */
  selectedOE(event: any) {
    this.amount = 0;
    this.executiveId = new OESelection(event);
    this.commonService.getDataNew('order/amount?executive_id=' + this.executiveId.executive_id).subscribe(res => {
      this.cashReceived = new ReceiveCash(res.data);
      console.log(this.cashReceived);
      if (this.cashReceived.product_name.length === 0) {
        this.disableReceiveCash = true;
      } else {
        this.disableReceiveCash = false;
        // this.cashReceived.product_name.records.forEach((element, i) => {
        //   this.cashReceived.product_name.records[i]['checked'] = false;
        //     this.retriveBarCode(element.barcode, i)
        // })
      }
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }

  /**
   * @method returnedItems()
   * @param event : scan items when OE comes and gives the item to BOM
   * @author karan
   */
  returnedItems(event: any) {
    if (event.key === 'Enter') {
      const obj = {
        order_barcodes: []
      };
      obj.order_barcodes.push(event.target.value);
      this.commonService.putData('admin/order/return', obj).subscribe(res => {
        this.sharedService.displaySuccessMessage('Scanned Success');
        this.cashReceived.scanBtn = false;
        this.disableReceiveCash = true;
      }, err => {
        this.sharedService.displayErrorMessage(err.statusText);
      });
      event.target.value = '';
    }
  }

  /**
   * @method receieveCashFinal()
   * @description: when OE comes to BOM, BOM clicks on revieve cash popup and search OE and
   * collect cash and click on recieve
   * @author karan
   */
  receieveCashFinal() {
    if (this.disableReceiveCash) {
      this.commonService.putDataNew('order/amount', this.executiveId).subscribe(res => {
        this.sharedService.displaySuccessMessage('Received Cash Successfully');
        this.dialogRef.close();
      }, err => {
        this.sharedService.displayErrorMessage('');
      });
    }
  }

  itemOrderScanBarcode(event) {
    if (this.quantity > this.scannedCount) {
      if (event.key === 'Enter') {
        if (this.data.type === 'scanIndividually') {
          const data = {
            warehouse_id: this.data.warehouseId,
            product_detail_id: this.data.productDetailId,
            item_barcodes: [event.target.value]
          };
          this.commonService.putData(`admin/demoOrder/scan`, data).subscribe(res => {
            if (res.payload) {
              this.orderScanDetailsSet(event);
            }
          }, err => {
            this.sharedService.displayErrorMessage(err.statusText);
          });
        } else {
          this.orderScanDetailsSet(event);
        }
      }
    } else {
      this.sharedService.displayErrorMessage('Quantity is ' + this.quantity);
    }
  }
  orderScanDetailsSet(event): void {
    this.orderScan.push(event.target.value);
    this.activeFinish = true;
    this.orderScan = this.orderScan.filter((item, index) => {
      return this.orderScan.indexOf(item) === index;
    });
    this.scannedCount = this.orderScan.length;
    event.target.value = '';
  }
  finishOrderScan() {
    this.dialogRef.close(this.orderScan);
  }

  displayScanMessage(message, event) {
    event.stopPropagation();
    this.sharedService.displaySuccessMessage(message);
  }
  returnItemWithoutCash() {
    if (!this.disableReceiveCash) {
      const dialogRe = this.dialog.open(FilterDialogComponent, {
        data: {
          filterName: 'Returned Items',
          quantity: this.cashReceived,
          executiveId: this.executiveId.executive_id,
        },
        panelClass: 'filter-pop-up-barcode'
      });
      dialogRe.afterClosed().subscribe(result => {
        if (result) {
          //m this.loaderService.show('show');
          this.commonService.putDataNew('order/return', result).subscribe(res => {
            this.sharedService.displaySuccessMessage('Applied Successfully');
            this.cashReceived.scanBtn = false;
            this.disableReceiveCash = true;
            //m this.loaderService.show('hide');
            this.cashReceived.product_name = [];
            // this.dialogRef.close();
          }, err => {
          //m this.loaderService.show('hide');
            this.sharedService.displayErrorMessage(err.statusText);
          });
        }
      });
    }
  }
  getComboProductDetail(data): void {
    this.commonService.getData(`admin/order/product/count/${data}`).subscribe(res => {
      this.comboProductList = new ComboProductList(res.payload);
      const { count = '' } = this.comboProductList.product_details.find(ele => ele.product_detail_id === this.comboItemScan.product_detail_id);
      if (count) {
        this.scannedCount = count;
      }
      this.isActiveFinish();
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  comboItemOrderScan(event): void {
    if (event.key === 'Enter') {
      if (this.comboProductList.quantity !== this.scannedCount) {
        this.comboItemScan.item_barcode = event.target.value;
        this.commonService.putData('admin/order/scan/comboitem', this.comboItemScan).subscribe(res => {
          if (res) {
            this.sharedService.displaySuccessMessage('Item got scanned');
            this.getComboProductDetail(this.comboItemScan.order_id);
          }
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
      } else {
        this.sharedService.displayErrorMessage('Items Scanned Already');
      }
      event.target.value = '';
    }
  }
  isActiveFinish(): void {
    if (this.comboProductList.quantity === this.scannedCount) {
      this.activeFinish = true;
    }
  }
  finishComboOrderScan(): void {
    this.dialogRef.close(this.comboProductList);
  }
  retriveBarCode(id, index) {
    //m this.loaderService.show('show');
    this.commonService.getData('admin/order/barcode' + '?order_id=' + id).subscribe(response => {
      if (response.success) {
        //m this.loaderService.show('hide');
        this.cashReceived.product_name[index].barcode = [];
        response.payload.forEach((element, i) => {
          if (element.items) {
            this.cashReceived.product_name[index].barcode.push(element.items[0]);
          } else if (element) {
            this.cashReceived.product_name[index].barcode.push(element);
          }
        })
      }
    }, err => {
      //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage('');
    })
  }
}
