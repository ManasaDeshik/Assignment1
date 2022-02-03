import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import {
  TableViewRequestSet, TableListLeadUser, SharedService, FetchUserTabDetailsService, LeadSortFields,
  DownloadSubscribeParams, LoaderService, CommonService, LeadListRequestSet, leadTableHeaderCollections,
  TableDateFields, tableLeadStatusCollections, RolePermissionVal, moduleNameKeys, leadTabCollections, SideNavService, AddOrderComponent
} from 'src/app/utils';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionStorage } from 'ngx-webstorage';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-lead-management',
  templateUrl: './lead-management.component.html',
  styleUrls: ['./lead-management.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LeadManagementComponent implements OnInit,OnDestroy {
  public tableHeaders = leadTableHeaderCollections;
  public sortField: LeadSortFields = new LeadSortFields();
  public selectedStatus: any;
  public selectedSearchText: string = '';
  public selectedSearchVLEText: string = '';
  public orderTabs = tableLeadStatusCollections;
  public subscribeData = new DownloadSubscribeParams();
  public permissionSets: RolePermissionVal = new RolePermissionVal();
  public tableDateFields: TableDateFields = new TableDateFields();
  public showData = true;
  public leadList: TableListLeadUser = new TableListLeadUser();
  public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
  public maxFromDate: any;
  public minToDate: any;
  public selectedBranchName: string = '';
  public selectedVillageName: string = '';
  public search_fm_user_name: string = '';
  public delivery_day: string = 'Delivery Day';
  notEditStage = true;
  delivery_days = [{ name: 'Monday' }, { name: 'Tuesday' }, { name: 'Wednesday' },
  { name: 'Thursday' }, { name: 'Friday' }, { name: 'Saturday' }, { name: 'Sunday' }, { name: 'All' }];
  public customer_activity:any = [];
    public customer_stage:any =[];
  // public customer_stage = ['Awareness', 'Consideration', 'Ordering', 'Delivery', 'Loyalty'];
 // public customer_stage = [{ value: 1, name: 'Unaware' }, { value: 2, name: 'Aware' }, { value: 3, name: 'Consider' }
    //, { value: 4, name: 'To Be Corrected' }, { value: 5, name: 'Delivery' }, { value: 6, name: 'Loyalty' }];
  public move_to_unaware = [{ value: 2, name: 'Aware' }, { value: 3, name: 'Consider' }
    , { value: 4, name: 'To Be Corrected' }];
  public move_to_aware = [{ value: 1, name: 'Unaware' }, { value: 3, name: 'Consider' }, { value: 4, name: 'To Be Corrected' }];
  public move_from_to_be_considered = [{ value: 1, name: 'Unaware' }, { value: 2, name: 'Aware' }, { value: 3, name: 'Consider' }];
  public move_from_consider = [{ value: 1, name: 'Unaware' }, { value: 2, name: 'Aware' }, { value: 4, name: 'To Be Corrected' }];
  public customerActivity: any = [];
  public customerStage: string = 'Select stage';
  @SessionStorage('moduleDetails') public moduleDetails;
  @SessionStorage('registeredWarehouse') public registeredWarehouse: any;
  oeRoleId: any;
  activities_selected = '';
  stage_selected = '';
  public userTabs: any = [];
  user: { name: string; id: string; items: any[]; };
  SCName = 'TM search';
  public leadTabs = leadTabCollections;
  public selectedBtn = 'Directory';
  public selectedBtnVal: any = 0;
  public searchVleText = '';
  public tabData: any = {};
  public selectedTabData = 'Directory';
  public subscription: Subscription;
  public tagList:any=[];
  public stageList:any=[];
  public ivrList:any=[];
  public smsList:any=[];
  public tmList:any=[];
 public totalRecords:number=0;
  permission: any;
  movingTo: any = [];

  constructor(private commonService: CommonService, private sharedService: SharedService,
    private leadDetails: FetchUserTabDetailsService, public dialog: MatDialog, private router: Router,
    private loaderService: LoaderService, private sidenavService: SideNavService) {
    this.subscription = this.sidenavService.getSubText().subscribe(message => {
      if (message) {
        this.selectedBtnVal = message.text.val;
        this.makeActive(message.text);
      } else {
        // clear messages when empty message received
        this.selectedBtnVal = 0;
      }
    });
  }

  ngOnInit() {
  
   
    
    let lead = this.leadTabs;
    this.leadTabs = [];
    this.moduleDetails.roles.forEach(sub => {
      if (sub.name == 'Lead Management' && (sub.sub_module ? sub.sub_module.length : 0) > 0) {
        sub.sub_module.map(data => {
          lead.forEach(data1 => {
            // console.log(data.name,data1.name)
            if (data.name == data1.name) {
              data1['permission'] = data;
              this.leadTabs.push(data1);
            }
          })
          this.tabData[data.name] = data.name;
        })
      }
    });
    
    this.makeActive(this.leadTabs[0]);
  }
  getDropdownList()
  {   
    this.commonService.getDataNew('leads/leaddropdown?type=1').subscribe(res => {
      if (res.success) {
        let data=res.payload.records
        // console.log(res)
      this.customer_activity=data.customer_activity;
      this.customer_stage=data.customer_stages;
     data.tags.map(val=>{
       this.tagList[val.id]=val.name;
     })
     data.customer_stages.map(val=>{
      this.stageList[val.id]=val.name;
    })
    data.ivr_result.map(val=>{
      this.ivrList[val.value]=val.name;
    })
    data.tm_input.map(val=>{
      this.tmList[val.value]=val.name;
    })

    data.sms_result.map(val=>{
      this.smsList[val.value]=val.name;
    })
      }
    }, (err) => {
      this.sharedService.displayErrorMessage(err.statusText);
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
    this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.lead);
  }
  getRoleList(): void {
    this.loaderService.show('show');
    this.commonService.getDataNew('users/roles?search_text=Territory Manager').subscribe(response => {
      if (response.success) {
        // console.log(response)
        if (response.payload.records.length > 0) {
          response.payload.records.forEach(elem => {
           
            if ((elem.name).toLowerCase() == 'territory manager') {
              this.oeRoleId = elem.id;
              this.selectedRoleData("")
            }
          });
          this.loaderService.show('hide');
        } else {
          this.sharedService.displayErrorMessage('Please create Territory Manager Role');
        }
      }
    }, err => {
      this.loaderService.show('hide');
      this.sharedService.displayErrorMessage('Please create Territory Manager Role');
    });
  }
  /**
   * @method  getLeadList()
   * @description - the following getLeadList() method is used get list of lead details
   * @author amitha.shetty
   */
  getLeadList(): void {
    this.movingTo = [];
    this.modulePermissionSets();
    //m this.loaderService.show('show');
    this.showData = false;
    let data: any;
    this.tableViewRequestData.registrated_from = this.sharedService.formateDate(this.tableDateFields.fromDate);
    this.tableViewRequestData.registrated_to = this.sharedService.formateDate(this.tableDateFields.toDate);
    if (this.tableViewRequestData.registrated_from && this.tableViewRequestData.registrated_to) {
      let dateF = new Date(this.sharedService.formateDate(this.tableDateFields.fromDate));
      // add a day
      dateF.setDate(dateF.getDate());
      let dateT = new Date(this.sharedService.formateDate(this.tableDateFields.toDate));
      // add a day
      dateT.setDate(dateT.getDate());
      this.tableViewRequestData.registrated_from = this.sharedService.formateDate(dateF);
      this.tableViewRequestData.registrated_to = this.sharedService.formateDate(dateT);
      // console.log(this.tableViewRequestData.registrated_from, this.tableViewRequestData.registrated_to)
    }
    if (this.tableViewRequestData.delivery_day == 'Delivery Day') {
      this.tableViewRequestData.delivery_day = '';
    }
    if(!this.tableViewRequestData.customer_stage){
      this.tableViewRequestData.customer_stage ='';
    }
    if (this.moduleDetails.name !== 'superadmin') {
      data = new LeadListRequestSet(this.tableViewRequestData, this.sortField, this.registeredWarehouse);
    } else {
      data = new LeadListRequestSet(this.tableViewRequestData, this.sortField, '');
    }
    // console.log(data.requestSet)
    this.loaderService.show('show');
    this.subscription = this.commonService.getDataNew('leads' + data.requestSet).subscribe(response => {
      if (response.success) {
        this.leadList.records = [];
        this.leadList = response.payload;
       this.totalRecords=response.totalRecords;
        console.log(this.leadList, this.tableViewRequestData);
        let data = {
          'status': this.tableViewRequestData.status ? this.tableViewRequestData.status : '',
          'search_text': this.tableViewRequestData.searchText ? this.tableViewRequestData.searchText : '',
          'coordinator_id': this.tableViewRequestData.coordinator_id ? this.tableViewRequestData.coordinator_id : '',
          'search_fm_user': this.tableViewRequestData.searchVLE ? this.tableViewRequestData.searchVLE : '',
          'registrated_from': this.tableViewRequestData.registrated_from ? this.tableViewRequestData.registrated_from : '',
          'registrated_to': this.tableViewRequestData.registrated_to ? this.tableViewRequestData.registrated_to : '',
          'customer_activity': this.tableViewRequestData.activities_selected ? this.tableViewRequestData.activities_selected : '',
          'delivery_day': (this.tableViewRequestData.delivery_day == 'Delivery Day') ? '' : this.tableViewRequestData.delivery_day,
          'customer_stage': this.tableViewRequestData.customer_stage ? this.tableViewRequestData.customer_stage : '',
          'branch_name': this.tableViewRequestData.branchName ? this.tableViewRequestData.branchName : '',
          'village_name': this.tableViewRequestData.villageName ? this.tableViewRequestData.villageName : '',
          'fm_warehouse_id': (this.moduleDetails.name !== 'superadmin') ? this.registeredWarehouse ? this.registeredWarehouse : '' : '',
        }
        this.leadDetails.shareLeadData(data);
        this.showData = true;
        console.log("inside")
        this.loaderService.show('hide');
        if( this.customer_stage.length == 0){
          this.getDropdownList();
          this.getRoleList();
        }
      }

    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
      this.loaderService.show('hide');
    }); 
  }

  /**
   * @method  getPage()
   * @description - the following getPage() method is used get the selected page for pagination
   * @param event - contains the selected page number
   * @author amitha.shetty
   */
  getPage(event: number): void {
    if (event > 0 && event <= this.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getLeadList();
    }
  }
  /**
   * @method  sorting()
   * @description - the following sorting() method is used to sort the particular fields in lead list table
   * @param sortText - contains selected text for sorting
   * @param sortValue - contains number -1 for descending and 1 for ascending
   * @author amitha.shetty
   */
  sorting(sortText: string, sortValue: number) {
    (this.search_fm_user_name != '') ? this.getRoleList() : (this.tableViewRequestData.coordinator_id = '')
    switch (sortText) {
      case 'leadDate':
        this.sortField.leadDate = sortValue;
        this.getLeadList();
        break;
      case 'vleId':
        this.sortField.vleId = sortValue;
        this.getLeadList();
        break;
      case 'vleName':
        this.sortField.vleName = sortValue;
        this.getLeadList();
        break;
      case 'branchName':
        this.sortField.branchName = sortValue;
        this.getLeadList();
        break;
      default:
        break;
    }
  }

  /** FILTER EVENTS */

  /**
   * @method  searchVle()
   * @description - the following searchVle() method is used search vle name from the lead list
   * @param event - search event when the use search vle
   * @author amitha.shetty
   */
  searchVle(event: any): void {
    (this.search_fm_user_name != '') ? this.getRoleList() : (this.tableViewRequestData.coordinator_id = '')
    this.tableViewRequestData = new TableViewRequestSet();
    this.setFilterData();
    this.tableViewRequestData.searchVLE = event.target.value;
    if (event.key === "Enter") {
      this.searchFilter();
    }
  }
  /**
   * @method  searchLead()
   * @description - the following searchLead() method is used search lead name from the lead list
   * @param event - search event when the use search leads
   * @author amitha.shetty
   */
  searchLead(event: any): void {
    (this.search_fm_user_name != '') ? this.getRoleList() : (this.tableViewRequestData.coordinator_id = '')
    this.tableViewRequestData = new TableViewRequestSet();
    this.setFilterData();
    this.tableViewRequestData.searchText = event.target.value;
    if (event.key === "Enter") {
      this.searchFilter();
    }
  }
  /**
   * @method  setStatusData()
   * @description - the following setStatusData() method is used set status from list of leads
   * @author amitha.shetty
   */
  setStatusData(): void {
    (this.search_fm_user_name != '') ? this.getRoleList() : (this.tableViewRequestData.coordinator_id = '')
    this.tableViewRequestData = new TableViewRequestSet();
    this.setFilterData();
    this.tableViewRequestData.status = this.selectedStatus.value;
    this.subscribeData.lead.status = this.tableViewRequestData.status;
    this.getLeadList();
  }
  /**
   * @method  setFilterData()
   * @description - the following setFilterData() method is used update the search values and status
   * @author amitha.shetty
   */
  setFilterData() {
    if (this.selectedSearchText) {
      this.tableViewRequestData.searchText = this.selectedSearchText;
    }
    if (this.selectedSearchVLEText) {
      this.tableViewRequestData.searchVLE = this.selectedSearchVLEText;
    }
    if (this.selectedStatus) {
      this.tableViewRequestData.status = this.selectedStatus.value;
    }
    if (this.selectedBranchName) {
      this.tableViewRequestData.branchName = this.selectedBranchName;
    }
    if (this.selectedVillageName) {
      this.tableViewRequestData.villageName = this.selectedVillageName
    }
    if(this.customerStage){
      console.log(this.stage_selected,"stage selected")
      this.tableViewRequestData.customer_stage = this.stage_selected
    }
  }
  /**
 * @method  serchByBranchName()
 * @description - the following searchBranchName() method is used the search by branch Name
 * @author Arul
 */
  searchBranchName(event) {
    (this.search_fm_user_name != '') ? this.getRoleList() : (this.tableViewRequestData.coordinator_id = '')
    this.tableViewRequestData = new TableViewRequestSet();
    this.setFilterData();
    this.tableViewRequestData.branchName = this.selectedBranchName;
    if (event.key === "Enter") {
      this.searchFilter();
    }
  }

  searchVillageName(event) {
   
    (this.search_fm_user_name != '') ? this.getRoleList() : (this.tableViewRequestData.coordinator_id = '')
    this.tableViewRequestData = new TableViewRequestSet();
    this.setFilterData();
    this.tableViewRequestData.villageName = this.selectedVillageName;
    if (event.key === "Enter") {
      this.searchFilter();
    }
  }
  searchTMName(event) {
    if (event.key === "Enter") {
      this.searchFilter();
    }
  }
  searchDeliveryDay(event) {
    if (event.name != 'All') {
      this.delivery_day = event.name;
      this.tableViewRequestData.delivery_day = this.delivery_day;
      this.subscribeData.lead.delivery_day = this.delivery_day;
      this.leadDetails.setSelectedLeadStatus(this.subscribeData);
      this.searchFilter();
    } else {
      this.delivery_day = '';
      this.tableViewRequestData.delivery_day = this.delivery_day;
      this.subscribeData.lead.delivery_day = this.delivery_day;
      this.leadDetails.setSelectedLeadStatus(this.subscribeData);
      this.searchFilter();
      this.delivery_day = 'Delivery Day';
    }

  }
  selectActivity(event) {
    this.activities_selected = event.toString(); 
    this.tableViewRequestData.activities_selected = this.activities_selected
    this.subscribeData.lead.activities_selected = this.tableViewRequestData.activities_selected;
    this.getLeadList();
  }
  selectStage(event) {
    if (event.name != 'All') {
      this.stage_selected = event.id;
      this.tableViewRequestData.customer_stage = this.stage_selected;
      // this.subscribeData.lead.stage_selected = this.tableViewRequestData.stage_selected;
      this.getLeadList()
    } else {
      this.stage_selected = '';
      this.tableViewRequestData.customer_stage = this.stage_selected;
      // this.subscribeData.lead.stage_selected = this.tableViewRequestData.stage_selected;
      this.getLeadList()
    }

  }
  searchFilter() {
      this.tableViewRequestData.delivery_day = this.delivery_day;
      this.tableViewRequestData.customer_stage = this.stage_selected;
      this.tableViewRequestData.activities_selected = this.activities_selected;
      this.tableViewRequestData.villageName = this.selectedVillageName;
      this.tableViewRequestData.searchText = this.selectedSearchText;
      this.tableViewRequestData.searchVLE = this.selectedSearchVLEText;
      this.getLeadList();
  }

  /** CRUD OPERATIONS */
  /**
   * @method  create()
   * @description - the following create() method is used to navigate to create lead for creating lead
   * @author amitha.shetty
   */
  create() {
    this.router.navigate(['lead-management/create-lead']);
  }
  /**
   * @method  editUser()
   * @description - the following editUser() method is used to navigate to edit lead for editing lead
   * @param id - contains lead id for which lead can be editable
   * @author amitha.shetty
   */
  editUser(id: string) {
    this.router.navigate([`lead-management/edit-lead/${id}`]);
  }
  /**
   * @method  openDialog()
   * @description - the following openDialog() method is used to open dialog box  for delete confirmation.
   * @param id - contains customer id for deletion purpose
   * @param leadName - contains name of the lead
   * @author amitha.shetty
   */
  openDialog(id: string, leadName: string): void {
    const dialogRef = this.sharedService.openDialog(leadName);
    dialogRef.afterClosed().subscribe(result => {
      const data = {
        customer_id: id
      };
      if (result) {
        this.commonService.deleteDataNew('leads', data).subscribe(response => {
          if (response.status = 200) {
            this.sharedService.displaySuccessMessage('User Deleted Successfully');
            this.getLeadList();
          }
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
      }
    });
  }
  getScheduledTime(event, type): void {
    this.tableViewRequestData = new TableViewRequestSet();
    if (type === 'from') {
      this.tableDateFields.fromDate = event;
      this.subscribeData.lead.registerFromDate = this.sharedService.formateDate(event);
      const date = new Date(this.tableDateFields.fromDate);
      const requiredDate = date.setDate(date.getDate());
      this.minToDate = new Date(requiredDate);
    } else if (type === 'to') {
      this.tableDateFields.toDate = event;
      this.subscribeData.lead.registerToDate = this.sharedService.formateDate(event);
      const date = new Date(this.tableDateFields.toDate);
      const requiredDate = date.setDate(date.getDate() - 1);
      this.maxFromDate = new Date(requiredDate);
    }
    if (this.tableDateFields.fromDate && this.tableDateFields.toDate) {
      this.leadDetails.setSelectedLeadStatus(this.subscribeData);
      this.searchFilter();
    }
  }
  resetFilter() {
    this.tableViewRequestData.searchVLE = '';
    this.tableViewRequestData.searchText = '';
    this.tableViewRequestData.status = 1;
    this.selectedBranchName = '';
    this.tableViewRequestData.branchName = this.selectedBranchName;
    this.selectedVillageName = '';
    this.tableViewRequestData.villageName = this.selectedVillageName;
    this.search_fm_user_name = '';
    this.tableViewRequestData.search_fm_user_name = this.search_fm_user_name;
    this.oeRoleId = '';
    this.tableViewRequestData.coordinator_id = this.oeRoleId;
    this.customerActivity = [];
    this.activities_selected = '';
    this.tableViewRequestData.activities_selected = this.activities_selected;
    this.customerStage = 'Select stage';
    this.stage_selected = ''
    this.tableDateFields.fromDate = '';
    this.tableDateFields.toDate = '';
    this.delivery_day = '';
    this.tableViewRequestData.delivery_day = this.delivery_day;
    this.selectedSearchText = '';
    this.tableViewRequestData.searchText = this.selectedSearchText;
    this.selectedSearchVLEText = '';
    this.tableViewRequestData.searchVLE = this.selectedSearchVLEText;
    this.selectedStatus = {
      name: 'All',
      value: ''
    },
      this.SCName = 'TM search'
    if (this.selectedBtn == 'Directory') {
      this.selectStage({ name: 'Directory', id: '' });
    }
    else{
      this.getLeadList();
    }
    this.delivery_day = 'Delivery Day';
  }
  selectedRoleData(event) {
    this.userTabs = [];
    this.user = {
      name: 'Select User',
      id: '',
      items: []
    }
    if (event.name != 'All') {
      if (this.oeRoleId) {
        const requestSet = '?records_per_page=' + 10000 + '&page_number=' +
          1 + '&role=' + this.oeRoleId;
          this.loaderService.show('show');
        this.commonService.getDataNew('users' + requestSet).subscribe(res => {
          if (res.success) {
            this.userTabs = res.payload.records;
            this.userTabs.push({
              first_name: 'All',
              _id: ''
            });
          }
        }, (err) => {
           this.loaderService.show('hide');
          this.sharedService.displayErrorMessage(err.statusText);
        });
      } else {
      }
    } else {
      this.userTabs = [];
      this.getLeadList();
    }
  }

  selectedUserData(event) {
    if (event.id) {
      this.tableViewRequestData.coordinator_id = event.id;
      this.subscribeData.lead.coordinator_id = this.tableViewRequestData.coordinator_id;
      this.leadDetails.setSelectedLeadStatus(this.subscribeData);
      this.getLeadList();
    } else {
      this.tableViewRequestData.coordinator_id = '';
      this.subscribeData.lead.coordinator_id = this.tableViewRequestData.coordinator_id;
      this.leadDetails.setSelectedLeadStatus(this.subscribeData);
      this.getLeadList();
    }
  }



  makeActive(tabInfo: any) {
    // console.log(tabInfo,tabInfo.permission)
    if (!tabInfo.permission) {
      this.leadTabs.forEach(element => {
        if (tabInfo.name == element.name) {
          this.permission = element
        }
      })
    } else {
      this.permission = tabInfo.permission;
    }
    // console.log(this.permission)
    this.movingTo = [];
    // this.permission = tabInfo.permission;
    this.tableViewRequestData = new TableViewRequestSet();
    this.selectedBtn = tabInfo.key ? tabInfo.key : tabInfo.name;
    this.selectedTabData = this.tabData[tabInfo.key ? tabInfo.key : tabInfo.name];
    // this.showIndividualData = false;
    this.selectedBtnVal = tabInfo.val;
    this.selectedBtnVal ? this.selectedBtnVal : (this.selectedBtnVal = tabInfo.val);
    // console.log(tabInfo, this.selectedBtnVal);
    this.leadTabs
    this.searchVleText = '';
    // console.log(tabInfo.val);
    if (tabInfo.val == 0) {
      this.notEditStage = true;
    } else {
      this.notEditStage = false;
    }
    // this.assigneeOE = 'expand';
    // this.tableViewRequestData.status = tabInfo.value;
    this.tableViewRequestData.customer_stage = tabInfo.value;
    // this.subscribeData.lead.status = this.tableViewRequestData.status;
    this.subscribeData.lead.selectedOrder = tabInfo.downloadReportName;
    this.subscribeData.lead.searchFmUser = '';
    this.clickMe(this.selectedBtnVal)
    //fthis.getLeadList();
    this.resetFilter();
    // console.log(tabInfo.permission)
  }

  
  moveTo(event, item) {
    // console.log(event, item, '+++++++');
    const moveTo = {
      customer_stage: event,
      customer_id: item.id
    };
    // console.log(moveTo);
    this.sharedService.show('show');
    this.commonService.putDataNew('leads', moveTo).subscribe(res => {
      if (res.success) {
        setTimeout(() => {
          this.getLeadList();
        }, 2000);

      }
    }, (err) => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  addOrder(item) {
    console.log(item);
    const dialogRef = this.dialog.open(AddOrderComponent, {
      data: {
        message: 'View Products',
        item: item,
        type: this.selectedBtn,
      },
      minHeight: '100%',
      height: '100%',
      width: '60%',
      position: { left: '40%' }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  // clickEventsubscription: Subscription;
  clickMe(selectedBtnVal) {
    this.sharedService.sendClickEvent(selectedBtnVal);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
