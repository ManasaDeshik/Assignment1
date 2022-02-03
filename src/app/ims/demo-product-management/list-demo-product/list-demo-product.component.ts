import { Component, OnInit } from '@angular/core';
import { CommonService, TableViewRequestSet, DemoListProduct, SharedService, RolePermissionVal, moduleNameKeys, FilterDialogComponent, DemoProductTableViewFilterRequestSet, FetchUserTabDetailsService, DownloadSubscribeParams, UserInfo } from 'src/app/utils';
import { MatDialog } from '@angular/material/dialog';
import { SessionStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-list-demo-product',
  templateUrl: './list-demo-product.component.html',
  styleUrls: ['./list-demo-product.component.scss']
})
export class ListDemoProductComponent implements OnInit {
  public selectedBtnVal = 4;
  public filterDemoRequest = new DemoProductTableViewFilterRequestSet();
  public subscribeData = new DownloadSubscribeParams();
  public filterDemoResponse: any;
  public tableHeaders: any = [
    { header: 'Product Name' },
    { header: 'Assigned by' },
    { header: 'Warehouse' },
    { header: 'Branch' },
    { header: 'Assigned to' },
    { header: 'Mobile No' },
    { header: 'Village' },
    { header: 'Role' },
    { header: 'Quantity' },
    { header: 'Returned Quantity' },
    { header: 'Price' },
    { header: 'Issued Date' },
    { header: 'Received Date' }
  ];
  public demoProductList = new DemoListProduct();
  public demoListStatus = [{
    name: 'Issued',
    val: 4
  }, {
    name: 'Returned',
    val: 5
  }];
  public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
  public permissionSets: RolePermissionVal = new RolePermissionVal();
  public villageName: string = '';
  public requestparam
  @SessionStorage('userName') public userData: UserInfo;
  @SessionStorage('moduledetails') public userModule;
  @SessionStorage('allowedWarehouse') public allowedWarehouse: any;
  constructor(private commonService: CommonService, public dialog: MatDialog, public sharedService: SharedService, public fetchUserTab: FetchUserTabDetailsService) { }

  ngOnInit() {
    this.getDemoProducts();
    this.modulePermissionSets();
  }
  /**
     * @method  modulePermissionSets()
     * @description - the following modulePermissionSets() method is used set crud operations for module.
     * @uses toCheckAllPermissionRights() - the function toCheckAllPermissionRights returns right permissions for the
     *  module passing module name  as a params.
     * @author amitha.shetty
     */
  modulePermissionSets(): void {
    this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.demoProduct);
  }
  makeActive(item): void {
    this.selectedBtnVal = item.val;
    this.tableViewRequestData = new TableViewRequestSet();
    this.subscribeData.demoProduct.status = this.selectedBtnVal;
    this.fetchUserTab.shareServiceData(this.selectedBtnVal);
    this.fetchUserTab.setDemoProductSubscribeStatus(this.subscribeData);
    this.getDemoProducts();
  }
  getDemoProducts(): void {
    this.demoProductList = new DemoListProduct();
    if (this.selectedBtnVal == 4) {
      if (this.userModule.name != 'superadmin') {
        if (this.allowedWarehouse.length > 1) {
          this.userData.warehouse_id = '';
          this.allowedWarehouse.filter(ele => {
            this.userData.warehouse_id = (this.userData.warehouse_id != '') ? (this.userData.warehouse_id + ',' + ele._id) : ele._id
          });
        } else {
          this.userData.warehouse_id;
        }
        // console.log(this.userData)

      } else {
        this.userData.warehouse_id = '';
      }
      // console.log(this.userData.warehouse_id, 'hi')
      const requestSet = '?product_name=' + this.villageName +
      `&demo_product_assigned_fm_user_id=${this.filterDemoRequest.frontierMarketingUser}&product_detail_id=${this.filterDemoRequest.productDetail}&warehouse_id=${(this.filterDemoRequest.warehouse == '') ? this.userData.warehouse_id : this.filterDemoRequest.warehouse}`+ 
      '&records_per_page=' + this.tableViewRequestData.recordsPerPage +'&page_number='+this.tableViewRequestData.pageNumber+  `&status=1`;
      this.commonService.getDataNew(`demoOrder/order` + requestSet ).subscribe(res => {
        if (res.payload) {
          this.demoProductList = new DemoListProduct(res.payload);
        }
      }, 
      );
    }
    if (this.selectedBtnVal == 5) {
      // console.log(this.userData.warehouse_id, 'hi', this.allowedWarehouse)
      if (this.userModule.name != 'superadmin') {
        if (this.allowedWarehouse.length > 1) {
          this.userData.warehouse_id = '';
          this.allowedWarehouse.filter(ele => {
            this.userData.warehouse_id = (this.userData.warehouse_id != '') ? (this.userData.warehouse_id + ',' + ele._id) : ele._id
          });
        } else {
          this.userData.warehouse_id;
        }
        // console.log(this.userData)

      } else {
        this.userData.warehouse_id = '';
      }
      // console.log(this.userData.warehouse_id, 'hi')
      const requestSet = '?product_name=' + this.villageName +
      `&demo_product_assigned_fm_user_id=${this.filterDemoRequest.frontierMarketingUser}&product_detail_id=${this.filterDemoRequest.productDetail}&warehouse_id=${(this.filterDemoRequest.warehouse == '') ? this.userData.warehouse_id : this.filterDemoRequest.warehouse}`+ 
      '&records_per_page=' + this.tableViewRequestData.recordsPerPage +'&page_number='+this.tableViewRequestData.pageNumber+  `&status=2`;
     this.requestparam=requestSet
      this.commonService.getDataNew(`demoOrder/order` + requestSet).subscribe(res => {
        if (res.payload) {
          this.demoProductList = new DemoListProduct(res.payload);
          this.fetchUserTab.setDemoProductSubscribeStatus(this.requestparam);
        }
      },
      );
    }
  }

  searchVillageName(event) {
    if (event.key === "Enter") {
      this.subscribeData.demoProduct.searchProduct = this.villageName;
      this.fetchUserTab.setDemoProductSubscribeStatus(this.subscribeData);
      this.getDemoProducts();
    }
  }
  searchFilter() {
    this.subscribeData.demoProduct.searchProduct = this.villageName;
    this.fetchUserTab.setDemoProductSubscribeStatus(this.subscribeData);
    this.getDemoProducts();
  }
  approveItem(item): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      data: {
        filterName: 'Select Barcode for Demo',
        warehouseId: item.warehouse_id,
        productDetailId: item.order_id,
        quantity: Number(item.quantity - item.returned_quantity),
        barcode: item.barcode
      },
      panelClass: 'filter-pop-up-barcode'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.commonService.postDataNew('demoOrder/return', result).subscribe(response => {
          if (response.success) {
            this.tableViewRequestData = new TableViewRequestSet();
            this.sharedService.displaySuccessMessage(`Demo product ${item.productName} Returned Successfully`);
            this.getDemoProducts();
          }
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
      }
    });
  }
  onSuccessPostBarcode(item): void {
    const requestData = {
      order_barcode: item.barcode
    };
    this.commonService.putDataNew('demoOrder/return', requestData).subscribe(response => {
      if (response.success) {
        this.tableViewRequestData = new TableViewRequestSet();
        this.sharedService.displaySuccessMessage(`Demo product ${item.productName} Returned Successfully`);
        this.getDemoProducts();
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  getPage(event: number): void {
    if (event > 0 && event <= this.demoProductList.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getDemoProducts();
    }
  }
  scanItem(event, item): void {
    if (event.key === 'Enter') {
      if (item.barcode === event.target.value) {
        this.onSuccessPostBarcode(item);
      } else {
        this.sharedService.displaySuccessMessage('Please Scan Correct Invoice');
      }
      event.target.value = '';
      event.stopPropagation();
    }
  }
  displayScanMessage(message: string): void {
    this.sharedService.displaySuccessMessage(message);
  }
  applyFilter() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      data: {
        filterName: 'Apply Demo Product Filter',
        demoResponse: this.filterDemoResponse
      },
      panelClass: 'filter-pop-up'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.responseData) {
        const collections = ['productDetail', 'frontierMarketingUser', 'warehouse'];
        this.filterDemoRequest = new DemoProductTableViewFilterRequestSet();
        this.subscribeData = new DownloadSubscribeParams();
        this.subscribeData.demoProduct.status = this.selectedBtnVal;
        this.filterDemoResponse = result.responseData;
        collections.map(ele => {
          if (this.filterDemoResponse[ele]) {
            this.filterDemoRequest[ele] = this.filterDemoResponse[ele].id;
            this.subscribeData.demoProduct[ele] = this.filterDemoResponse[ele].id;
          }
        });
        this.tableViewRequestData = new TableViewRequestSet();
        this.getDemoProducts();
        this.fetchUserTab.setDemoProductSubscribeStatus(this.subscribeData);
      }
    });
  }
}
