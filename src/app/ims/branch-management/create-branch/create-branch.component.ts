import { Component, OnInit } from '@angular/core';
import { SharedService, CreateBranch, LoaderService, CommonService, BranchDetails, BranchApiRequestSet, BranchData, BranchRecordCodes, FetchUserTabDetailsService } from 'src/app/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-branch',
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.component.scss']
})
export class CreateBranchComponent implements OnInit {
  public isEditMode = false;
  public routeSegmentId: string;
  public branch: CreateBranch = new CreateBranch();
  public branchData: BranchDetails = new BranchDetails();
  public createUpdateFlag: boolean = true;
  public checkRecordCodes = new BranchRecordCodes('');
  village_statuses = [{ name: 'Active' }, { name: 'Inactive' }];
  delivery_days = [{ name: 'Monday' }, { name: 'Tuesday' }, { name: 'Wednesday' },
  { name: 'Thursday' }, { name: 'Friday' }, { name: 'Saturday' }, { name: 'Sunday' }];
  public village_status;
  public delivery_day;
  public village_code: string;

  constructor(private sharedService: SharedService,
    private commonService: CommonService,
    private router: Router,
    private loaderService: LoaderService,
    private leadDetails: FetchUserTabDetailsService,) {
  }

  ngOnInit() {

    this.fetchUrl();
    this.getBranchDetailsCollection('state');
  }

  /**
    * @method fetchUrl()
    * @description: to check whether the user is in create form or edit form using route
    * @method: karan
    */
  fetchUrl(): void {
    const urlSegment = this.sharedService.urlSegmentKeys();
    this.routeSegmentId = urlSegment[urlSegment.length - 1].path;
    if (this.routeSegmentId !== 'create-branch') {
      this.isEditMode = true;
      this.getEditData();
    }
  }


  getEditData(): void {
    this.commonService.getDataNew('users/getBranchDetails/' + this.routeSegmentId).subscribe(res => {
      this.branch = new CreateBranch(res.payload);
      this.branchData = new BranchDetails(res.payload, 'edit');
      res.payload.village_status ? this.village_status = res.payload.village_status : '';
      res.payload.delivery_day ? this.delivery_day = res.payload.delivery_day : '';
      res.payload.village_code ? this.village_code = res.payload.village_code : '';
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }


  /**
    * @method getBranchDetailsCollection()
    * @description: to fetch the branch collections
    * @param identifier: contains type of identifier set for api details
    * @author amitha.shetty
    */
  getBranchDetailsCollection(identifier: string): void {
    const data = new BranchApiRequestSet(this.branchData);
    let url = (identifier=='state') ? 'searchBranchState' : (identifier=='district') ? 'searchBranchDistrict' : (identifier=='panchayat') ? 'searchBranchPanchayat' :  (identifier=='name')?'branches/name':(identifier=='block') ?'searchBranchBlock':'searchBranchVillage'
    this.commonService.getDataNew('users/' + url + data.requestSet).subscribe(response => {
      if (response.success) {
        if (response.payload.records.length === 0) {
          this.createUpdateFlag = false;
          if (identifier == 'state') {
            this.branch.state_code = null;
            this.branch.district_code = null;
            this.branch.code = null;
            this.branch.block_code = null;
            this.branch.village_code = null;
          } else if (identifier == 'district') {
            this.branch.district_code = null;
            this.branch.code = null;
            this.branch.block_code = null;
            this.branch.village_code = null;
          } else if (identifier == 'name') {
            this.branch.code = null;
            this.branch.block_code = null;
            this.branch.village_code = null;
          } else if (identifier == 'block') {
            this.branch.block_code = null;
            this.branch.village_code = null;
          }
        } else {
          this.createUpdateFlag = true;
          this.setBranchDetailsCollection(identifier, response.payload);
        }
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
      case 'village':
        this.branchData.village.collections = payload.records;
        break;
      case 'block':
        this.branchData.block.collections = payload.records;
        break;
      case 'panchayat':
        this.branchData.panchayat.collections = payload.records;
        break;
    }
  }

  updateNewFields(identifier: string, type: string) {
    switch (type) {
      case 'state':
        this.branchData.state.name = identifier;
        break;
      case 'district':
        this.branchData.district.name = identifier;
        break;
      case 'name':
        this.branchData.branch.name = identifier;
        break;
      case 'village':
        this.branchData.village.name = identifier;
        break;
      case 'block':
        this.branchData.block.name = identifier;
        break;
      case 'panchayat':
        this.branchData.panchayat.name = identifier;
        break;
    }
  }
   allowAlphabets(e){
    var k;
    document ? k = e.keyCode : k = e.which;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 );
  }

  /**
    * @method selectedFieldKey()
    * @description: to get branch details collections from the selected text
    * @param event: contains selected  text
    * @param type: contains type of dropdown (village , state , district , branch , panchayat, block)
    * @author amitha.shetty and karan
    */
  selectedFieldKey(event: string, type: string) {
    console.log(event,type)
   if(type=='state')
      this.resetFields();
    
    let typeCheck = typeof event;
      
    if (typeCheck === 'object') {
      const objectKey = Object.values(event);
      console.log(objectKey)
      if(objectKey.length == 2){
        this.updateNewFields(objectKey[1], type);
        this.setSearchTextVal(objectKey[1], type);
      }
      else{
        this.updateNewFields(objectKey[0], type);
        this.setSearchTextVal(objectKey[0], type);
      }
      
    } else {
      this.setSearchTextVal(event, type);
    }

    this.getBranchList(type);
    if (type === 'village') {
      this.branchData.village.searchRequest = event;
    }
  }
  /**
   * @method searchFieldKey()
   * @description: to get branch details collections from the searched text
   * @param event: contains selected  text
   * @param type: contains type of dropdown (village , state , district , name, , panchayat, block)
   * @author amitha.shetty and karan
   */
  searchFieldKey(event: any, type: string) {
    if (event.term) {
      this.setSearchTextVal(event.term, type);
    }
  }
  /**
   * @method setSearchTextVal()
   * @description: to get branch details collections from the text
   * @param event: contains selected  text
   * @param type: contains type of dropdown (village , state , district , name, panchayat, block)
   * @author amitha.shetty and karan
   */
  setSearchTextVal(event: string, identifier: string): void {
    switch (identifier) {
      case 'state':
        this.branchData.district = new BranchData();
        this.branchData.branch = new BranchData();
        this.branchData.panchayat = new BranchData();
        this.branchData.block = new BranchData();
        this.branchData.village = new BranchData();
        this.branchData.state.searchRequest = event;
        this.getBranchDetailsCollection(identifier);
        break;
      case 'district':

        this.branchData.branch = new BranchData();
        this.branchData.panchayat = new BranchData();
        this.branchData.block = new BranchData();
        this.branchData.village = new BranchData();
        this.branchData.district.searchRequest = event;
        this.getBranchDetailsCollection(identifier);
        break;
      case 'name':
        this.branchData.panchayat = new BranchData();
        this.branchData.block = new BranchData();
        this.branchData.village = new BranchData();
        this.branchData.branch.searchRequest = event;
        this.getBranchDetailsCollection(identifier);
        break;
      case 'panchayat':
        this.branchData.village = new BranchData();
        this.branchData.panchayat.searchRequest = event;
        this.getBranchDetailsCollection(identifier);
        break;
      case 'block':
        this.branchData.panchayat = new BranchData();
        this.branchData.block.searchRequest = event;
        this.getBranchDetailsCollection(identifier);
        break;
      case 'village':
        this.branchData.village.searchRequest = event;
        this.getBranchDetailsCollection(identifier);
        break;
    }
  }

  setCodes(data, type) {
    if (data.records) {
      if (data.records.length > 0) {
        switch (type) {
          case 'state': this.branch.state_code = data.records[0].state_code;
            break;
          case 'district': this.branch.district_code = data.records[0].district_code;
            break;
          case 'name': this.branch.code = data.records[0].code;
          console.log(this.branch.code,"branch code")
            break;
          case 'block': this.branch.block_code = data.records[0].block_code;
            break;
        }
      } else {
        switch (type) {
          case 'state': this.checkRecordCodes.stateRecors = false
            break;
          case 'district': this.checkRecordCodes.districtRecords = false;
            break;
          case 'name': this.checkRecordCodes.branchRecords = false
            break;
          case 'block': this.checkRecordCodes.blockrecords = false
            break;
        }
      }
    }
  }

  /** create fm user form */
  /**
   * @method getBranchList()
   * @description: to fetch the branch info
   * @author amitha.shetty and karan
   */
  getBranchList(type): void {
    const data = new BranchApiRequestSet(this.branchData);
    this.commonService.getDataNew('users/branches' + data.requestSet).subscribe(response => {
      if (response.success) {
        this.setCodes(response.payload, type);
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }

  resetFields(){
    this.branch.district_code = null;
    this.village_code = null;
    this.branch.block_code = null;
    this.branch.code= null;
  }

  createBranch() {
    this.getBranchDetailsCollection('state');
    if (!this.createUpdateFlag) {
      this.branch.state = this.branchData.state.name;
      this.branch.district = this.branchData.district.name;
      this.branch.name = this.branchData.branch.name;
      this.branch.panchayat = this.branchData.panchayat.name;
      this.branch.block = this.branchData.block.name;
      this.branch.village = this.branchData.village.name;
      this.branch.village_status = this.village_status ? this.village_status.name : '';
      this.branch.delivery_day = this.delivery_day ? this.delivery_day.name : '';
      this.branch.village_code = this.village_code || '';
      if (this.village_code) {
        if (this.village_code.trim() == '') {
        //m this.loaderService.show('hide');
          this.sharedService.displayErrorMessage('Please enter valid details');
          return;
        } else {
          this.branch.village_code = this.village_code || ''
        }
      }
      if (this.branch.village_status == '' || undefined || null) {
        delete this.branch.village_status
      }
      if (this.branch.delivery_day == '' || undefined || null) {
        delete this.branch.delivery_day
      }
      if (this.village_status == 'Inactive' || this.village_status ? (this.village_status.name == 'Inactive') : false) {
        this.branch.delivery_day = 'NA';
      }
      if (this.branch.village_code == '' || undefined || null) {
        delete this.branch.village_code
      }
      //m this.loaderService.show('show');
      this.commonService.postDataNew('users/branches', this.branch).subscribe(res => {
        this.sharedService.displaySuccessMessage('Branch Created Successfully');
        this.router.navigate(['branch-management/list-branches']);
      //m this.loaderService.show('hide');
      },
        err => {
        //m this.loaderService.show('hide');
          this.sharedService.displayErrorMessage(err.error.message[0]);
        });
    } else {
      this.sharedService.displayErrorMessage('Already Exist');
    }
  }

  updateBranch() {
    this.branch.state = this.branchData.state.name;
    this.branch.district = this.branchData.district.name;
    this.branch.name = this.branchData.branch.name;
    this.branch.panchayat = this.branchData.panchayat.name;
    this.branch.block = this.branchData.block.name;
    this.branch.village = this.branchData.village.name;
    this.branch.village_status = this.village_status ? this.village_status.name : '';
    this.branch.delivery_day = this.delivery_day ? this.delivery_day.name : '';
    this.branch.village_code = this.village_code || '';
    if (this.village_code) {
      if (this.village_code.trim() == '') {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('Please enter valid details');
        return;
      } else {
        this.branch.village_code = this.village_code || ''
      }
    }
    if (this.branch.village_status == '' || undefined || null) {
      delete this.branch.village_status
    }
    if (this.branch.delivery_day == '' || undefined || null) {
      delete this.branch.delivery_day
    }
    if (this.branch.village_code == '' || undefined || null) {
      delete this.branch.village_code
    }
    console.log(this.branch.village_status, this.village_status)
    if (this.village_status == 'Inactive' || this.village_status ? (this.village_status.name == 'Inactive') : false) {
      this.branch.delivery_day = 'NA';
    }
    //m this.loaderService.show('show');
    this.branch['id'] = this.routeSegmentId
    this.commonService.putDataNew('users/branches', this.branch).subscribe(res => {
      this.sharedService.displaySuccessMessage('Branch Updated Successfully');
      this.router.navigate(['branch-management/list-branches']);
    //m this.loaderService.show('hide');
    }, err => {
      this.sharedService.displayErrorMessage('Already Exists');
      //m this.loaderService.show('hide');
    });
  }
}
