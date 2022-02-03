import { Component, OnInit } from '@angular/core';
import { SharedService, CommonService, ComboProductList, ComboItemScan } from 'src/app/utils';
import { PackageRequestPopUpComponent } from 'src/app/utils/components/package-request-pop-up/package-request-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as printJS from 'print-js';

@Component({
  selector: 'app-combo-scan-package',
  templateUrl: './combo-scan-package.component.html',
  styleUrls: ['./combo-scan-package.component.scss']
})
export class ComboScanPackageComponent implements OnInit {
  public comboProductList = new ComboProductList();
  public executiveId: string;
  public activeFinalizeBtn = false;
  public comboItemScan = new ComboItemScan();
  constructor(private sharedService: SharedService, private commonService: CommonService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.getURLSegmentKeys();
  }
  getURLSegmentKeys(): void {
    const urlSegment = this.sharedService.urlSegmentKeys();
    this.comboItemScan.order_id = urlSegment[urlSegment.length - 1].path;
    this.comboItemScan.warehouse_id = urlSegment[urlSegment.length - 2].path;
    this.executiveId = urlSegment[urlSegment.length - 3].path;
    this.getComboProductDetail(this.comboItemScan.order_id);
  }
  getComboProductDetail(orderId): void {
    this.commonService.getData(`admin/order/product/count/${orderId}`).subscribe(res => {
      this.comboProductList = new ComboProductList(res.payload);
      this.isProductScanCompleted(this.comboProductList);
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  changeSelectedCombo(individualProductData): void {
    if (this.comboProductList.quantity !== individualProductData.count) {
      this.comboItemScan.product_detail_id = individualProductData.product_detail_id;
      const dialogRef = this.dialog.open(PackageRequestPopUpComponent, {
        data: {
          message: 'comboScan',
          particularProductDetail: individualProductData,
          itemScan: this.comboItemScan,
          productList: this.comboProductList
        },
        panelClass: 'request-stock'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.comboProductList = result;
          this.isProductScanCompleted(this.comboProductList);
        }
      });
    } else {
      this.sharedService.displaySuccessMessage(`Items Scanned Already`);
    }
  }
  comboNewArray() {
    const newArray = [];
    this.comboProductList.product_details.map(ele => {
      ele.scannedItems.map(scanList => {
        newArray.push(scanList);
      });
    });
    return newArray;
  }
  finalize(): void {
    if (this.activeFinalizeBtn) {
      const obj = {
        order_id: this.comboItemScan.order_id,
        status: 1,
        warehouse_id: this.comboItemScan.warehouse_id,
        executive_id: this.executiveId,
        type: 1
      };
      this.commonService.putData(`admin/order`, obj).subscribe(res => {
        if (res) {
          const itemObj = {
            order_id: this.comboItemScan.order_id,
            item_barcode: this.comboNewArray(),
            warehouse_id: this.comboItemScan.warehouse_id,
            executive_id: this.executiveId,
            type: 1
          };
          this.commonService.putData(`admin/order/item`, itemObj).subscribe(res => {
            if (res) {
              this.sharedService.displaySuccessMessage('Finalize the scanned items');
              printJS({ printable: res.payload.invoice, type: 'pdf' });
              const link = document.createElement('a');
              link.setAttribute('href', res.payload.invoice);
              link.setAttribute('download', '');
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              this.router.navigate(['orders']);
            }
          }, err => {
            this.sharedService.displayErrorMessage(err.statusText);
          });
        }
      }, err => {
        this.sharedService.displayErrorMessage(err.statusText);
      });
    } else {
      this.sharedService.displaySuccessMessage(`Please Scan All Products`);
    }
  }
  isProductScanCompleted(comboProduct): void {
    if (comboProduct.product_details && comboProduct.product_details.length > 0) {
      const data = this.comboProductList.product_details.find(ele => ele.count !== this.comboProductList.quantity);
      if (data) {
        this.activeFinalizeBtn = false;
      } else {
        this.activeFinalizeBtn = true;
      }
    }
  }
}
