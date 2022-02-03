import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonService, SharedService } from 'src/app/utils';
export class DynamicGrid{   
  type:string;
  title2:string;
  imageUploaded:string;
}
export class optionsList{
   image:string;
}
@Component({
  selector: 'app-dialog-edit-imagechoice',
  templateUrl: './dialog-edit-imagechoice.component.html',
  styleUrls: ['./dialog-edit-imagechoice.component.scss']
})
export class DialogEditImagechoiceComponent implements OnInit {
  dynamicArray: Array<DynamicGrid> = [];
  public langSelected='hi';
  @Input() fields:any={label:'',images:[],id:'',input_id_type:'',choices:this.dynamicArray,audios:[],videos:[],type:'',image:''}
  image;
  audio;
  video;
  @Input() surveyid;
  public type = "radio";
  public hidden = "false";
  public imageSelected : boolean = false;
  public audioSelected : boolean = false;
  public videoSelected : boolean = false;
  public imageUploaded = [];
  public audiosUploaded = [];
  public isEnglish : boolean = true;
  public isHindi : boolean = false;
  @ViewChild('fileInput') imageInputVar1: ElementRef;
  @ViewChild('fileInput1') imageInputVar2: ElementRef;
  @ViewChild('audioInput') audioInputVar: ElementRef;
    constructor(private commonService : CommonService,  private sharedService: SharedService) { }
  
    ngOnInit(): void {
      console.log(this.surveyid,"SURVEY ID");
      this.fields.dest_lang = 'hi';
      this.newDynamic = {type: this.type, title2: "",imageUploaded:''};
      //this.dynamicArray[0].type = this.type;
      this.fields.type = 'radio';
      this.fields.input_id_type = '33';
      this.dynamicArray.push(this.newDynamic);
    }
    imageClicked(val){
      console.log("clicked",val.target.checked)
      if(val.target.checked){
        this.imageSelected = true; 
      }
      else{
        this.imageSelected = false;
      }
    }
    audioClicked(val){
      //console.log("clicked",val.target)
      if(val.target.checked){
        this.audioSelected = true; 
      }
      else{
        this.audioSelected = false;
      }
    }
    videoClicked(val){
      //console.log("clicked",val.target.value)
      if(val.target.checked){
        this.videoSelected = true; 
      }
      else{
        this.videoSelected = false;
      }
    }
    audioChanged(event){
      this.fields.audios.push(event.target.value);
    }
    videoChanged(event){
      this.fields.videos.push(event.target.value);
    }
    addImageFile(index: number,event) {
      for (const file of event.srcElement.files) {
        if ((window['restrictImageMinSize'] < (event.target.files[0].size / 1000)) && ((event.target.files[0].size / 1000) < window['restrictImageMaxSize'])) {
         // if (!this.storeImages.some(val => val.name === file.name)) {
            const formData: FormData = new FormData();
            const { v4: uuid } = require('uuid');
  
              let id= uuid();
      if (file) {
        formData.append('images', file);
        formData.append('id',id);
        formData.append('survey_id',this.surveyid);//'76b14630-8c43-41ba-9e3a-292d676eea7f')
        //formData.append('type', 'products');
      }
            this.commonService.fileupload('survey/answer/upload', formData).subscribe(response => {
              if(response)
              console.log("insideee")
              console.log('123',response);
              var ids = [];
              response.data.image_url.forEach((element) => {
                this.imageUploaded.push(element);
                console.log(index,"INDEX")
              });
              this.fields.images = this.imageUploaded;
              this.fields.id = response.data.id;
            });
        } else {
          this.sharedService.displayErrorMessage(`File size should be in between ${window['restrictImageMinSize']} Kilo bytes to ${window['restrictImageMaxSize']}  Kilo bytes`);
          }
      }
    }
    cancelAudio(){
      this.audiosUploaded.splice(0,1);
      this.audioInputVar.nativeElement.value='';
    }
    cancelImage1(){
      this.imageUploaded.splice(0,1);
      //this.fields.images.splice(0,1);
      this.imageInputVar1.nativeElement.value = "";
     // this.imageInputVar2.nativeElement.value = "";
      console.log(this.imageUploaded,"Images")
    }
    cancelImage2(){
      this.imageUploaded.splice(0,1);
     // this.fields.images.splice(0,1);
      //this.imageInputVar1.nativeElement.value = "";
      this.imageInputVar2.nativeElement.value = "";
      console.log(this.imageUploaded,"Images")
    }
    addFile(index: number,event) {
      for (const file of event.srcElement.files) {
        if ((window['restrictImageMinSize'] < (event.target.files[0].size / 1000)) && ((event.target.files[0].size / 1000) < window['restrictImageMaxSize'])) {
         // if (!this.storeImages.some(val => val.name === file.name)) {
            const formData: FormData = new FormData();
            const { v4: uuid } = require('uuid');
  
              let id= uuid();
      if (file) {
        formData.append('images', file);
        formData.append('id',id);
        formData.append('survey_id',this.surveyid);//'76b14630-8c43-41ba-9e3a-292d676eea7f')
        //formData.append('type', 'products');
      }
            this.commonService.fileupload('survey/question/upload', formData).subscribe(response => {
              if(response)
              console.log("insideee")
              console.log('123',response);
              var ids = [];
              response.data.image_url.forEach((element) => {
                this.imageUploaded.push(element);
                console.log(index,"INDEX")
                this.dynamicArray[index].imageUploaded = element;
                this.dynamicArray[index].type = this.type;
              });
              console.log(this.dynamicArray,"images uploaded")
              
              this.fields.choices = this.dynamicArray;
              this.newOptionList = {image : this.newDynamic.imageUploaded}
              //this.fields.answers.push(this.newDynamic.imageUploaded)
             // this.fields.images = this.imageUploaded;
              this.fields.id = response.data.id;
            });
        } else {
          this.sharedService.displayErrorMessage(`File size should be in between ${window['restrictImageMinSize']} Kilo bytes to ${window['restrictImageMaxSize']}  Kilo bytes`);
          }
      }
    }
    typeChanged(event){
      console.log(event.target.value,"VALUESSS")
      if(event.target.value !== 'only images'){
        this.type = event.target.value;
        this.hidden = "false";
        if(this.type == 'radio')
          this.fields.input_id_type = "33";
        else
        this.fields.input_id_type = '34';
      }
      
      else{
        console.log("inside")
        this.type="hidden";
        this.hidden = 'true';
        this.fields.input_id_type = "28";
      }
      this.fields.type = this.type;
    }
   
  newDynamic: any = {};
  newOptionList:any ={};
  addRow(index) {  
    this.newDynamic = {type: this.type, title2: "",imageUploaded:''};
    this.dynamicArray.push(this.newDynamic);
   
    console.log(this.dynamicArray);
    return true;
}

deleteRow(index) {
    if(this.dynamicArray.length ==1) {

        return false;
    } else {
        this.dynamicArray.splice(index, 1);
        this.fields.answers.splice(index,1)
        return true;
    }
    
}
removeFile(index: number): void {
  this.dynamicArray[index].imageUploaded = '';
  var data = {
    file: this.imageUploaded[index]
}
  this.commonService.deleteDataNew('survey/upload', data).subscribe(response => {
    if (response.status = 200) {
     
    }
  }, err => {
    this.sharedService.displayErrorMessage(err.statusText);
  });
  this.imageUploaded.splice(index,1)
  this.fields.answers.splice(index,1)
  // this.storeImages.splice(index, 1);
  // console.log(this.displayImages,this.storeImages);
  // return;
  
}
addAudioFile(index: number,event) {
  for (const file of event.srcElement.files) {
    //if ((window['restrictImageMinSize'] < (event.target.files[0].size / 1000)) && ((event.target.files[0].size / 1000) < window['restrictImageMaxSize'])) {
     // if (!this.storeImages.some(val => val.name === file.name)) {
        const formData: FormData = new FormData();
        const { v4: uuid } = require('uuid');

          let id= uuid();
  if (file) {
    formData.append('audios', file);
    formData.append('id',id);
    formData.append('survey_id',this.surveyid);//'76b14630-8c43-41ba-9e3a-292d676eea7f')
    //formData.append('type', 'products');
  }
        this.commonService.fileupload('survey/question/upload', formData).subscribe(response => {
          if(response)
          response.data.audio_url.forEach(element => {
            this.audiosUploaded.push(element);
          });
          //console.log(this.imageUploaded,"images uploaded")
          this.fields.audios = this.audiosUploaded;
          this.fields.id = response.data.id;
        });
   // } else {
      //  this.sharedService.displayErrorMessage('Image has been already uploaded');
      //}
  }
}  
setHindiData() {
  console.log('inside Hindi',this.fields.label);
  this.isEnglish = true;
  this.langSelected = 'hi';
  this.fields.dest_lang = this.langSelected;
}

setEnglishData() {
  console.log('inside English',this.fields.label);
  this.isEnglish = false;
  this.langSelected = 'en';
  this.fields.dest_lang = this.langSelected;
}
}
