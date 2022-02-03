import { Component, OnInit, OnDestroy } from '@angular/core';
import { fmpBranchCollections, TableViewRequestSet, SharedService, dashboardBranchList, TableListBranches, SearchFieldBranch, DownloadSubscribeParams, BranchSortFields, branchManagementList, moduleNameKeys } from '../..';
import { Router } from '@angular/router';
import { LoaderService, CommonService, FetchUserTabDetailsService } from '../../services';
import { Subscription } from 'rxjs';
import { RolePermissionVal } from '../../models';

@Component({
  selector: 'app-list-branches',
  templateUrl: './list-branches.component.html',
  styleUrls: ['./list-branches.component.scss']
})
export class ListBranchesComponent implements OnInit {
  public fmpDashboard = fmpBranchCollections;
  public sortField: BranchSortFields = new BranchSortFields();
  public permissionSets: RolePermissionVal = new RolePermissionVal();
  public selectedRole: string;
  public link: string;
  public searchField: SearchFieldBranch = new SearchFieldBranch();
  public tableHeaders = branchManagementList;
  public subscribeData = new DownloadSubscribeParams();
  public listBranch: TableListBranches = new TableListBranches();
  public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
  public routeSegmentId: string;
  delivery_days = [{ name: 'Monday' }, { name: 'Tuesday' }, { name: 'Wednesday' },
  { name: 'Thursday' }, { name: 'Friday' }, { name: 'Saturday' }, { name: 'Sunday' },{name: 'All'}];
  public subscription: Subscription;

  constructor(private sharedService: SharedService, private router: Router, private commonService: CommonService,
     private setBranchStatusDownload: FetchUserTabDetailsService,
    private loaderService: LoaderService) {
      // console.log('came...')
      if(this.router.url.includes('list-branches')){
        this.subscription = this.setBranchStatusDownload.getUpdateList().subscribe((res:any) => {
          // console.log(res, 'done ..')
          this.ngOnInit();
        });
      }
  }

  ngOnInit() {
    this.fetchUrl();
    this.getBranchDataList();
    this.modulePermissionSets();
    this.searchField.delivery_day = 'Delivery Day'
  }
  /**
   * @method  modulePermissionSets()
   * @description - the following modulePermissionSets() method is used set crud operations for module.
   * @uses toCheckAllPermissionRights() - the function toCheckAllPermissionRights returns right permissions for the
   *  module passing module name  as a params.
   * @author amitha.shetty
   */
  modulePermissionSets(): void {
    this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.branch);
  }

  /**
   * @method fetchUrl()
   * @description to fetch the url and helps for navigate from the dashboard to particular branch
   * @author karan
   */
  fetchUrl(): void {
    const urlSegment = this.sharedService.urlSegmentKeys();
    this.routeSegmentId = urlSegment[urlSegment.length - 2].path;
  }

  /**
   * @method getBranchDataList()
   * @description: to fetch the data from BE for list of branches
   * @author karan
   */
  getBranchDataList(): void {
    //m this.loaderService.show('show');
    const requestSet = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
      this.tableViewRequestData.pageNumber + '&search_by_branch_name=' + this.searchField.searchBranch.trim() + '&search_by_district=' + this.searchField.searchDistrict.trim()
      + '&search_by_village=' + this.searchField.searchVillage.trim() + '&search_delivery_day=' + ((this.searchField.delivery_day == 'Delivery Day') ? '' : this.searchField.delivery_day) +
      '&search_by_state=' + this.searchField.searchState.trim() + '&include_counts=' + true;
    const sortRequest = '&sort_by_total_vle=' + this.sortField.totalVle + '&sort_by_total_leads=' + this.sortField.totalLeads + '&sort_by_state=' +
      this.sortField.searchState + '&sort_by_district=' + this.sortField.searchDistrict + '&sort_by_village=' + this.sortField.searchVillage
      + '&sort_by_branch=' + this.sortField.searchBranch;
    this.commonService.getDataNew('users/branches' + requestSet + sortRequest).subscribe(res => {
      if (res.success) {
        this.listBranch.records = [];
        this.listBranch = new TableListBranches(res.payload);
        //m this.loaderService.show('hide');
      }
    },err=>{
      this.sharedService.displayErrorMessage(err.statusText);
    //m this.loaderService.show('hide');
    });
  }

  searchFieldKey(event, type, isSearch) {
    if (!isSearch) {
      this.tableViewRequestData = new TableViewRequestSet();
      this.searchField[type] = event.target.value;
      this.subscribeData.branch[type] = event.target.value.trim();
    }
    if (event.key === "Enter" || isSearch) {
      this.setBranchStatusDownload.setBranchSubscribeStatus(this.subscribeData);
      this.getBranchDataList();
    }
  }
  selectDeliveryDay(event) {
    if (event.name != 'Delivery Day' && event.name != 'All') {
      this.tableViewRequestData = new TableViewRequestSet();
      this.searchField.delivery_day = event.name
      this.subscribeData.branch.delivery_day = event.name
      this.setBranchStatusDownload.setBranchSubscribeStatus(this.subscribeData);
      this.getBranchDataList();
    } else {
      this.tableViewRequestData = new TableViewRequestSet();
      this.searchField.delivery_day = 'Delivery Day'
      this.subscribeData.branch.delivery_day = ''
      this.setBranchStatusDownload.setBranchSubscribeStatus(this.subscribeData);
      this.getBranchDataList();
    }

  }
  clearFilter() {
    this.searchField.searchVillage = '';
    this.searchField.searchState = '';
    this.searchField.searchDistrict = '';
    this.searchField.searchBranch = '';
    this.searchField.saheliNameMobile = '';
    this.searchField.TMNameMobile = '';
    this.subscribeData.branch.searchVillage = '';
    this.subscribeData.branch.searchState = '';
    this.subscribeData.branch.searchDistrict = '';
    this.subscribeData.branch.searchBranch = '';
    this.subscribeData.branch.delivery_day = '';
    this.subscribeData.branch.saheliNameMobile = '';
    this.subscribeData.branch.saheliNameMobile = '';
    this.subscribeData.branch.TMNameMobile = '';
    this.searchField.delivery_day = '';
    this.getBranchDataList();
    this.setBranchStatusDownload.setBranchSubscribeStatus(this.subscribeData);
    this.searchField.delivery_day = 'Delivery Day';
  }

  getPage(event): void {
    if (event > 0 && event <= this.listBranch.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getBranchDataList();
    }
  }


  createBranch(): void {
    this.router.navigate(['branch-management/create-branch']);
  }

  /**
   * @method  sorting()
   * @description - the following sorting() method is used to sort the particular fields in lead list table
   * @param sortText - contains selected text for sorting
   * @param sortValue - contains number -1 for descending and 1 for ascending
   * @author amitha.shetty
   */
  sorting(sortText: string, sortValue: number) {
    this.sortField[sortText] = sortValue;
    this.getBranchDataList();
  }

  editUser(id: string) {
    this.router.navigate([`branch-management/edit-branch/${id}`]);
  }
}
