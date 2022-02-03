import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {Router} from '@angular/router';
import { CommonService, SharedService, TableSurveylist, TableViewRoleRequestSet, SurveyZoneAPIRequestFinal, DownloadApiReference } from 'src/app/utils';

@Component({
  selector: 'app-survey-main',
  templateUrl: './survey-main.component.html',
  styleUrls: ['./survey-main.component.scss']
})
export class SurveyMainComponent implements OnInit {

  constructor(private router : Router, private commonService: CommonService, private sharedService: SharedService) { }
 public page_number:number=1;
  public totalsurveys_card: number;
  public active_card: number;
  public inactive_card: number;
  public freeSurveys_card: number;
  public totalearnings_card: number;
  public downloadApiDetails: DownloadApiReference;
  public tableViewRequestData: TableViewRoleRequestSet =
  new TableViewRoleRequestSet();
 // @Output() tabChanged: EventEmitter<string> = new EventEmitter();
  public tab: number=0;
  public tableListData: TableSurveylist = new TableSurveylist();
  //public tableListData: SurveyList = new SurveyList();
  public stateSelected =[];
  public districtSelected =[];
  public branchSelected =[];
  public villageSelected =[];
  public saheliSelected:string[] =[];
  public searchRecords: any;
  public surveyname=''
  public zoneData: any = {
    state: [],
    district: [],
    branch: [],
    village: [],
    saheli_id: [],
  };
  public saheliIds: any[] = [];
  public saheliIDforVle = [];
  zoneSelected = "";
   selectedState;
  states: any[] = [];
  districts: any[] = [];
  branches: any[] = [];
  village: any[] = [];
  saheliList=[];
  ngOnInit(): void {
    this.getTabData();
    this.getList(1);
    this.getBranchDetailsCollection();
  }

  clearSurvey() {
    this.stateSelected = [];
    this.districtSelected = [];
    this.branchSelected = [];
    this.villageSelected = [];
    this.saheliSelected = [];
    this.districts= [];
    this.branches= [];
    this.village= [];
    this.saheliList=[];
    this.saheliIds=[];
    this.surveyname=''
    this.getTabData();
    this.getList(1);
    this.getBranchDetailsCollection();
  }

  searchSurvey(){
    var data = {
      state: this.stateSelected,
      district: this.districtSelected,
      branch: this.branchSelected,
      village: this.villageSelected,
      saheli_id: this.saheliSelected
    };
    if(this.tab == 2) {
      let type = '';
      //this.getList(type);
    }else{
    var type=(this.tab == 0)?1:0;
    
    }
    this.commonService.getDataNew('survey?page_number='+this.page_number+'&records_per_page=10&sort_by_name=&lang=&state=' + this.stateSelected + 
    '&district=' + this.districtSelected + '&branch=' + this.branchSelected + '&village=' + this.villageSelected + '&saheli=' + this.saheliSelected+'&search_text='+this.surveyname+'&status='+type ).subscribe(response => {
      if (response.success) {
       // this.searchRecords = response.payload.records;
       this.tableListData = new TableSurveylist(response.payload);
      this.tableViewRequestData.pageNumber = 1;
      this.tableViewRequestData.recordsPerPage = 10;
      } else {
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  loadData(zone, event): void {
    console.log(event,"EVENTSS")
    switch (zone) {
      case "state": {
        this.zoneData = {
          state: event.value,
          district: [],
          branch: [],
          village: [],
        };
        this.districts = [];
        this.branches = [];
        this.village = [];
        this.districtSelected =[];
        this.branchSelected = [];
        this.villageSelected = [];
        this.saheliSelected= [];
        this.saheliList = [];
        this.saheliIds = [];
        this.zoneSelected = "State";
        break;
      }
      case "district": {
        this.zoneData = {
          state: this.zoneData.state,
          district: event.value,
          branch: [],
          village: [],
        };
        this.zoneSelected = "District";
        this.branches = [];
        this.village = [];
        this.branchSelected = [];
        this.villageSelected = [];
        this.saheliSelected= [];
        this.saheliList = [];
        this.saheliIds = [];
        break;
      }
      case "branch": {
        this.zoneData = {
          state: this.zoneData.state,
          district: this.zoneData.district,
          branch: event.value,
          village: [],
        };
        this.zoneSelected = "Branch";
        this.village = [];
        this.villageSelected = [];
        this.saheliSelected= [];
        this.saheliList = [];
        this.saheliIds = [];
        break;
      }
      case "village": {
        this.zoneData = {
          state: this.zoneData.state,
          district: this.zoneData.district,
          branch: this.zoneData.branch,
          village: event.value,
        };
        this.getSaheliList(this.zoneData);
        this.zoneSelected = "Village";
        this.saheliSelected= [];
        this.saheliList=[];
        this.saheliIds = [];
        break;
      }
      case "saheli": {
        this.zoneData = {
          state: this.zoneData.state,
          district: this.zoneData.district,
          branch: this.zoneData.branch,
          village: this.zoneData.village,
          saheli_id:event.value
        };
        this.getSaheliList(this.zoneData);
        console.log(this.saheliSelected,"SAHELI")
        this.zoneSelected = "Saheli";
        break;
      }
    }
    this.getZoneList(this.zoneData);
  }
  getSaheliList(zonedata): void {
    //const data = new SurveyZoneAPIRequestFinal(zonedata);
    var data = {
      state: [this.zoneData.state],
      district: [this.zoneData.district],
      branch: [this.zoneData.branch],
      village: [this.zoneData.village], 
    };
    this.commonService.postDataNew("survey/saheli/list", data).subscribe(
      (response) => {
        if (response.success) {
          console.log(response.data.rows.length, "LENGTH", response.data);
          if (response.data.rows.length > 0) {
            response.data.rows.forEach((element) => {
              console.log(element.id, "IDSS");
              if (
                this.saheliIds.includes(element.vle_code) === false &&
                element.vle_code !== null
              ) {
                this.saheliIds.push(element.vle_code);
                this.saheliIDforVle.push(element.id);
              }
            });
            console.log(this.saheliIds, "Inside saheli id");
          } else {
            console.log("inside else");
            //this.fmUserForm.branch = response.payload.records[0];
          }
        }
        //console.log(this.fmUserForm.branch,"INSIDE BRANCH")
      },
      (err) => {
        this.sharedService.displayErrorMessage(err.statusText);
      }
    );
  }
  getZoneList(zonedata): any {
    const data = new SurveyZoneAPIRequestFinal(zonedata);

    this.commonService
      .getDataNew("survey/saheli/zone" + data.requestSet)
      .subscribe(
        (response) => {
          if (response.success) {
            if (response.data.length > 0) {
              response.data.forEach((element) => {
                if (
                  this.states.includes(element.state) === false &&
                  element.state !== null
                ) {
                  this.states.push(element.state);
                }
                if (
                  this.districts.includes(element.district) === false &&
                  element.district !== null
                ) {
                  this.districts.push(element.district);
                }
                if (
                  this.branches.includes(element.branch) === false &&
                  element.branch !== null
                ) {
                  this.branches.push(element.branch);
                }
                if (
                  this.village.includes(element.village) === false &&
                  element.village !== null
                ) {
                  this.village.push(element.village);
                }

                //this.states.push(element.state);
              });
            } else {
              console.log("inside else");
              //this.fmUserForm.branch = response.payload.records[0];
            }
            return response.data;
          }
          //console.log(this.fmUserForm.branch,"INSIDE BRANCH")
        },
        (err) => {
          if (err) this.sharedService.displayErrorMessage(err.statusText);
          else this.sharedService.displayErrorMessage("Internal server error");
        }
      );
  }

  getBranchDetailsCollection(): void {
   this.commonService.getDataNew('users/searchBranchState?search_by_state=').subscribe(response => {
      if (response.success) {
        this.states = response.payload.records;
      } else {
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }


  tabChange(event: MatTabChangeEvent)
  {
    console.log(event)
    this.tab = event.index;
    if(this.tab == 2) {
      let type = '';
      this.getList(type);
    }else{
    var type=(this.tab == 0)?1:0;
    this.getList(type);
    }
  }
  createSurvey(){
  //  this.router.navigate(['survey/survey-menu'])
    this.router.navigate(['survey/survey-menu/create-survey'])
  }
  downloadData() {
    this.commonService.getDataNew('download/getlist?email=&type=survey&state=' + this.stateSelected + 
    '&district=' + this.districtSelected + '&branch=' + this.branchSelected + '&village=' + this.villageSelected + '&saheli=' + this.saheliSelected).subscribe(response => {
      if (response) {
          this.sharedService.displayErrorMessage(response.data);
      //m this.loaderService.show('hide');   &page_number=1&records_per_page=5&sort_by_name=1&status=
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    //m this.loaderService.show('hide');
    });
  }
  getTabData(): void {
    this.commonService.getDataNew('survey/tabs').subscribe(res => {
     // this.tabDataFields = new SurveyTabDetails(res.payload);
      this.totalsurveys_card = res.data.total;
      this.active_card = res.data.active;
      this.inactive_card = res.data.inactive;
      this.freeSurveys_card = res.data.free;
      this.totalearnings_card = res.data.earnings;
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }

  getList(data:any): void {
    this.commonService.getDataNew('survey?page_number='+this.page_number+'&records_per_page=10&sort_by_name=&lang=&state=' + this.stateSelected + 
    '&district=' + this.districtSelected + '&branch=' + this.branchSelected + '&village=' + this.villageSelected + '&saheli=' + this.saheliSelected+'&search_text='+this.surveyname+'&status='+data).subscribe(res => {
      this.tableListData = new TableSurveylist(res.payload);
      this.tableViewRequestData.pageNumber = 1;
      this.tableViewRequestData.recordsPerPage = 10;
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
}

getPage(id,type){
  this.page_number=id;
  if(type == 0)
      this.getList(1);
  else if(type == 1)
      this.getList(0);
  else
      this.getList('')
 // console.log(event,type);

}

}
