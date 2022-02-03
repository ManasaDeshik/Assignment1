import { Component, OnInit,ViewChild,ElementRef,Renderer2, ComponentFactoryResolver,ViewContainerRef, ComponentRef, Input, EventEmitter, Output } from '@angular/core';
import {CdkDragDrop, moveItemInArray,transferArrayItem} from '@angular/cdk/drag-drop';
import { SurveyFormBuilderComponent } from '../fm-survey/survey-form-builder/survey-form-builder.component';
import { CommonService, SharedService } from 'src/app/utils';
import { SurveyData, SurveyQuestionRequestSet, SurveyQuestionsData } from 'src/app/utils/models/survey';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
    @Input() prevClicked = 0;
    @Input() surveyId;
    @Input() viewOnly;
    @Output() refresh = new EventEmitter<{ status: any }>();
    surveyInputId:any
    ruleCount=[]
    questiondata=[]
    choicequestiondata=[]
    myquestion=[]
    public surveyid_final;
    public dataInRules={};
    public rulesAdded = [];
    public action;
    public answerid_selected:any;
    public cascade_question_id_selected:any;
    public question_id_selected:any;
    public survey_id_selected:any;
    constructor(private componentFactoryResolver: ComponentFactoryResolver,private commonService : CommonService,
        private sharedService : SharedService) { 
      }

    ngOnInit(): void {
        const urlSegment = this.sharedService.urlSegmentKeys();
        if(urlSegment.length > 0)
        this.surveyInputId = urlSegment[urlSegment.length - 1].path;
        this.getData()
    }
    ngOnChanges():void{
        this.surveyInputId = this.surveyId;
        console.log(this.surveyInputId)
        this.getData()
      }
      getData(){
        this.commonService.getDataNew("survey/questions/cascade?survey_id="+ this.surveyInputId).subscribe(
            (res) => {
                this.questiondata=res.data.rows
                console.log(res,this.questiondata)
            })
            this.commonService.getDataNew("survey/questions?survey_id="+ this.surveyInputId).subscribe(
              (res) => {
                  this.choicequestiondata = res.data.rows
                  this.choicequestiondata.forEach((element,index)=>{
                    if(element.rules.length !== 0){
                      
                    }
                    // this.myquestion[index] = element.
                  });
                  //console.log(res,this.questiondata)
              })
      }
    addRule(){
      var data=this.ruleCount.length  
      this.ruleCount.push(data)
    }
    question(event){
        console.log(event)
        this.survey_id_selected = event.survey_id;
        this.question_id_selected = event.id;
    }
    submitClickedInRules(type:string,tabIndex:number,isEdit:boolean,is_draft:number){
        //var status = 2;
 console.log("In confirm screen",this.rulesAdded)
 //var dataForPut = new SurveyQuestionRequestSet(this.survey.surveyItems);
 
this.commonService.postDataNew('survey/question/cascade',this.rulesAdded).subscribe(res => {
  //this.totalPrice = res.data.total_value;
  
  if(type=='saveAsDraft'){
    console.log("SAVE AS DRAFT CLICKED")
    this.sharedService.displayErrorMessage('Saved successfully');
  }
  else if(type == 'submit' && tabIndex == 2){
    //return this.statusForSubmit;
     this.sharedService.displayErrorMessage('Rules configured successfully');
     //status = 0;
     this.refresh.emit({ status: 2 });
    }
  });
}
    actionChanged(event,answer){
      console.log(event,answer,"ANSWER CHANGED");
      this.answerid_selected = answer;
      this.action = event;
    }
    questionChanged(event){
      console.log(event,"EVENT")
      this.cascade_question_id_selected = event;
      this.dataInRules = {
        "survey_id": this.survey_id_selected,//"5e277ac4-fd06-47d2-b199-c65a1a4807d5",
        "question_id": this.question_id_selected,
        "answer_id": this.answerid_selected,//"f486c4d1-40a7-4622-8cf5-e64cbc300d4e",
        "cascade_type": this.action,
        "cascade_question_id": this.cascade_question_id_selected //"067fbb29-5fa0-4a8a-a148-d3e1e6c978cc"
      }
      console.log(this.dataInRules,"RULES when changing question")
      this.rulesAdded.push(this.dataInRules);
    }
}
