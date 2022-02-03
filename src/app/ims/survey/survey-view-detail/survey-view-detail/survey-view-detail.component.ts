import { Component, OnInit, Inject, ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService, FetchUserTabDetailsService, SharedService, SurveyQuestionsData } from 'src/app/utils';
import { ConfirmationDialogComponent } from 'src/app/utils/components/confirmation-dialog/confirmation-dialog.component';
import { SurveyFormBuilderComponent } from '../../fm-survey/survey-form-builder/survey-form-builder.component';


export interface DialogFieldData {
  params: any
}

@Component({
  selector: 'app-survey-view-detail',
  templateUrl: './survey-view-detail.component.html',
  styleUrls: ['./survey-view-detail.component.scss']
})


export class SurveyViewDetailComponent implements OnInit {
  public readOnly!: boolean;
  public answer_id: string;
  public answer_group_id:string;
  public data : any;
  public surveyId;
  public surveyQuestionId;
  public answerArray : any = [];
  public isEnglish : boolean = true;
  public isHindi : boolean = false;
  public isSave : boolean = false;
  public langSelected = 'hi';
  public title!:String;
  public title_hi !:string;
  public type!:string;
  public required: boolean;
  public answer : string;
  public viewOnly : boolean = true;
  public componentSelected : boolean = false;
  public itemArray:any=[]
  public itemObject:any={};
  public surveydata = new SurveyQuestionsData();
  public surveydata_final: any = [];
  public tabIndex:number;
  @ViewChild('parent', {read: ViewContainerRef}) target!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;
  @ViewChild('survey') survey!:SurveyFormBuilderComponent;

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private itemDetails: FetchUserTabDetailsService,
    public dialogRef: MatDialogRef<DialogFieldData>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataDialog : DialogFieldData
  ) {
    this.readOnly=dataDialog.params.readOnly;
    this.surveyId=dataDialog.params.surveyId;
    this.surveyQuestionId = dataDialog.params.surveyQuestionId;
    this.tabIndex = dataDialog.params.tabIndex;
   }

  ngOnInit(): void {
    this.getSurveyData();
   // this.getEditData();
    console.log('54',this.surveyId);
  }
  
  getSurveyData() {
    this.commonService.getDataNew('survey/saheli/list/crm/' + this.surveyId ).subscribe((response) => {
      if (response.success) {
        this.data = response.data;
        console.log(this.data);
        // response.data.rows.forEach(element => {
        //   this.surveydata = new SurveyQuestionsData(element);
        //   this.surveydata_final.push(this.surveydata);
        // });
        //this.surveydata = new SurveyQuestionsData(res.data.rows);
       // console.log(this.surveydata_final,"FINAL SURVEY DATA")
        this.itemArray = [];
       this.data.survey.questions.forEach(element => {
         console.log(element.input_type_id,"IDDS",element.label.en)
         this.getElements(element.input_type.name,element.input_type_id,element,0);
       });
     //  this.viewOnly = true
      //   this.itemArray = [];
      //  this.surveydata_final.forEach(element => {
      //    console.log(element,"INPUT TYPE")
      //    this.getElements(element.name,element.input_selected,element,0);
      //  });
        //this.filter = Object.values(data.records);
      }
    });
  }

  getEditData() {
    this.commonService.getDataNew("survey/questions?sort_by_title=1&lang=hi&survey_id="+ this.surveyQuestionId + "?lang=hi").subscribe(
      (res) => {
        res.data.rows.forEach(element => {
          this.surveydata = new SurveyQuestionsData(element);
          this.surveydata_final.push(this.surveydata);
        });
        //this.surveydata = new SurveyQuestionsData(res.data.rows);
        console.log(this.surveydata_final,"FINAL SURVEY DATA")
        this.itemArray = [];
       this.surveydata_final.forEach(element => {
         this.getElements(element.input_type.name,element.input_selected,element,0);
       });
       //this.getElements('multiline');
        //this.getElements(this.surveydata.name)
        //this.surveyName = res.data.name;
       },
      (err) => {
        this.sharedService.displayErrorMessage('');
      }
    );
  }

  closeDialog() {
      this.dialogRef.close();
  }

  editClick() {
  //  this.readOnly = false;
    this.viewOnly = false;
    this.isSave = true;
  }

  saveClick(item) {
    console.log('120',item);
    console.log(this.data,"DATAAA",this.itemArray,this.itemObject)
    var data=[];
    this.data.survey.questions.forEach((element,index) => {
      console.log(this.itemArray[index],element?.selected_answer?.id,"ids in selected_answer")
      data.push({ 
        "id":element?.selected_answer?.id,
        "answer":this.itemArray[index]?.answer,
        "answer_id":(this.itemArray[index]?.answer_id)?this.itemArray[index]?.answer_id:''
      })
    });
    console.log(data,"answerss data")
    this.commonService.patchDataNew('survey/answer/crm', data).subscribe((response) => {
      if (response.success) {
        this.sharedService.displaySuccessMessage('Successfully Updated.');
        this.closeDialog();
      }
    });
  }

  getElements(name,id,element,input_sel){
    console.log(element,"INSDIE GET ELEMENT",id, input_sel)
    switch(name){
      case 'string': {
        console.log("single line dragged");
        this.title = "Single Line";
        this.title_hi = "एक लाइन";
        this.type = 'string';
        this.required = true;
        break;
      }
      case 'multiline':{
        console.log("multi line dragged");
        this.title = "Multi Line";
        this.title_hi = "मल्टी लाइन";
        this.type='multiline';
        break;
      }
      case 'number':{
        this.title = "Number"
        this.type='number';
        this.title_hi = "संख्या";
        break;
      }
      case 'decimal':{
        this.title = "Decimal"
        this.type='decimal';
        this.title_hi = "डेसीमल";
        break;
      }
      case 'name':{
        this.title = "Name"
        this.type='name';
        this.title_hi ='नाम';
        break;
      }
      case 'phone':{
        this.title = "Phone"
        this.type='phone';
        this.title_hi ='फ़ोन';
        break;
      }
      case 'email':{
        this.title = "Email"
        this.type='email';
        this.title_hi = 'ईमेल';
        break;
      }
      case 'address':{
        this.title = "Address"
        this.type='address';
        this.title_hi = 'एड्रेस';
        break;
      }
      case 'date':{
        this.title = "Date"
        this.type='date';
        this.title_hi = 'डेट';
        break;
      }
      case 'time':{
        this.title = "Time"
        this.type='time';
        this.title_hi = 'डेट';
        break;
      }
      case 'datetime':{
        this.title = "Date-time"
        this.type='datetime';
        break;
      }
      case 'decisionbox':{
        this.title = "Decision box"
        this.type='decisionbox';
        break;
      }
      case 'dropdown':{
        this.title = "Drop down"
        this.type='dropdown';
        this.title_hi = 'ड्राप डाउन';
        break;
      }
      case 'radio':{
        this.title = "Radio"
        this.type='radio';
        this.title_hi = 'रेडियो';
        break;
      }
      case 'image':{
        this.title = "Image"
        this.type='image';
        this.title_hi = 'इमेज';
        break;
      }
      case 'checkbox':{
        this.title = "Checkbox"
        this.type='checkbox';
        this.title_hi = 'चेकबॉक्स';
        break;
      }
      case 'websiteurl':{
        this.title = "Website URL"
        this.type='websiteurl';
        this.title_hi = 'वेबसाइट यूआरएल';
        break;
      }
      case 'currency':{
        this.title = "Currency"
        this.type='currency';
        this.title_hi = 'करेंसी';
        break;
      }
      case 'fileupload':{
        this.title = "File upload"
        this.type='fileupload';
        this.title_hi = 'फाइल अपलोड';
        break;
      }
      case 'imageupload':{
        this.title = "Image upload"
        this.type='imageupload';
        this.title_hi = 'इमेज अपलोड';
        break;
      }
      case 'audio':{
        this.title = "Audio"
        this.type='audio';
        this.title_hi='ऑडियो';
        break;
      }
      case 'section':{
        this.title = "Section"
        this.type='section';
        this.title_hi = 'सेक्शन';
        break;
      }
      case 'slider':{
        this.title = "Slider"
        this.type='slider';
        this.title_hi='स्लाइडर';
        break;
      }
      case 'rating':{
        this.title = "Rating"
        this.type='rating';
        this.title_hi='रेटिंग';
        break;
      }
      case 'description':{
        this.title = "Description"
        this.type='description';
        this.title_hi='डिस्क्रिप्शन';
        break;
      }
      case 'video':{
        this.title = "Video"
        this.type='video';
        this.title_hi='वीडियो';
        break;
      }
      case 'pagebreak':{
        this.title = "Page break"
        this.type='pagebreak';
        break;
      }
      case 'termsandconditions':{
        this.title = "Terms and Conditions"
        this.type='termsandconditions';
        this.title_hi='टर्म्स एंड कंडीशंस';
        break;
      }
      case 'matrix':{
        this.title = "Matrix"
        this.type='matrix';
        this.title_hi='मैट्रिक्स';
        break;
      }
      case "matrix_radio": {
        this.title = "Matrix";
        this.type = "matrix";
        this.title_hi = "मैट्रिक्स";
        break;
      }
      case "imagechoice_radio": {
        this.title = "Image choice";
        this.type = "imagechoice";
        this.title_hi = "इमेज चॉइस";
        break;
      }
      case "imagechoice_checkbox": {
        this.title = "Image choice Checkbox";
        this.type = "imagechoice";
        this.title_hi = "इमेज चॉइस";
        break;
      }
      default:{
        console.log("default");
        break;
      }
    }
    console.log(id,"id in getelement")
   
      console.log("inside else", element.label.en, element.label.hi);
     console.log(element,element.answers)
     var radichoice2:any={ en: [], hi: [] };
      if(element.input_type_id==11 || element.input_type_id == 12 || element.input_type_id == 10){
        for (const key of Object.keys( element.answers)) {
          console.log(key)
          let val=element.answers[key]
          console.log(element.answers[key],"Element answers", element.answers)
          val.map((rec)=>{
            console.log("@@@@Inside",rec)
            radichoice2[rec.language].push({id:rec.id,value:rec.answer,answer:rec.answer,type:this.type,answer_group_id:rec.answer_group_id,group_id:rec.answer_group_id})
          })
        }
        console.log(radichoice2,"RADICHOICE")

      }
      var imgChoice:any={en:[], hi:[]};
      if(element.input_type_id == 33 || element.input_type_id == 34 || element.input_type_id == 28){
        for (const key of Object.keys( element.answers)) {
          console.log(key)
          let val=element.answers[key]
          val.map((rec)=>{
            console.log(rec,"RECORD",val)
            imgChoice[rec.language].push({id:rec.id,answer:rec.answer,type:this.type,answer_group_id:rec.answer_group_id,images:rec.image,imageUploaded:rec.imageUrl})
          })
          console.log(imgChoice,"IMGCHOICE")
        }
      }
      var matrixcol:any={ en: [], hi: [] };
      var matrixrow:any={ en: [], hi: [] };
      var mtype={'27':'text','24':'radio','25':'checkbox'}
      if(['27','24','25'].includes(element.input_type_id))
      {
        element.matrixtype=mtype[element.input_type_id]?mtype[element.input_type_id]:'text'
        if( element.matrix_columns && element.matrix_rows){    
        element.matrix_columns.map((v)=>{
              //console.log(v)
              matrixcol['en'].push(v.label)
              matrixcol['hi'].push((v.matrix_column_translations && v.matrix_column_translations[0] && v.matrix_column_translations[0].label)?v.matrix_column_translations[0].label:v.label)
            })
            element.matrix_rows.map((v)=>{
              matrixrow['en'].push(v.label)
              matrixrow['hi'].push((v.matrix_row_translations && v.matrix_row_translations[0] && v.matrix_row_translations[0].label)?v.matrix_row_translations[0].label:v.label)
            })
          }
      }
      console.log(radichoice2)
      var type;
      switch(id){
        case '33':{
          type = 'radio';
           
          break;
        }
        case '34':{
         type = 'checkbox'
         //this.typeChanged(0);
         break;
       }
       case '28':{
         type = 'hidden'
         break;
       }
      }
      //console.log('dssssssssssssssssgfadshgfsahgfshgdsa',element)
      console.log("ELEMENT@@",element?.selected_answer?.imagesUrlList)
      this.itemObject={};
      this.itemObject = {
        label: { en: element.label.en, hi: element.label.hi },
        input_id_type: element.input_type_id,
        type: this.type,
        id: element.id,
        required: element.is_required,
        answer: element?.selected_answer?.answer,
        answer_id: element?.selected_answer?.answer_id,
        answer_radio:element?.selected_answer?.answer,
        answer_image:element?.selected_answer?.imagesUrl,
        question_images: element?.selected_answer?.imagesUrlList,
        //answer_group_id:this.answer_group_id,
        matrixtype: element.matrixtype,
        properties: element.properties,
        audiosUrl:element.audiosUrl,
        audios:element.audios,
        videos:element.videos,
        images:element.images,
        imagesUrl:element.imagesUrl,
        choices:radichoice2,
        imageChoices: imgChoice,//[{type: type, title2: "",imageUploaded:'',images:''}],
        radioAnswers:element.answers,
        coldata:matrixcol,
        rowdata:matrixrow,
        matrix_columns:element.matrix_columns,
        matrix_rows:element.matrix_rows,
        min:(element.properties[0]&&element.properties[0].min)?element.properties[0].min:'',
        max:(element.properties[0]&&element.properties[0].max)?element.properties[0].max:'',
        placeholder: { en: element.placeholder.en, hi: element.placeholder.hi },
      };
       console.log(this.itemObject,"@#")
      this.itemArray.push(this.itemObject);
    

    // if(id == 'create' ){
    //   console.log("inside if")
    //   const { v4: uuid } = require('uuid');

    //   let uuid_defined= uuid();
    //   this.itemObject={label:{en:this.title,hi:this.title_hi},input_id_type:input_sel,type:this.type,id:uuid_defined,required:this.required, answer:this.answer,matrixtype:'textbox',properties:[{firstName:false,middleName:false,lastName:false,matrixrow:1,matrixcol:1}],placeholder:{en:'Placeholder',hi:'प्लेसहोल्डर'}};
    //   this.itemArray.push(this.itemObject)
    // }
    // else{
     // console.log("inside else",element.label.en,element.label.hi,element?.selected_answer?.answer) //hi:element.question_translations[0].label
      //this.itemObject={label:{en:element.label.en, hi:element.label.hi},input_id_type:element.input_type_id,type:element.input_type.name,id:element.id,required:element.is_required,matrixtype:'textbox',answers:element?.selected_answer?.answer,answer:element?.selected_answer?.answer,choices:element?.answers,images:element?.imagesUrl,videos:element?.videos,properties:element.properties,placeholder:{en:element.placeholder.en,hi:element.placeholder.hi}};
      //this.itemArray.push(this.itemObject);
    //  this.itemDetails.shareItemData(element.answers[0].answer);
      console.log('304',this.itemObject);
      console.log('305',this.itemArray);
    // }
    
    //console.log(this.itemArray,"INSIDE")
  }

  setHindiData() {
    console.log('inside Hindi');
    this.isEnglish = false;
    this.langSelected = 'hi';
    /*this.commonService.getDataNew('survey/saheli/list/crm/' + this.surveyId + '?lang=hi').subscribe((response) => {
      if (response.success) {
        this.data = response.data;
        console.log(this.data);
        //this.filter = Object.values(data.records);
      }
    });*/
  //  this.fields.dest_lang = this.langSelected;
  this.commonService.getDataNew('survey/saheli/list/crm/' + this.surveyId + '?lang=hi').subscribe((response) => {
    if (response.success) {
      this.data = response.data;
      console.log(this.data);
      this.itemArray = [];
     this.data.survey.questions.forEach(element => {
       console.log(element,"INPUT TYPE")
       this.getElements(element.input_type.name,element.input_type_id,element,0);
     });
    }
  });
  }

  setEnglishData() {
    console.log('inside English');
    this.isEnglish = true;
    this.langSelected = 'en';
    this.getSurveyData();
   // this.fields.dest_lang = this.langSelected;
  }

  changeStatus(status) {
    var obj = {
      id : this.surveyId,
      status : status
    }
    var id = this.surveyId;
    this.commonService.patchDataNew('survey/user/survey' , {id, status}).subscribe((response) => {
      if (response.success) {
        this.sharedService.displaySuccessMessage('Successfully Updated.');
        this.closeDialog();
      }
    });
  }

  rejectStatus(status,val)
  {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      height: '350px',
      data: { message: 'Are You Sure You Want to Reject', userName: name, from: 'Survey' },
      panelClass: 'confirmation-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
     // let status = result.status;
     // console.log('126',status);
      let obj={id:val,reason:result.remark}
      if(obj.reason) {
      this.submitStatus(status,obj)
      }
      else {
        if(result) {
        this.sharedService.displayErrorMessage("Please mention the rejection reason");
        this.rejectStatus(status,val);
        }
      }
    })
  }

  submitStatus(status,val)
  {
    this.commonService.patchDataNew('survey/user/survey',{status:status,...val}).subscribe((response) => {
      if (response.success) {
        this.sharedService.displaySuccessMessage('Successfully Updated.');
        this.closeDialog();
        // this.pagination.emit('1');
        // this.onSubmit.emit("")
      }
    });
  }

  // rejectStatus(status)
  // {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '400px',
  //     height: '350px',
  //     data: { message: 'Reason For Rejection', userName: name, from: 'Survey' },
  //     panelClass: 'confirmation-dialog'
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     let obj=1234
  
  //     this.submitStatus(status,obj)
  //   })
  // }

  onItemChanges(item): void {
   console.log(item);
}
}
