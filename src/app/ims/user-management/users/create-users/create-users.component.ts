import { Component, OnInit } from '@angular/core';
import { SharedService, CreateUserForm, EditUserForm, BranchDetails, BranchData, fmUserClassifications, CommonService, BranchApiRequestSet, BranchApiRequestSetFinal, TableViewRequestSet, LoaderService, WarehouseManufacturerFranchiseList, UserInfo } from 'src/app/utils';
import { Router } from '@angular/router';
import { SessionStorage } from 'ngx-webstorage';


@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {
  public roleCollections = [];
  public classificationCollections = fmUserClassifications;
  public selectedClassifier: any;
  public isEditMode = false;
  public routeSegmentId: string;
  public branchData: BranchDetails = new BranchDetails();
  public roleName: any;
  public selectedRole: string;
  public showData: boolean = false;
  public selectedCoordinator_id: string;
  public selectedAllowedWarehouse = [];
  public saheliCoordinatorList = [];
  public classificationList = [];
  public manufactuerName: any;
  public fmUserForm: CreateUserForm = new CreateUserForm();
  public saheliCoordinator: string;
  public mapSaheliCoordinator: string;
  public mapClassificationData: string;
  public min: Date = new Date(2015, 0, 1);
  public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
  public manufacturerList: WarehouseManufacturerFranchiseList = new WarehouseManufacturerFranchiseList();
  public isTM: boolean = false
  @SessionStorage('userName') public userData: UserInfo;
  @SessionStorage('moduleDetails') public moduleDetails;
  constructor(private sharedService: SharedService,
    private commonService: CommonService,
    private router: Router,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.fetchUrl();
    this.getBranchDetailsCollection('state', false);
    this.commonService.getDataNew(`users/classifications`).subscribe(response => { 
      if (response.success) {
        this.classificationList = response.data.rows;
     } });
     
  }
  /**
   * @method  fetchUrl()
   * @description - the following fetchUrl() method is used to fetch url segments
   * @author amitha.shetty
   */
  fetchUrl(): void {
    const urlSegment = this.sharedService.urlSegmentKeys();
    this.routeSegmentId = urlSegment[urlSegment.length - 1].path;
    if (this.routeSegmentId !== 'create-user') {
      this.isEditMode = true;
      this.getEditData();
    }
  }
  getSaheliCoordinatorRoleId(): void {
    this.commonService.getDataNew(`users/roles?search_text=territory manager`).subscribe(response => {
      if (response.success) {
        this.saheliCoordinator = response.payload.records[0].id;
      }
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }

  /** create fm user form */
  /**
   * @method getBranchList()
   * @description: to fetch the branch info
   * @author amitha.shetty
   */
  getBranchList(): void {
    const data = new BranchApiRequestSetFinal(this.branchData);
    console.log(this.branchData)
    this.commonService.getDataNew('users/branches/name' + data.requestSet).subscribe(response => {
      if (response.success) {
        if (response.payload.records.length > 1) {
          response.payload.records.forEach(data => {
            if (this.branchData.village.name == data.village) {
              this.fmUserForm.branch = data
            }
          })
        } else {
          console.log("inside else")
          this.fmUserForm.branch = response.payload.records[0];
        } if (this.fmUserForm.branch == null || this.fmUserForm.branch == undefined) {
          this.fmUserForm.branch = response.payload.records[0];
        }
      }
      console.log(this.fmUserForm.branch,"INSIDE BRANCH")
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });

  }
  /**
   * @method selectedFieldKey()
   * @description: to get branch details collections from the selected text
   * @param event: contains selected  text
   * @param type: contains type of dropdown (village , state , district , branch)
   * @author amitha.shetty
   */
  selectedFieldKey(event: string, type: string) {
    // console.log(event)
    this.setSearchTextVal(event, type, true);
    if (type === 'village') {
      this.branchData.village.searchRequest = event;
      this.getBranchList();
    }
  }
  /**
   * @method searchFieldKey()
   * @description: to get branch details collections from the searched text
   * @param event: contains selected  text
   * @param type: contains type of dropdown (village , state , district , name)
   * @author amitha.shetty
   */
  searchFieldKey(event: any, type: string) {
    if (event.term) {
      this.setSearchTextVal(event.term, type, false);
    }
  }
  /**
   * @method searchFieldKey()
   * @description: to update the fm user collections based on event passed as a parameter
   * @param event: contains selected  classification
   * @author karan
   */
  selectedClassification(event: any) {
    this.fmUserForm.classification = event.id;
    this.mapClassificationData = event.id;
  }

  /**
   * @method selectRole()
   * @param event - dropdown event for role
   * @description : assign value to fmuser.role 
   * @author karan
   */
  selectRole(event: any) {
    this.fmUserForm.role_id = event.id;
    this.selectedRole = event.name;
    this.roleName = event.name.replace(/\s+/g, '').toLowerCase();

    if (this.roleName === 'solarsaheli') {
      this.getSaheliCoordinatorRoleId();
    }
  }
  /**
   * @method setSearchTextVal()
   * @description: to get branch details collections from the text
   * @param event: contains selected  text
   * @param type: contains type of dropdown (village , state , district , name)
   * @author amitha.shetty
   */

  setSearchTextVal(event: any, identifier: string, bool): void {
    switch (identifier) {
      case 'state':
        this.branchData.district = new BranchData();
        this.branchData.branch = new BranchData();
        this.branchData.village = new BranchData();
        this.branchData.panchayat = new BranchData();
        this.branchData.state.searchRequest = event;
        this.getBranchDetailsCollection(identifier, bool);
        break;
      case 'district':
        this.branchData.branch = new BranchData();
        this.branchData.village = new BranchData();
        this.branchData.panchayat = new BranchData();
        this.branchData.district.searchRequest = event;
        this.getBranchDetailsCollection(identifier, bool);
        break;
      case 'name':
        this.branchData.village = new BranchData();
        this.branchData.panchayat = new BranchData();
        this.branchData.branch.searchRequest = (typeof event ==='object' && event.name )?event.name:event;
        this.getBranchDetailsCollection(identifier, bool);
        break;
      case 'panchayat':
        this.branchData.village = new BranchData();
        this.branchData.panchayat.searchRequest = event;
        this.getBranchDetailsCollection(identifier, bool);
        break;
      case 'village':
        this.branchData.village.searchRequest = event;
        this.getBranchDetailsCollection(identifier, bool);
        break;
    }
  }
  /**
   * @method getBranchDetailsCollection()
   * @description: to fetch the branch collections
   * @param identifier: contains type of identifier set for api details
   * @author amitha.shetty
   */
  getBranchDetailsCollection(identifier: string, bool): void {
    // console.log(identifier,bool)
    if (bool) {
      const data = new BranchApiRequestSetFinal(this.branchData);
    } else {
      const data = new BranchApiRequestSet(this.branchData);
    }
    const data = new BranchApiRequestSet(this.branchData);
    console.log(identifier)
    let url = (identifier=='state') ? 'searchBranchState' : (identifier=='district') ? 'searchBranchDistrict' : (identifier=='panchayat') ? 'searchBranchPanchayat' : (identifier=='name') ? 'branches/name': 'searchBranchVillage'
    this.commonService.getDataNew('users/' + url + data.requestSet).subscribe(response => {
      if (response.success) {
        this.setBranchDetailsCollection(identifier, response.payload);
      } else {
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  /**
   * @method setBranchDetailsCollection()
   * @description: to update the branch data collections based on identifier set
   * @param identifier: contains type of identifier used to get particular collections
   * @param payload: contains response data
   * @author amitha.shetty
   */
  setBranchDetailsCollection(identifier: string, payload: any): void {
    switch (identifier) {
      case 'state':
        this.branchData.state.collections = payload.records;
        break;
      case 'district':
        this.branchData.district.collections = payload.records;
        break;
      case 'name':
        this.branchData.branch.collections = payload.records;
        break;
      case 'panchayat':
        this.branchData.panchayat.collections = payload.records;
        break;
      case 'village':
        this.branchData.village.collections = payload.records;
    }
  }



  /**
   * @method selectWarehouse()
   * @param event - selected event from search warehouse
   * @description - fetching id from selected event
   * @author karan
   */
  selectWarehouse(event: any, type: string) {
    // console.log(event);
    if (type === 'warehouse') {
      this.fmUserForm.assignedWarehouseFK = event.id;
      this.manufactuerName = event.name;
    } else {
      this.fmUserForm.allowed_warehouses = [];
      event.map(ele => {
        this.fmUserForm.allowed_warehouses.push(ele.id);
      });
    }
  }

  /**
 * @method setManufacturer()
 * @param event : search text in search Manufacturer input
 * @author karan
 */
  serachWarehouse(event: any) {
    this.tableViewRequestData = new TableViewRequestSet();
    this.tableViewRequestData.searchText = event.term;
    this.getWarehouse();
  }


  /**
 * @method getData()
 * @description: data to be requested and store in manufacturerlist
 * @author karan
 */
  getWarehouse() {
    //m this.loaderService.show('show');
    const request = '?records_per_page=' + 10 + '&page_number=' +
      this.tableViewRequestData.pageNumber + '&search_text=' + this.tableViewRequestData.searchText;
    this.commonService.getDataNew('users/warehouse' + request).subscribe(res => {
      this.manufacturerList = new WarehouseManufacturerFranchiseList(res.payload);
    //m this.loaderService.show('hide');
    }, err => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }

  /**
   * @method createUser()
   * @description: is used to create  FM user
   * @author amitha.shetty
   */

  createUser(): void {
    // if (this.moduleDetails.name !== 'superadmin') {
    //   this.fmUserForm.warehouse_id = this.userData.warehouse_id;
    // }
    //m this.loaderService.show('show');
    if (this.fmUserForm.first_name.trim() === '' || this.fmUserForm.password.trim() === '' || this.fmUserForm.vle_code.trim() === '') {
      this.sharedService.displayErrorMessage('Please fill valid details.');
    //m this.loaderService.show('hide');
      return;
    }
    this.fmUserForm.first_name = this.fmUserForm.first_name.trim();
    this.fmUserForm.password = this.fmUserForm.password.trim();
    this.fmUserForm.vle_code = this.fmUserForm.vle_code.trim();
    //this.fmUserForm.branch = this.fmUserForm.branchId;//this.branchData.branch.name;
    console.log(this.fmUserForm.branch)
    // console.log(this.fmUserForm)
    const createForm = new CreateUserForm(this.fmUserForm);
    if (createForm.phone_number_2 == '') {
      delete createForm.phone_number_2
    }
    if (createForm.phone_number_3 == '') {
      delete createForm.phone_number_3
    }
    if (createForm.eko_user_code == '') {
      delete createForm.eko_user_code
    }
    if (createForm.coordinator_id == '' || createForm.coordinator_id == null) {
      delete createForm.coordinator_id
    }
    console.log(createForm)
    this.commonService.postDataNew('users', createForm).subscribe(response => {
      if (response.success) {
      //m this.loaderService.show('hide');
        this.sharedService.displaySuccessMessage('User Created Successfully');
        this.router.navigate(['user-management/users']);
      } else {
      }
    }, err => {
    //m this.loaderService.show('hide');
    this.sharedService.displayErrorMessage(err.error.message[0]);
    });
  }

  /** filter list of items on edit  FM user */
  /**
   * @method getEditData()
   * @description: is used to get the FM user data to be edited
   * @author amitha.shetty
   */
  getEditData(): void {
    this.commonService.getDataNew('users/getUserDetails/' + this.routeSegmentId).subscribe(response => {
      if (response.success) {
        this.fmUserForm = new CreateUserForm(response.payload);
        this.filterClassification(response.payload);
        this.filterRole(response.payload);
        this.filterBranch(response.payload.branch);
        this.filterAllowedWarehouse(response.payload.warehouses);
        this.filterWarehouse(response.payload.assignedWarehouse.id);
      } else {
      //m this.loaderService.show('hide');
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  /**
   * @method updateUser()
   * @description: is used to set the  update the FM user info
   * @author amitha.shetty
   */
  updateUser(): void {
    // if (this.moduleDetails.name !== 'superadmin') {
    //   this.fmUserForm.warehouse_id = this.userData.warehouse_id;
    // }
    //m this.loaderService.show('show');
    if (this.fmUserForm.first_name.trim() === '' || this.fmUserForm.vle_code.trim() === '') {
      this.sharedService.displayErrorMessage('Please fill valid details.');
    //m this.loaderService.show('hide');
      return;
    }
    this.fmUserForm.first_name = this.fmUserForm.first_name.trim();
    this.fmUserForm.vle_code = this.fmUserForm.vle_code.trim();
    this.fmUserForm.role_name = this.selectedRole;
    const editData = new EditUserForm(this.fmUserForm, this.routeSegmentId);
    if (editData.password == null || editData.password == '') {
      delete editData.password
    }
    if (editData.warehouse_id == null || editData.warehouse_id == '') {
      delete editData.warehouse_id
    }
    if (editData.phone_number_2 == '') {
      // delete editData.phone_number_2
      editData.phone_number_2 = 'null'
    }
    if (editData.phone_number_3 == '') {
      // delete editData.phone_number_3
      editData.phone_number_3 = 'null'
    }
    if (editData.eko_user_code == '') {
      delete editData.eko_user_code
      // editData.eko_user_code = null
    } if (editData.coordinator_id == '' || editData.coordinator_id == null) {
      delete editData.coordinator_id
    }
   if (editData.role_name != 'Solar Saheli') {
     editData.coordinator_id = null;
  }
    
    this.commonService.putDataNew('users', editData).subscribe(response => {
      if (response.success) {
      //m this.loaderService.show('hide');
        this.sharedService.displaySuccessMessage('User Edited Successfully');
        this.router.navigate(['user-management/users']);
      } else {
      //m this.loaderService.show('hide');
      }
    }, err => {
    //m this.loaderService.show('hide');
      if(err.error.error === "phone_number must be unique"){
        this.sharedService.displayErrorMessage("User already exists");
      }
      else{
        this.sharedService.displayErrorMessage(err.error.error);
      }
      
    });
  }
  /**
   * @method filterClassification()
   * @description: to bind the edit data to ng-select
   * @author karan
   */
  filterClassification(data) {
    /*const classify = this.classificationCollections.filter(ele => {
      if (this.fmUserForm.classification === ele.value.toString()) {
        return ele;
      }
    });
    if (classify.length > 0) {
      this.selectedClassifier = classify[0].name;
    }
    ((this.selectedClassifier == '') || this.selectedClassifier == undefined) ? this.selectedClassifier = data.classification ? data.classification : '' : '';*/
    this.mapClassificationData = data.classification;
  }
  /**
   * @method filterRole()
   * @description: to bind the role data to ng-select
   * @author karan
   */
  filterRole(res: any): void {
    this.roleName = res.role.name.replace(/\s+/g, '').toLowerCase();
    this.selectedRole = res.role.name;
    this.fmUserForm.role_id = res.role.id;
    if (this.roleName.search('territorymanager') != -1) {
      this.isTM = false;
    }
    if (this.roleName === 'solarsaheli') {
      if (res.coordinator) {
        this.fmUserForm.coordinator_id = res.coordinator_id;
        this.mapSaheliCoordinator = res.coordinator.first_name;
      }
      this.getSaheliCoordinatorRoleId();
    }
  }
  /**
   * @method filterBranch()
   * @description: is used to set the  branch from the branch passed as a parameter.
   * @param branch: contains the branch  of particular fm user
   * @author amitha.shetty
   */
  filterBranch(branch: any): void {
    this.branchData = new BranchDetails(branch, 'edit');
    this.fmUserForm.branch = branch;
  }

  /**
   * @method filterWarehouse()
   * @param id : id of warehouse
   * @description: since BE is giving only id warehouse, need to make API call to fetch the name and binding to manufacturerName
   * @author karan
   */
  filterWarehouse(id: string) {
    const request = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
      this.tableViewRequestData.pageNumber + '&_id=' + id;
    this.commonService.getDataNew('users/getWarehouseDetails/' + id).subscribe(res => {
      this.manufactuerName = res.payload.name;
    }, (err) => {
       //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  searchRoleFieldKey(event) {
    if (event.term) {
      this.commonService.getDataNew(`users/roles?search_text=${event.term}`).subscribe(response => {
        if (response.success) {
          this.roleCollections = response.payload.records;
        }
      }, err => {
        this.sharedService.displayErrorMessage('');
      });
    }
  }
  filterAllowedWarehouse(allowWarehouse): void {
    // console.log(allowWarehouse);
    this.fmUserForm.allowed_warehouses = [];
    const filterAllowedWarehouse: any = [];
    if (allowWarehouse && allowWarehouse.length > 0) {
      allowWarehouse.forEach(ele => {
        this.fmUserForm.allowed_warehouses.push(ele.id);
        filterAllowedWarehouse.push(ele);
      });
    }
    let flags = {};
    const distinctArray = filterAllowedWarehouse.filter(function (entry) {
      if (flags[entry.id]) {
        return false;
      }
      flags[entry.id] = true;
      return true;
    });
    // console.log(distinctArray)
    // const distinctArray:any = [...new Map(filterAllowedWarehouse.map(item =>[item[key], item])).values()];
    // const distinctArray = filterAllowedWarehouse.filter((n, i) => filterAllowedWarehouse.indexOf(n) === i);
    // this.filterAllowedWarehouse = distinctArray
    this.selectedAllowedWarehouse = distinctArray;
    // console.log(this.selectedAllowedWarehouse);
  }
  getSaheliCoordinator(event): void {
    if (event.term) {
      this.saheliCoordinatorList = []
      this.commonService.getDataNew(`users?search_text=${event.term}&role=${this.saheliCoordinator}`).subscribe(response => {
        if (response.success) {
          this.saheliCoordinatorList = response.payload.records;
          this.saheliCoordinatorList.push({
            first_name: 'NA',
            _id: null
          })
        }
      }, err => {
        this.sharedService.displayErrorMessage('');
      });
    }
  }
  selectedCoordinator(event): void {
    this.fmUserForm.coordinator_id = event.id;
  }
}
