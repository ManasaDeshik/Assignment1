import { Component, OnInit } from '@angular/core';
import { SharedService, CommonService, LoaderService, StockService } from 'src/app/utils/services';
import { ProductDetail, BranchWarehouse, ManfacturerData } from 'src/app/utils/models/stock';
import { BranchDetails, TableViewRequestSet } from 'src/app/utils/models/user';


@Component({
  selector: 'app-stock-product-info',
  templateUrl: './stock-product-info.component.html',
  styleUrls: ['./stock-product-info.component.scss']
})
export class StockProductInfoComponent implements OnInit {
  public isProductDetailPath = false;
  public routeSegmentId: string;
  public productDetailId: string;
  public manufacurerDetails: ManfacturerData = new ManfacturerData('');
  public productDetails: ProductDetail = new ProductDetail('');
  public branchWarehouse: BranchWarehouse = new BranchWarehouse('');
  public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
  public manufacturerData: BranchDetails = new BranchDetails();

  constructor(private sharedService: SharedService,
    private commonService: CommonService,
    private loaderService: LoaderService,
    private stockService: StockService) { }

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
    if (urlSegmentKeys[1].path === 'product-details') {
      this.isProductDetailPath = true;
      this.productDetailId = urlSegmentKeys[urlSegmentKeys.length - 1].path;
    } else if (urlSegmentKeys[1].path === 'create-purchase-order') {
      this.routeSegmentId = urlSegmentKeys[urlSegmentKeys.length - 1].path;
      this.productDetailId = urlSegmentKeys[urlSegmentKeys.length - 2].path;
      this.getWarehouseBranchDetail();
    } else if (urlSegmentKeys[1].path === 'create-transfer-order') {
      this.isProductDetailPath = true;
      this.routeSegmentId = urlSegmentKeys[urlSegmentKeys.length - 1].path;
      this.productDetailId = urlSegmentKeys[urlSegmentKeys.length - 2].path;
    }
    this.getProductDetail();
  }

  /**
 * @method: getProductDetail()
 * @description: to fetch the product detial from prduct details and need id while posting
 * @author: karan
 */
  getProductDetail() {
   // this.loaderService.show('');
    this.commonService.getDataNew('product/getsingleproductdetail/' + this.productDetailId).subscribe(res => {
      let payload = res['payload']['records'][0]
      console.log("Payload",payload)
      this.productDetails = new ProductDetail(payload);
    //m this.loaderService.show('hide');
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }

  /**
   * @method getWarehouseBranchDetail()
   * @description: we will fetch the warehouse id from the url and store in routeSegmentId
   * @author karan
   */
  getWarehouseBranchDetail() {
  //  this.loaderService.show('');
    this.commonService.getDataNew('users/getWarehouseDetails/' + this.routeSegmentId).subscribe(res => {
      this.branchWarehouse = new BranchWarehouse(res.payload);
    //m this.loaderService.show('hide');
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }

  /**
   * @method searchFieldKey()
   * @description: to get branch details collections from the searched text
   * @param event: contains selected  text
   * @param type: contains type of dropdown (village , state , district , name)
   * @author amitha.shetty
   */
  searchFieldKey(event: any) {
    if (event.term) {
      this.manufacturerData.branch.searchRequest = event.term;
      this.getManufacturer();
    }
  }

  /**
   * @method selectedFieldKey()
   * @param event : object that contains data of selected option in dropdown and subscri
   * @author karan
   */
  selectedFieldKey(event: any) {
    this.manufacurerDetails = new ManfacturerData(event)
    this.stockService.setManufacturerId(this.manufacurerDetails.id);
  }

  /**
   * @method getManufacturer()
   * @description: search manufacturer and store it in manufacturerData
   * @author karan
   */
  getManufacturer() {
    const requestSet = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
      this.tableViewRequestData.pageNumber + '&search_text=' + this.manufacturerData.branch.searchRequest;
    this.commonService.getDataNew('stock/manufacturer' + requestSet).subscribe(res => {
      this.manufacturerData.branch.collections = res.payload.records;
      console.log('118',this.manufacturerData.branch.collections);
    }, err => {
      this.sharedService.displayErrorMessage('');
    })
  }
}
