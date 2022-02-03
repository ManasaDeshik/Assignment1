import { Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService, SharedService } from 'src/app/utils';
import { SurveyData, SurveyQuestionsData } from 'src/app/utils/models/survey';
import {BuilderComponent} from '../../../survey/builder/builder.component';
import { ConfirmationComponent } from '../../confirmation/confirmation/confirmation.component';
import { CreateSurveyComponent } from '../../create-survey/create-survey.component';
import { RulesComponent } from '../../rules/rules.component';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class SideMenuComponent implements OnInit {
 
  public tabIndex;
  public survey_temp;
  public surveyIdForEdit;
  public surveydata = new SurveyData();
  public urlsegment;
  public surveydata1 = new SurveyQuestionsData();
  public surveydata_final: any = [];
  public previous_Clicked = 0;
  status = 0;
  @Output() surveyid = new EventEmitter<any>();
  @Output() surveyid1 = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<{ status: any }>();
  //builder: BuilderComponent;
  @ViewChild('builder') builder:BuilderComponent;
  @ViewChild('createSurvey') createSurvey:CreateSurveyComponent;
  @ViewChild('confirmSurvey') confirmSurvey:ConfirmationComponent;
  @ViewChild('rulesInSurvey') rulesInSurvey:RulesComponent;
  isEdit: boolean = false;
  viewOnly: boolean = false;
  //public builder;
  constructor( private router: Router,private sharedService : SharedService,private commonService: CommonService) { }

  ngOnInit(): void {
    const urlSegment = this.sharedService.urlSegmentKeys();
    this.onTabClick(0);
    this.status = 0;
    this.setSurveyAction();
    this.survey_temp = urlSegment[urlSegment.length - 1].path;
  }
  goBack() {
    this.router.navigate(['survey']);
  }
  getEditData(){
    const urlSegment = this.sharedService.urlSegmentKeys();
    this.surveyIdForEdit = urlSegment[urlSegment.length - 1].path;
    console.log("INSIDE STEP1",this.surveyIdForEdit);
    //this.status++;
    if(this.surveyIdForEdit == 'create-survey')
      this.surveyIdForEdit = this.survey_temp;
    this.commonService.getDataNew("survey/"+ this.surveyIdForEdit).subscribe(
      (res) => {
        this.surveydata = new SurveyData(res.data);
        this.createSurvey.zoneData = {
          state: this.surveydata.stateSelected,
          district: this.surveydata.districtSelected,
          branch: this.surveydata.branchSelected,
          village: this.surveydata.villageSelected,
          saheli_id: this.surveydata.saheliSelected
        };
        console.log(this.createSurvey.zoneData,"DATA IN ZONE",this.surveydata.stateSelected)
        /*if(this.surveydata.stateSelected){
          this.loadData('state',this.surveydata.stateSelected)
        }
        if(this.surveydata.districtSelected){
          this.loadData('district',this.surveydata.districtSelected)
        }
        if(this.surveydata.branchSelected){
          this.loadData('branch',this.surveydata.districtSelected)
        }
        if(this.surveydata.villageSelected){
          this.loadData('village',this.surveydata.villageSelected)
        }*/
        if(this.surveydata.stateSelected.length !== 0)
        this.createSurvey.addZones();  
        this.createSurvey.showBudget();
        //this.surveyName = res.data.name;
       },
      (err) => {
        this.sharedService.displayErrorMessage('');
      }
    );
  }
  setSurveyAction(){
    this.urlsegment = this.sharedService.urlSegmentKeys();
    if(this.urlsegment?.length > 2){
    var action = this.urlsegment[2].path;
    console.log(action,"SUrvey action")
    if(action == 'edit-survey'){
      this.getEditData();
      this.status++;
      console.log(this.status,"Inside setSurveyAction")
    }
    if(action == 'view-survey'){
      this.viewOnly = true;
      this.getEditData();
      this.status++;
      console.log(this.status,"Inside setSurveyAction")
    }
  }
  }
  onTabClick(index) {
    console.log(index,"TAB clicked",this.survey_temp)
    //this.status = 0;
    if(index == undefined)
       index = 0;
    this.tabIndex = index;
  }
  cancelClicked() {
    console.log('cancel clicked')
    this.router.navigate(['survey'])
  }
  previousClicked(){
    if(this.tabIndex == 1){
      //this.refresh.emit({status:0});
      this.getEditData();
      this.onTabClick(0);
      this.isEdit = true;
      this.status++;
    }
    else if(this.tabIndex == 2){
      this.previous_Clicked = 1;
      this.status++;
      this.onTabClick(1);
      this.isEdit = true;
      this.status++;
     
     /*/ this.builder.getEditData();
     / this.commonService.getDataNew("survey/questions?sort_by_title=1&lang=hi&survey_id="+ this.survey_temp).subscribe(
        (res) => {
          res.data.rows.forEach(element => {
            this.surveydata1 = new SurveyQuestionsData(element);
            this.surveydata_final.push(this.surveydata);
          });
          //this.surveydata = new SurveyQuestionsData(res.data.rows);
          console.log(this.surveydata_final,"FINAL SURVEY DATA")
          this.builder.itemArray = [];
         this.surveydata_final.forEach(element => {
           console.log(element,"INPUT TYPE")
           //event.item.element.nativeElement.id,'create',0,this.input_selected
           this.builder.getElements(element.name,'create',0,element.input_selected);
         });
         //this.getElements('multiline');
          //this.getElements(this.surveydata.name)
          //this.surveyName = res.data.name;
         },
        (err) => {
          this.sharedService.displayErrorMessage('');
        }
      );*/
    }
  }
  saveAndNextClicked(event){
    this.urlsegment = this.sharedService.urlSegmentKeys();
    if(this.urlsegment?.length > 2){
    var action = this.urlsegment[2].path;
    console.log(action,"SUrvey action")
    if(action == 'edit-survey'){
      this.isEdit = true;
    }
  }
    console.log(this.tabIndex)
    
    if(this.tabIndex == 0){
      this.status++;
      console.log("save and next clicked")
      if(!this.createSurvey.surveydata.surveyName){
        this.sharedService.displayErrorMessage("Please fill mandatory fields");
        this.status=0;
        return false;
      }
      if(this.createSurvey.surveydata.saheliSelected.length == 0){
        this.sharedService.displayErrorMessage("Please select saheli");
        this.status=0;
        return false;
      }
      let status = this.createSurvey.submitInCreate('submit',this.tabIndex,this.status,this.surveydata.surveyid_edit,this.isEdit);
      this.status = status;
      this.createSurvey.surveyId.subscribe(item=>{console.log("item in create",item);this.surveyid.emit(item); this.survey_temp = item; });
     // this.confirmSurvey.survey_ID.subscribe(item=>this.surveyid.emit(item));
      //this.surveyid=this.createSurvey.surveyId;
      this.status = 0;
    }
    else if(this.tabIndex == 1){
      this.status++;
      console.log("save and next clicked in tab1",this.status)

      //this.builder.surveyId.subscribe(item=>{this.surveyid.emit(item);})
      //this.surveyid.subscribe(item=> this.builder.surveyId = item)
     // this.confirmSurvey.surveyid = this.survey_temp;
      let status = this.builder.submitClicked('submit',this.tabIndex,this.status,this.isEdit,event);
      this.status=0;
    }
    else if(this.tabIndex == 2){
      console.log("save and next clicked in tab2",this.tabIndex);
      let is_draft;
      this.confirmSurvey.surveyid_final = this.survey_temp;
      let status = this.confirmSurvey.submitClickedInConfirm('submit',this.tabIndex,this.isEdit,is_draft=0);         
    }
  }
  saveAsDraftClicked(event){
    if(this.tabIndex == 0){
      this.status++;
      console.log("save as draft clicked in tab 0")
      if(!this.createSurvey.surveydata.surveyName){
        this.sharedService.displayErrorMessage("Please fill mandatory fields");
        this.status=0;
        return false;
      }
      if(this.createSurvey.surveydata.saheliSelected.length == 0){
        this.sharedService.displayErrorMessage("Please select saheli");
        this.status=0;
        return false;
      }
      let is_draft;
      let status = this.createSurvey.submitInCreate('saveAsDraft',this.tabIndex,this.status,this.surveydata.surveyid_edit,this.isEdit);
      this.status = status;
      this.createSurvey.surveyId.subscribe(item=>{console.log("item in create",item);this.surveyid.emit(item); this.survey_temp = item; });
    }
    else if(this.tabIndex == 1){
      this.status++;
      console.log("save as draft clicked in tab1",this.status)
      let status = this.builder.submitClicked('saveAsDraft',this.tabIndex,this.status,this.isEdit,event);
    }
    else if(this.tabIndex == 2){
      console.log("save as draft clicked in tab1")
      let is_draft;
      this.confirmSurvey.surveyid_final = this.survey_temp;
      let status =this.confirmSurvey.submitClickedInConfirm('saveAsDraft',this.tabIndex,this.isEdit,is_draft=1);
    }
  }

}
