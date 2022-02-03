import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService, SharedService } from 'src/app/utils';
import { FormItem } from '../form-item';
export class FormItemImageChoice extends FormItem {
  hint!: string;
}
@Component({
  selector: 'app-form-item-imagechoice',
  templateUrl: './form-item-imagechoice.component.html',
  styleUrls: ['./form-item-imagechoice.component.scss']
})
export class FormItemImagechoiceComponent implements OnInit {

  public imageField;
  public imageUploaded = [];
  public imagetobeStored = [];
  @Input() item!: FormItemImageChoice;
  @Output() changes = new EventEmitter<FormItemImageChoice>();
  constructor(private commonService:CommonService, private sharedService : SharedService ) { }

  ngOnInit(): void {
    console.log(this.item,"itemssss")
   // this.item.answer = JSON.stringify(this.item.images)
  // this.item.imageChoices = this.item.radioAnswers;
   var type;
   switch(this.item.input_id_type){
     case '33':
       {
         type = 'radio';
         break;
       }
       case '34':
        {
          type = 'checkbox';
          break;
        }
        case '28':
          {
            type = 'hidden';
            break;
          }
   }
   if(this.item.radioAnswers){
    this.item.imageChoices = {'en':[],'hi':[]};
    //this.item.imageChoices = this.item.radioAnswers;
   // var element = this.item.radioAnswers[0];
   console.log(this.item.radioAnswers,"RADIO ANSWERS");
    this.item.radioAnswers.forEach(element=>{
     if(element[0].language == 'en'){
      this.item.imageChoices.en.push({type:type,imageUploaded:element[0].imageUrl,title2:element[0].answer,id:element[0].id,images:element[0].image,group_id:element[0].answer_group_id});
      this.item.imageChoices.hi.push({type:type,imageUploaded:element[1]?.imageUrl,title2:element[1].answer,id:element[1].id,images:element[1].image,group_id:element[1].answer_group_id});
    }
     else{
      this.item.imageChoices.en.push({type:type,imageUploaded:element[1].imageUrl,title2:element[1].answer,id:element[1].id,images:element[1].image,group_id:element[1].answer_group_id});
      this.item.imageChoices.hi.push({type:type,imageUploaded:element[0]?.imageUrl,title2:element[0].answer,id:element[0].id,images:element[0].image,group_id:element[0].answer_group_id});
     }
      
    //var element = this.item.radioAnswers[1];
   
    })
    
    
   }
  
   console.log(this.item.imageChoices,"IMAGE CHOICESS1")
  }
  
  addFile(index: number, event) {
   // this.uploadFile(event);
    for (const file of event.srcElement.files) {
      if (
        window["restrictImageMinSize"] < event.target.files[0].size / 1000 &&
        event.target.files[0].size / 1000 < window["restrictImageMaxSize"]
      ) {
        // if (!this.storeImages.some(val => val.name === file.name)) {
        const formData: FormData = new FormData();
        const { v4: uuid } = require("uuid");

        let id = uuid();
        if (file) {
          formData.append("images", file);
          //formData.append('survey_id','76b14630-8c43-41ba-9e3a-292d676eea7f')
          //formData.append('type', 'products');
        }
        this.commonService
          .fileupload("survey/question/upload", formData)
          .subscribe((response) => {
            if (response) console.log("insideee");
            console.log("123", response);
            var ids = [];
            
            response.data.image_url.forEach((element) => {
              console.log(element,"ELEMTNT IN IMAGECHOICE")
              this.imageUploaded.push(element);
              // = element;
            });
            console.log(this.imageUploaded, "images uploaded");
            //this.imagetobeStored.push(response.data.image[0])
            //this.item.answer = JSON.stringify(this.imagetobeStored);
          });
      } else {
        this.sharedService.displayErrorMessage(
          "Image has been already uploaded"
        );
      }
    }
  }
}
