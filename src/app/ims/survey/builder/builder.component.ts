import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
  Input,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { SurveyFormBuilderComponent } from "../fm-survey/survey-form-builder/survey-form-builder.component";
import { CommonService, SharedService } from "src/app/utils";
import {
  SurveyData,
  SurveyQuestionRequestSet,
  SurveyQuestionsData,
} from "src/app/utils/models/survey";
import { Observable } from "rxjs";
@Component({
  selector: "app-builder",
  templateUrl: "./builder.component.html",
  styleUrls: ["./builder.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class BuilderComponent implements OnInit {
  @ViewChild("myDiv") myDiv!: ElementRef;
  container!: ViewContainerRef;
  drawerOpen: boolean = false;
  public title!: String;
  public title_hi!: string;
  public type!: string;
  public required: boolean;
  public answer: string;
  public answer_id: string;
  public answer_group_id: string;
  public componentSelected: boolean = false;
  public itemArray: any = [];
  public itemObject: any = {};
  public surveydata = new SurveyQuestionsData();
  public surveydata_final: any = [];
  public surveyid_final;
  // public inputtypes_response = [];
  public input_type = {
    name: "",
    id: "",
  };
  public list_input_types = [];
  public surveyIdForEdit;
  public input_selected;
  public urlsegment;
  @Input() prevClicked = 0;
  @Input() surveyId;
  @Input() viewOnly;
  @Output() refresh = new EventEmitter<{ status: any }>();
  @ViewChild("parent", { read: ViewContainerRef }) target!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;
  @ViewChild("survey") survey!: SurveyFormBuilderComponent;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private commonService: CommonService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    /*this.surveyId.subscribe(item => {
      this.surveyid_final = item;
    })*/
    this.commonService.getDataNew("survey/inputtypes").subscribe(
      (response) => {
        if (response.success) {
          if (response.data.length > 0) {
            // this.inputtypes_response = response.data;
            for (var element of response.data) {
              this.input_type = {
                name: element.name,
                id: element.id,
              };
              //this.input_type.name = element.name;
              //this.input_type.id = element.id;
              this.list_input_types.push(this.input_type);
            }
          }
        } ////console.log(this.fmUserForm.branch,"INSIDE BRANCH")
      },
      (err) => {
        if (err) this.sharedService.displayErrorMessage(err.statusText);
        else this.sharedService.displayErrorMessage("Internal server error");
      }
    );
    //console.log(this.prevClicked);
    this.setSurveyAction(this.prevClicked);
  }
  ngOnChanges(): void {
    this.surveyid_final = this.surveyId;
  }
  getEditData() {
    //console.log("GET EDIT DATA N BUILDER");
    const urlSegment = this.sharedService.urlSegmentKeys();
    if (urlSegment.length > 0)
      this.surveyIdForEdit = urlSegment[urlSegment.length - 1].path;
    //console.log("INSIDE STEP2", this.surveyIdForEdit);
    if (this.surveyIdForEdit == "create-survey")
      this.surveyIdForEdit = this.surveyId;
    //this.status++;
    this.surveydata_final = [];
    this.commonService
      .getDataNew(
        "survey/questions?sort_by_title=1&lang=hi&survey_id=" +
          this.surveyIdForEdit
      )
      .subscribe(
        (res) => {
          // //console.log('fddfsdfssdf')
          res.data.rows.forEach((element) => {
            element.required=element.is_required
            this.surveydata = new SurveyQuestionsData(element);
            //console.log(this.surveydata,'sdfffffffffffffffffffffffffhjgjh')
            this.surveydata_final.push(this.surveydata);
          });
          
          //this.surveydata = new SurveyQuestionsData(res.data.rows);
          //console.log(this.surveydata_final, "FINAL SURVEY DATA");
          this.itemArray = [];
          this.surveydata_final.forEach((element) => {
            //console.log(element, "INPUT TYPE");
            this.getElements(element.name, element.input_selected, element, 0);
          });
          //this.getElements('multiline');
          //this.getElements(this.surveydata.name)
          //this.surveyName = res.data.name;
        },
        (err) => {
          this.sharedService.displayErrorMessage("");
        }
      );
  }
  setSurveyAction(prevClicked) {
    //console.log("inside survey action");
    this.urlsegment = this.sharedService.urlSegmentKeys();
    if (this.urlsegment?.length > 2) {
      var action = this.urlsegment[2].path;
      //console.log(action, "SUrvey action");
      if (action == "edit-survey" || action == "view-survey") {
        this.getEditData();
      } else if (prevClicked == 1) this.getEditData();
    }
  }
  getElements(name, id, element, input_sel) {
    console.log(name, "INSDIE GET ELEMENT", id, input_sel);
    switch (name) {
      case "string": {
        //console.log("single line dragged");
        this.title = "Single Line";
        this.title_hi = "एक लाइन";
        this.type = "string";
        this.required = true;
        break;
      }
      case "multiline": {
        //console.log("multi line dragged");
        this.title = "Multi Line";
        this.title_hi = "मल्टी लाइन";
        this.type = "multiline";
        break;
      }
      case "number": {
        this.title = "Number";
        this.type = "number";
        this.title_hi = "संख्या";
        break;
      }
      case "decimal": {
        this.title = "Decimal";
        this.type = "decimal";
        this.title_hi = "डेसीमल";
        break;
      }
      case "name": {
        this.title = "Name";
        this.type = "name";
        this.title_hi = "नाम";
        break;
      }
      case "phone": {
        this.title = "Phone";
        this.type = "phone";
        this.title_hi = "फ़ोन";
        break;
      }
      case "email": {
        this.title = "Email";
        this.type = "email";
        this.title_hi = "ईमेल";
        break;
      }
      case "address": {
        this.title = "Address";
        this.type = "address";
        this.title_hi = "एड्रेस";
        break;
      }
      case "date": {
        this.title = "Date";
        this.type = "date";
        this.title_hi = "डेट";
        break;
      }
      case "time": {
        this.title = "Time";
        this.type = "time";
        this.title_hi = "टाइम";
        break;
      }
      case "datetime": {
        this.title = "Date-time";
        this.type = "datetime";
        this.title_hi = "डेट-टाइम";
        break;
      }
      case "decisionbox": {
        this.title = "Decision box";
        this.type = "decisionbox";
        this.title_hi = "डिसिशन बॉक्स";
        break;
      }
      case "dropdown": {
        this.title = "Drop down";
        this.type = "dropdown";
        this.title_hi = "ड्राप डाउन";
        break;
      }
      case "radio": {
        this.title = "Radio";
        this.type = "radio";
        this.title_hi = "रेडियो";
        break;
      }
      case "image": {
        this.title = "Image";
        this.type = "image";
        this.title_hi = "इमेज";
        break;
      }
      case "checkbox": {
        this.title = "Checkbox";
        this.type = "checkbox";
        this.title_hi = "चेकबॉक्स";
        break;
      }
      case "websiteurl": {
        this.title = "Website URL";
        this.type = "websiteurl";
        this.title_hi = "वेबसाइट यूआरएल";
        break;
      }
      case "currency": {
        this.title = "Currency";
        this.type = "currency";
        this.title_hi = "करेंसी";
        break;
      }
      case "fileupload": {
        this.title = "File upload";
        this.type = "fileupload";
        this.title_hi = "फाइल अपलोड";
        break;
      }
      case "imageupload": {
        this.title = "Image upload";
        this.type = "imageupload";
        this.title_hi = "इमेज अपलोड";
        break;
      }
      case "audio": {
        this.title = "Audio";
        this.type = "audio";
        this.title_hi = "ऑडियो";
        break;
      }
      case "section": {
        this.title = "Section";
        this.type = "section";
        this.title_hi = "सेक्शन";
        break;
      }
      case "slider": {
        this.title = "Slider";
        this.type = "slider";
        this.title_hi = "स्लाइडर";
        break;
      }
      case "rating": {
        this.title = "Rating";
        this.type = "rating";
        this.title_hi = "रेटिंग";
        break;
      }
      case "description": {
        this.title = "Description";
        this.type = "description";
        this.title_hi = "डिस्क्रिप्शन";
        break;
      }
      case "video": {
        this.title = "Video";
        this.type = "video";
        this.title_hi = "वीडियो";
        break;
      }
      case "pagebreak": {
        this.title = "Page break";
        this.type = "pagebreak";
        break;
      }
      case "termsandconditions": {
        this.title = "Terms and Conditions";
        this.type = "termsandconditions";
        this.title_hi = "टर्म्स एंड कंडीशंस";
        break;
      }
      case "matrix": {
        this.title = "Matrix";
        this.type = "matrix";
        this.title_hi = "मैट्रिक्स";
        break;
      }
      case "matrix_radio": {
        this.title = "Matrix";
        this.type = "matrix";
        this.title_hi = "मैट्रिक्स";
        break;
      }
      case "matrix_text": {
        this.title = "Matrix";
        this.type = "matrix";
        this.title_hi = "मैट्रिक्स";
        break;
      }
      case "matrix_checkbox": {
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
      default: {
        //console.log("default");
        break;
      }
    }
    //console.log(id, "id in getelement");
    if (id == "create") {
      //console.log("inside if");
      const { v4: uuid } = require("uuid");

      let uuid_defined = uuid();
      this.itemObject = {
        label: { en: this.title, hi: this.title_hi },
        input_id_type: input_sel,
        type: this.type,
        id: uuid_defined,
        required: this.required,
        is_required: this.required,
       // answer: this.answer,
        videos:['',''],
        //answer_id: this.answer_id,
       // answer_group_id:this.answer_group_id,
        matrixtype: "text",
        rowdata:{'en':['Row 1'],'hi':['पांति 1']},
        coldata:{'en':['Column 1'],'hi':['कॉलम 1']},
        choices:{'en':[{id:'',value:'Option',answer:'Option',type:this.type,answer_group_id:''}],'hi':[{id:'',value:'Option-hindi',answer:'Option-hindi',type:this.type,answer_group_id:''}]},
        imageChoices:{en:[{type: 'radio', title2: "Option",imageUploaded:'',images:'',id:''}],hi:[{type: 'radio', title2: "Option-hi",imageUploaded:'',images:'',id:''}]},//[{type: 'radio', title2: "",imageUploaded:'',images:'',id:''}],
        properties: [
          {
            firstName: true,
            middleName: true,
            lastName: true,
            matrixrow: 1,
            matrixcol: 1,
            addressLineOne:true,
            addressLineTwo:false,
            addressLineThree:false,
            city:false,
            pincode:true,
            state:false,
            country:false
          },
        ],
        placeholder: { en: "Placeholder", hi: "प्लेसहोल्डर" },
      };
      this.itemArray.push(this.itemObject);
    } else {
     
     var radichoice:any={ en: [], hi: [] };
      if(element.input_type_id==11 || element.input_type_id == 12 || element.input_type_id == 10){
        for (const key of Object.keys( element.answers)) {
          //console.log(key)
          let val=element.answers[key]
          //console.log(element.answers[key],"Element answers", element.answers)
          val.map((rec)=>{
            console.log("@@@@Inside!",rec.answer_group_id)
            radichoice[rec.language].push({id:rec.id,value:rec.answer,answer:rec.answer,type:this.type,answer_group_id:rec.answer_group_id})
          })
        }
      }
      var imgChoice:any={en:[], hi:[]};
      if(element.input_type_id == 33 || element.input_type_id == 34 || element.input_type_id == 28){
        for (const key of Object.keys( element.answers)) {
          console.log(key)
          let val=element.answers[key]
          console.log(element.answers[key],"Element answers", element.answers)
          val.map((rec)=>{
            console.log("@@@@Inside!#",rec.id)
            imgChoice[rec.language].push({id:rec.id,answer:rec.answer,type:this.type,answer_group_id:rec.answer_group_id,images:rec.image})
          })
        }
      }
      var matrixcol:any={ en: [], hi: [] };
      var matrixrow:any={ en: [], hi: [] };
      var mtype={'27':'text','24':'radio','25':'checkbox','40':'select'}
      if(['27','24','25','40'].includes(element.input_type_id))
      {
        element.matrixtype=mtype[element.input_type_id]?mtype[element.input_type_id]:'text'
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

      //console.log(radichoice)
      var type;
      var image;
      console.log(element,"ELEMENT in get")
      switch(element.input_selected){
        case '33':{
          type = 'radio';
           
          break;
        }
        case '34':{
         type = 'checkbox'
         //this.typeChanged(0);
         break;
       }
       case '40':{
        type = 'select'
        //this.typeChanged(0);
        break;
      }
       case '28':{
         type = 'hidden'
         break;
       }
      }
      this.itemObject = {
        label: { en: element.label.en, hi: element.label.hi },
        input_id_type: element.input_selected,
        type: this.type,
        id: element.id,
        required: element.required,
        is_required:element.required,
        //answer: '',
        answer_id: this.answer_id,
        answer_group_id:this.answer_group_id,
        matrixtype: element.matrixtype,
        properties: element.properties,
        audiosUrl:element.audiosUrl,
        audios:element.audios,
        videos:element.videos.reverse(),
        images:element.images,
        imagesUrl:element.imagesUrl,
        choices:radichoice,
        imageChoices:imgChoice,//[{type: type, title2: "",imageUploaded:'',images:''}],
        radioAnswers:element.answers,
        coldata:matrixcol,
        rowdata:matrixrow,
        matrix_columns:element.matrix_columns,
        matrix_rows:element.matrix_rows,
        min:(element.properties[0]&&element.properties[0].min)?element.properties[0].min:'',
        max:(element.properties[0]&&element.properties[0].max)?element.properties[0].max:'',
        placeholder: { en: element.placeholder.en, hi: element.placeholder.hi },
      };
      this.itemArray.push(this.itemObject);
    }

    ////console.log(this.itemArray,"INSIDE")
  }

  drop(event: CdkDragDrop<string[]>) {
    //console.log(event, "EVETN");
    for (var element of this.list_input_types) {
      //console.log(element.name);
      if (element.name == event.item.element.nativeElement.id) {
        ////console.log(this.type,"id",element.id);
        this.input_selected = element.id;
        break;
      }
    }
    //console.log(this.input_selected, "INPUT SELECTED");
    this.getElements(
      event.item.element.nativeElement.id,
      "create",
      0,
      this.input_selected
    );
  }

  submitClicked(
    type: string,
    tabIndex: number,
    statusInBuilder: number,
    isEdit: boolean,event
  ): number {
    this.componentSelected = true;

    var data;
    var dataForPut;
    var status = 0;
    this.survey.surveyItems.input_id_type = this.input_selected;
    this.survey.surveyItems.destination_language = this.survey.surveyItems.langSelected;
    if (data) {
      if (type == "saveAsDraft") data["is_draft"] = 1;
    }
    if (dataForPut) {
      if (type == "saveAsDraft") dataForPut["is_draft"] = 1;
    }
    //console.log(this.survey.surveyItems, "SURVEY ITEMS IN SUBMIT");
    var setElement=0;
    if (isEdit || this.viewOnly) {
      this.survey.surveyItems.survey_id = this.surveyIdForEdit;
      

      this.survey.items = [];
      this.survey.surveyItems.forEach((element) => {
        this.survey.items.push(element);
      });
      dataForPut = new SurveyQuestionRequestSet(this.survey.surveyItems);
      dataForPut.remove_questions = this.survey.deletedQuestions;
      
      dataForPut.questions.forEach(element => {
        console.log(element.input_type_id,"ELEMENT",element)
        if(([33,34,28,'33','34','28'].includes(element.input_type_id)) && element.answers[0]?.image == '' ){
            this.sharedService.displayErrorMessage("Atleast one image need to be uploaed for the image choice");
            setElement=1;
            return false;
        }
      });
    } else {
      this.survey.surveyItems.survey_id = this.surveyId;
      data = new SurveyQuestionRequestSet(this.survey.surveyItems);
      data.questions.forEach(element => {
        if(([33,34,28,'33','34','28'].includes(element.input_type_id)) && element.answers[0]?.image == '' ){
            this.sharedService.displayErrorMessage("Atleast one image need to be uploaed for the image choice");
            setElement = 1;
            return false;
        }
      });

    }

    //console.log(dataForPut, "DATA in builder");
    if (
      (data?.questions?.length == 0 || dataForPut?.questions?.length == 0) &&
      !this.viewOnly
    ) {
      this.sharedService.displayErrorMessage(
        "Atleast one question is mandatory"
      );
      return;
    }
  console.log(setElement,"setElement")
   if(setElement == 0){  
    status = this.callAPIForBuilder(statusInBuilder,isEdit,type,data,tabIndex,status,dataForPut);
   }
    /*this.survey.surveyItems.forEach(element => {
     //console.log(this.surveyId,"SURVEY ID PAssed",element)
     element.survey_id = this.surveyId;
    data = new SurveyQuestionRequestSet(element);
   });*/

    /*var sampleRequest={
    "survey_id": "76b14630-8c43-41ba-9e3a-292d676eea7f",
    "source_language": "en",
    "destination_language": [
        "hi",
        "te"
    ],
    "questions": [
        {
          "id": this.survey.surveyItems[0].id,
            "label": this.survey.surveyItems[0].label,
            "input_type_id": 1,
            "is_required": true,
            "choice_id": "",
            "answers": [
              {
                  "answer": ""
              }
            ],
            "images": this.survey.surveyItems[0].images,
            "videos": [],
            "audios": []
        }
    ]
}*/
    
    

    //this.surveyId.emit('aa');
    return status;
  }
  callAPIForBuilder(statusInBuilder,isEdit,type,data,tabIndex,status,dataForPut){
    if (statusInBuilder == 1 && !isEdit && !this.viewOnly) {
      this.commonService.postDataNew("survey/question", data).subscribe(
        (res) => {
          if (type == "saveAsDraft") {
            //console.log("SAVE AS DRAFT CLICKED");
            this.sharedService.displayErrorMessage("Saved successfully");
            return 1;
          } else if (type == "submit" && tabIndex == 1) {
            //console.log("SUBMIT CLICKED in step 2");
            if (!this.viewOnly) {
              this.sharedService.displayErrorMessage("Submitted successfully");
            }
            status = 0;
            //this.refresh.emit({ status: 3 });
            this.refresh.emit({ status: 2 });
          }
        },
        (err) => {
          //m this.loaderService.show('hide');
          //console.log(err);
          this.sharedService.displayErrorMessage("");
          this.refresh.emit({ status: 0 });
          status = 1;
        }
      );
    } else {
      dataForPut = new SurveyQuestionRequestSet(this.survey.surveyItems);
      dataForPut.remove_questions = this.survey.deletedQuestions;
      if (dataForPut) {
        if (type == "saveAsDraft") dataForPut["is_draft"] = 1;
      }
      this.commonService.putDataNew("survey/question", dataForPut).subscribe(
        (res) => {
          if (type == "saveAsDraft") {
            this.sharedService.displayErrorMessage("Saved successfully");
            //console.log("SAVE AS DRAFT CLICKED");
            return 1;
          } else if (type == "submit" && tabIndex == 1) {
            if (!this.viewOnly) {
              this.sharedService.displayErrorMessage("Submitted successfully");
            }
            //console.log("SUBMIT CLICKED in step 2");
            status = 0;
            //this.refresh.emit({ status: 3 });
            this.refresh.emit({ status: 2 });
          }
        },
        (err) => {
          //m this.loaderService.show('hide');
          //console.log(err);
          this.sharedService.displayErrorMessage("");
          this.refresh.emit({ status: 0 });
          status = 1;
        }
      );
    }
    return status;
  }
  
}

