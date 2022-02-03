import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService, SharedService, LoaderService, PurchaseOrder, StockProductDetailsByBranch, ProductDetail, FilterDialogComponent, TableViewRequestSet } from 'src/app/utils';
import { MatDialog } from '@angular/material/dialog';
import { SessionStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-list-product-details',
  templateUrl: './list-product-details.component.html',
  styleUrls: ['./list-product-details.component.scss']
})
export class ListProductDetailsComponent implements OnInit {
  public tableHeaders: any = [
    { header: 'Warehouse' },
    { header: 'Branch' },
    { header: 'District' },
    { header: 'State' },
    { header: 'Quantity' },
    { header: 'View Barcode' }
  ];
  public productList: StockProductDetailsByBranch = new StockProductDetailsByBranch([])
  public productDetails: ProductDetail = new ProductDetail('');
  public purchaseOrder: PurchaseOrder = new PurchaseOrder('');
  public selectedSearchText = '';
  public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
  public warehouse = {
    name: '',
    id: '',
    items: []
  };
  public warehouse_id = '';

  @SessionStorage('allowedWarehouse') public allowedWarehouse:any;
  @SessionStorage('moduleDetails') public moduleDetails;
  constructor(private commonService: CommonService,
    private sharedService: SharedService,
    private loaderService: LoaderService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getRouteSegments();
  }


  /**
* @method getRouteSegments()
* @description: productDetailId contains productdetails_id and routeSegmentId contains branchWarehouseId
* @author karan
*/
  getRouteSegments(): void {
    const urlSegmentKeys = this.sharedService.urlSegmentKeys();
    this.purchaseOrder.product_detail_id = urlSegmentKeys[urlSegmentKeys.length - 1].path;
    this.getDetails();
    this.getProductDetail();
  }


  /**
 * @method: getProductDetail()
 * @description: to fetch the product detial from prduct details and need id while posting
 * @author: karan
 */
  getProductDetail() {
  
  //  this.loaderService.show('');
    this.commonService.getDataNew('product/getsingleproductdetail/' + this.purchaseOrder.product_detail_id).subscribe(res => {
      let payload = res['payload']['records'][0]
      this.productDetails = new ProductDetail(payload);
      // console.log("PRODCUT DETA",this.productDetails)
    //m this.loaderService.show('hide');
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }


  getDetails() {
   //m this.loaderService.show('show');
    this.productList = new StockProductDetailsByBranch([])
    this.commonService.getDataNew('stock/WarehouseStockCount?product_detail_id=' + this.purchaseOrder.product_detail_id
      + '&search_text=' + this.selectedSearchText + '&records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
      this.tableViewRequestData.pageNumber + '&warehouse_id=' + this.warehouse_id).subscribe(res => {
        if (res.payload) {
          this.productList = new StockProductDetailsByBranch(res.payload);
          // console.log(this.productList)
        //m this.loaderService.show('hide');
        }
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('');
      });
  }
  displayBarcodeDialog(item): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      data: {
        filterName: 'View Barcode',
        warehouse: {
          name: item.name,
          id: item.warehouseId
        },
        product: {
          name: this.productDetails.title,
          id: this.productDetails.id
        }
      },
      panelClass: 'view-pop-up-barcode'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDetails();
      }
      else{
        this.getDetails();
      }
    });
  }
  searchProductDetails(event) {
    if (event.key === "Enter") {
      this.getDetails();
    }
  }
  getPage(event: number): void {
    if (event > 0 && event <= this.productList.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getDetails();
    }
  }
  selectedWarehouseData(event) {
    if (event) {
      // console.log(event)
      this.warehouse_id = event.id;
      this.getDetails();
    } else {
      this.warehouse_id = '';
      this.getDetails();
      // this.orderList = new OrderList();
    }
  }
  searchWarehouseList(event) {
    if (event.term) {
      const requestSet = '?search_text=' + event.term;
      this.commonService.getDataNew('users/warehouse' + requestSet).subscribe(res => {
        this.allowedWarehouse = res.payload.records;
        this.allowedWarehouse.push({
          name: 'All',
          _id: ''
        });
      }, (err) => {
        //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage(err.statusText);
      });
    } else {
      // this.orderList = new OrderList();
    }
  }
}
