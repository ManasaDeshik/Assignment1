import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService, SharedService } from 'src/app/utils';
import { SurveyData } from 'src/app/utils/models/survey';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  @Input() surveyid: Observable<any>;
  @Input() viewOnly: boolean;
  @Output() refresh = new EventEmitter<{ status: any }>();
  public surveyid_final;
  statusForSubmit = 0;
  submitMsg;
  submitBtnLabel;
  @Input() surveydata = new SurveyData();
  constructor(private commonService : CommonService, private sharedService : SharedService, private router: Router) { 
  }
 
  ngOnChanges():void{
    console.log(this.surveydata,"survey id for onchanges");
  }
  ngOnInit(): void {
    console.log("ngoninit",this.surveyid)
    this.surveyid.subscribe(item => {console.log(item,"ITEM in tab2");this.surveyid_final = item})
  }
  submitClickedInConfirm(type:string,tabIndex:number,isEdit:boolean,is_draft:number):number{
    
    //console.log(this.survey_ID.subscribe(item => this.surveyid_final = item));
   //var status = 2;
 console.log("In confirm screen",this.surveyid_final)
 var data = {
  "id": isEdit || this.viewOnly?  this.surveydata.surveyid_edit : this.surveyid_final ,//"5e277ac4-fd06-47d2-b199-c65a1a4807d5",
  "submit_label": this.surveydata.submitBtnLabel,
  "confirmation_message": this.surveydata.submitMsg,
  "status": 1,
  "is_draft": is_draft
}
console.log(data,"DATA")
this.commonService.patchDataNew('survey',data).subscribe(res => {
  //this.totalPrice = res.data.total_value;
  
  if(type=='saveAsDraft'){
    console.log("SAVE AS DRAFT CLICKED")
    this.sharedService.displayErrorMessage('Saved successfully');
  }
  else if(type == 'submit' && tabIndex == 2){
    this.statusForSubmit = 0;
    console.log("SUBMIT CLICKED in step 3")
    if(!this.viewOnly){
      this.sharedService.displayErrorMessage("Created successfully");
    }
    this.router.navigate(['survey']);
    }
  }, err => {
  this.sharedService.displayErrorMessage(''); 
  this.refresh.emit({status:0});
  this.statusForSubmit=1;
  });
    return this.statusForSubmit;
  }

}
