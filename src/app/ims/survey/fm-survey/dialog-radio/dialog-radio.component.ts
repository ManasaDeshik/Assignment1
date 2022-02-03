import { Component, ElementRef, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { CommonService, SharedService } from 'src/app/utils';
export class DynamicGrid{   
  type?:string;
 value?:string;
 title2?:string;
  imageUploaded?:string;
}
@Component({
  selector: 'app-dialog-radio',
  templateUrl: './dialog-radio.component.html',
  styleUrls: ['./dialog-radio.component.scss']
})
export class DialogRadioComponent implements OnInit {
  dynamicArray1: Array<DynamicGrid> = [];
  dynamicArray: Array<DynamicGrid> = [];
  dynamicArray_hi:Array<DynamicGrid> = [];
  public langSelected='hi';
  public typeSelect;
  public type = "radio";
  public hidden = "false";
  public isDisabled = "true";
  @Input() fields:any;//={label:'',placeholder:'',name:'',min:'',max:'', imageChoices:[{type: this.type, title2: "",imageUploaded:''}],choices:{en:this.dynamicArray,hi:this.dynamicArray},required:'',images:[],id:'', choice:'',videos:[],audios:[]}
  image;
  audio;
  video;
  @Input() surveyid;
  
  public imageSelected : boolean = false;
  public audioSelected : boolean = false;
  public videoSelected : boolean = false;
  public imageUploaded = [];
  public imagetobeStored = [];
  public audiosUploaded = [];
  public isEnglish : boolean = true;
  public isHindi : boolean = false;
  public myngmodel = { en: [], hi: [] };
  public myngmodelId = { en: [], hi: [] };
  public myngmodel_imageChoice = { en:["Option"], hi:["Option-hi"]};
  public myngmodelId_imageChoice = { en: [], hi: [] };
  public imagedata=['','']
  public imagearraydata=['','']
  public audiodata=['']
  @ViewChild('fileInput') imageInputVar1: ElementRef;
  @ViewChild('fileInput1') imageInputVar2: ElementRef;
  @ViewChild('audioInput') audioInputVar: ElementRef;
  @ViewChild('audioPlayer') elRef: ElementRef;
  
    constructor(private commonService : CommonService,  private sharedService: SharedService) { }
  
    ngOnInit(): void {
      
      if(this.fields.input_id_type == 33 || this.fields.input_id_type == 34 || this.fields.input_id_type == 28){
        switch(this.fields.input_id_type){
          case '33':{
            this.fields.type = 'radio';
             
            break;
          }
          case '34':{
           this.fields.type = 'checkbox'
           //this.typeChanged(0);
           break;
         }
         case '28':{
           this.fields.type = 'hidden'
           break;
         }
        }
        this.typeChanged(this.fields.type);
        console.log("INIDE IF",this.fields)
        let array = {en:[],hi:[]};
        ["en", "hi"].map((v) => {
          this.fields.imageChoices[v].map((myval,index) => {
            console.log(myval,"MYVAL")
            if(this.fields.imageChoices && this.fields.imageChoices[v] && this.fields.imageChoices[v][index])
            array[v].push({type: myval.type, title2: myval.title2,imageUploaded:myval.imageUploaded,images:myval.images,id:myval.id,group_id:myval.answer_group_id});
            else
            array[v].push({type: myval.type, title2: myval.title2,imageUploaded:myval.imageUploaded,images:myval.images,id:myval.id,group_id:myval.answer_group_id});
          });
        });
        console.log(array,"ARRAY INSIDE")
        this.fields.imageChoices = array;
        /*this.newDynamic = {type: this.fields.type, 
                            title2: this.fields.imageChoices[this.langSelected][0].title2,
                          imageUploaded:this.fields.imageChoices[this.langSelected][0].imageUploaded,
                          images:this.fields.imageChoices[this.langSelected][0].images,
                          id:this.fields.imageChoices[this.langSelected][0].id};
        this.dynamicArray1.push(this.newDynamic);*/
        //this.dynamicArray[0].type = this.type;
       // this.fields.type = 'radio';
        //this.fields.input_id_type = 33;
        console.log(this.fields,"IMage chcoices")
        if(this.fields.imageChoices && this.fields.imageChoices['en'][0].imageUploaded == ''){
         // this.fields.imageChoices = { en: [], hi: [] };
          console.log("%%%")
          //this.fields.imageChoices["en"] = this.dynamicArray1;
          //this.fields.imageChoices["hi"] = this.dynamicArray1;
          this.myngmodel_imageChoice["en"] = ["Option"];
        this.myngmodel_imageChoice["hi"] = ["Option-hi"];
         
        }
        else{
          console.log("%%% inside else")
          this.myngmodel_imageChoice["en"] =this.fields.imageChoices["en"].map((v)=>v.title2)
        this.myngmodel_imageChoice["hi"] =this.fields.imageChoices["hi"].map((v)=>v.title2)
        this.myngmodelId_imageChoice["en"] =this.fields.imageChoices["en"].map((v)=>v.id)
        this.myngmodelId_imageChoice["hi"] =this.fields.imageChoices["hi"].map((v)=>v.id)
        }
        //this.imageUploaded = this.fields.imageChoices[0].imageUploaded;
        console.log(this.dynamicArray1,"Dynamci")
        
       
      }
      else{
        console.log(this.surveyid,"SURVEY ID",this.fields);
      this.fields.dest_lang = 'hi'
      //this.fields.choices = { en: [], hi: [] };
     // for(var i=0; i<this.fields.choice;i++){
        this.newDynamic = {type: this.fields.type, value:"Option"};
        //this.dynamicArray[0].type = this.type;
        this.dynamicArray.push(this.newDynamic);
        if(this.fields.choices == ''|| this.fields.choices == undefined || (this.fields.choices && this.fields.choices['en'] ==''))
       {
        this.fields.choices = { en: [], hi: [] };
        this.fields.choices["en"] = this.dynamicArray;
        this.fields.choices["hi"] = this.dynamicArray;
        this.myngmodel["en"] = ["Option"];
        this.myngmodel["hi"] = ["Option-hindi"];
        
        
       }
       else{
         console.log(this.fields.choices['en'],"HINDI**")
        this.myngmodel["en"] =this.fields.choices["en"].map((v)=>v.value)
        this.myngmodel["hi"] =this.fields.choices["hi"].map((v)=>v.value)
        this.myngmodelId["en"] =this.fields.choices["en"].map((v)=>v.id)
        this.myngmodelId["hi"] =this.fields.choices["hi"].map((v)=>v.id)
        console.log(this.myngmodel_imageChoice["hi"],"ngmodel[hi]")
      }

      if(this.fields && this.fields.images && this.fields.images.length !=0)
      {
      console.log(this.fields.imagesUrl)
      this.imageSelected=true
      this.imagedata=this.fields.imagesUrl
      this.imagearraydata=JSON.parse(JSON.stringify(this.fields.images))
      }
      if(this.fields && this.fields.audios && this.fields.audios.length !=0)
      {
        //console.log(1)
        this.audioSelected=true
        this.audiodata=this.fields.audiosUrl
      }
      if(this.fields && this.fields.videos && this.fields.videos.filter(v=>v).length !=0)
      {
        //console.log(2)
        this.videoSelected=true
      }

      }
      
        //}
     
    }
    removeFile(index: number): void {
      this.dynamicArray1[index].imageUploaded = '';
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
    removeImage(index: number): void {
      //this.dynamicArray1[index].imageUploaded = '';
      var data = {
        file: this.fields.imageChoices[index].imageUploaded
    }
      this.commonService.deleteDataNew('survey/upload', data).subscribe(response => {
        if (response.status = 200) {
         
        }
      }, err => {
        this.sharedService.displayErrorMessage(err.statusText);
      });
     // this.fields.imageChoices.splice(index,1)
     this.fields.imageChoices[index].imageUploaded = '';
     this.fields.imageChoices[index].images = '';
      //this.fields.answers.splice(index,1)
      // this.storeImages.splice(index, 1);
      // console.log(this.displayImages,this.storeImages);
      // return;
      
    }
    stateChangedForName(event,name){
      if(event.target.checked == true){
              if(name == 'firstname')
                 this.fields.properties[0].firstName = true;
              else if(name == 'middlename')
                 this.fields.properties[0].middleName = true;
              else if(name == 'lastname')
                 this.fields.properties[0].lastName = true;
            }
            else{
              var properties = this.fields.properties[0];
              switch(name){
                case 'firstname':{
                  if(properties.middleName === false && properties.lastName === false)
                 {
                   this.sharedService.displayErrorMessage("Atleast one name field is mandatory");
                   return false;
                 }
                 else{
                   properties.firstName = false
                 }
                 break;
                }
                case 'middlename':{
                  if(properties.firstName === false && properties.lastName === false)
                 {
                   this.sharedService.displayErrorMessage("Atleast one name field is mandatory");
                   return false;
                 }
                 else{
                   properties.middleName = false
                 }
                 break;
                }
                case 'lastname':{
                  if(properties.middleName === false && properties.firstName === false)
                 {
                   this.sharedService.displayErrorMessage("Atleast one name field is mandatory");
                   return false;
                 }
                 else{
                   properties.lastName = false
                 }
                 break;
                }
              }
            }
    }
    stateChanged(event,name){
      console.log("inside state", event)
      if(event.target.checked == true){
        if(name == 'addressline1')
           this.fields.properties[0].addressLineOne = true;
        else if(name == 'addressline2')
           this.fields.properties[0].addressLineTwo = true;
        else if(name == 'addressline3')
           this.fields.properties[0].addressLineThree = true;
        else if(name == 'city')
           this.fields.properties[0].city = true;
        else if(name == 'pincode')
           this.fields.properties[0].pincode = true;
        else if(name == 'state')
           this.fields.properties[0].state =true;
           else if(name == 'country')
           this.fields.properties[0].country = true;
      }
      else{
        var properties = this.fields.properties[0];
        console.log(properties.addressLineOne,properties.addressLineTwo,properties.addressLineThree,properties.pincode,properties.city,properties.state,properties.country,"INSIDE ELSE",name,properties)
       /* if(properties.addressLineTwo === false && properties.addressLineThree === false){
          console.log("inside address condition")
          this.isDisabled = "true";
          event.preventDefault();
          return false;
        }*/
       // else{
          switch(name){
            case 'addressline1':{
              if(properties.addressLineTwo === false && properties.addressLineThree === false
                 && properties.city === false && properties.pincode === false && properties.state === false 
                 && properties.country === false)
              {
                this.sharedService.displayErrorMessage("Atleast one address field is mandatory");
                return false;
              }
              else{
                properties.addressLineOne = false
              }
              break;
            }
            case 'addressline2':{
              if(properties.addressLineOne === false && properties.addressLineThree === false
                 && properties.city === false && properties.pincode === false && properties.state === false 
                 && properties.country === false)
              {
                this.sharedService.displayErrorMessage("Atleast one address field is mandatory");
                return false;
              }
              else{
                properties.addressLineTwo = false
              }
              break;
            }
            case 'addressline3':{
              if(properties.addressLineOne === false && properties.addressLineTwo === false
                 && properties.city === false && properties.pincode === false && properties.state === false 
                 && properties.country === false)
              {
                this.sharedService.displayErrorMessage("Atleast one address field is mandatory");
                return false;
              }
              else{
                properties.addressLineThree = false
              }
              break;
            }
            case 'city':{
              if(properties.addressLineOne === false && properties.addressLineTwo === false
                 && properties.addressLineThree === false && properties.pincode === false && properties.state === false 
                 && properties.country === false)
              {
                this.sharedService.displayErrorMessage("Atleast one address field is mandatory");
                return false;
              }
              else{
                properties.city = false
              }
              break;
            }
            case 'pincode':{
              if(properties.addressLineOne === false && properties.addressLineTwo === false
                 && properties.addressLineThree === false && properties.city === false && properties.state === false 
                 && properties.country === false)
              {
                this.sharedService.displayErrorMessage("Atleast one address field is mandatory");
                return false;
              }
              else{
                properties.pincode = false
              }
              break;
            }
            case 'state':{
              if(properties.addressLineOne === false && properties.addressLineTwo === false
                 && properties.addressLineThree === false && properties.pincode === false && properties.city === false 
                 && properties.country === false)
              {
                this.sharedService.displayErrorMessage("Atleast one address field is mandatory");
                return false;
              }
              else{
                properties.state = false
              }
              break;
            }
            case 'country':{
              if(properties.addressLineOne === false && properties.addressLineTwo === false
                 && properties.addressLineThree === false && properties.pincode === false && properties.state === false 
                 && properties.city === false)
              {
                this.sharedService.displayErrorMessage("Atleast one address field is mandatory");
                return false;
              }
              else{
                properties.country = false
              }
              break;
            }

          }
          /*if(name == 'addressline1'){
            this.fields.properties[0].addressLineOne = false;
          }
          
       else if(name == 'addressline2')
          this.fields.properties[0].addressLineTwo = false;
       else if(name == 'addressline3')
          this.fields.properties[0].addressLineThree = false;
       else if(name == 'city')
          this.fields.properties[0].city = false;
       else if(name == 'pincode')
          this.fields.properties[0].pincode = false;
       else if(name == 'state')
          this.fields.properties[0].state = false;
          else if(name == 'country')
          this.fields.properties[0].country = false;
        }*/
      }
      
    }
    typeChanged(event){
      console.log(event,"VALUESSS")
      if(event !== 'hidden'){
        this.type = event;
        this.fields.imageChoices[this.langSelected].forEach(element => {
          element.type = event;
        });
        this.hidden = "false";
        if(this.type == 'radio')
          this.fields.input_id_type = "33";
        else
        this.fields.input_id_type = '34';
      }
      
      else{
        console.log("inside")
        this.type="hidden";
        this.fields.imageChoices.forEach(element => {
          element.type = "hidden";
        });
        this.hidden = 'true';
        this.fields.input_id_type = "28";
      }
      this.fields.type = this.type;
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
    videoChanged(event,i){
      this.fields.videos[i]=event.target.value;
    }
    cancelAudio(){
      this.audiosUploaded.splice(0,1);
      this.audiodata[0]=''
      this.audioInputVar.nativeElement.value='';
    }
    cancelImage1(){
      this.imageUploaded.splice(0,1);
      this.fields.images[0]=''
      this.imagedata[0]=''
      this.imageInputVar1.nativeElement.value = "";
     // this.imageInputVar2.nativeElement.value = "";
      console.log(this.imageUploaded,"Images")
    }
    cancelImage2(){
      this.imageUploaded.splice(0,1);
     this.fields.images[1]=''
     this.imagedata[1]=''
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
              response.data.image.forEach(element => {
                this.imagearraydata[index] =element
               
                this.imageUploaded.push(element);
                
               // this.dynamicArray1[index].imageUploaded = element;
                //this.dynamicArray1[index].type = this.type;
              });
              console.log(this.imagearraydata[index])
             
              response.data.image_url.forEach(element => {
                console.log(element)
                this.imagedata[index]=element;
              });
              this.fields.images = this.imagearraydata;
              console.log(this.fields.images,"IMAGES CHOICES",this.imagearraydata)
              this.fields.imagesUrl = this.imagedata;
              console.log(this.fields.images,this.imagetobeStored)
              //this.fields.id = response.data.id;
            });
        } else {
          this.sharedService.displayErrorMessage(`File size should be in between ${window['restrictImageMinSize']} Kilo bytes to ${window['restrictImageMaxSize']}  Kilo bytes`);
        if(index == 0)
        {
          this.cancelImage1()
        }  
        else{
          this.cancelImage2()
        }
        }
      }
    }
    addImage(index: number,event) {
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
              if(this.fields.input_id_type == 33 || this.fields.input_id_type == 34 || this.fields.input_id_type == 28){
                this.fields.imageChoices["en"][index].imageUploaded = response.data.url;
                this.fields.imageChoices["hi"][index].imageUploaded = response.data.url;
                this.fields.imageChoices["en"][index].images = response.data.file;
                this.fields.imageChoices["hi"][index].images = response.data.file;
                this.fields.imageChoices["en"][index].type = this.type;
                this.fields.imageChoices["hi"][index].type = this.type;
               }
              /*response.data.url.forEach(element => {
               
               // this.dynamicArray1[index].imageUploaded = element;
              if(this.fields.input_id_type == 33 || this.fields.input_id_type == 34 || this.fields.input_id_type == 28){
                this.fields.imageChoices[this.langSelected][index].imageUploaded = response.data.url;
                this.fields.imageChoices[this.langSelected][index].type = this.type;
               }
                //this.dynamicArray1[index].type = this.type;
              });*/
              this.imagetobeStored = [];
              response.data.image.forEach((element) => {
                this.fields.imageChoices['en'][index].images=element;
                this.fields.imageChoices['hi'][index].images=element;
                //this.imagetobeStored.push(element)
               // this.dynamicArray1[index].imageUploaded = element;
                //this.dynamicArray1[index].type = this.type;
              });
              //this.fields.id = response.data.id;
            });
        } else {
          this.sharedService.displayErrorMessage(`File size should be in between ${window['restrictImageMinSize']} Kilo bytes to ${window['restrictImageMaxSize']}  Kilo bytes`);
          }
      }
    }
    newDynamic: any = {};
    newOptionList:any ={};
  addRow(index) {  
    console.log(this.fields,"FIELDS")
   /* if(this.fields.input_id_type == 33 || this.fields.input_id_type == 34 || this.fields.input_id_type == 28){
      this.newDynamic = {type: this.type, title2: "",imageUploaded:''};
      this.dynamicArray1.push(this.newDynamic);
      this.fields.imageChoices.push(this.newDynamic);
      console.log(this.dynamicArray1);
    }*/
    
    
    if(this.fields.input_id_type == 33 || this.fields.input_id_type == 34 || this.fields.input_id_type == 28){
      this.newDynamic = {type: this.type, title2: "Option",imageUploaded:'',images:'',id:'',group_id:''};
      this.dynamicArray1.push(this.newDynamic);
      this.fields.imageChoices['en'].push(this.newDynamic);
      this.newDynamic = {type: this.type, title2: "Option-hi",imageUploaded:'',images:'',id:'',group_id:''};
      this.fields.imageChoices['hi'].push(this.newDynamic);
      //console.log(this.dynamicArray1);
      
    return true;
    }
    else{
      this.fields.choices = JSON.parse(JSON.stringify(this.fields.choices))
      this.newDynamic = {type: this.fields.type, value:'Option'};
      this.fields.choices['en'].push(this.newDynamic);
      this.newDynamic = {type: this.fields.type, value:'Option-hindi'};
      this.fields.choices['hi'].push(this.newDynamic);
      this.myngmodel["en"].push("Option");
      this.myngmodel["hi"].push("Option-hindi");
    }
}
dataChanged(event){
  let array = { en: [], hi: [] };
  if(this.fields.input_id_type == 33 || this.fields.input_id_type == 34 || this.fields.input_id_type == 28){
    ["en", "hi"].map((v) => {
      this.myngmodel_imageChoice[v].map((myval,index) => {
        console.log(myval,"MYVAL")
        if(this.myngmodelId_imageChoice && this.myngmodelId_imageChoice[v] && this.myngmodelId_imageChoice[v][index])
        array[v].push({type: this.type, title2: myval,imageUploaded:this.fields.imageChoices[v][index].imageUploaded,images:this.fields.imageChoices[v][index].images,id:this.fields.imageChoices[v][index].id});
        else
        array[v].push({type: this.type, title2: myval,imageUploaded:this.fields.imageChoices[v][index].imageUploaded,images:this.fields.imageChoices[v][index].images,id:this.fields.imageChoices[v][index].id});
      });
    });
    console.log(array,"ARRAY INSIDE DATACHANGED")
  
    this.fields.imageChoices = array;
  }
  else{
    ["en", "hi"].map((v) => {
      this.myngmodel[v].map((myval,index) => {
        if(this.myngmodelId && this.myngmodelId[v] && this.myngmodelId[v][index])
        array[v].push({ type: this.fields.type, value: myval,id: this.myngmodelId[v][index]});
        else
        array[v].push({ type: this.fields.type, value: myval });
      });
    });
  
    this.fields.choices = array;
  }
 
}

deleteRow(index) {
  console.log(this.fields.input_id_type,"INput id type in deleterow")
  if(this.fields.input_id_type == 33 || this.fields.input_id_type == 34 || this.fields.input_id_type == 28){
    if(this.fields.imageChoices.length ==1) {

      return false;
  } else {
    this.fields.imageChoices['en'].splice(index, 1);
    this.fields.imageChoices['hi'].splice(index, 1);
    this.myngmodel_imageChoice["en"].splice(index, 1);
  this.myngmodel_imageChoice["hi"].splice(index, 1);
    return true;
  }
  }
  else{
    console.log(this.fields.choices['en'].length,"LENGTH")
    if(this.fields.choices['en'].length ==1) {
      return false;
   } else {
       //this.fields.radioChoices.splice(index, 1);
       //this.fields.radioChoices = this.dynamicArray;
       this.fields.choices['en'].splice(index, 1);
       this.fields.choices['hi'].splice(index, 1);
       this.myngmodel["en"].splice(index, 1);
     this.myngmodel["hi"].splice(index, 1);
       return true;
   }
  }
    
}

ngOnChanges(changes: SimpleChange): void {
  if (this.fields.audios && this.fields.audios[0]) {
    const player = this.elRef.nativeElement.querySelector('video');
    player.load();
  }
  console.log("CHANGED&&&")
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
          response.data.audio.forEach(element => {
            this.audiosUploaded.push(element);
          });
          response.data.audio_url.forEach(element => {
            this.audiodata[0]=element
          });
          //console.log(this.imageUploaded,"images uploaded")
          this.fields.audios = this.audiosUploaded;
          this.fields.audiosUrl = this.audiodata;
          
          //this.fields.id = response.data.id;
        });
   // } else {
      //  this.sharedService.displayErrorMessage('Image has been already uploaded');
      //}
  }
}
displayCurrency(event){
  console.log(event.target.value,"EVENT")
  this.fields.currency = event.target.value;
}
setHindiData() {
  console.log('inside Hindi',this.fields.label,this.fields.imageChoices);
  this.isEnglish = true;
  this.langSelected = 'hi';
  this.fields.dest_lang = this.langSelected;
  if(this.fields.input_id_type == 33 || this.fields.input_id_type == 34 || this.fields.input_id_type == 28){
    this.myngmodel_imageChoice["en"] =this.fields.imageChoices["en"].map((v)=>v.title2)
        this.myngmodel_imageChoice["hi"] =this.fields.imageChoices["hi"].map((v)=>v.title2)
        this.myngmodelId_imageChoice["en"] =this.fields.imageChoices["en"].map((v)=>v.id)
        this.myngmodelId_imageChoice["hi"] =this.fields.imageChoices["hi"].map((v)=>v.id)
  }
  else{
    this.myngmodel["en"] =this.fields.choices["en"].map((v)=>v.value)
        this.myngmodel["hi"] =this.fields.choices["hi"].map((v)=>v.value)
        this.myngmodelId["en"] =this.fields.choices["en"].map((v)=>v.id)
        this.myngmodelId["hi"] =this.fields.choices["hi"].map((v)=>v.id)
  }
  
}

setEnglishData() {
  console.log('inside English',this.fields.label);
  this.isEnglish = false;
  this.langSelected = 'en';
  this.fields.dest_lang = this.langSelected;
  if(this.fields.input_id_type == 33 || this.fields.input_id_type == 34 || this.fields.input_id_type == 28){
    this.myngmodel_imageChoice["en"] =this.fields.imageChoices["en"].map((v)=>v.title2)
        this.myngmodel_imageChoice["hi"] =this.fields.imageChoices["hi"].map((v)=>v.title2)
        this.myngmodelId_imageChoice["en"] =this.fields.imageChoices["en"].map((v)=>v.id)
        this.myngmodelId_imageChoice["hi"] =this.fields.imageChoices["hi"].map((v)=>v.id)
  }
  else{
    this.myngmodel["en"] =this.fields.choices["en"].map((v)=>v.value)
        this.myngmodel["hi"] =this.fields.choices["hi"].map((v)=>v.value)
        this.myngmodelId["en"] =this.fields.choices["en"].map((v)=>v.id)
        this.myngmodelId["hi"] =this.fields.choices["hi"].map((v)=>v.id)
  }
}
}
