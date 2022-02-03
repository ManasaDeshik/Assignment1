import { Component, OnInit } from '@angular/core';
import { WarehouseManufacturerFranchise, branchWarehouseManufacturerFranchise, TableViewRequestSet, WarehouseManufacturerFranchiseList, DownloadSubscribeParams, moduleNameKeys } from 'src/app/utils';
import { SharedService, CommonService, LoaderService, FetchUserTabDetailsService } from 'src/app/utils/services';
import { Router, UrlSegment } from '@angular/router';
import { RolePermissionVal } from 'src/app/utils/models';

@Component({
  selector: 'app-list-warehouse-manufacturer-franchise',
  templateUrl: './list-warehouse-manufacturer-franchise.component.html',
  styleUrls: ['./list-warehouse-manufacturer-franchise.component.scss']
})
export class ListWarehouseManufacturerFranchiseComponent implements OnInit {
  public tableTypeData: WarehouseManufacturerFranchise = new WarehouseManufacturerFranchise();
  public tableList: WarehouseManufacturerFranchiseList = new WarehouseManufacturerFranchiseList();
  public subscribeData = new DownloadSubscribeParams();
  public urlSegmentKeys: UrlSegment[] = [];
  public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
  public permissionSets: RolePermissionVal = new RolePermissionVal();
  searchText: '';
  constructor(private commonService: CommonService,
    private sharedService: SharedService,
    private setDownload: FetchUserTabDetailsService,
    private loaderService: LoaderService,
    private router: Router) { }

  ngOnInit() {
    this.setTableInfoDetails();
  }

  /**
   * @method setTableInfoDetails()
   * @description: fetch url from the route and decide which module/component is
   * @author karan
   */
  setTableInfoDetails(): void {
    this.urlSegmentKeys = this.sharedService.urlSegmentKeys();
    this.tableTypeData = new WarehouseManufacturerFranchise(branchWarehouseManufacturerFranchise[this.urlSegmentKeys[this.urlSegmentKeys.length - 2].path]);
    this.modulePermissionSets();
    this.getData();
  }
  /**
   * @method  modulePermissionSets()
   * @description - the following modulePermissionSets() method is used set crud operations for module.
   * @uses toCheckAllPermissionRights() - the function toCheckAllPermissionRights returns right permissions for the
   *  module passing module name  as a params.
   * @author amitha.shetty
   */
  modulePermissionSets(): void {
    this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys[this.tableTypeData.moduleName]);
  }
  /**
 * @method getData()
 * @description: data to be requested and store in manufacturerlist
 * @author karan
 */
  getData() {
    //m this.loaderService.show('show');
    const request = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
      this.tableViewRequestData.pageNumber + '&search_text=' + (this.tableViewRequestData.searchText ? this.tableViewRequestData.searchText : '');
    this.commonService.getDataNew(this.tableTypeData.apiEndPoint + request).subscribe(res => {
      this.tableList = new WarehouseManufacturerFranchiseList(res.payload);
    //m this.loaderService.show('hide');
    }, err => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }


  /**
   * @method  getPage()
   * @description - the following getPage() method is used get the selected page for pagination
   * @param event - contains the selected page number
   * @author karan
   */
  getPage(event: number): void {
    if (event > 0 && event <= this.tableList.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getData();
    }
  }


  /**
   * @method setSearchText()
   * @param event : search text in search  input
   * @author karan
   */
  setSearchText(event: any, isSearch) {
    this.tableViewRequestData = new TableViewRequestSet();
    this.tableViewRequestData.searchText = this.searchText;
    if (this.tableTypeData.pageTitle === 'Manufacturer') {
      if ((event.key === "Enter") || isSearch) {
        this.subscribeData.manufacture.searchText = this.searchText;
        this.setDownload.setManufactureSubscribeStatus(this.subscribeData);
        this.getData();
      }
    } else if (this.tableTypeData.pageTitle === 'Warehouse') {
      if ((event.key === "Enter") || isSearch) {
        this.subscribeData.warehouse.searchText = this.searchText;
        this.setDownload.setWarehouseSubscribeStatus(this.subscribeData);
        this.getData();
      }
    } else {
      if ((event.key === "Enter") || isSearch) {
        this.subscribeData.franchise.searchText = this.searchText;
        this.setDownload.setFranchiseSubscribeStatus(this.subscribeData);
        this.getData();
      }
    }
  }

  route() {
    this.router.navigate([this.tableTypeData.createLink]);
  }

  editWarehouseManufacturerFranchise(id: string) {
    console.log(id)
    this.router.navigate([this.tableTypeData.editLink + id]);
  }
}
