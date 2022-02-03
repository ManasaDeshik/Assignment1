import { Component, OnDestroy, OnInit } from '@angular/core';
import { FetchUserTabDetailsService, SharedService, TableListUser, TableViewRequestSet, LoaderService, CommonService, userTableHeaderCollections, UserInfo, fmUserRoleCollections, FMUserSortFields, moduleNameKeys, RolePermissionVal } from '../../../../../../src/app/utils';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../../../src/app/utils/components/confirmation-dialog/confirmation-dialog.component';
import { SessionStorage } from 'ngx-webstorage';
import {Location, LocationStrategy} from "@angular/common";
import { element } from 'protractor';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit, OnDestroy {
  public tableHeaders = userTableHeaderCollections;
  public permissionSets: RolePermissionVal = new RolePermissionVal();
  public sortField: FMUserSortFields = new FMUserSortFields();
  public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
  public listUsers = new TableListUser('');
  private subscription: Subscription
  @SessionStorage('registeredWarehouse') public registeredWarehouse: any;
  @SessionStorage('moduleDetails') public moduleDetails;
  @SessionStorage('username') public username;
  wareHouseList: any = [];

  constructor(private sharedService: SharedService, private commonService: CommonService, private location: LocationStrategy,
    private router: Router, private fetchName: FetchUserTabDetailsService,
    private dialog: MatDialog, private loaderService: LoaderService) {
      history.pushState(null, null, window.location.href);
this.location.onPopState(() => {  
history.pushState(null, null, window.location.href);
//window.onbeforeunload = function() { window.history.forward(); };
});  

  }

  ngOnInit() {
    this.getUsersList();
    this.fetchName.getUpdateList().subscribe(res => {
      this.getUsersList();
    });
    this.observeBehaviorDataChange();
  }
  getFormattedDate(returned_date) {
    return new Date(returned_date).toISOString().substring(0, new Date(returned_date).toISOString().length - 1);
}
  /**
   * @method - observeBehaviorDataChange()
   * @description - the following observeBehaviorDataChange() method is used to subscribe to the observable sequence
   * so we can update the values of search and role.
   * @author amitha.shetty and Karan
   */
  observeBehaviorDataChange() {
    this.subscription = this.fetchName.getSelectedUserRole().subscribe(data => {
      this.tableViewRequestData.pageNumber = 1;
      this.tableViewRequestData.role = data.fmUser.role;
      this.tableViewRequestData.searchText = data.fmUser.searchFmUser;
      this.tableViewRequestData.villageName = data.fmUser.searchVillage
      this.tableViewRequestData.registrationDate = data.fmUser.registrationDate;
      this.tableViewRequestData.branchName = data.fmUser.searchBranch;
      this.tableViewRequestData.search_territory_user = data.fmUser.search_territory_user;
      this.tableViewRequestData.district = data.fmUser.searchDistrict
      console.log('59 before getuserlist');
      this.getUsersList();
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
    this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.user);
  }
  /**
   * @method  getUsersList()
   * @description - the following getUsersList() method is used get list of user details
   * @author amitha.shetty
   */
  getUsersList() {
    this.modulePermissionSets();
    console.log(this.username)
    //m this.loaderService.show('show');
    let requestSet: any;
    if (this.moduleDetails.name !== 'superadmin') {
      requestSet = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
        this.tableViewRequestData.pageNumber + '&sort_updated_date=' + -1;
    } else {
      requestSet = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
        this.tableViewRequestData.pageNumber + '&sort_updated_date=' + -1;
    }
    const filterRequest = '&search_text=' + this.tableViewRequestData.searchText +'&village=' + this.tableViewRequestData.villageName+
      '&role_id=' + this.tableViewRequestData.role + '&registration_date=' + this.tableViewRequestData.registrationDate + '&vle_code='
      + this.tableViewRequestData.searchVLEcode+'&branch_name='+this.tableViewRequestData.branchName+ '&search_district='+this.tableViewRequestData.district;
    const sortRequest = '&sort_vle_code=' + this.sortField.sortFmCode + '&sort_fm_user_name=' + this.sortField.sortFmUserName + '&sort_fm_user_village=' +
      this.sortField.sortFmVillage + '&sort_fm_user_state=' + this.sortField.sortFmState + '&sort_registration_date=' + this.sortField.sortRegistration+'&deletedAt=true';
    this.commonService.getDataNew('users' + requestSet + filterRequest + sortRequest).subscribe(response => {
      if (response.success) {
        //m this.loaderService.show('hide');
        this.listUsers = new TableListUser(response.payload);
        if(this.wareHouseList.length == 0){
          this.getWarehouse();
        }
        if(this.listUsers.records.length>0){
          this.listUsers.records.forEach((element,i)=>{
            if(element.warehouses.length>0){
              element.warehouses.forEach((el,j)=>{
              this.wareHouseList.records.forEach(element=>{
                if(el.id === element.id){
                  this.listUsers.records[i].wareHouse.push(element)
                }
              })
            })
              // console.log(element.allowedWarehouse,this.listUsers)
            }
          })
        }
        // console.log(this.listUsers);
      } else {
        this.listUsers.records = [];
      }
      //m this.loaderService.show('hide');
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
      //m this.loaderService.show('hide');
    });
  }


  getWarehouse() {
    //m this.loaderService.show('show');
    const request = '?records_per_page=' + 1000 + '&page_number=' +
      this.tableViewRequestData.pageNumber + '&search_text=' + this.tableViewRequestData.searchText;
    this.commonService.getDataNew('users/warehouse' + request).subscribe(res => {
      this.wareHouseList = res.payload;
      //this.getUsersList();
      // //m this.loaderService.show('hide');
    }, err => {
      //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
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
    this.getUsersList();
  }
  /**
   * @method  editUser()
   * @description - the following editUser() method is used to navigate to edit FM user for editing FM user
   * @author karan
   */
  editUser(item: any) {
    console.log(item)
    this.router.navigate([`user-management/users/edit-user/${item.id}`]);
  }
  /**
   * @method  getPage()
   * @description - the following getPage() method is used get the selected page for pagination
   * @param event - contains the selected page number
   * @author amitha.shetty
   */
  getPage(event: number): void {
    if (event > 0 && event <= this.listUsers.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getUsersList();
    }
  }
  /**
   * @method  openDialog()
   * @description - the following openDialog() method is used to open dialog box  for delete confirmation.
   * @param id - contains fm user id for deletion purpose
   * @param vleName - contains name of the saheli
   * @author amitha.shetty
   */
  openDialog(id: string, vleName: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are You Sure You Want to Delete ' + vleName },
      panelClass: 'confirmation-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      const data = {
        fm_user_id: id
      };
      if (result) {
        this.commonService.deleteDataNew('users', data).subscribe(response => {
          if (response.status == 200) {
            this.sharedService.displaySuccessMessage('User Deleted Successfully');
            /*Below code included for clearing the search filter after successful deletion*/
            this.router.navigate([`user-management/users`]);
            this.tableViewRequestData.searchText='';
            this.getUsersList();
          }
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
      }
    });
  }

   /**
   * @method ngOnDestroy()
   * @description: A callback method that performs custom clean-up, invoked immediately after a directive, pipe,
   * or service instance is destroyed.
   * @author karan
   */

    ngOnDestroy(){
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.subscription.unsubscribe();
    }
}
