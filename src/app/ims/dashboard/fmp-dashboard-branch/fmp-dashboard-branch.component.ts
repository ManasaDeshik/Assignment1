import { Component, OnInit } from '@angular/core';
import { fmpBranchList, SharedService, moduleNameKeys, RolePermissionVal, TableListBranches, TableViewRequestSet, CommonService } from 'src/app/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fmp-dashboard-branch',
  templateUrl: './fmp-dashboard-branch.component.html',
  styleUrls: ['./fmp-dashboard-branch.component.scss']
})
export class FmpDashboardBranchComponent implements OnInit {
  public tableHeaders = fmpBranchList;
  public permissionSets: RolePermissionVal = new RolePermissionVal();
  public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
  public listBranch: TableListBranches = new TableListBranches();
  constructor(private sharedService: SharedService, private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    this.modulePermissionSets();
    this.getBranchDataList();
  }
  /**
   * @method  modulePermissionSets()
   * @description - the following modulePermissionSets() method is used set crud operations for module.
   * @uses toCheckAllPermissionRights() - the function toCheckAllPermissionRights returns right permissions for the
   *  module passing module name  as a params.
   * @author amitha.shetty
   */
  modulePermissionSets(): void {
    this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.dashboard);
  }
  /**
 * @method getBranchDataList()
 * @description: to fetch the data from BE for list of branches
 * @author karan
 */
  getBranchDataList(): void {
    const requestSet = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
      this.tableViewRequestData.pageNumber + '&search_by_branch_name=' + '&include_counts=' + true;
    this.commonService.getData('api/listBranch' + requestSet).subscribe(res => {
      if (res.success) {
        this.listBranch = new TableListBranches(res.payload);
      }
    }, (err) => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  getPage(event): void {
    if (event > 0 && event <= this.listBranch.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getBranchDataList();
    }
  }
  routeToInfo(item): void {
    const urlSegment = this.sharedService.urlSegmentKeys();
    this.router.navigate([`dashboard/${urlSegment[urlSegment.length - 1].path}/${urlSegment[urlSegment.length - 1].path}-info/${item.name}/${item.id}`]);
  }
}
