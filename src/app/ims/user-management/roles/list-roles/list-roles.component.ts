import { Component, OnInit } from '@angular/core';
import { TableViewRoleRequestSet, TableListRole, CommonService, FetchUserTabDetailsService, SharedService, LoaderService, RolePermissionVal, moduleNameKeys } from 'src/app/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss']
})
export class ListRolesComponent implements OnInit {
  public tableHeaders = [
    { header: 'Roles' },
    {
      header: 'Description'
    }
  ];
  public tableViewRequestData: TableViewRoleRequestSet = new TableViewRoleRequestSet();
  public permissionSets: RolePermissionVal = new RolePermissionVal();
  public listRoles = new TableListRole();
  constructor(private commonService: CommonService, private fetchRoleName: FetchUserTabDetailsService, private sharedService: SharedService,
    private router: Router, private loaderService: LoaderService) { }

  ngOnInit() {
    this.getRoles();
    this.observeBehaviorDataChange();
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
    this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.role);
  }
  /**
   * @method - observeBehaviorDataChange()
   * @description - the following observeBehaviorDataChange() method is used to subscribe to the observable sequence
   * so we can update the values of search and role.
   * @author amitha.shetty
   */
  observeBehaviorDataChange() {
    this.fetchRoleName.getRoleStatusListRole().subscribe(data => {
      this.tableViewRequestData = new TableViewRoleRequestSet();
      this.tableViewRequestData.searchText = data;
      this.getRoles();
    });
  }
  getRoles(): void {
    //m this.loaderService.show('show');
    const requestSet = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
      this.tableViewRequestData.pageNumber + '&search_text=' + this.tableViewRequestData.searchText;
    this.commonService.getDataNew(`users/roles${requestSet}`).subscribe(response => {
      if (response.success) {
        this.listRoles = new TableListRole(response.payload);
      }
      //m this.loaderService.show('hide');
    }, err => {
      //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage('');
    });
  }
  editRole(item): void {
    this.router.navigate([`user-management/roles/edit-role/${item.id}`]);
  }
  /**
   * @method  openDialog()
   * @description - the following openDialog() method is used to open dialog box  for delete confirmation.
   * @param id - contains role id for deletion purpose
   * @param roleName - contains name of the lead
   * @author amitha.shetty
   */
  openDialog(id: string, roleName: string): void {
    const dialogRef = this.sharedService.openDialog(roleName);
    dialogRef.afterClosed().subscribe(result => {
      const data = {
        role_id: id
      };
      if (result) {
        this.commonService.deleteDataNew('users/roles', data).subscribe(response => {
          if (response.status = 200) {
            this.tableViewRequestData = new TableViewRoleRequestSet();
            this.sharedService.displaySuccessMessage('Role Deleted Successfully');
            /*Included for clearing the filter after successful deletion*/
            this.router.navigate([`user-management`]);
            this.router.navigate([`user-management/roles/list-roles`]);
            this.tableViewRequestData.searchText='';
            this.getRoles();
          }
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
      }
    });
  }
  /**
   * @method  getPage()
   * @description - the following getPage() method is used get the selected page for pagination
   * @param event - contains the selected page number
   * @author amitha.shetty
   */
  getPage(event: number): void {
    if (event > 0 && event <= this.listRoles.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getRoles();
    }
  }
}
