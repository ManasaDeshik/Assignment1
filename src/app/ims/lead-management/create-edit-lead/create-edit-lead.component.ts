import { Component, OnInit } from '@angular/core';
import { CreateLeadForm, SharedService, BranchDetails, BranchData, EditLeadForm, CommonService, BranchApiRequestSet, LoaderService, UserInfo } from 'src/app/utils';
import { Router } from '@angular/router';
import { SessionStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-create-edit-lead',
  templateUrl: './create-edit-lead.component.html',
  styleUrls: ['./create-edit-lead.component.scss']
})
export class CreateEditLeadComponent implements OnInit {
  public status:any=[];
  public isOptionsSet : boolean = true;
  public tag:any = [];
  public intrestedProduct = [];
  public branchData: BranchDetails = new BranchDetails();
  public fmUserForm: CreateLeadForm = new CreateLeadForm();
  public isEditMode = false;
  public routeSegmentId: string;
  public bindIntrestedProduct = [];
  public statusInfo: any;
  public tagInfo: any;
  public tagOtherProdcuts = [];
  public vleCode = [];
  public vles: string;
  @SessionStorage('userName') public userData: UserInfo;
  @SessionStorage('moduleDetails') public moduleDetails;
  @SessionStorage('allowedWarehouse') public allowedWarehouse: any;
  public customer_activity = [];
   public customer_stage = [];
  //   , { value: 4, name: 'consider' }];
  public ivr_result = []
  public sjs_input =[];

  public tm_input =[];

  public sms_result = [];

  public type_of_phone = [];
  disableIVR = true;
  disableSJS = true;
  disableSMS = true;
  disableTM = true;
  disableStatus = false;
  disableInterestedProducts = false;
  stagenew = '';
  isDisable = false;
  isAware = false;
  isConsider = false;
  warehouseSelect = '';
  warehouses = [];
  warehouse_id = '';

  constructor(private sharedService: SharedService,
    private commonService: CommonService,
    private router: Router,
    private loaderService: LoaderService) { }

  ngOnInit() {
    console.log(this.branchData.branch.collections.length,"BRANCHDATA")
    this.getProductDetails();
    
  }
  log(g){
    console.log(g)
  }

  setLeadOptions(stage){
    switch(stage){
      case 1:{
        this.disableIVR = false;
        this.disableInterestedProducts = true;
        this.disableStatus = false;
        this.disableSJS = true;
          this.disableTM = true;
          this.isOptionsSet = true;
          //this.sharedService.displayErrorMessage("Please add interested products and status")
        break;
      }
      case 2:{
        this.disableIVR = true;
        this.fmUserForm.ivr_result = null;
        this.disableInterestedProducts = false;
        this.disableStatus = false;
        this.disableSJS = false;
        this.disableTM = false;
        if(this.bindIntrestedProduct.length == 0 || !this.bindIntrestedProduct){
          this.isOptionsSet = false;
          this.sharedService.displayErrorMessage("Please add interested products")
        }
         
        break;
      }
      case 3:{
        this.disableIVR = true;
        this.fmUserForm.ivr_result = null;
        this.disableInterestedProducts = false;
        this.disableStatus = false;
        this.disableSJS = true;
        this.disableTM = true;
        if(this.bindIntrestedProduct.length == 0 || this.fmUserForm.status < 1){
          this.isOptionsSet = false;
          this.sharedService.displayErrorMessage("Please add interested products and status")
        }
        break;
      }
      case 4:{
        this.disableIVR = true;
        this.fmUserForm.ivr_result = null;
        this.ivr_result = null;
        this.disableInterestedProducts = false;
        this.disableStatus = false;
        this.disableSJS = true;
        this.disableTM = true;
        //this.disableSMS = true;
        //this.disableSMS = null;
        this.isOptionsSet = true;
        break;
      }
      case 5:{
        this.disableIVR = true;
        this.fmUserForm.ivr_result = null;
        this.disableInterestedProducts = true;
        this.disableStatus = false;
        this.disableSJS = true;
        this.disableTM = true;
        break;
      }
      case 6:{
        this.disableIVR = true;
        this.fmUserForm.ivr_result = null;
        this.disableInterestedProducts = true;
        this.disableStatus = false;
        this.disableSJS = true;
        this.disableTM = true;
        break;
      }
      default:{
        this.disableIVR = true;
        this.fmUserForm.ivr_result = null;
        this.disableInterestedProducts = false;
        this.disableStatus = false;
        this.disableSJS = true;
        this.disableTM = true;
        this.isOptionsSet = true;
        break;
      }
      
    }
  }
  getDropdownList()
  {
    //m this.loaderService.show('show');
   
    this.commonService.getDataNew('leads/leaddropdown').subscribe(res => {
      if (res.success) {
        //m this.loaderService.show('hide');
        let data=res.payload.records
        // console.log(res)
      this.customer_activity=data.customer_activity;
      this.setLeadOptions('');
      this.customer_stage=data.customer_stages;
      this.ivr_result=data.ivr_result;
      this.sjs_input=data.sjs_input;
      this.tm_input=data.tm_input;
      this.sms_result=data.sms_result;
      this.type_of_phone=data.type_of_phone;
      this.tag=data.tags;
      this.status=data.customer_status
      }
    }, (err) => {
      //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
    
  }
  /**
   * @method getProductDetails()
   * @description: put all the products in the intestred products dropdown
   * @author karan
   */
  getProductDetails() {
    //m this.loaderService.show('show');
    const request = '?records_per_page=' + 1000 + '&page_number=' + 1+'&is_disabled=false';
    this.commonService.getDataNew('product/listproduct' + request).subscribe(res => {
      if (res.success) {
        //m this.loaderService.show('hide');
        // console.log(res)
        this.intrestedProduct = res.payload.records;
        this.fetchUrl();
      }
      if(this.branchData.state.collections.length == 0){
        this.getBranchDetailsCollection('state');
        this.getDropdownList();
      }
     
    }, (err) => {
      //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
    this.warehouseSelect = (this.allowedWarehouse)? this.allowedWarehouse.name : '';
  }

  /**
   * @method fetchUrl()
   * @description: to check whether the user is in create form or edit form using route
   * @author karan
   */
  fetchUrl(): void {
    const urlSegment = this.sharedService.urlSegmentKeys();
    this.routeSegmentId = urlSegment[urlSegment.length - 1].path;
    if (this.routeSegmentId !== 'create-lead') {
      this.isEditMode = true;
      this.getEditData();
    }
  }

  /**
   * @method selectedStatus()
   * @description: to set the selected status to fmUserForm status.
   * @param event:  contains selected status
   * @author karan
   */
  selectedStatus(event) {
    this.fmUserForm.status = event.id;
    console.log(this.bindIntrestedProduct.length,"interested length")
    if(this.disableInterestedProducts == true && this.fmUserForm.status){
      this.isOptionsSet=true;
    }
    else if((this.fmUserForm.sjs_input == 1 || this.fmUserForm.sjs_input == 3)||(this.fmUserForm.ivr_result == 2 || this.fmUserForm.ivr_result == 4)){
      if(this.fmUserForm.status  && this.bindIntrestedProduct.length > 0){
        this.isOptionsSet = true;
      }
      else{
        this.isOptionsSet = false;
      }  
    }
    else if((this.fmUserForm.sjs_input == 2 || this.fmUserForm.sjs_input == 4)||(this.fmUserForm.ivr_result == 1 || this.fmUserForm.ivr_result == 3) && this.bindIntrestedProduct.length > 0){
      this.isOptionsSet = true;
    }
    else if(this.fmUserForm.status && this.bindIntrestedProduct.length > 0){
      this.isOptionsSet = true;
    }
    else{
      this.isOptionsSet = false;
    }
  }
  /**
   * @method selectedTag()
   * @description: to set the selected tag to fmUserForm tag.
   * @param event: contains selected tag
   * @author karan
   */
  selectedTag(event: any) {
    this.fmUserForm.tag = event.id;
  }


  /**
   * @method selectedIntrestedProduct()
   * @description: to set the selected interested products tag to fmUserForm interested products.
   * @param: contains selected interested products
   * @author karan
   */
  selectedIntrestedProduct(event: any) {
    console.log(this.fmUserForm.ivr_result,"IVR")
    if(this.fmUserForm.sjs_input == 2 || this.fmUserForm.sjs_input == 3){
      this.disableStatus = true;
    }
    if(this.fmUserForm.customer_stage){
      this.setLeadOptions(this.fmUserForm.customer_stage.id);
    }
    
    this.disableInterestedProducts = false;
    this.isOptionsSet = false;
    if(this.fmUserForm.sjs_input !== null){
      if((this.fmUserForm.sjs_input == 1 || this.fmUserForm.sjs_input == 3)&& this.fmUserForm.status && this.bindIntrestedProduct.length > 0){
        this.isOptionsSet = true;
      }
      else if((this.fmUserForm.sjs_input == 2 || this.fmUserForm.sjs_input == 4)&& this.bindIntrestedProduct.length > 0){
        this.isOptionsSet = true;
      }
      /*else if(this.fmUserForm.ivr_result == null || this.fmUserForm.sjs_input == null){
        this.isOptionsSet = true;
      }*/
      else{
        this.isOptionsSet = false;
      }
    }
    else if(this.fmUserForm.ivr_result !== null){
      if((this.fmUserForm.ivr_result == 2 || this.fmUserForm.ivr_result == 4) && this.fmUserForm.status && this.bindIntrestedProduct.length > 0){
        this.isOptionsSet = true;
      }
      else if((this.fmUserForm.ivr_result == 1 || this.fmUserForm.ivr_result == 3) && this.bindIntrestedProduct.length > 0){
        this.isOptionsSet = true;
      }
      /*else if(this.fmUserForm.ivr_result == null || this.fmUserForm.sjs_input == null){
        this.isOptionsSet = true;
      }*/
      else{
        this.isOptionsSet = false;
      }
    }
    else{
      if(this.fmUserForm.status && this.bindIntrestedProduct.length > 0){
        this.isOptionsSet = true;
      }
      else if(this.bindIntrestedProduct.length > 0){
        this.isOptionsSet = true;
      }
      /*else if(this.fmUserForm.ivr_result == null || this.fmUserForm.sjs_input == null){
        this.isOptionsSet = true;
      }*/
      else{
        this.isOptionsSet = false;
      }
    }
    
    this.fmUserForm.intreasted_productIds = [];
    event.forEach(element => {
      let id = element.id ? element.id : element;
      this.fmUserForm.intreasted_productIds.push(id);
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
    this.setSearchTextVal(event, type);
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
      this.setSearchTextVal(event.term, type);
    }
  }
  /**
   * @method setSearchTextVal()
   * @description: to get branch details collections from the text
   * @param event: contains selected  text
   * @param type: contains type of dropdown (village , state , district , name)
   * @author amitha.shetty
   */
  setSearchTextVal(event: any, identifier: string): void {
    switch (identifier) {
      case 'state':
        this.branchData.district = new BranchData();
        this.branchData.branch = new BranchData();
        this.branchData.village = new BranchData();
        this.branchData.panchayat = new BranchData();
        this.branchData.state.searchRequest = event;
        this.getBranchDetailsCollection(identifier);
        break;
      case 'district':
        this.branchData.branch = new BranchData();
        this.branchData.village = new BranchData();
        this.branchData.panchayat = new BranchData();
        this.branchData.district.searchRequest = event;
        this.getBranchDetailsCollection(identifier);
        break;
      case 'name':
        
        this.branchData.village = new BranchData();
        this.branchData.panchayat = new BranchData();
        this.branchData.branch.searchRequest = (typeof event ==='object' && event.name )?event.name:event;
        this.getBranchDetailsCollection(identifier);
        break;
      case 'panchayat':
        this.branchData.village = new BranchData();
        this.branchData.panchayat.searchRequest = event;
        this.getBranchDetailsCollection(identifier);
        break;
      case 'village':
        this.branchData.village.searchRequest = event;
        this.getBranchDetailsCollection(identifier);
        break;
    }
  }
  /**
   * @method searchVleCode()
   * @description: to get the particular vle code from search term.
   * @param: contains search term
   * @author karan
   */
  searchVleCode(event: any) {
    let request: any;
    // console.log(this.allowedWarehouse)
    let wareHouses;
    if (this.allowedWarehouse.length > 1) {
      this.allowedWarehouse.forEach(element => {
        if (element.name == 'All') {
          wareHouses = element.id;
        }
      });
    } else {
      wareHouses = this.userData.warehouse_id;
    }

    if (this.moduleDetails.name !== 'superadmin') {
      if(wareHouses && wareHouses !='')
      request = `?records_per_page=100&warehouse_id=${wareHouses}&role=5&vle_code=${event.term}&branch_name=${this.userData.branch_name}`
      else
      request = `?records_per_page=100&role=5&vle_code=${event.term}&branch_name=${this.userData.branch_name}`
    } else {
      request = `?records_per_page=100&role=5&vle_code=${event.term}&branch_name=${this.userData.branch_name}`;
    }
    this.commonService.getDataNew('users/getuser' + request).subscribe(res => {
      this.vleCode = res.payload.records;
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }

  /**
   * @method selectedVle()
   * @description: to set the selected vle code to fmUserForm frontier user ref.
   * @param: contains selected vle code
   * @author karan
   */
  selectedVle(event) {
    this.fmUserForm.frontier_user_ref = event.id;
    console.log("VLE DETAILS",event)
    this.selectedFieldKey(event.branch?event.branch.state :"",'state')
    this.selectedFieldKey(event.branch?event.branch.district:"",'district')
    this.selectedFieldKey(event.branch?event.branch.name:"",'name')
    this.selectedFieldKey(event.branch?event.branch.panchayat:"",'panchayat')
    this.selectedFieldKey(event.branch?event.branch.village:"",'village')
    this.branchData.state.name = (event.branch)?event.branch.state : ''
    this.branchData.district.name = event.branch?event.branch.district:""
    this.branchData.branch.name = event.branch?event.branch.name : ""
    this.branchData.panchayat.name = event.branch?event.branch.panchayat: ""
    this.branchData.village.name = event.branch?event.branch.village:""
  }
  /**
   * @method otherProductInfo()
   * @description: to set the selected other products info to fmUserForm other products.
   * @param: contains selected other products
   * @author karan
   */


  otherProductInfo(event: any) {
    this.fmUserForm.other_products = [];
    const splitData = event.target.value.split(',');
    splitData.forEach(element => {
      this.fmUserForm.other_products.push(element);
    });
  }



  /** create fm user form */
  /**
   * @method getBranchList()
   * @description: to fetch the branch info
   * @author amitha.shetty
   */
  getBranchList(): void {
    
    let data:any = new BranchApiRequestSet(this.branchData);
   // data=data.filter(Boolean)
    this.commonService.getDataNew('users/branches/name' + data.requestSet).subscribe(response => {
      if (response.success) {
        this.fmUserForm.branch = response.payload.records[0];
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
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
  const url=(identifier == 'name')?'users/branches/name':'users/searchBranch' + identifier;
    this.commonService.getDataNew(url + data.requestSet).subscribe(response => {
      if (response.success) {
        this.setBranchDetailsCollection(identifier, response.payload);
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
   * @method createUser()
   * @description: is used to create lead
   * @author amitha.shetty
   */
  createUser() {
    this.sharedService.show('show');
    if(typeof this.fmUserForm.customer_stage === 'object')
    this.fmUserForm.customer_stage=this.fmUserForm.customer_stage.id;
    if (this.fmUserForm.customer_stage == 'Unaware' || this.fmUserForm.customer_stage == 1) {
      this.fmUserForm.customer_stage = 1;
      this.fmUserForm.sjs_input
      this.fmUserForm.tm_input
      this.fmUserForm.sms_result
    } else if (this.fmUserForm.customer_stage == 'Aware' || this.fmUserForm.customer_stage == 2) {
      this.fmUserForm.customer_stage = 2;
      this.fmUserForm.sms_result;
      this.fmUserForm.ivr_result;
    } else if (this.fmUserForm.customer_stage == 'Consider' || this.fmUserForm.customer_stage == 3) {
      this.fmUserForm.customer_stage = 3;
      this.fmUserForm.sjs_input;
      this.fmUserForm.tm_input;
      this.fmUserForm.ivr_result;
    } else if (this.fmUserForm.customer_stage == 'To be Corrected' || this.fmUserForm.customer_stage == 4) {
      this.fmUserForm.customer_stage = 4;
      this.fmUserForm.sjs_input;
      this.fmUserForm.tm_input;
      this.fmUserForm.sms_result;
      this.fmUserForm.ivr_result;
    } 
    const createForm = new CreateLeadForm(this.fmUserForm);
    if (this.fmUserForm.customer_stage == 'Unaware' || this.fmUserForm.customer_stage == 1) {
      this.fmUserForm.customer_stage = 1;
      delete createForm.sjs_input
      delete createForm.tm_input
      delete createForm.sms_result
    } else if (this.fmUserForm.customer_stage == 'Aware' || this.fmUserForm.customer_stage == 2) {
      this.fmUserForm.customer_stage = 2;
      delete createForm.sms_result;
      delete createForm.ivr_result;
    } else if (this.fmUserForm.customer_stage == 'Consider' || this.fmUserForm.customer_stage == 3) {
      this.fmUserForm.customer_stage = 3;
      delete createForm.sjs_input;
      delete createForm.tm_input;
      delete createForm.ivr_result;
    } else if (this.fmUserForm.customer_stage == 'To be Corrected' || this.fmUserForm.customer_stage == 4) {
      this.fmUserForm.customer_stage = 4;
      delete createForm.sjs_input;
      delete createForm.tm_input;
      delete createForm.sms_result;
      delete createForm.ivr_result;
    } 

console.log(createForm,this.fmUserForm);
    createForm.other_products[0] = createForm.other_products[0] ? createForm.other_products[0].trim() : ''
    if (createForm.type_of_phone == '') {
      createForm.type_of_phone = []
    } else {
      createForm.type_of_phone = [createForm.type_of_phone]
    }
    if (createForm.social_login_phone_number == '') {
      delete createForm.social_login_phone_number
    }
    let newArray = [];
    if (createForm.intreasted_productIds.length > 0)
      createForm.intreasted_productIds.forEach(element => {
        newArray.push(element.id ? element.id : element);
      })
    createForm.intreasted_productIds = newArray;
    this.commonService.postDataNew('leads', createForm).subscribe(res => {
      if (res.success) {
        setTimeout(() => {
          this.sharedService.show('hide');
          this.sharedService.displaySuccessMessage('Lead created successfully');
          this.router.navigate(['lead-management']);
        }, 2000);
      }
    }, err => {
      this.sharedService.show('hide');
      if(err.error.message){
        this.sharedService.displayErrorMessage(err.error.message.phone_number);
      }
      else{
        this.sharedService.displayErrorMessage(err.error.error);
      }
      
    });
  }
  /** filter list of items on edit lead */
  /**
   * @method getEditData()
   * @description: is used to get the lead data to be edited
   * @author amitha.shetty and karan
   */
  getEditData(): void {
    this.sharedService.show('show');
    this.commonService.getDataNew('leads/' + this.routeSegmentId).subscribe(response => {
      if (response.success) {
      
        if (response.payload) {
          this.sharedService.show('hide');
          if (response.payload.customer_stage == 5 || response.payload.customer_stage == 6) {
            this.isDisable = true;
            this.stagenew = response.payload.customer_stage == 5 ? 'Delivery' : 'Loyalty';
          }
        }
        response.payload.customer_stage=response.payload.customer_stage?parseInt(response.payload.customer_stage):null;
        
        response.payload.sjs_input=parseInt(response.payload.sjs_input);
       
        response.payload.status=parseInt(response.payload.status);
        console.log(response.payload)
        this.fmUserForm = new CreateLeadForm(response.payload);
        console.log(response.payload)
       console.log(this.fmUserForm)
         
        this.filterStatus(this.fmUserForm.status);
        this.filterTag(this.fmUserForm.tag);
        this.filterIntrestedProdcuts(this.fmUserForm.intreasted_productIds);
        console.log(this.fmUserForm)
       
        if(response.payload.branch[0]){
          this.fmUserForm.branch=response.payload.branch[0];
        this.filterBranch(this.fmUserForm.branch);
        }
        console.log(this.fmUserForm)
        if(response.payload.frontier_user_ref){
        this.fmUserForm.frontier_user_ref=response.payload.frontier_user_ref.id
        this.filterVleCode(response.payload.frontier_user_ref);

        }
        console.log(this.fmUserForm.customer_stage);
        this.stageChangeCustom(this.fmUserForm.customer_stage);
        if(response.payload.sjs_input == 2 || response.payload.sjs_input == 3)
        this.disableStatus = true;
       if ( this.fmUserForm.customer_stage.id == 1) {
          this.disableSMS = true;
          this.disableIVR = false;
        } else if (this.fmUserForm.customer_stage.id == 2) {
          this.disableSMS = true;
          this.disableIVR = true;
        } else if (this.fmUserForm.customer_stage.id == 3) {
          this.disableSMS = false;
          this.disableIVR = true;
        } else if (this.fmUserForm.customer_stage.id == 4) {
          this.disableSMS = true;
          this.fmUserForm.sms_result = null;
          this.disableIVR = true;
        } else {
          this.fmUserForm.customer_stage = null;
          this.disableSMS = false;
          this.disableIVR = false;
        }
        this.filterOtherProdcuts(response.payload.other_products);
      } else {
      }
    }, err => {
      this.sharedService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }

  /**
   * @method filterIntrestedProdcuts()
   * @description: is used to bind the filterInterestedProducts to ng-select from the arrayId passed as a parameter
   * @param arrayId: contains the interested products of particular lead
   * @author karan
   */
  filterIntrestedProdcuts(arrayId: Array<any>) {
    const filterIntrestProducts = [];
    arrayId.forEach(res => {
      filterIntrestProducts.push(res.title);
    });

    this.bindIntrestedProduct = filterIntrestProducts;
    console.log(this.bindIntrestedProduct.length);
  }
  /**
   * @method filterOtherProdcuts()
   * @description: is used to bind the tagOtherProdcuts to ng-select from the otherProducts passed as a parameter
   * @param otherProducts: contains the other products of particular lead
   * @author karan
   */
  filterOtherProdcuts(otherProducts: any) {
    this.tagOtherProdcuts = otherProducts;

    if(this.tagOtherProdcuts){
      if(typeof this.tagOtherProdcuts ==='string')
      {
        this.tagOtherProdcuts=this.tagOtherProdcuts
      }
    this.tagOtherProdcuts.forEach((element, index) => {
      if (element === null) {
        this.tagOtherProdcuts.splice(index, 1);
      }
    });
  }
  }
  /**
   * @method filterStatus()
   * @description: is used to bind the  statusInfo variable to ng-select from the role passed as a parameter
   * @param role: contains the role of particular lead
   * @author karan
   */
  filterStatus(role: number): void {
    const roleKey = this.status.filter(ele => {
      return ele.id == role;
    });
    if (roleKey.length > 0) {
      this.statusInfo = roleKey[0].name;
    } else {
      this.statusInfo = '';
    }
  }
  /**
   * @method filterTag()
   * @description: is used to bind the tagInfo to ng-select from the tag passed as a parameter
   * @param otherProducts: contains the other products of particular lead
   * @author karan
   */
  filterTag(tag: number): void {
    const branchKey = this.tag.filter(ele => {
      return ele.id == tag;
    });
    console.log(branchKey,this.tag,tag);
    if (branchKey.length > 0) {
      this.tagInfo = branchKey[0].name;
    } else {
      this.tagInfo = '';
    }
  }
  /**
   * @method filterVleCode()
   * @description: is used to bind the  vles to ng-select from the event passed as a parameter.
   * @param role: contains the vle code of particular lead
   * @author karan
   */

  filterVleCode(event: any) {
 
    this.vles = (event.vle_code)?event.vle_code:event;
  }
  /**
   * @method filterBranch()
   * @description: is used to set the  branch from the branch passed as a parameter.
   * @param branch: contains the branch  of particular lead
   * @author amitha.shetty
   */
  filterBranch(branch: string): void {
    this.branchData = new BranchDetails(branch, 'edit');
    this.fmUserForm.branch = branch;
  }
  /**
   * @method updateUser()
   * @description: is used to set the  update the lead info
   * @author amitha.shetty
   */
  updateUser() {
    this.sharedService.show('show');
  
    if(typeof this.fmUserForm.customer_stage === 'object' && this.fmUserForm.customer_stage && this.fmUserForm.customer_stage.id)
    this.fmUserForm.customer_stage=this.fmUserForm.customer_stage.id;

   console.log(this.fmUserForm);
   if (this.fmUserForm.customer_stage == 'Unaware' || this.fmUserForm.customer_stage == 1) {
    this.fmUserForm.customer_stage = 1;
    this.fmUserForm.sjs_input = null;
    this.fmUserForm.tm_input = null;
    this.fmUserForm.sms_result = null;
  } else if (this.fmUserForm.customer_stage == 'Aware' || this.fmUserForm.customer_stage == 2) {
    this.fmUserForm.customer_stage = 2;
    this.fmUserForm.sms_result = null;
    this.fmUserForm.ivr_result = null;
  } else if (this.fmUserForm.customer_stage == 'Consider' || this.fmUserForm.customer_stage == 3) {
    this.fmUserForm.customer_stage = 3;
    this.fmUserForm.sjs_input = null;
    this.fmUserForm.tm_input = null;
    this.fmUserForm.ivr_result = null;
  } else if (this.fmUserForm.customer_stage == 'To be Corrected' || this.fmUserForm.customer_stage == 4) {
    this.fmUserForm.customer_stage = 4;
    this.fmUserForm.sjs_input = null;
    this.fmUserForm.tm_input = null;
    this.fmUserForm.sms_result = null;
    this.fmUserForm.ivr_result = null;
  } else {
    this.fmUserForm.customer_stage = null;
  }
  const editForm = new EditLeadForm(this.fmUserForm, this.routeSegmentId);
  if (this.fmUserForm.customer_stage == 'Unaware' || this.fmUserForm.customer_stage == 1) {
    this.fmUserForm.customer_stage = 1;
    delete editForm.sjs_input
    delete editForm.tm_input
    delete editForm.sms_result
  } else if (this.fmUserForm.customer_stage == 'Aware' || this.fmUserForm.customer_stage == 2) {
    this.fmUserForm.customer_stage = 2;
    delete editForm.sms_result;
    delete editForm.ivr_result;
  } else if (this.fmUserForm.customer_stage == 'Consider' || this.fmUserForm.customer_stage == 3) {
    this.fmUserForm.customer_stage = 3;
    delete editForm.sjs_input;
    delete editForm.tm_input;
    delete editForm.ivr_result;
  } else if (this.fmUserForm.customer_stage == 'To be Corrected' || this.fmUserForm.customer_stage == 4) {
    this.fmUserForm.customer_stage = 4;
    delete editForm.sjs_input;
    delete editForm.tm_input;
    delete editForm.sms_result;
    delete editForm.ivr_result;
  } else {
    delete editForm.customer_stage;
  }
   
 console.log(editForm);
    editForm.other_products[0] = editForm.other_products[0] ? editForm.other_products[0].trim() : ''
    editForm.other_products = editForm.other_products.filter(ele => ele !== '');
    if (editForm.type_of_phone == '') {
      editForm.type_of_phone = []
    } else {
      editForm.type_of_phone = [editForm.type_of_phone]
    }
    if (editForm.social_login_phone_number == '') {
      delete editForm.social_login_phone_number
    }
    let newArray = [];
    if (editForm.intreasted_productIds.length > 0)
      editForm.intreasted_productIds.forEach(element => {
        newArray.push(element.id ? element.id : element);
      })
    editForm.intreasted_productIds = newArray;
    editForm.sjs_input =this.fmUserForm.sjs_input;
    this.commonService.putDataNew('leads', editForm).subscribe(res => {
      if (res.success) {
        setTimeout(() => {
          this.sharedService.show('hide');
          this.sharedService.displaySuccessMessage('Lead updated successfully');
          this.router.navigate(['lead-management']);
        }, 2000);
      }
    }, err => {
      this.sharedService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  ivrChange(data){
    switch(data.value){
      case 1:{
        this.disableInterestedProducts = false;
        this.disableStatus = false;
        this.disableSJS = false;
        this.disableTM = false;
        if(this.bindIntrestedProduct.length == 0){
          this.isOptionsSet = false;
          this.sharedService.displayErrorMessage("Please add interested products");
        }
         
        this.disableIVR = false;
        break;
      }
      case 2:{
        //this.statusInfo = null;
       // this.fmUserForm.status=null;
        //this.bindIntrestedProduct = null;
        this.disableInterestedProducts = false;
        this.disableStatus = false;
        this.disableSJS = true;
        this.disableTM = true;
        if(!this.bindIntrestedProduct || this.fmUserForm.status < 1 || this.bindIntrestedProduct.length == 0){
          this.isOptionsSet = false;
          this.sharedService.displayErrorMessage("Please add interested products and status")
        }
        break;
      }
      case 3:{
        this.disableInterestedProducts = false;
        this.disableIVR = false;
        this.disableStatus = false;
        this.disableSJS = false;
        this.disableTM = false;
        
        if(this.bindIntrestedProduct.length == 0 || !this.bindIntrestedProduct){
          this.isOptionsSet = false;
          this.sharedService.displayErrorMessage("Please add interested products")
        }
         
        break;
     }
      case 4:{
        //this.statusInfo = null;
       // this.fmUserForm.status=null;
        //this.bindIntrestedProduct = null;
        this.disableInterestedProducts = false;
        this.disableStatus = false;
        
        this.disableSJS = true;
        this.disableTM = true;
        if(!this.bindIntrestedProduct || this.fmUserForm.status < 1 || this.bindIntrestedProduct.length > 0){
          this.isOptionsSet = false;
          this.sharedService.displayErrorMessage("Please add interested products and status")
        }
          
        this.disableIVR = false;
        break;
      }
      case 6:{
        this.setLeadOptions(4);
        this.fmUserForm.customer_stage = 4;
        this.disableIVR = false;
        break;
      }
      case 7:{
        this.setLeadOptions(4);
        this.fmUserForm.customer_stage = 4;
        this.disableIVR = false;
        break;
      }
      default:{
        this.statusInfo = null;
       // this.fmUserForm.status=null;
        this.bindIntrestedProduct = [];
        this.disableInterestedProducts = true;
        //Do not disable status at all for any stages
        this.disableStatus = false;
        this.isOptionsSet = true;
        this.disableIVR = false;
        break;
      }
    }
  }
  sjsInputChanged(data){
    switch(data.value){
      case 1:{
       // this.statusInfo = null;
       // this.fmUserForm.status=null;
        //this.bindIntrestedProduct = null;
        this.disableInterestedProducts = false;
        this.disableStatus = false;
        if(!this.bindIntrestedProduct || this.fmUserForm.status < 1 || this.bindIntrestedProduct.length == 0){
          this.isOptionsSet = false;
          this.sharedService.displayErrorMessage("Please add interested products and status")
        }
        else{
          this.isOptionsSet = true;
        }
        break;
      }
      case 2:{
        this.disableInterestedProducts = false;
        this.disableStatus = true;
        this.statusInfo = null;
        if(!this.bindIntrestedProduct || this.bindIntrestedProduct.length == 0){
          this.isOptionsSet = false;
          this.sharedService.displayErrorMessage("Please add interested products")
        }
        else{
          this.isOptionsSet = true;
        }
        break;
      }
      case 3:{
        this.disableInterestedProducts = false;
        this.disableStatus = true;
        this.statusInfo = null;
        if(!this.bindIntrestedProduct || this.bindIntrestedProduct.length == 0){
          this.isOptionsSet = false;
          this.sharedService.displayErrorMessage("Please add interested products")
        }
        else{
          this.isOptionsSet = true;
        }
        break;
      }
      case 4:{
        this.disableInterestedProducts = false;
        this.disableStatus = false;
        if(!this.bindIntrestedProduct || this.fmUserForm.status < 1 || this.bindIntrestedProduct.length == 0){
          this.isOptionsSet = false;
          this.sharedService.displayErrorMessage("Please add interested products and status")
        }
        else{
          this.isOptionsSet = true;
        }
        break;
      }
      default:{
       //this.statusInfo = null;
       //this.fmUserForm.status=null;
        this.bindIntrestedProduct = [];
        this.disableInterestedProducts = true;
        //this.disableStatus = true;
        this.isOptionsSet = true;
        break;
      }
    }
  }
  stageChange(data) {
    this.isConsider = false;
    this.isAware = false;
   // this.fmUserForm.customer_stage = data.id;
    //console.log(this.fmUserForm.customer_stage,data.id);
      //this.disableSJS = data.disableSJS;
      //this.disableTM = data.disableTM;
      this.disableSMS = data.disableSMS;
      this.setLeadOptions(data.id);
      //this.disableIVR = data.disableIVR;
      console.log(this.disableIVR,"DISABLED IVR")
//this.fmUserForm.ivr_result=null;
this.fmUserForm.sms_result=null;
this.fmUserForm.sjs_input=null;
if(data.id==3){
this.disableStatus=false;
this.disableInterestedProducts=false;
this.isConsider = true;
}
if(data.id==2){
  this.fmUserForm.status=null;
  //this.disableStatus=true;
  this.statusInfo=null;
  this.isAware = true;
  //this.disableInterestedProducts=false;
  }
  if(data.id==1){
    this.fmUserForm.status=null;
    this.fmUserForm.intreasted_productIds=null;
    //this.disableStatus=true;
//this.disableInterestedProducts=true;
this.bindIntrestedProduct=[];
this.statusInfo=null;
  //  this.disableInterestedProducts=false;
    }


  }
  stageChangeCustom(data){
    if(data){
    const stage = this.customer_stage.filter(ele => {
      return ele.id == data;
    });
    this.fmUserForm.customer_stage=stage[0];
    this.setLeadOptions(stage[0].id);
  }
  }
}