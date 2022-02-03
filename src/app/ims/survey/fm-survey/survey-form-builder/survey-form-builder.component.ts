import { Component, EventEmitter, Input, OnInit, Output, QueryList, SimpleChange, SimpleChanges, ViewChildren } from '@angular/core';
import { FmSurveyService } from '../fm-survey.service';
import { FormItem, FormSection } from '../survey-form-item/form-item';
import { SurveyFormItemComponent } from '../survey-form-item/survey-form-item.component';

import { DialogFieldEditComponent } from '../dialog-field-edit/dialog-field-edit.component';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-survey-form-builder',
  templateUrl: './survey-form-builder.component.html',
  styleUrls: ['./survey-form-builder.component.scss']
})
export class SurveyFormBuilderComponent implements OnInit {
  @Output() changes = new EventEmitter<any[]>();
 editable : boolean = true;
 drawerOpen : boolean = false;
 @Input() readOnly:boolean=false;
 @Input() title!:String;
 @Input() type!:string;
 @Input() items=[];
 @Input() dest_lang;
 @Input() editAnswer: boolean=false;
 @Input() surveyIdInBuilder:Observable<any>;
 public surveyid;
 public deletedQuestions = [];
 @Input() item:any={};
  @Input() set form(form: FormSection[]){
    this._form=this.service.initForm(form, this.formValues);
    //console.log(this._form);
};

get form() : FormSection[] {
    return this._form;
}
@ViewChildren('formFieldItem') formItemElements!: QueryList<SurveyFormItemComponent>
private _form:any;
    public formValues:FormSection={};
    public surveyItems:any=[];
    public titleSelected: any;
  constructor( public service: FmSurveyService, public dialog: MatDialog) { }
  
  ngOnChanges(changes: SimpleChanges) {   
  //  console.log(changes,"CHANGES"); 
   // console.log(changes.items.currentValue) 
   this.surveyItems = [];
   this.dest_lang = changes.langSelected;
 if(this.items){
  this.items.forEach(element => {
     //console.log("inside current", element)
      this.surveyItems.push(element);
      
      this.formValues.items?.push(element)
   });
  // this.items = [];
 }  
 else if(changes.item.currentValue && changes.item.currentValue.type)
 {
  this.surveyItems.push(changes.item.currentValue)
  this.formValues.items?.push(changes.item.currentValue)
 }  
 this.surveyid = this.surveyIdInBuilder;
 console.log(this.surveyItems) 
}
  
  ngOnInit(): void {
  console.log(this)
  console.log(this.items,"IN ngoninit")
 // this.surveyIdInBuilder.subscribe(item=>this.surveyid = item)
  }
  

  onItemChanges(item: FormItem): void {
    //item.errors=this.service.getErrors(item);
    this.changes.emit(this.form);
}

delete(a:any,b:any){
  var a = this.surveyItems.splice(b,1);
  console.log(a[0],"AAAA")
  this.deletedQuestions.push(a[0].id);
  this.formValues.items?.splice(b,1)
  this.items.splice(b,1)
}
openSectionDialog(index:number,type,itemdata): void {
  console.log(this.surveyid,"dialog comp",itemdata)
  var dialogtype;
  switch(type){
    case 'matrix':{
      dialogtype = 'matrix';
      break;
    }
  
    default:{
      dialogtype = 'radio';
      break;
    }
  }
  const dialogRef = this.dialog.open(DialogFieldEditComponent, {
    minHeight: '100%',
    height: '100%',
    width: '60%',
    position: { left: '40%' },
      data: {
          params: {
              readOnly: this.readOnly,
              surveyId: this.surveyid,
              dialogType : dialogtype,
              fields : this.surveyItems[index]
          }
      },
  });

  dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result,this.surveyItems[index]);
      this.surveyItems[index]=_.extend(this.surveyItems[index],result)
  });
}
componentClicked(title1:any){
  console.log(title1,"clicked")
  this.titleSelected = title1;
}

}



