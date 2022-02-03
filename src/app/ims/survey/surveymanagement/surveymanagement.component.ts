import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CommonService, SideNavService, SharedService, SurveyDetailsData, SurveyDetailSet,SurveyZoneAPIRequestFinal, UserSurveyList } from 'src/app/utils';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-surveymanagement',
  templateUrl: './surveymanagement.component.html',
  styleUrls: ['./surveymanagement.component.scss'],
})
export class SurveymanagementComponent implements OnInit {
  public subscription: Subscription;
  routeSegmentId: string;
  public survey_name;
  public stateSelected =[];
  public districtSelected =[];
  public branchSelected =[];
  public villageSelected =[];
  public saheliSelected:string[] =[];
  public respname=''
  public maname=''
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
  // public tabDataFields: SurveyTabDetails = new SurveyTabDetails();
  constructor(
    private commonService: CommonService,
    private http: HttpClient,
    private sharedService: SharedService,
    private router: Router,
    private sidenavService: SideNavService
  ) {
    this.subscription = this.sidenavService.getSubText().subscribe((message) => {
      if (message) {
        // this.selectedBtnVal = message.text.val;
        this.makeActive(message.text);
      } else {
        console.log('inside else');
        // clear messages when empty message received
        //this.selectedBtnVal = 0;
      }
    });
  }
  public totalsurveys_card: number;
  public active_card: number;
  public inactive_card: number;
  public freeSurveys_card: number;
  public totalearnings_card: number;
  public tableHeaders = [
    { header: 'S.No', width: '10%' },
    { header: 'Saheli Name/ ID'},
    { header: 'Respondent Name' },
    { header: 'Phone' },
    { header: 'Email' },
    { header: 'State' },
    { header: 'District' },
    { header: 'Response' },
    { header: 'Actions' }
  ];
  public tableHeadersList = {
    0: [
      { header: 'S.No', width: '10%' },
      { header: 'ID'},
      { header: 'Respondent Name' },
      { header: 'Phone' },
    ],
    1: [
      { header: 'S.No', width: '10%' },
    { header: 'ID'},
    { header: 'Respondent Name' },
    { header: 'Phone' },
    ],
    2: [
      { header: 'S.No', width: '10%' },
      { header: 'ID'},
      { header: 'Respondent Name' },
      { header: 'Phone' },
    ],
    3: [
      { header: 'S.No', width: '10%' },
      { header: 'ID'},
      { header: 'Respondent Name' },
      { header: 'Phone' },
    ],
  };
  public user_survey_list: SurveyDetailsData = new SurveyDetailsData();
  public page_number: number = 1;
  public listUserSurvey;
  public status=0;
currentTab=0;


  ngOnInit(): void {
    console.log('inside');
    const urlSegment = this.sharedService.urlSegmentKeys();
    this.routeSegmentId = urlSegment[urlSegment.length - 1].path;
    console.log(this.routeSegmentId,"Segemtn")
    this.tableHeaders = this.tableHeadersList[0];
    this.getTabData();
    this.getList(0);
    this.getBranchDetailsCollection();
   // interval(120000).subscribe((x) => this.getList(1));
  }

  searchSurvey(){
    this.commonService
      .getDataNew('survey/'+this.routeSegmentId+'?status='+this.currentTab + '&state=' + this.stateSelected + 
      '&district=' + this.districtSelected + '&branch=' + this.branchSelected + '&village=' + this.villageSelected + 
      '&saheli=' + this.saheliSelected+'&respondent='+this.respname+'&ma='+this.maname)
      .subscribe(
        (res) => {
          // this.user_survey_list = new SurveyDetailsData(res.data.user_surveys.payload.records);
          //this.data = res.data.user_surveys.payload.records;
          this.survey_name = res.data.name;
          let dataAll = res.data;

          let count = res.data.user_surveys.payload.records.length;

          this.listUserSurvey = dataAll.user_surveys.payload.records;

         // console.log(this.listUserSurvey);
        },
        (err) => {
          this.sharedService.displayErrorMessage('');
        }
      );
  }
  tabChange(event: MatTabChangeEvent) {
    console.log(event);
    const tab = event.tab.textLabel;
    var type;

    switch (tab) {
      case 'Pending':
        type = 0;
        break;
      case 'Approved':
        type = 1;
        break;
      case 'Validated':
        type = 2;
        break;
      case 'Rejected':
        type = 3;
        break;

      default:
        type = 0;
        break;
    }
    this.currentTab=type
    this.tableHeaders = this.tableHeadersList[type];
    this.getList(type);
  }

  makeActive(tabInfo: any) {
    console.log('inside clickedd', tabInfo);
    if (tabInfo.name === 'List') {
      console.log('list selected');
      this.router.navigate(['survey']);
    } else if (tabInfo.name === 'Create') {
      console.log('create selected');
      this.router.navigate(['survey/create-survey']);
    } else if (tabInfo.name === 'Build') {
      console.log('build selected');
      this.router.navigate(['survey/build-survey']);
    } else if (tabInfo.name === 'Home') {
      console.log('home selected');
      this.router.navigate(['survey/home-survey']);
    }
  }
  clearSurvey() {
    this.stateSelected = [];
    this.districtSelected = [];
    this.branchSelected = [];
    this.villageSelected = [];
    this.saheliSelected = [];
    this.respname=''
    this.maname=''
    this.getTabData();
    this.getList(0);
    this.getBranchDetailsCollection();
  }
  getList(data: number): void {
    this.commonService
      .getDataNew('survey/'+this.routeSegmentId+'?status='+this.currentTab + '&state=' + this.stateSelected + 
      '&district=' + this.districtSelected + '&branch=' + this.branchSelected + '&village=' + this.villageSelected + 
      '&saheli=' + this.saheliSelected+'&respondent='+this.respname+'&ma='+this.maname)
      .subscribe(
        (res) => {
          // this.user_survey_list = new SurveyDetailsData(res.data.user_surveys.payload.records);
          //this.data = res.data.user_surveys.payload.records;
          this.survey_name = res.data.name;
          let dataAll = res.data;

          let count = res.data.user_surveys.payload.records.length;

          this.listUserSurvey = dataAll.user_surveys.payload.records;

         // console.log(this.listUserSurvey);
        },
        (err) => {
          this.sharedService.displayErrorMessage('');
        }
      );
  }

  getTabData(): void {
    this.commonService.getDataNew('survey/tabs/'+this.routeSegmentId).subscribe(
      (res) => {
        // this.tabDataFields = new SurveyTabDetails(res.payload);
        this.totalsurveys_card = res.data.total;
        this.active_card = res.data.valid;
        this.inactive_card = res.data.approved;
        this.freeSurveys_card = res.data.rejected;
        this.totalearnings_card = res.data.earnings;
      },
      (err) => {
        this.sharedService.displayErrorMessage('');
      }
    );
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

  downloadData() {
    //?type=survey_detail&status=0&state=Demo State&district=Demo district New&branch=Demo Branch New&village=Test&saheli=10110&survey_id=76b14630-8c43-41ba-9e3a-292d676eea7f&user_id=74f95fd4-a3b9-49e5-a313-cb40903628c6
    let requestset ='email=&type=survey_detail&page_number=1&records_per_page=5&sort_by_name=1&status=' +this.currentTab + 
    '&state=' + this.stateSelected + '&district=' + this.districtSelected + '&branch=' + this.branchSelected + 
    '&village=' + this.villageSelected + '&saheli=' + this.saheliSelected + '&survey_id=' + this.routeSegmentId;
    this.commonService.getDataNew('download/getlist?' + requestset).subscribe(response => {
      if (response) {
          this.sharedService.displayErrorMessage(response.data);
      //m this.loaderService.show('hide');
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    //m this.loaderService.show('hide');
    });
  }

  getPage(id, type) {
    this.page_number = id;
    this.getList(type);
  }

  goBack() {
    this.router.navigate(['survey']);
  }

  onSurveyStatusUpdate(){
    this.getTabData()
  }
}
