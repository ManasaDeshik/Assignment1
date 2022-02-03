import { LanguageForPlaceholder } from "src/app/ims/survey/fm-survey/survey-form-item/form-item";
import * as moment from "moment";

export class SurveyTabDetails {
  totalsurveys_card: number;
  active_card: number;
  inactive_card: number;
  freeSurveys_card: number;
  totalearnings_card: number;

  constructor(data: any = {}) {
    this.totalsurveys_card = data.survey;
    this.active_card = data.survey;
    this.inactive_card = data.survey;
    this.freeSurveys_card = data.survey;
    this.totalearnings_card = data.survey;
  }
}

export class SurveyDetailsData {
  status: number;
  earning: number;
  id: string;

  constructor(data: any = {}) {
    this.status = data.survey;
    this.earning = data.survey;
    this.id = data.id;
  }
}

export class SurveyList {
  public id: number;
  public survey_name: string;
  public approvedCount: number;
  public rejectedCount: number;
  public saheliAssociatedCount: number;
  public submittedCount: number;
  public totalEarnings: number;
  public toggleStatus: boolean;
  public status: number;
  constructor(data: any = {}) {
    this.id = data.id || "";
    this.survey_name = data.name || "";
    this.approvedCount = data.approvedCount || 0;
    this.rejectedCount = data.rejectedCount || 0;
    this.saheliAssociatedCount = data.saheliAssociatedCount || 0;
    this.submittedCount = data.submittedCount || 0;
    this.totalEarnings = data.totalEarnings || 0;
    this.status = data.status || 0;
    if (data.status == 0) this.toggleStatus = false;
    else this.toggleStatus = true;
  }
}

export class SurveyQuestionRequestSet {
  public recordsPerPage: number;
  public pageNumber: number;
  public survey_id: String;
  public is_draft: number;
  public source_language: String;
  public destination_language: [];
  public questions: QuestionList[] = [];
  public remove_questions = [];
  constructor(data: any = {}) {
    console.log(data, "INISDE");
    this.survey_id = data.survey_id || "";
    this.is_draft = 0;
    this.source_language = data.source_language || "en";
    this.destination_language = data.dest_lang || ["te", "hi"];
    //this.remove_questions = data.remove_questions;
    data.forEach((element) => {
      console.log(element);
      this.questions.push(new QuestionList(element));
    });
  }
}

export class SurveyDetailSet {
  public id: string;
  public instruction: string;
  public language: string;
  public name: string;
  public user: UserSurveyList[] = [];

  constructor(data: any = {}) {
    this.id = data.id || "";
    this.instruction = data.instruction || "";
    this.language = data.language || "";
    this.name = data.name || "";
    this.user.push(new UserSurveyList(data));
  }
}

export class UserSurveyList {
  public saheliname: string;
  public respondentName: string;
  public phone: string;
  public email: string;
  public state: string;
  public district: string;
  constructor(data: any = {}) {
    console.log(data, "DATA");
    this.saheliname = data.firstName || "";
    this.respondentName =
      data.user && data.user.first_name ? data.user.first_name : "";
    this.phone = data.phoneNumber || "";
    this.email = data.email || "NA";
    this.state = data.user && data.user.branch ? data.user.branch.state : "";
    this.district =
      data.user && data.user.branch ? data.user.branch.district : "";
  }
}
export class Language {
  public en: string;
  public hi: string;
}

export class QuestionList {
  public id: string;
  public label = { en: "", hi: "" };
  public placeholder = { en: "", hi: "" };
  public input_type_id: number;
  public type: string;
  public is_required: boolean;
  public choice_id: string;
  public images: [];
  public audios: [];
  public videos: [];
  public currency: "";
  public min: "";
  public max: "";
  public steps: "";
  public answers: any=[];// = { en: [], hi: [] };
  public row = [];
  public col = [];
  public rows = [];
  public cols = [];
  public dest_language = "";
  public properties: Properties[] = [];
  constructor(data: any = {}) {
    console.log(data, "DATA");
    this.id = data.id || "";
    this.label.en = data.label.en || "";
    this.label.hi = data.label.hi || "";
    this.placeholder.en = data.placeholder.en || "";
    this.placeholder.hi = data.placeholder.hi || "";
    this.input_type_id = data.input_id_type || 0;
    if (data.type) this.type = data.type;
    this.is_required = data.is_required || false;
    this.choice_id = data.choice_id || "";
    this.images = data.images || [];
    this.audios = data.audios || [];
    this.videos = data.videos || [];
    this.dest_language = data.dest_lang || "hi";
    //if(data.fname || data.mname || data.lname || data.addressline1 || data.addressline2 ||
    //data.addressline3 || data.city || data.state || data.pincode || data.country)
    this.properties.push(new Properties(data));

        if(data.currency)
        this.currency =  data.currency || '';
        if(data.min)
        this.min =  data.min || '';
        if(data.max)
         this.max = data.max || '';
        if(data.steps)
          this.steps = data.steps || '';
         
         if(data.choices && !['33','34','28'].includes(data.input_id_type)){ //&& (data.input_id_type !== '33' || data.input_id_type !== '34' || data.input_id_type!=='28')){
         // alert('radio') 
          console.log(data.choices,"Choices")
          var mydatalist = new AnswersListChoice(data.choices);
          this.answers = mydatalist.returnArray;
           /* data?.choices?.en.forEach(element => {
               this.answers.push(new AnswersListChoice(element))
            });*/
        }  
      else if(data.imageChoices && ['33','34','28'].includes(data.input_id_type)){
       // alert('image choice');
         console.log(data.imageChoices,"Image choices") 
         this.answers=[];
         var mydatalist1 = new AnswersListChoice(data.imageChoices);
         this.answers = mydatalist1.returnArray;
      }  
          else{
            this.answers=[];
            this.answers.push(new AnswersList(data));
          }
            
    if (data.currency) this.currency = data.currency || "";
    if (data.min) this.min = data.min || "";
    if (data.max) this.max = data.max || "";
    if (data.steps) this.steps = data.steps || "";
    this.row = data.rowdata;
    this.col = data.coldata;
    if(data.type=='matrix'){
      if(data.rowdata && data.rowdata['en']){
      this.rows=(data.rowdata['en'].map((v,i)=>{
        return {'key':{'en':v,'hi':data.rowdata['hi']&&data.rowdata['hi'][i]?data.rowdata['hi'][i]:''}}
      }))
    }
    if(data.coldata && data.coldata['en']){
      this.cols=(data.coldata['en'].map((v,i)=>{
        var suboption=[]
        if(data.optionvalue && data.optionvalue['en'] && data.optionvalue['en'][i]){
          data.optionvalue['en'][i].map((x,z)=>{
            suboption.push({'en':x,'hi':data.optionvalue['en'][i][z]})
          })
        }
        return {'key':{'en':v,'hi':data.coldata['hi']&&data.coldata['hi'][i]?data.coldata['hi'][i]:''},'values':suboption}
      }))
    }
    }
  }
}
export class Properties {
  public firstName: boolean;
  public middleName: boolean;
  public lastName: boolean;
  public addressLineOne: boolean;
  public addressLineTwo: boolean;
  public addressLineThree: boolean;
  public city: boolean;
  public state: boolean;
  public pincode: boolean;
  public country: boolean;
  public row: number;
  public col: number;
  public min: "";
  public max: "";
  public steps: "";
  constructor(data: any = {}) {
    console.log(data, "DATAaab");
    if (data.properties[0].firstName)
      this.firstName = Boolean(data.properties[0].firstName);
    else this.firstName = false;
    if (data.properties[0].middleName)
      this.middleName = Boolean(data.properties[0].middleName);
    else this.middleName = false;
    if (data.properties[0].lastName)
      this.lastName = Boolean(data.properties[0].lastName);
    else this.lastName = false;
    if (data.min) this.min = data.min || "";
    if (data.max) this.max = data.max || "";
    if (data.steps) this.steps = data.steps || "";
    data.properties[0].addressLineOne
      ? (this.addressLineOne = Boolean(data.properties[0].addressLineOne))
      : (this.addressLineOne = false);
    data.properties[0].addressLineTwo
      ? (this.addressLineTwo = Boolean(data.properties[0].addressLineTwo))
      : (this.addressLineTwo = false);
    data.properties[0].addressLineThree
      ? (this.addressLineThree = Boolean(data.properties[0].addressLineThree))
      : (this.addressLineThree = false);
    data.properties[0].pincode
      ? (this.pincode = Boolean(data.properties[0].pincode))
      : (this.pincode = false);
    data.properties[0].state
      ? (this.state = Boolean(data.properties[0].state))
      : (this.state = false);
    data.properties[0].country
      ? (this.country = Boolean(data.properties[0].country))
      : (this.country = false);
    data.properties[0].city
      ? (this.city = Boolean(data.properties[0].city))
      : (this.city = false);
    data.properties[0].matrixrow
      ? (this.row = data.properties[0].matrixrow)
      : (this.row = 1);
    data.properties[0].matrixcol
      ? (this.col = data.properties[0].matrixcol)
      : (this.col = 1);
  }
}

export class AnswersList {
  public answer: { en: any; hi: any,en_id:any,hi_id:any };
  public choice_id: string = "";
  public image: string = "";
  public title2:any;
  constructor(data: any = {}) {
    console.log("DATA IN ANSWER LIST", data);
    //if(data.answer)
   // this.answer = data.answer || "";
   // if (data.value) this.answer = data.value || "";
    if (data.images) {
      this.image = data.images || "";
    }
   // if (data.choice_id) this.choice_id = data.choice_id || "";
    if (data.title2){
      this.answer = {
        en: data.title2 || "",
        en_id:data.id || '',
        hi_id:data.id || '',
        hi:  data.title2 || ""
      };
    }
  }
}

export class AnswersListChoice {
  public answer: { en: ""; hi: "",en_id:"",hi_id:"" };
  public choice_id: { en: ""; hi: "" };
  public image: { en: ""; hi: "" };
  public id: { en_id: ""; hi_id: "" };
  public returnArray = [];
  constructor(dataarray: any = {}) {
    dataarray["en"].map((data, i) => {
      console.log("DATA IN ANSWER LIST", data);
      if (data.answer) {
        this.answer = {
          en: data.answer || "",
          hi: dataarray["hi"][i].answer || "",
          en_id: data.id || "",
          hi_id: dataarray["hi"][i].id || "",
        };
      } else if (data.value)
        this.answer = {
          en: data.value || "",
          hi: dataarray["hi"][i].value || "",
          en_id: data.id || "",
          hi_id: dataarray["hi"][i].id || "",
        };
      else if (data.title2) {
        this.answer = {
          en: data.title2 || "",
          hi: dataarray["hi"][i].title2 || "",
          en_id: data.id || "",
          hi_id: dataarray["hi"][i].id || "",
        };
      }
      if (data.choice_id)
        this.choice_id = {
          en: data.choice_id || "",
          hi: dataarray["hi"][i].choice_id || "",
        };

      if (data.images)
        this.image = data.images; /*{
          en: data.imageUploaded || "",
          hi: dataarray["hi"][i].imageUploaded || "",
        };*/
      this.returnArray.push({
        answer: this.answer,
        choice_id: this.choice_id,
        image: this.image,
      });
    });
    console.log(this.returnArray,"RETRUN ARRAY")
    //return this.returnArray
  }
}

export class SurveyQuestionsData {
  public input_selected: string;
  public label: string;
  public name: string;
  public id: string;
  public properties: [];
  public placeholder: any;
  public answers: any;
  public audios: any;
  public images: any;
  public imagesUrl: any;
  public audiosUrl: any;
  public input_type: any;
  public input_type_id: any;
  public is_cascade: any;
  public is_required: any;
  public required: any;
  public rules: any;
  public sequence: any;
  public videos: any;
  public matrix_columns: any;
  public matrix_rows: any;
  

  constructor(data: any = {}) {
    console.log(data, "DATAA");
    this.input_selected = data.input_type_id;
    this.label = data.label;
    this.name = data.input_type?.name;
    this.properties = data.properties;
    this.id = data.id;
    this.placeholder = data.placeholder;
    this.answers = data.answers || "";
    this.audios = data.audios || "";
    this.input_type = data.input_type || "";
    this.input_type_id = data.input_type_id || "";
    this.is_cascade = data.is_cascade || "";
    this.is_required = data.is_required || "";
    this.required = data.is_required || "";
    this.rules = data.rules || "";
    this.sequence = data.sequence || "";
    this.videos = data.videos || "";
    this.images = data.images || "";
    this.audiosUrl=data.audiosUrl|| [''];
    this.imagesUrl=data.imagesUrl|| ['',''];
    this.matrix_columns=data.matrix_columns||[];
    this.matrix_rows=data.matrix_rows||[]
    //this
    /* data.input_type?.forEach(element => {
      this.name = element.name;
    });*/
    //this.name = data.input_type.name;
  }
}
export class SurveyData {
  public surveyName: string;
  public surveyDesc: string;
  public stateSelected = [];
  public districtSelected = [];
  public branchSelected = [];
  public villageSelected = [];
  public saheliSelected = [];
  public startDate: Date;
  public endDate: Date;
  public numOfSubmissions: number;
  public toggleStatus: boolean;
  public numOfSubmissionsPerSaheli: number;
  public date: Date[] = [];
  public amount: number[] = [];
  public submitBtnLabel: string;
  public submitMsg: string;
  public surveyid_edit;
  public fileName: any = "";
  public fileName_2: any = "";
  public survey_earnings: any[] = [];
  constructor(data: any = {}) {
    console.log(data, "DATA IN SURVEYDATA");
    this.surveyName = data.name;
    this.surveyDesc = data.instruction;
    if (data.focus) {
      data.focus.state.forEach((element) => {
        this.stateSelected.push(element);
      });
      data.focus.district.forEach((element) => {
        this.districtSelected.push(element);
      });
      data.focus.branch.forEach((element) => {
        this.branchSelected.push(element);
      });
      data.focus.village.forEach((element) => {
        this.villageSelected.push(element);
      });
      data.focus.saheli_id.forEach((element) => {
        this.saheliSelected.push(element);
      });
    }
    if (data.startDate) {
      let date = data.startDate;
      date = moment(date).subtract(5.5, "hours");
      console.log("313", date);
      this.startDate = date._d;
      console.log("315", this.startDate);
    }
    if (data.expireDate) {
      let date = data.expireDate;
      date = moment(date).subtract(5.5, "hours");
      console.log("313", date);
      this.endDate = date._d;
      console.log("315", this.endDate);
    }
    this.numOfSubmissions = data.numberOfSubmission;
    if (data.isPaidSurvey == 1) this.toggleStatus = true;
    else this.toggleStatus = false;
    if (data.isPaidSurvey == true) {
    }
    this.numOfSubmissionsPerSaheli = data.numberOfSubmissionPerSaheli;
    this.survey_earnings = data.survey_earnings;
    if (data.survey_earnings) {
      data.survey_earnings.forEach((element) => {
        if (element.from_date == null && element.earning == 0) {
          this.amount.push(null);
        } else {
          this.amount.push(element.earning);
        }
        this.date.push(element.from_date);
      });
    }
    this.submitBtnLabel = data.submitLabel;
    this.submitMsg = data.confirmationMessage;
    this.surveyid_edit = data.id;

    if (data.images?.length > 0) {
      console.log(data.images, "IMAGES IN SURVEYTS");
      this.fileName = data.images[0];
      if (data?.images && data.images.length > 1)
        this.fileName_2 = data.images[1];
    }
  }
}

export class TableSurveylist {
  public totalPages: number;
  public totalRecords: number;
  public records: SurveyList[] = [];

  constructor(data: any = {}) {
    if (data.page_info) {
      this.totalPages = data.page_info.total_pages;
      this.totalRecords = data.page_info.total_pages * 10;
    } else {
      this.totalPages = 1;
      this.totalRecords = 0;
    }

    if (data.records) {
      if (data.records.length > 0) {
        data.records.forEach((element) => {
          this.records.push(new SurveyList(element));
        });
      } else {
        this.records = [];
      }
    } else {
      this.records = [];
    }
  }
}
