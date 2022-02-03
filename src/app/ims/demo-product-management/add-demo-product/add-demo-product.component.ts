import { Component, OnInit } from '@angular/core';
import { CommonService, DemoProductPostOrder, SharedService, FilterDialogComponent, UserInfo, LoaderService } from 'src/app/utils';
import { MatDialog } from '@angular/material/dialog';
import { SessionStorage } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { PackageRequestPopUpComponent } from 'src/app/utils/components/package-request-pop-up/package-request-pop-up.component';
import { ConfirmationDialogComponent } from 'src/app/utils/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-demo-product',
  templateUrl: './add-demo-product.component.html',
  styleUrls: ['./add-demo-product.component.scss']
})
export class AddDemoProductComponent implements OnInit {
  public typeCollections = {
    warehouse: {
      collections: [],
      selectedField: '',
      keyName: '',
      bindLabel: undefined
    },
    productDetail: {
      collections: [],
      selectedField: '',
      keyName: '',
      bindLabel: undefined
    },
    frontierMarketingUser: {
      collections: [],
      selectedField: '',
      keyName: '',
      bindLabel: undefined
    }
  };
  public demoProductOrder: DemoProductPostOrder = new DemoProductPostOrder();
  public isPrintInvoice = false;
  public isScanPrintVoice = false;
  warehouseID = '';
  @SessionStorage('userName') public userData: UserInfo;
  @SessionStorage('moduleDetails') public moduleDetails;
  @SessionStorage('allowedWarehouse') public allowedWarehouse: any;
  constructor(private commonService: CommonService, private sharedService: SharedService, private loaderService: LoaderService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    if (this.moduleDetails.name !== 'superadmin') {
      const warehouse = this.allowedWarehouse.filter(ele => {
        return ele.name !== 'All';
      });
      this.typeCollections['warehouse'].collections = warehouse.reduce((unique, o) => {
        if (!unique.some(obj => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      }, []);
    }
  }
  createProduct(): void {
    //this.commonService.getData(`/demoOrder/item/count?warehouse_id=${this.typeCollections.warehouse.selectedField}&product_detail_id=${this.typeCollections.productDetail.selectedField}`).subscribe(res => {
      const obj = {
        warehouse_id: this.typeCollections.warehouse.selectedField,
        product_detail_id: this.typeCollections.productDetail.selectedField
      };
    this.commonService.postDataNew(`demoOrder/count`,obj).subscribe(res => {
      if (res && this.demoProductOrder.quantity <= res.data.count && this.demoProductOrder.quantity !== 0) {
        this.isScanPrintVoice = true;
      } else {
        this.sharedService.displayErrorMessage('Stocks are not available');
        this.isScanPrintVoice = false;
      }
    }, err => {
      this.sharedService.displayErrorMessage('Stocks are not available');
      this.isScanPrintVoice = false;
    });

  }
  searchFieldKey(event, type): void {
    console.log(event, type)
    if(type=='warehouse')
    {
      this.typeCollections.warehouse.selectedField=''
    }
    if (type === 'frontierMarketingUser' && this.typeCollections.warehouse.selectedField) {
      console.log("inside fm user")
   // this.commonService.getDataNew(`users?search_text=${event.term}&warehouse_id=${this.typeCollections.warehouse.selectedField}`).subscribe(res => {
        this.commonService.getDataNew(`demoOrder/users?warehouse_id=${this.typeCollections.warehouse.selectedField}&search_text=${event.term}`).subscribe(res => {
        if (res.payload && res.payload.records.length > 0) {
          this.typeCollections[type].collections = res.payload.records;
        }
      }, (err) => {
        //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage(err.statusText);
      });
    } /*else if (type === 'warehouse' && this.moduleDetails.name !== 'superadmin') {
      console.log("inside else")
      // console.log(this.allowedWarehouse)
      // const warehouse = this.allowedWarehouse.filter(ele => {
      //   return ele.name !== 'All';
      // });
      // console.log(this.typeCollections,)
      // this.typeCollections[type].collections = warehouse.reduce((unique, o) => {
      //   if (!unique.some(obj => obj._id === o._id)) {
      //     unique.push(o);
      //   }
      //   return unique;
      // }, []);
    }*/ 
    else {
      this.commonService.getDataNew(`users/${type}?search_text=${event.term}&warehouse_id=${this.typeCollections.warehouse.selectedField}`).subscribe(res => {
        if (res.payload && res.payload.records.length > 0) {
          this.typeCollections[type].collections = res.payload.records;
        }
      }, (err) => {
        //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage(err.statusText);
      });
    }
    if (this.moduleDetails.name !== 'superadmin') {
      this.typeCollections.warehouse.collections.forEach((elemnt, index) => {
        if (this.userData.warehouse_id != elemnt.id) {
          this.typeCollections.warehouse.collections.splice(index, 1);
        }
      })
    }
  }
  selectedFieldKey(event, type, keyName): void {
    if (type === 'warehouse') {
      this.typeCollections.frontierMarketingUser.selectedField = '';
      this.typeCollections.frontierMarketingUser.collections = [];
      this.typeCollections.frontierMarketingUser.keyName = '';
      this.typeCollections.frontierMarketingUser.bindLabel = undefined;
      this.typeCollections.productDetail.collections = null;
      this.typeCollections.productDetail.bindLabel = null;
      this.demoProductOrder.quantity = null;
    }
    if (type == 'productDetail') {
      if (event) {
        this.typeCollections[type].selectedField = event.id
      } else {
        // console.log(type, event, this.typeCollections[type].keyName);
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          data: {
            filterName: 'Select product',
            productDetails: event.product_details
          },
          width: '400px',
          height: "300px",
          panelClass: 'confirmation-dialog'
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(result)
          if (result ? result.status : false) {
            // console.log(result);
            this.typeCollections[type].selectedField = result.data.id
          } else {
            console.log('log')
            this.typeCollections.productDetail.bindLabel = ''
            this.typeCollections.productDetail.collections = [];
            return;
          }
        });
        return;
      }
    } else {
      this.typeCollections[type].selectedField = event.id;
    }
    if (type == 'warehouse') {
      this.warehouseID = event.id;
    }

    this.typeCollections[type].keyName = event[keyName];
  }
  orderPlaceWithoutScan() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      data: {
        filterName: 'Select Barcode',
        warehouseId: this.typeCollections.warehouse.selectedField,
        productDetailId: this.typeCollections.productDetail.selectedField,
        quantity: this.demoProductOrder.quantity
      },
      panelClass: 'filter-pop-up-barcode'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.demoProductOrder.item_barcodes = result.responseData;
        this.printInvoice();
      }
    });
  }
  scanItem() {
    const dialogRef = this.dialog.open(PackageRequestPopUpComponent, {
      data: {
        message: 'orderScan',
        quantity: this.demoProductOrder.quantity,
        type: 'scanIndividually',
        warehouseId: this.typeCollections.warehouse.selectedField,
        productDetailId: this.typeCollections.productDetail.selectedField,
      },
      panelClass: 'request-stock'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.demoProductOrder.quantity === result.length) {
          this.isPrintInvoice = true;
          this.demoProductOrder.item_barcodes = result;
          this.sharedService.displaySuccessMessage('Scan Completed and take print out');
        } else {
          this.sharedService.displaySuccessMessage('Please Scan complete barcode');
        }
      }
    });
  }
  printInvoice() {
    this.demoProductOrder.product_detail_id = this.typeCollections.productDetail.selectedField,
      this.demoProductOrder.warehouse_id = this.typeCollections.warehouse.selectedField,
      this.demoProductOrder.demo_product_assigned_fm_user_id = this.typeCollections.frontierMarketingUser.selectedField;
      let quantity = this.demoProductOrder.quantity;
      let barCode = this.demoProductOrder.item_barcodes;
      const obj = {
        warehouse_id: this.typeCollections.warehouse.selectedField,
        product_detail_id: this.typeCollections.productDetail.selectedField,
        quantity: quantity,
        demo_product_assigned_fm_user_id: this.demoProductOrder.demo_product_assigned_fm_user_id,
        item_barcodes:barCode
      };
     // this.demoProductOrder.fm_user_id = this.userData.userId, this.demoProductOrder.quantity, this.demoProductOrder.item_barcodes
      this.commonService.postDataNew(`demoOrder/order`, obj).subscribe(res => {
        if (res.data) {
          this.sharedService.displaySuccessMessage('Issue Demo Product Created Successfully');
          const link = document.createElement('a');
          link.setAttribute('href', res.data.invoice);
         link.setAttribute('download', '');
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         this.router.navigate(['demo-management/list-demo-products']);
        }
      }, (err) => {
        //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage(err.statusText);
      });
  }
  closeScanPrintVoice(): void {
    this.isScanPrintVoice = false;
  }
  searchFieldKeyProduct(event, type): void {
    if (type === 'warehouse' && this.moduleDetails.name !== 'superadmin') {
      const warehouse = this.allowedWarehouse.filter(ele => {
        return ele.name !== 'All';
      });
      this.typeCollections[type].collections = warehouse.reduce((unique, o) => {
        if (!unique.some(obj => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      }, []);
    } else {
      //this.commonService.getDataNew(`admin/${'product'}?search_text=${event.term}&warehouse_id=${this.warehouseID}`).subscribe(res => {
         //this.commonService.getDataNew(`product/getWarehouseProduct?records_per_page=400&page_number=1&search_text=${event.term}&category=&sort_by_alphabet=&warehouse_id=${this.warehouseID}&lang=en`).subscribe(res => {
        //this.commonService.getDataNew(`product/productDetails?search_text=${event.term}`).subscribe(res => {
          this.commonService.getDataNew(`demoOrder/productDetails?warehouse_id=${this.warehouseID}&search_text=${event.term}&is_disabled=true`).subscribe(res => {
        if (res.payload && res.payload.records.length > 0) {
          this.typeCollections[type].collections = res.payload.records;
          console.log('260',this.typeCollections[type].collections);
        }
      }, err => {
      });
    }
    if (this.moduleDetails.name !== 'superadmin') {
      this.typeCollections.warehouse.collections.forEach((elemnt, index) => {
        if (this.userData.warehouse_id != elemnt.id) {
          this.typeCollections.warehouse.collections.splice(index, 1);
        }
      })
    }
  }

}
