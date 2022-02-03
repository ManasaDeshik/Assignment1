import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, UrlSegment, ActivatedRoute,NavigationStart } from '@angular/router';
import { SessionStorage } from 'ngx-webstorage';
import { FetchUserTabDetailsService, fmUserRoleCollections, DownloadSubscribeParams, SharedService, RolePermissionVal, moduleNameKeys, CommonService } from 'src/app/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  public urlSegment: UrlSegment[] = [];
  public roleCollections = [];
  public subscribeData = new DownloadSubscribeParams();
  public rolePermissionSets: RolePermissionVal = new RolePermissionVal();
  public userPermissionSets: RolePermissionVal = new RolePermissionVal();
  public registrationDate:any;
  public store: Subscription;
  userVLECode = '';
  villageName = '';
  districtName = '';
  branchName = '';
  search_territory_user = '';
  role='';
  login = true;
  constructor(private router: Router, private sideNav: FetchUserTabDetailsService,
    private sharedService: SharedService, private commonService: CommonService) {
    this.observeRouterEvents();
  }

  ngOnInit() {
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
    this.rolePermissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.role);
    this.userPermissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.user);
  }

  private observeRouterEvents(): void {
    this.store = this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        this.urlSegment = this.sharedService.urlSegmentKeys();
        console.log("INSIDE end")
      }
      if (route instanceof NavigationStart) {
        console.log("INSIDE start");
        this.isCanGoBack();
        this.userVLECode = '';
        this.villageName = '';
        this.districtName = '';
        this.branchName = '';
        this.search_territory_user = '';
        this.registrationDate = '';
        this.role='';
      }
    });
  }

  isCanGoBack(){
    window.history.length > 3;
}

  create(routerText: string) {
    let parentLink;
    if (routerText.includes('role')) {
      parentLink = 'roles';
    } else {
      parentLink = 'users';
    }
    this.router.navigate([`user-management/${parentLink}/create-${routerText}`]);
  }



  fetchFilterData(event, type) {
    if (type !== 'list-role') {
      switch (type) {
        case 'role':
          if (event) {
            this.subscribeData.fmUser.role = event.id;
          } else {
            this.subscribeData.fmUser.role = '';
          }
          break;
        case 'filterDate':
          const date = this.sharedService.formateDate(event);
          this.subscribeData.fmUser.registrationDate = date;
          break;
        case 'user':
          if (event.key === "Enter") {
            this.subscribeData.fmUser.searchFmUser = event.target.value;
          }
          break;
        case 'village':
          if (event.key === "Enter") {
            this.subscribeData.fmUser.searchVillage = event.target.value;
          }
          break;
        case 'district':
          if (event.key === "Enter") {
            this.subscribeData.fmUser.searchDistrict = event.target.value;
          }
          break;
        case 'branch':
          if (event.key === "Enter") {
            this.subscribeData.fmUser.searchBranch = event.target.value;
          }
          break;
        case 'search_territory_user':
          if (event.key === "Enter") {
            this.subscribeData.fmUser.search_territory_user = event.target.value;
          }
          break;
        default:
          break;
      }
      if ((event ? (event.key === "Enter") : true) || (type == 'role') || (type == 'filterDate')) {
        this.sideNav.setSelectedUserRole(this.subscribeData);
      }
    } else {
      if (event.key === "Enter") {
        this.sideNav.setRoleStatusListRole(event.target.value);
      }
    }
  }
  searchFilter() {
    this.subscribeData.fmUser.searchFmUser = this.userVLECode;
    this.subscribeData.fmUser.searchVillage = this.villageName;
    this.subscribeData.fmUser.searchDistrict = this.districtName;
    this.subscribeData.fmUser.searchBranch = this.branchName;
    this.subscribeData.fmUser.search_territory_user = this.search_territory_user;
    this.sideNav.setSelectedUserRole(this.subscribeData);
  }
  searchRoleFieldKey(event) {
    if (event.term) {
      this.commonService.getDataNew(`users/roles?search_text=${event.term}`).subscribe(response => {
        if (response.success) {
          this.roleCollections = response.payload.records;
          this.roleCollections.push({
            name: 'All',
            _id: ''
          });
        }
      }, err => {
        this.sharedService.displayErrorMessage('');
      });
    }
  }

  /**
   * @method ngOnDestroy()
   * @description: A callback method that performs custom clean-up, invoked immediately after a directive, pipe,
   * or service instance is destroyed.
   * @author karan
   */

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.store.unsubscribe();
  }
}
