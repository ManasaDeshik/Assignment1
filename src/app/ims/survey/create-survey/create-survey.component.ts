import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import {
  BranchApiRequestSetFinal,
  CommonService,
  SharedService,  
  SurveyZoneAPIRequestFinal,  
  TableDateFields,
} from "src/app/utils";
import { SurveyData } from "src/app/utils/models/survey";

export interface TableData {
  FromDate: string;
  Earnings: number;
}

const ELEMENT_DATA: TableData[] = [{ FromDate: "", Earnings: null }];

@Component({
  selector: "app-create-survey",
  templateUrl: "./create-survey.component.html",
  styleUrls: ["./create-survey.component.scss"],
})
export class CreateSurveyComponent implements OnInit {
  myControl = new FormControl();
  public startDate: any;
  public form: FormGroup;
  public showSaheliCount: boolean = false;
  public stateSelected =[];
  public districtSelected =[];
  public branchSelected =[];
  public villageSelected =[];
  public saheliSelected:string[] =[];
  public endDate: any;
  public showBudgetSection: boolean = false;
  public tableDateFields: TableDateFields = new TableDateFields();
  public storeImages = [];
  public storeImageString = "";
  public surveyName;
  public surveyDesc;
  public numOfSubmissionsPerSaheli;
  public numOfSubmissions;
  public budgetTable;
  public uploadImageInfo: any;
  public fileName: any = '';
  public fileName_2 : any = '';
  public isEdit=false;
  public paidSurveyDisabled: boolean = true;
  public mydate:any=''
  @Input() surveydata = new SurveyData();
  options: string[] = ['One', 'Two', 'Three'];
 // public surveyId:string;
 @Output() surveyId = new EventEmitter<any>();
 @Input() surveyIdForEdit;
 @Input() viewOnly;
 @Output() refresh = new EventEmitter<{ status: any }>();
  status = 0;
  surveyid;
  public zoneData: any = {
    state: [],
    district: [],
    branch: [],
    village: [],
    saheli_id: [],
  };
  public saheliIds: any[] = [];
  public saheliIDforVle = [];
  countSaheli: number = 0;
  zoneSelected = "";
  public enableaddimage: boolean = true;
  public chipList: string[] = [];
  individualCount_state: number = 0;
  individualCount_district: number = 0;
  individualCount_branch: number = 0;
  individualCount_village: number = 0;
  displayedColumns: string[] = ["FromDate", "Earnings"];
  personList: Array<any> = [
    {
      id: 1,
      name: "Aurelia Vega",
      age: 30,
      companyName: "Deepends",
      country: "Spain",
      city: "Madrid",
    },
    {
      id: 2,
      name: "Guerra Cortez",
      age: 45,
      companyName: "Insectus",
      country: "USA",
      city: "San Francisco",
    },
    {
      id: 3,
      name: "Guadalupe House",
      age: 26,
      companyName: "Isotronic",
      country: "Germany",
      city: "Frankfurt am Main",
    },
    {
      id: 4,
      name: "Aurelia Vega",
      age: 30,
      companyName: "Deepends",
      country: "Spain",
      city: "Madrid",
    },
    {
      id: 5,
      name: "Elisa Gallagher",
      age: 31,
      companyName: "Portica",
      country: "United Kingdom",
      city: "London",
    },
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: any[] = ELEMENT_DATA;
  dataSource: MatTableDataSource<any>;
  columnInput: FormGroup;
  columnInputArray: FormArray;
  public imageUploaded = [];

  /*states: string[] = [
    'Rajasthan',
    'Uttarkhand',
    'Bihar',
    'Andra Pradesh',
    'Karnataka',
    'Tamil Nadu',
  ];*/
  selectedState;
  states: any[] = [];
  districts: any[] = [];
  branches: any[] = [];
  village: any[] = [];
  temp: any = [];
  filteredOptions: Observable<string[]>;
  saheliList=[]
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private commonService: CommonService,
    private sharedService: SharedService
  ) {
    this.transpose();
    this.fillLabels();
  }

  registrationForm = this.fb.group({
    file: [null],
  });

  imageUrl: any;
  editFile: boolean = true;
  removeUpload: boolean = false;
  ngOnChanges():void{
    console.log(this.surveydata,"survey id for onchanges");
    for(var i =0; i<this.surveydata?.survey_earnings?.length;i++){
      if(i==0) continue;
      this.addColumn();
    }
    
    
  }
 /* getEditData(){
    const urlSegment = this.sharedService.urlSegmentKeys();
    this.surveyIdForEdit = urlSegment[urlSegment.length - 1].path;
    console.log("INSIDE STEP1",this.surveyIdForEdit);
    this.commonService.getDataNew("survey/"+ this.surveyIdForEdit).subscribe(
      (res) => {
        this.surveydata = new SurveyData(res.data);
        this.surveyName = res.data.name;
       },
      (err) => {
        this.sharedService.displayErrorMessage('');
      }
    );
  }
  setSurveyAction(){
    const urlSegment = this.sharedService.urlSegmentKeys();
    var action = urlSegment[2].path;
    console.log(action,"SUrvey action")
    if(action == 'edit-survey'){
      this.getEditData();
    }
  }*/

  ngOnInit(): void {
    console.log(this.surveyIdForEdit,"Survey id for edit")
    this.showBudget();
    this.columnInput = this.fb.group({
      items: this.fb.array([this.createItem()]),
    });
   // this.getZoneList(this.zoneData);
   this.form = this.fb.group({
    example: ''
  })
   this.getBranchDetailsCollection();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    this.temp = this.columnInput.get("items") as FormArray;
    this.zoneData = {
      state: this.surveydata.stateSelected,
      district: this.surveydata.districtSelected,
      branch: this.surveydata.branchSelected,
      village: this.surveydata.villageSelected,
      saheli_id: this.surveydata.saheliSelected
    };
    console.log(this.zoneData,"DATA IN ZONE",this.surveydata.stateSelected)
    // if(this.surveydata.stateSelected){
    //   this.loadData('state',this.surveydata.stateSelected)
    // }
    // if(this.surveydata.districtSelected){
    //   this.loadData('district',this.surveydata.districtSelected)
    // }
    // if(this.surveydata.branchSelected){
    //   this.loadData('branch',this.surveydata.districtSelected)
    // }
    // if(this.surveydata.villageSelected){
    //   this.loadData('village',this.surveydata.villageSelected)
    // }
    //this.setSurveyAction();
    //this.temp = this.columnInput.get('items') as FormArray;
    //this.countSaheli = this.individualCount_state;
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  createItem(): FormGroup {
    return this.fb.group({
      date: null,
      amount: 0,
    });
   
  }

  transpose() {
    let transposedData = [];
    for (let column = 0; column < this.displayedColumns.length; column++) {
      transposedData[column] = {
        label: this.displayedColumns[column],
      };
      for (let row = 0; row < this.data.length; row++) {
        transposedData[column][`column${row}`] = this.data[row][
          this.displayedColumns[column]
        ];
      }
    }
    this.dataSource = new MatTableDataSource(transposedData);
  }

  fillLabels() {
    this.displayedColumns = ["label"];
    for (let i = 0; i < this.data.length; i++) {
      this.displayedColumns.push("column" + i);
    }
  }
  deleteColumn(){
    try {
      console.log(this.columnInput.get("items"),this.temp);
      if(this.temp.controls.length > 1)
         this.temp.controls.pop();
         this.surveydata.amount.pop();
         this.surveydata.date.pop();
        // this.columnInput.get("items").controls.pop();
    } catch (ex) {
      console.log(ex);
    }
  }
  addColumn() {
    try {
      console.log(this.columnInput.get("items"));
      this.temp.push(this.createItem());
    } catch (ex) {
      console.log(ex);
    }
  }
  getColumn() {
    console.log(this.temp["controls"]);
    return this.temp["controls"];
  }
  removeFile(name){
    if(name == 'fileName'){
      this.surveydata.fileName = '';
      this.imageUploaded.splice(0,1);
      this.enableaddimage = true;
      this.status = 0;
    }
      
    else{
      this.surveydata.fileName_2 = '';
      this.imageUploaded.splice(1,1);
      this.enableaddimage = true;
    //  this.status = 1;
      if(!this.surveydata.fileName_2){
        this.status = 1;
      }
      else {
      this.status = 0;
      }
      if(!this.surveydata.fileName && !this.surveydata.fileName_2) {
        this.status = 0;
      }
    }
      
  }

  uploadFile(event) {
    if (event.target.files[0].name) {
      // console.log((event.target.files[0].size / 1000))
      if (
        window["restrictImageMinSize"] < event.target.files[0].size / 1000 &&
        event.target.files[0].size / 1000 < 1025
      ) {
        const reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
          //console.log(reader.result,"RESULT")
          if (this.status == 0) {
            this.surveydata.fileName = reader.result;
            this.status = 1;
          } else {
            this.surveydata.fileName_2 = reader.result;
            this.status = 0;
          }
          if(this.surveydata.fileName && this.surveydata.fileName_2) {
            this.enableaddimage = false;
          }
        };
        this.uploadImageInfo = event.target.files[0];
        console.log(this.surveydata.fileName,"IMAGE file")
        // this.image = "";
      } else {
        this.sharedService.displayErrorMessage(
          `File size should be in between ${window["restrictImageMinSize"]} Kilo bytes to 1 Mega bytes`
        );
      }
    } else {
      this.surveydata.fileName = "";
    }
  }
  submitInCreate(type: string, tabIndex: number,statusInCreate,surveyid,isEdit): number {
    console.log(this.storeImages, "SURVEYNAME",surveyid);
    var status = 0;
    console.log(statusInCreate,"STATUS")
    //this.survey.surveyItems.forEach(element => {
    /*const formData: FormData = new FormData();
      formData.append('name', this.surveyName);
      formData.append('instruction',this.surveyDesc);
      formData.append('status','1');
      formData.append('start_date',this.startDate);
      formData.append('expire_date', this.endDate);
      formData.append('number_Of_submission',this.numOfSubmissions);
      formData.append('number_Of_submission_per_saheli', this.numOfSubmissionsPerSaheli);
      formData.append('source_language','en');
      formData.append('destination_language','te');
      formData.append('images',this.storeImages);*/
    
      var controls = this.getColumn();
      var earnings_amount=[];
      controls.forEach(element => {
        earnings_amount.push(element.value)
      });
     if(!this.surveydata.startDate){
       this.sharedService.displayErrorMessage("Start date is mandatory");
       statusInCreate = 0;
       return 0;
     }
     if(!this.surveydata.endDate){
      this.sharedService.displayErrorMessage("End date is mandatory");
      statusInCreate = 0;
      return 0;
    }
      const convertDate = new Date(this.surveydata.startDate);
      var month = convertDate.getMonth()+1;
      var startdate = convertDate.getDate() + '/' + month + '/' + convertDate.getFullYear();
      var starttime = convertDate.getHours()+':'+convertDate.getMinutes()+':'+convertDate.getSeconds();
      var fullStartDate = startdate+' '+starttime;
    
      const convertDate_endDate = new Date(this.surveydata.endDate);
      var month_endDate = convertDate_endDate.getMonth()+1;
      var endDate = convertDate_endDate.getDate() + '/' + month_endDate + '/' + convertDate_endDate.getFullYear();
      var endtime = convertDate_endDate.getHours()+':'+convertDate_endDate.getMinutes()+':'+convertDate_endDate.getSeconds();
      var fullEndDate = endDate+' '+endtime;
      var toggleStatus;
      console.log(this.surveydata.toggleStatus,"TOGGLE")
      console.log(earnings_amount,"EARNINGS AMOUNT")
     
        
     // });
      if(this.surveydata.toggleStatus == true){
       
        toggleStatus = 1;
       
        for(var i=0; i<earnings_amount.length ; i++){
          console.log(earnings_amount[i],"EARNINGS AMOUNT")
          const convertDate_earningDate = new Date(earnings_amount[i].date);
          var month_endDate = convertDate_earningDate.getMonth()+1;
          var endDate = convertDate_earningDate.getDate() + '/' + month_endDate + '/' + convertDate_earningDate.getFullYear();
          earnings_amount[i].date = endDate;
          
          if(earnings_amount[i].amount == 0 ){
            console.log("inside")
            this.sharedService.displayErrorMessage("Earnings amount cannot be zero");
            return 0;
          }
          else if(!earnings_amount[i].amount || !earnings_amount[i].date)
          {
            this.sharedService.displayErrorMessage("Enter earnings and date");
            return 0;
          }
        }
      }
          
      else{
        toggleStatus = 0;
        earnings_amount = [];
       // console.log(earnings_amount[0].amount,"earnignss")
        
      }
        
         this.zoneData = {
          state: this.surveydata.stateSelected,
          district: this.surveydata.districtSelected,
          branch: this.surveydata.branchSelected,
          village: this.surveydata.villageSelected,
          saheli_id: this.surveydata.saheliSelected
        };
    var data = {
      name: this.surveydata.surveyName,
      instruction: this.surveydata.surveyDesc,
      start_date: fullStartDate,
      expire_date: fullEndDate,//'10/12/2021',//this.endDate,
      validate_phone: "1",
      earning_amount: earnings_amount,
      is_paid_survey : toggleStatus,
      number_Of_submission : this.surveydata.numOfSubmissions,
      number_Of_submission_per_saheli : this.surveydata.numOfSubmissionsPerSaheli,/*[
       {amount:'10',date:'12/12/2021'}
        // { amount: this.data[0].Earnings, date: this.data[0].FromDate },
      ],*/
      source_language: "en",
      destination_language: ["hi", "te"],
      images: this.imageUploaded,
      location: this.zoneData
    };
    console.log(statusInCreate,"STATUS IN CREATE")
    var dataForPut = {
      name: this.surveydata.surveyName,
      instruction: this.surveydata.surveyDesc,
      start_date: fullStartDate,
      expire_date: fullEndDate,//'10/12/2021',//this.endDate,
      validate_phone: "1",
      earning_amount: earnings_amount,/*[
       {amount:'10',date:'12/12/2021'}
        // { amount: this.data[0].Earnings, date: this.data[0].FromDate },
      ],*/
      source_language: "en",
      destination_language: ["hi", "te"],
      images: this.imageUploaded,
      is_paid_survey : toggleStatus,
      number_Of_submission : this.surveydata.numOfSubmissions,
      number_Of_submission_per_saheli : this.surveydata.numOfSubmissionsPerSaheli,
      location: this.zoneData,
      id:isEdit || this.viewOnly || statusInCreate > 1?  this.surveydata.surveyid_edit : this.surveyid,
      language:'en'
    };
    //});
    if(type == "saveAsDraft") data['is_draft']=1;
    if(type == "saveAsDraft") dataForPut['is_draft']=1;
    console.log(statusInCreate,"STATUS IN CREATE")
    if(this.surveydata.surveyid_edit) {
      this.surveyid = this.surveydata.surveyid_edit;
    }
    if(statusInCreate == 1 &&  !this.surveyid){
      this.commonService.postDataNew("survey", data).subscribe(
        (res) => {
          console.log(res.data.id,"SURVEY ID")
          this.surveyId.emit(res.data.id);
          this.surveyid = res.data.id
         // console.log(this.surveyId,"SURVEYID");
          if (type == "saveAsDraft") {
            this.sharedService.displayErrorMessage("Saved successfully");
            this.refresh.emit({status:0});
          } else if (type == "submit" && tabIndex == 0) {
            if(!this.viewOnly){
              this.sharedService.displayErrorMessage("Submitted successfully");
            }
            
            this.refresh.emit({status:1});
          } 
        },
        (err) => {
          //m this.loaderService.show('hide');
          console.log(err,"MESSAGE")
          this.refresh.emit({status:0});
          this.sharedService.displayErrorMessage(err.error.message[0]);
          status = 1;
          return 0;
        }
      );
    }
    else{
      this.commonService.putDataNew("survey", dataForPut).subscribe(
        (res) => {
         
          console.log(res.data.id,"SURVEY ID")
          //this.surveyId.emit(res.data.id);
          if (type == "saveAsDraft") {
            this.sharedService.displayErrorMessage("Saved successfully");
            this.refresh.emit({status:0});
          } else if (type == "submit" && tabIndex == 0) {
            if(!this.viewOnly){
              this.sharedService.displayErrorMessage("Submitted successfully");
            }
            this.refresh.emit({status:1});
          } 
        },
        (err) => {
          //m this.loaderService.show('hide');
          this.refresh.emit({status:0});
          this.sharedService.displayErrorMessage(err.error.message[0]);
          status = 1;
          return 0;
        }
      );
    }

    
    return status;
  }
  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

  loadData(zone, event): void {
    console.log(event,"EVENTSS")
    switch (zone) {
      case "state": {
        if(this.stateSelected)
        this.zoneData = {
          state: event,
          district: [],
          branch: [],
          village: [],
        };
        this.districts = [];
        this.branches = [];
        this.village = [];
        this.surveydata.districtSelected =[];
        this.surveydata.branchSelected = [];
        this.surveydata.villageSelected = [];
        this.surveydata.saheliSelected= [];
        this.saheliList = [];
        this.saheliIds = [];
        this.zoneSelected = "State";
        break;
      }
      case "district": {
        this.zoneData = {
          state: this.zoneData.state,
          district: event,
          branch: [],
          village: [],
        };
        this.zoneSelected = "District";
        this.branches = [];
        this.village = [];
        this.surveydata.branchSelected = [];
        this.surveydata.villageSelected = [];
        this.surveydata.saheliSelected= [];
        this.saheliList = [];
        this.saheliIds = [];
        break;
      }
      case "branch": {
        this.zoneData = {
          state: this.zoneData.state,
          district: this.zoneData.district,
          branch: event,
          village: [],
        };
        this.zoneSelected = "Branch";
        this.village = [];
        this.surveydata.villageSelected = [];
        this.surveydata.saheliSelected= [];
        this.saheliList = [];
        this.saheliIds = [];
        break;
      }
      case "village": {
        this.zoneData = {
          state: this.zoneData.state,
          district: this.zoneData.district,
          branch: this.zoneData.branch,
          village: event,
        };
        this.getSaheliList(this.zoneData);
        this.zoneSelected = "Village";
       this.surveydata.saheliSelected= [];
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
          saheli_id:event
        };
        this.getSaheliList(this.zoneData);
        this.showSaheliCount = false;
        console.log(this.surveydata.saheliSelected,"SAHELI")
        this.zoneSelected = "Saheli";
        break;
      }
    }
    this.getZoneList(this.zoneData);
  }
removeItem(){
  console.log("Item removed")
  
  this.addZones();
}
  getBranchDetailsCollection(): void {
    // console.log(identifier,bool)
    /*if (bool) {
      const data = new BranchApiRequestSetFinal(this.branchData);
    } else {
      const data = new BranchApiRequestSet(this.branchData);
    }
    const data = new BranchApiRequestSet(this.branchData);
    console.log(identifier)
    let url = (identifier=='state') ? 'searchBranchState' : (identifier=='district') ? 'searchBranchDistrict' : (identifier=='panchayat') ? 'searchBranchPanchayat' : (identifier=='name') ? 'branches/name': 'searchBranchVillage'
    */
   this.commonService.getDataNew('users/searchBranchState?search_by_state=').subscribe(response => {
      if (response.success) {
        this.states = response.payload.records;
      } else {
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
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

  getSaheliList(zonedata): void {
    //const data = new SurveyZoneAPIRequestFinal(zonedata);
    var data = {
      state: this.zoneData.state,
      district: this.zoneData.district,
      branch: this.zoneData.branch,
      village: this.zoneData.village, 
    };
    this.commonService.postDataNew("survey/saheli/list", data).subscribe(
      (response) => {
        if (response.success) {
          console.log(response.data.rows.length, "LENGTH", response.data);
          if (response.data.rows.length > 0) {
            response.data.rows.forEach((element) => {
              if (
                this.saheliIds.includes(element.vle_code) === false &&
                element.vle_code !== null
              ) {
                this.saheliIds.push(element.vle_code);
                this.saheliIDforVle.push(element.id);
              }
            });
            //console.log(this.saheliIds, "Inside saheli id");
          } else {
            console.log("inside else");
            //this.fmUserForm.branch = response.payload.records[0];
          }
        }
        if(this.saheliIds.length == 0){
          this.sharedService.displayErrorMessage("No saheli associated");
          return;
        }
        //console.log(this.fmUserForm.branch,"INSIDE BRANCH")
      },
      (err) => {
        this.sharedService.displayErrorMessage(err.statusText);
      }
    );
  }
  addFile(index: number, event) {

    if(!this.enableaddimage) {
      this.sharedService.displayErrorMessage("Maximum Images are added");
    }
    
    for (const file of event.srcElement.files) {
      if (
        window["restrictImageMinSize"] < event.target.files[0].size / 1000 &&
        event.target.files[0].size / 1000 < window["restrictImageMaxSize"]
      ) {
       if (!this.storeImages.some(val => val.name === file.name)) {
        const formData: FormData = new FormData();
        const { v4: uuid } = require("uuid");

        let id = uuid();
        if (file) {
          formData.append("images", file);
          //formData.append('survey_id','76b14630-8c43-41ba-9e3a-292d676eea7f')
          //formData.append('type', 'products');
        }
        this.commonService
          .fileupload("survey/upload", formData)
          .subscribe((response) => {
            if (response) console.log("insideee");
            console.log("123", response);
            var ids = [];
            response.url.forEach((element) => {
              this.imageUploaded.push(element);
            });
            this.uploadFile(event);
            console.log(this.imageUploaded, "images uploaded");
          });
      } else {
        this.sharedService.displayErrorMessage(
          "Image has been already uploaded"
        );
      }
    } else {
      this.sharedService.displayErrorMessage(`File size should be in between ${window['restrictImageMinSize']} Kilo bytes to ${window['restrictImageMaxSize']}  Kilo bytes`);
    }
    }
  }
  updateCount() {
    console.log(this.zoneSelected, "ZONE SELECted");
    switch (this.zoneSelected) {
      case "State": {
        if (this.chipList.includes("State") === false) {
          this.chipList.push("State");
          console.log(this.countSaheli, "COUNTT");
        }
        console.log(this.individualCount_state);
        this.countSaheli = this.countSaheli + this.individualCount_state;
        break;
      }
      case "District": {
        if (this.chipList.includes("District") === false) {
          this.chipList.push("District");
          console.log(
            this.countSaheli,
            "COUNTT",
            this.individualCount_district
          );
        }
        this.countSaheli = this.countSaheli + this.individualCount_district;
        break;
      }
      case "Branch": {
        if (this.chipList.includes("Branch") === false) {
          this.chipList.push("Branch");
        }
        this.countSaheli = this.countSaheli + this.individualCount_branch;
        break;
      }
      case "Village": {
        if (this.chipList.includes("Village") === false) {
          this.chipList.push("Village");
        }
        this.countSaheli = this.countSaheli + this.individualCount_village;
        break;
      }
    }
  }
public zoneCount;
  addZones() {
    this.showSaheliCount = true;
    console.log(this.zoneData,"ZONEDATA")
    var data = {
      state: this.zoneData.state,
      district: this.zoneData.district,
      branch: this.zoneData.branch,
      village: this.zoneData.village,
      saheli_id: this.zoneData.saheli_id
    };
    this.commonService.postDataNew("survey/saheli/count", data).subscribe(
      (response) => {
        if (response.success) {
          if (response.data.length > 0) {
            this.saheliList=response.data
            console.log(response.data)
            response.data.forEach((element) => {
              if (element.district)
                this.individualCount_district = parseInt(element.sahelicount);
              else if (element.state)
                this.individualCount_state = parseInt(element.sahelicount);
              else if (element.branch)
                this.individualCount_branch = parseInt(element.sahelicount);
              else if (element.village)
                this.individualCount_village = parseInt(element.sahelicount);
            });
            this.zoneCount = response.data.length;
            this.updateCount();
            console.log(this.individualCount_state, "Inside saheli id");
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

  onSelectAll(element) {
   // switch (element) {
     // case "State": {
        // this.countSaheli = this.countSaheli - this.individualCount_state;
        const selected = this.states.map(item => item);
    this.form.get('example').patchValue(selected);
    //this.loadData(selected,)
 //       break;
      // }
      // case "District": {
      //   this.countSaheli = this.countSaheli - this.individualCount_district;
      //   break;
      // }
      // case "Branch": {
      //   this.countSaheli = this.countSaheli - this.individualCount_branch;
      //   break;
      // }
      // case "Village": {
      //   this.countSaheli = this.countSaheli - this.individualCount_village;
      //   break;
      // }

//  }
}
  onClearAll() {
    this.form.get('example').patchValue([]);   
  }

  removeChip(element) {
    const index = this.surveydata.saheliSelected.indexOf(element.vle_code);
    const i =this.saheliList.indexOf(element)
   /* switch (element) {
      case "State": {
        this.countSaheli = this.countSaheli - this.individualCount_state;
        break;
      }
      case "District": {
        this.countSaheli = this.countSaheli - this.individualCount_district;
        break;
      }
      case "Branch": {
        this.countSaheli = this.countSaheli - this.individualCount_branch;
        break;
      }
      case "Village": {
        this.countSaheli = this.countSaheli - this.individualCount_village;
        break;
      }
    }*/
    if (index >= 0) {
      this.surveydata.saheliSelected.splice(index, 1);
      this.surveydata.saheliSelected = this.surveydata.saheliSelected.filter(s => s !== index.toString());
    }
    if (i >= 0) {
      this.saheliList.splice(i, 1);
    }
  }
  showBudget(){
    console.log(this.surveydata.toggleStatus,"TOGGLE STATUS")
    if(!this.surveydata.toggleStatus){
      this.showBudgetSection = false;
    }
    
    else
    this.showBudgetSection = true; 

    //return this.showBudgetSection;
  }
  getScheduledTime(event, type, inputField, dateMaxMin): void {
    this[inputField][type] = event;
    const date = new Date(this[inputField][type]);
    const requiredDate = date.setDate(date.getDate());
    this[inputField][dateMaxMin] = new Date(requiredDate);
    this.mydate=new Date(this.surveydata.startDate).toDateString();
    this.mydate=new Date(this.mydate)
   console.log(new Date(this.mydate),this.mydate,this.surveydata.startDate,new Date(this.surveydata.startDate));
  }
}
