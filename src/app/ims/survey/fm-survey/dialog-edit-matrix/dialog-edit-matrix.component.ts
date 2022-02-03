import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { CommonService, SharedService } from 'src/app/utils';

@Component({
  selector: 'app-dialog-edit-matrix',
  templateUrl: './dialog-edit-matrix.component.html',
  styleUrls: ['./dialog-edit-matrix.component.scss']
})
export class DialogEditMatrixComponent implements OnInit {
public dtable;
public type = "radio";
public hidden = "false";
form=new FormArray([]);
  @Input() fields:any
@Input() surveyid;
public langSelected='hi';
public imageSelected : boolean = false;
public audioSelected : boolean = false;
public videoSelected : boolean = false;
@ViewChild('fileInput') imageInputVar1: ElementRef;
  @ViewChild('fileInput1') imageInputVar2: ElementRef;
  @ViewChild('audioInput') audioInputVar: ElementRef;
//public rowData=[];
public colData;
public imageUploaded = [];
public audiosUploaded = [];
public isEnglish : boolean = true;
public isHindi : boolean = false;
public rowdata={ en: [], hi: [] };
public coldata={ en: [], hi: [] };
public rowData = { en: [], hi: [] };
public optVal:any={'en':{0:[]},'hi':{0:[]}}
rows=1
cols=1

  constructor(private commonService : CommonService,  private sharedService: SharedService) { }
  add(x,y){
    this.form=new FormArray([]);
    this.rows=x//this.item.matrixrow
    this.cols=y//this.item.matrixcol
     for (let i = 0; i < this.rows; i++) {
         this.form.push(new FormArray([]))
         for (let j = 0; j < this.cols; j++) {
           (this.form.at(i) as FormArray).push(new FormControl())
         }
     }
     return this.form.controls;
  }
  ngOnInit(): void {
   // this.fields.coldata=this.coldata
    //this.fields.rowdata=this.rowdata
    //console.log(this.fields.properties[0].matrixrow,"MATRIX")
    //console.log(this.surveyid,"SURVEY ID",this.fields,this.coldata,this.rowdata)
    this.fields.dest_lang = 'hi';
    this.cols = this.fields.properties[0].matrixcol;
    this.rows = this.fields.properties[0].matrixrow;
    this.fields.type = 'matrix';
      this.fields.input_id_type = '27';
    for (let i = 0; i < this.cols; i++) {
      this.form.push(new FormArray([]))
      for (let j = 0; j < this.rows; j++) {
        (this.form.at(i) as FormArray).push(new FormControl())
      }
  }
  //this.rowData.push('a');
  this.fields.rowdata=JSON.parse(JSON.stringify(this.fields.rowdata))
  this.fields.coldata=JSON.parse(JSON.stringify(this.fields.coldata))
  this.rowdata=this.fields.rowdata
  this.coldata=this.fields.coldata
  this.fields.row = this.rowdata;
  this.fields.col = this.coldata;
  console.log(this.fields)
  }
  trackByFn(index: any, item: any) {

    return index;
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
  audioChanged(event){
    this.fields.audios.push(event.target.value);
  }
  videoChanged(event){
    this.fields.videos.push(event.target.value);
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
            response.data.image.forEach(element => {
              this.imageUploaded.push(element);
            });
            console.log(this.imageUploaded,"images uploaded")
            this.fields.images = this.imageUploaded;
            this.fields.id = response.data.id;
          });
      } else {
          this.sharedService.displayErrorMessage('Image has been already uploaded');
        }
    }
  }
  matrixTypeChanged(event){
   // this.optVal={'en':[],'hi':[]}
      console.log(event.target.value,"VALUESSS")
      if(event.target.value !== 'only images'){
        this.type = event.target.value;
        this.hidden = "false";
        if(this.type == 'textbox' || this.type == 'text')
          this.fields.input_id_type = "27";
        else  if(this.type == 'radio')
        this.fields.input_id_type = "24";
        else  if(this.type == 'checkbox')
        this.fields.input_id_type = "25";
        else  if(this.type == 'select'){
          this.fields.input_id_type = "40";
          //this.optVal['en']={0:[]}
         // this.optVal['hi']={0:[]}
          this.fields.coldata[this.langSelected].map((v,i)=>{
            if(!this.optVal['en'][i] )
            {
              this.optVal['en'][i]=[]
              this.optVal['hi'][i]=[]
            }
          this.optVal['en'][i].push('Option')
          this.optVal['hi'][i].push('Option hi')
        })
        }
        else
        this.fields.input_id_type = '26';
      }
      //this.fields.type = 'matrix';
    console.log(event.target.value)
    this.fields.matrixtype = event.target.value;
    this.fields.optionvalue=this.optVal

  }
  deleteOption(k,i){
    this.optVal['en'][i].splice(k, 1); 
    this.optVal['hi'][i].splice(k, 1); 
  }
  addOption(i){
    this.optVal['en'][i].push('Option')
    this.optVal['hi'][i].push('Option hi')
    this.fields.optionvalue=this.optVal
  }
  deleteGrid(type,index){
    if(type=='row'){
     
      this.rowdata['en'].splice(index, 1); 
      this.rowdata['hi'].splice(index, 1); 
      this.rows = this.rows-1;
    }
    else {
      console.log(index,this.coldata)
      this.coldata['en'].splice(index, 1); 
      this.coldata['hi'].splice(index, 1); 
      this.cols=this.cols-1
    }
    console.log(this.fields,this.coldata,this.rowdata)
    this.fields.coldata=this.coldata
    this.fields.rowdata=this.rowdata
    this.fields.row = this.rowdata;
    this.fields.col = this.coldata; 
    this.fields.properties[0].matrixcol=this.cols;
this.fields.properties[0].matrixrow=this.rows; 
this.fields.optionvalue=this.optVal 
  }
  dataChanged(){
    this.fields.coldata=this.coldata
    this.fields.rowdata=this.rowdata
    this.fields.row = this.rowdata;
    this.fields.col = this.coldata; 
    this.fields.optionvalue=this.optVal
  }
  addRow(){
    console.log(this.fields.rowdata,this.fields.coldata,this.rowData)
    this.rows = this.fields.properties[0].matrixrow;
    this.cols = this.fields.properties[0].matrixcol
    var formData = this.form.length;
    this.coldata = this.fields.coldata;
    this.rowdata = this.fields.rowdata;
   this.rowdata['en'][this.rows]='Row '+(this.rows+1)
   this.rowdata['hi'][this.rows]='पांति'+(this.rows+1)
   this.fields.coldata=this.coldata
   this.fields.rowdata=this.rowdata
    this.rows = this.rows+1;

for (let i = 0; i < this.form.controls.length; i++) {
 
  for (let j = 0; j < 1; j++) {
    (this.form.at(i) as FormArray).push(new FormControl())
  }
}

this.fields.properties[0].matrixcol=this.cols;
this.fields.properties[0].matrixrow=this.rows;
this.fields.row = this.rowdata;
this.fields.col = this.coldata;
this.fields.optionvalue=this.optVal
}
  addColumn(){
   // this.form=new FormArray([]);
   //this.form=new FormArray([]);
   console.log(this.fields.rowdata,this.fields.coldata)
     this.rows = this.fields.properties[0].matrixrow;
   this.cols = this.fields.properties[0].matrixcol;
    this.coldata = this.fields.coldata;
   this.rowdata = this.fields.rowdata;
   this.coldata['en'][this.cols]='Column '+(this.cols+1)
   this.coldata['hi'][this.cols]='कॉलम '+(this.cols+1)
   if(!this.optVal['en'][this.cols] && this.type == 'select'){
    this.optVal['en'][this.cols]=[]
    this.optVal['hi'][this.cols]=[]
    this.optVal['en'][this.cols].push('Option')
    this.optVal['hi'][this.cols].push('Option hi')
   }
  
  // this.coldata[this.cols]='Column '+(this.cols+1)
   console.log(this.coldata,"COLDATA",this.rowData)
   this.fields.coldata=this.coldata
    this.fields.rowdata=this.rowdata
   this.cols = this.cols+1;
   var formData = this.form.length;
  
   //for (let i = 0; i < this.rows; i++) {
     this.form.push(new FormArray([]));
    
     for (let j = 0; j < this.rows; j++) {
       (this.form.at(formData) as FormArray).push(new FormControl())
    }
 //}
 console.log(this.rows,"ROWS",this.cols, this.form.controls)
 this.fields.properties[0].matrixcol=this.cols;
this.fields.properties[0].matrixrow=this.rows;
this.fields.row = this.rowdata;
this.fields.col = this.coldata;
this.fields.optionvalue=this.optVal
  }
  dataChanges(event,index){
    console.log(event.target.value);
    this.rowData[index] = event.target.value;
    this.fields.rowData = this.rowData;
    return true
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
