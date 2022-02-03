import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PackageRequestPopUpComponent } from 'src/app/utils/components/package-request-pop-up/package-request-pop-up.component';

import {
  CommonService, BranchDetails, SharedService, CatgeoryRequest, CatgeoryTableViewRequestSet, filterstockOrder,
  UserInfo, StocksTableViewRequestSet, ProductsStocks, ProductStocksInOutRequest, LoaderService, ProductStockInOutTable, StockService, RolePermissionVal, moduleNameKeys, SideNavService
} from 'src/app/utils';
import { SessionStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-list-stocks',
  templateUrl: './list-stocks.component.html',
  styleUrls: ['./list-stocks.component.scss']
})
export class ListStocksComponent implements OnInit {
  public tableHeaders = [
    { header: 'Item Name' },
    { header: 'Price' },
    { header: 'In Stock' },
    { header: 'View' }];
  public total: any;
  public selectedList = 'allitems';
  public viewType = 'grid';
  public categoryList = [];
  public currentWarehouse: string;
  public warehouseId = '';
  public productDetailId = '';
  public filterPurchaseOrder = filterstockOrder;
  public alItems: ProductStockInOutTable = new ProductStockInOutTable();
  public branchWarehouseData: BranchDetails = new BranchDetails();
  public tableViewRequestData: StocksTableViewRequestSet = new StocksTableViewRequestSet();
  public categoryRequestData: CatgeoryTableViewRequestSet = new CatgeoryTableViewRequestSet();
  public sortField: ProductsStocks = new ProductsStocks();
  public allowedStockWarehouse = [];
  public permissionSetsModule = {
    Stock: new RolePermissionVal(),
    franchise: new RolePermissionVal(),
    transportation: new RolePermissionVal(),
    manufacturer: new RolePermissionVal(),
    purchaseorder: new RolePermissionVal()
  };
  public currentWarehouseId: string;
  public permissionSets: RolePermissionVal = new RolePermissionVal();
  public moduleKeys = [
    moduleNameKeys.franchise, moduleNameKeys.manufacturer,
    moduleNameKeys.transportation, moduleNameKeys.purchaseOrder,moduleNameKeys.stocks];
  @SessionStorage('userName') public userData: UserInfo;
  @SessionStorage('moduleDetails') public moduleDetails;
  @SessionStorage('allowedWarehouse') public allowedWarehouse: any;
  @SessionStorage('registeredWarehouse') public registeredWarehouse: any;
  total_stocks;
  total_demo;
  sold_quantity;
  constructor(private router: Router,
    private dialog: MatDialog,
    private commonService: CommonService,
    private sharedService: SharedService,
    private loaderService: LoaderService,
    public shareStockService: StockService,
    public sidenavService: SideNavService) { }

  ngOnInit() {
    this.getCategories();
    this.getCurrentWarehouse();
    this.modulePermissionSets();
    this.getStockCount();
  }

  /**
   * @method getCategories()
   * @description: fetch all categories
   * @author karan
   */
  getCategories() {
    const data = new CatgeoryRequest(this.categoryRequestData);
    this.commonService.getDataNew('product/category?lang=en').subscribe(res => {
      this.categoryList = res.payload.records;
      this.categoryList.push({
        name: 'All',
        _id: ''
      });
    });
  }
  /**
   * @method getStockCount()
   * @description: get count stocks
   * @author Arul
   */
  getStockCount() {
    let req = this.warehouseId || '';
    let productId = this.productDetailId
    this.commonService.getDataNew('stock/productDetail/stocks/count?warehouse_id=' + req).subscribe(res => {
      if (res) {
        // console.log(res)
        this.total_stocks = res.payload.total_stocks;
        this.total_demo = res.payload.total_demo;
        this.sold_quantity = res.payload.sold_quantity;
      }
    });
  }



  /**
   * @method getCurrentWarehouse()
   * @description - fetch current warehouse and bind
   * @author - karan
   */
  getCurrentWarehouse() {
      this.currentWarehouse = 'All';
      this.userData.warehouse_id = '';
      this.warehouseId = '';
      this.sortField.warehouse_id = '';
      this.getCurrentWarehouseStocks();
  }
  getStockList(): void {
    const requestSet = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
      this.tableViewRequestData.pageNumber + '&_id=' + this.currentWarehouseId;
    this.commonService.getDataNew('users/warehouse' + requestSet).subscribe(res => {
      this.currentWarehouse = res.payload.name;
      this.userData.warehouse_id = res.payload.id;
      this.warehouseId = res.payload.id;
      if (this.selectedList === 'allitems') {
        this.sortField.filter_by_item_type = 1;
      }
      this.getCurrentWarehouseStocks();
    }, err => {
      this.sharedService.displayErrorMessage('Could not Fetch your Warehouse - Please try again later');
    });
  }
  /**
   * @method  modulePermissionSets()
   * @description - the following modulePermissionSets() method is used set crud operations for module.
   * @uses toCheckAllPermissionRights() - the function toCheckAllPermissionRights returns right permissions for the
   *  module passing module name  as a params.
   * @author amitha.shetty
   */
  modulePermissionSets(): void {
    this.moduleKeys.map(ele => {
      this.permissionSetsModule[ele] = this.sharedService.toCheckAllPermissionRights(ele);
      console.log(this.permissionSetsModule[ele],"ELEMENT",ele)
    });
  }
  /**
   * @method getCurrentWarehouseStocks()
   * @description - items per page are 16 and need to assign warehouseId
   * @author karan
   */
  getCurrentWarehouseStocks() {
    this.tableViewRequestData.recordsPerPage = 12;
    this.sortField.warehouse_id = this.warehouseId;
   //this.sortField.category_id = 
    const data = new ProductStocksInOutRequest(this.tableViewRequestData, this.sortField);
    //m this.loaderService.show('show');
    //console.log(data.requestSet);
    this.commonService.getDataNew('stock/productStockCount'+ data.requestSet).subscribe(res => {
      // console.log(res)
      this.alItems = new ProductStockInOutTable(res.payload);
     // console.log(this.alItems);
      // this.productDetailId = 
    //m this.loaderService.show('hide');
    }, err => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage('');
    });
  }

  /**
   * @method getBranchWarehouseList()
   * @description - only superAdmin have access to see other warehouse stocks
   * @author karan
   */
  getBranchWarehouseList() {
    const requestSet = '?search_text=' + this.branchWarehouseData.branch.searchRequest;
    this.commonService.getDataNew('users/warehouse' + requestSet).subscribe(res => {
      this.branchWarehouseData.branch.collections = res.payload.records;
      this.allowedStockWarehouse = res.payload.records;
      this.allowedStockWarehouse.push({
        name: 'All',
        _id: ''
      });
    }, (err) => {
       //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }

  /**
   * @method searchStocks()
   * @param event - event of input field
   * @description - fetch the event value and call API
   * @author karan
   */
  searchStocks(event: any) {
    this.sortField.search_text = event.target.value.trim();
    if (event.key === "Enter") {
      this.getCurrentWarehouseStocks();
    }
  }
  searchFilter() {
    this.getCurrentWarehouseStocks();
  }
  resetAll() {
    this.sortField.search_text = '';
    this.currentWarehouse = 'All';
    this.userData.warehouse_id = '';
    this.warehouseId = '';
    this.sortField.warehouse_id = '';
    this.sortField.category_id = '';
    this.sortField.filter_by_item_type = 1;
    this.getCurrentWarehouseStocks();
  }

  // searchVillage(event: any) {
  //   this.sortField.villageName = event.target.value.trim();
  //   this.getCurrentWarehouseStocks();
  // }

  /**
  * @method searchFieldKey()
  * @description: to get branch details collections from the searched text
  * @param event: contains selected  text
  * @param type: contains type of dropdown (village , state , district , name)
  * @author amitha.shetty
  */
  searchFieldKey(event: any) {
    // if (this.moduleDetails.name === 'superadmin') {
      if (event.term) {
        this.branchWarehouseData.branch.searchRequest = event.term;
        this.getBranchWarehouseList();
      }
    // }
  }

  /**
   * @method selectedFieldKey()
   * @param event : selected event object
   * @description store _id to warehouse id and will help for PO
   */
  selectedFieldKey(event: any) {
    if (event) {
      this.warehouseId = event.id;
      this.userData.warehouse_id = event.id;
      this.currentWarehouse = event.name;
      this.sortField.warehouse_id = this.warehouseId;
      if (this.selectedList === 'allitems') {
        this.sortField.filter_by_item_type = 1;
      } else {
        this.sortField.filter_by_item_type = 2;
      }
      this.getCurrentWarehouseStocks();
      this.getStockCount();
    }
  }


  /**
   * @method selectedCategoryKey()
   * @param event : search event for category
   * @description: if event is undefined ie when user clears the category then make it null or else assign and make an API call
   * @author karan
   */
  selectedCategoryKey(event) {
    console.log(event)
    if (event === undefined) {
      this.sortField.category_id = '';
    } else {
      this.sortField.category_id = event.id;
    }
    this.getCurrentWarehouseStocks();
  }

  /**
 * @method  searchCategoryKey()
 * @description - the following searchCategoryKey() method is used search item.
 * @param event - search event when the user search item
 * @author karan
 */
  searchCategoryKey(event) {
    this.categoryRequestData = new CatgeoryTableViewRequestSet();
    this.categoryRequestData.searchItem = event.term;
    this.getCategories();
  }


  /**
   * @method selectedFilterKey()
   * @param event - event od filter dropdown
   * @description : making everything as null at first and then assign the values for filters
   * @author karan
   */
  selectedFilterKey(event) {
    // this.sortField = new ProductsStocks();
    // this.sortField.category_id
    if (this.selectedList === 'allitems') {
      this.sortField.filter_by_item_type = 1;
    } else {
      this.sortField.filter_by_item_type = 2;
    }
    if (event === undefined) {
      this.sortField = new ProductsStocks();
      if (this.selectedList === 'allitems') {
        this.sortField.filter_by_item_type = 1;
      } else {
        this.sortField.filter_by_item_type = 2;
      }
    } else {
      switch (event.name) {
        case 'A-Z':
        case 'Z-A':
          this.sortField = new ProductsStocks();
          // this.sortField.filter_by_item_type = ''
          this.sortField.sort_by_name = event.value;
          break;

        case 'High to Low Price':
        case 'Low to High Price':
          this.sortField = new ProductsStocks();
          this.sortField.sort_by_price = event.value;
          break;

        case 'High to Low Stock':
        case 'Low to High Stock':
          this.sortField = new ProductsStocks();
          this.sortField.sort_by_stock = event.value;
          break;

        case 'Disabled':
          this.sortField = new ProductsStocks();
          this.sortField.disabled = event.value;
          break;
      }
    }
    this.getCurrentWarehouseStocks();
  }


  /**
   * @method changeTab()
   * @param tabName allitems or service items;
   * @author karan
   */
  changeTab(tabName: string, type: number) {
    console.log(tabName);
    this.selectedList = tabName;
    this.sortField.filter_by_item_type = type;
    if (tabName == 'outofstocks') {
      this.tableHeaders = [
        { header: 'Item Name' },
        { header: 'Price' },
        // { header: 'In Stock' },
        // { header: 'View' }
      ]
      // this.filterPurchaseOrder.push(  {
      //   name: 'Disabled',
      //   value: true
      // });
    } else {
      this.tableHeaders = [
        { header: 'Item Name' },
        { header: 'Price' },
        { header: 'In Stock' },
        { header: 'View' }
      ]
      // this.filterPurchaseOrder.splice(6, 1);
    }
    this.getCurrentWarehouseStocks();
  }

  /**
   * @method  getPage()
   * @description - the following getPage() method is used get the selected page for pagination
   * @param event - contains the selected page number
   * @author karan
   */
  getPage(event: number): void {
    if (event > 0 && event <= this.alItems.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getCurrentWarehouseStocks();
    }
  }

  route(routeUrl: string, id?: string) {
    if (id) {
      this.router.navigate([`${routeUrl}/${id}`]);
    } else {
      this.router.navigate([routeUrl]);
    }
  }

  shareStock(routeUrl: string, item: any) {
    console.log(item,this.warehouseId)
    this.router.navigate([`${routeUrl}/${item.product_id}/${this.warehouseId}`]);
    this.shareStockService.changeMessage(item.itemCount);
  }

  /**
   * @method purchaseOrderRoute()
   * @param id : product_details_id
   * @description: if warehouse is not selected then throw an msg or else route
   * @author karan
   */
  purchaseOrderRoute(id: string) {
    if (this.warehouseId === '') {
      this.sharedService.displayErrorMessage('Please Select Warehouse');
    } else {
      this.router.navigate([`stock/create-purchase-order/${id}/${this.warehouseId}`]);
    }

  }

  requestforPO() {
    this.dialog.open(PackageRequestPopUpComponent, {
      data: 'placeOrder',
      panelClass: 'request-stock'
    });
  }

  /**
   * @method gridTable()
   * @param text viewtype (grid or table)
   * @author karan
   */
  gridTable(text: string) {
    this.viewType = text;
  }

  makeActive(route, value) {
    this.router.navigate([route]);
  }
};
