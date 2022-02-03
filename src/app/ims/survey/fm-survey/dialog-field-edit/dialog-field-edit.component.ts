import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FmSurveyComponent } from '../fm-survey.component';
import { FormItem, FormSection } from '../survey-form-item/form-item';
import { buildField } from '../survey-form-item/survey-form-item.component';
import * as _ from 'lodash';
import { MatDrawer } from '@angular/material/sidenav';
import {NgForm} from '@angular/forms';
import { CommonService } from 'src/app/utils';
import { keyframes } from '@angular/animations';


export interface DialogFieldData {
  section: FormSection,
  params: any
}
@Component({
  selector: 'app-dialog-field-edit',
  templateUrl: './dialog-field-edit.component.html',
  styleUrls: ['./dialog-field-edit.component.css']
})
export class DialogFieldEditComponent implements OnInit {
  @ViewChild('survey', { static: false }) public survey!:FmSurveyComponent;
  @ViewChild('dialog') dialogdata:any;
    public section!:FormSection;
    public readOnly!: boolean;
    public fields;
    public surveyId;
    public dialogType;
public defaultlabel={};
public labonly
    public commonFields: FormItem[] =[
        //buildField('string', {name: "name", label: "Name"}, true),
        buildField('string', {name: "title", label: "Title"}),
        buildField('string', {name: "subtitle", label: "Subtitle"}),
        /*
        buildField('select', {name: "sectionStyle", label: "Section Style", items: [
            {
                optionValue: 'Bold',
                label: 'Bold',
                style: "Checkmark"
            },
            {
                optionValue: 'Normal',
                label: 'Normal',
                style: "Checkmark"
            }
        ]}, true),
        */
    ];

    public sectionEditForm:FormSection[]=[
        {
            //items: [...this.commonFields]
        }
    ];

  constructor(  public dialogRef: MatDialogRef<DialogFieldData>, private commonService : CommonService,
    @Inject(MAT_DIALOG_DATA) public data: DialogFieldData) { 
     
      const section=data.section;
        this.readOnly=data.params.readOnly;
        this.surveyId=data.params.surveyId;
        this.fields = data.params.fields;
        this.section=section;
        this.dialogType = data.params.dialogType;
    }

  ngOnInit(): void {
    localStorage.setItem('dataSource', JSON.stringify(this.fields));
    console.log(this.surveyId,"SURVEY IN DIALOG",this.fields)
   // console.log(mydata,this.defaultlabel,this.labonly)
    //this.mydata(this.labonly)
    
  }
  
ngOnChanges(){
console.log(this.fields)
}

  onNoClick(): void {
    var mydataSource=JSON.parse(localStorage.getItem('dataSource'));
    this.fields=mydataSource
    this.dialogdata.fields=mydataSource
    //return
    let mydata=this.dialogdata.fields
    console.log(mydataSource)
    if(mydata && mydata.label  && (mydata.label.en ==''||mydata.label.hi =='' ))
    {
    alert('Please Fill all details')
    return
    }
    this.dialogRef.close(this.dialogdata.fields);
}



onOkClick(): void {
  
  let mydata=this.dialogdata.fields
    console.log(this.dialogdata.fields)
    if(mydata && mydata.label  && (mydata.label.en ==''||mydata.label.hi =='' ))
    {
    alert('Please Fill all details')
    return
    }
    if(mydata && ['33','34','28'].includes(mydata.input_id_type)){
      var alertpopup=false
      mydata.imageChoices['en'].map((v)=>{
        if(v.imageUploaded =='')
        {
          alertpopup=true
          
        }

      })
      if(alertpopup)
      {
        alert('Please Upload Image in Imagechoices')
    return
      }
    }
    this.dialogRef.close(this.dialogdata.fields);
     if(this.dialogdata.fields.dest_lang = 'en')
       {

       }
}

onTranslateClick():void{
  console.log(this.dialogdata.fields,"DESTINATION",this.fields)
  if(this.dialogdata.fields.type =="matrix"){
      var matrixdata=this.dialogdata.fields;
      var coldata=JSON.parse(JSON.stringify(matrixdata.coldata))
      var rowdata=JSON.parse(JSON.stringify(matrixdata.rowdata))
      var destlang = this.dialogdata.fields.dest_lang;
      var coldatavalue={en:[],hi:[]}
      var rowdatavalue={en:[],hi:[]}
      console.log(coldata)
     // for (let [k, v] of Object.entries(coldata)) {
        coldata[destlang].map((val,i)=>{
          if (destlang == 'en')
          {
            var lang='en_hi'
          }
          else
          { 
          var lang='hi_en'
          }
          this.commonService.getDataForTranslateNew(`request?ime=transliteration_${lang}&text=${val}`).subscribe(resp => {
            if(destlang =='hi')
            {
              console.log(coldata['hi'],i,coldata,resp.data[1][0][1])
              coldatavalue.en.push(resp.data[1][0][1][0])
              coldatavalue.hi.push(coldata['hi'][i])
            }
            else
            {
              coldatavalue.hi.push(resp.data[1][0][1][0])
              coldatavalue.en.push(coldata['en'][i])
            }
          })
          
        })
     // }
     // for (let [k, v] of Object.entries(rowdata)) {
        rowdata[destlang].map((val,i)=>{
          if (destlang=='en')
          {
            var lang='en_hi'
          }
          else
          { 
          var lang='hi_en'
          }
          this.commonService.getDataForTranslateNew(`request?ime=transliteration_${lang}&text=${val}`).subscribe(resp => {
            if(destlang =='hi')
            {
              rowdatavalue.en.push(resp.data[1][0][1][0])
              rowdatavalue.hi.push(rowdata['hi'][i])
            }
            else
            {
              rowdatavalue.hi.push(resp.data[1][0][1][0])
              rowdatavalue.en.push(rowdata['en'][i])
            }
          })
        })
       //}
       this.dialogdata.fields.coldata=coldatavalue
       this.dialogdata.fields.rowdata=rowdatavalue
       this.dialogdata.fields.col=coldatavalue
       this.dialogdata.fields.row=rowdatavalue
       console.log(coldatavalue,rowdatavalue)
    return;
  }
  var lang;
  if(this.dialogdata.fields.dest_lang == 'en'){
    lang='en_hi';
    var values=[];
    var values_imageChoice = [];
    this.dialogdata.fields.choices.en.forEach(element => {
      values.push(element.value);
    });
    this.dialogdata.fields.imageChoices.en.forEach(element => {
      values_imageChoice.push(element.title2);
    });
    
    this.commonService.getDataForTranslateNew(`request?ime=transliteration_${lang}&text=${this.dialogdata.fields.label.en},${this.dialogdata.fields.placeholder.en},`+values.toString()+`,`+values_imageChoice.toString()).subscribe(resp => {
      console.log(resp.data[1][0][1][0],"NSIDE RESP", resp);
      this.dialogdata.fields.label.hi = resp.data[1][0][1][0]
      this.dialogdata.fields.placeholder.hi = resp.data[1][1][1][0]
      //console.log(this.dialogdata.fields?.imageChoices?.hi[0],"VALE**")
      var i = 2;
      this.dialogdata.fields?.choices?.hi.forEach((element) => {
        console.log(resp.data[1][i][1][0],"@#hi")
        element.value = resp.data[1][i][1][0];
        element.answer = resp.data[1][i][1][0];
        i++;
      });
      var j =1;
       
      this.dialogdata.fields?.imageChoices?.hi.forEach((element) => {
        console.log(element,"ELEMENT in translate",resp.data[1][j][1][0])
        element.title2 = resp.data[1][j][1][0];
        //element.answer = resp.data[1][i][1][0];
        j++;
      });
      //this.dialogdata.fields.choices.hi[0].value = resp.data[1][2][1][0]
      //this.dialogdata.fields.choices.hi[0].answer = resp.data[1][2][1][0]
      //console.log(this.dialogdata.fields.choices.hi[0].value,"VALE**s", resp.data[1][2][1][0])
        //m this.loaderService.show('hide');
      })
  }
    
  else {
    lang='hi_en';
    var values=[];
    var values_imageChoice = [];
    this.dialogdata.fields?.choices?.hi.forEach(element => {
      values.push(element.value);
    });
    this.dialogdata.fields?.imageChoices?.hi.forEach(element => {
      values_imageChoice.push(element.title2);
    });
    
    this.commonService.getDataForTranslateNew(`request?ime=transliteration_${lang}&text=${this.dialogdata.fields.label.hi},${this.dialogdata.fields.placeholder.hi},`+values.toString()+`,`+values_imageChoice.toString()).subscribe(resp => {
      console.log(resp.data[1][0][1][0],"NSIDE RESP", resp);
      this.dialogdata.fields.label.en = resp.data[1][0][1][0]
      this.dialogdata.fields.placeholder.en = resp.data[1][1][1][0]
      //this.dialogdata.fields.choices.en[0].value = resp.data[1][2][1][0]
        //m this.loaderService.show('hide');
        var i = 2;
      this.dialogdata.fields?.choices?.en.forEach((element) => {
        console.log(resp.data[1][i][1][0],"@#")
        element.value = resp.data[1][i][1][0];
        element.answer = resp.data[1][i][1][0];
        i++;
      });
     
      var j =2;
      this.dialogdata.fields?.imageChoices?.en.forEach((element) => {
        console.log(element,"ELEMENT in translate",resp.data[1][j][1][0])
        element.title2 = resp.data[1][j][1][0];
        //element.answer = resp.data[1][i][1][0];
        j++;
      });
    }) 
  }

    
  
}

}
