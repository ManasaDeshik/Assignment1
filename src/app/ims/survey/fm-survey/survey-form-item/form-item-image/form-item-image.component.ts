import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService, SharedService } from 'src/app/utils';
import { FormItem } from '../form-item';
export class FormItemImage extends FormItem {
  hint!: string;
}
@Component({
  selector: 'app-form-item-image',
  templateUrl: './form-item-image.component.html',
  styleUrls: ['./form-item-image.component.scss']
})
export class FormItemImageComponent implements OnInit {
  public imageField;
  public imageUploaded = [];
  @Input() item!: FormItemImage;
  @Output() changes = new EventEmitter<FormItemImage>();
  constructor(private commonService:CommonService, private sharedService : SharedService ) { }

  ngOnInit(): void {
    this.imageUploaded[0] = this.item.answer_image;
    console.log(this.item.answer_image,"Image uploaded")
    if(this.item.answer_image !== undefined)
    this.item.answer_image = JSON.parse(this.item.answer_image)
    else
      this.item.answer_image = []; 
    console.log(this.item.answer_image,"Image uploaded")
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
        var ids = [];
        this.commonService
          .fileupload("survey/question/upload", formData)
          .subscribe((response) => {
            if (response) console.log("insideee");
            console.log("123", response);
           
            //var imageLoaded = [];
            response.data.image_url.forEach((element) => {
              this.imageUploaded = element;
              this.item.answer_image[0] = element;
              
            });
            this.item.answer = response.data.image[0];
            console.log(this.imageUploaded, "images uploaded in ids");
          });
      } else {
        this.sharedService.displayErrorMessage(`File size should be in between ${window['restrictImageMinSize']} Kilo bytes to ${window['restrictImageMaxSize']}  Kilo bytes`);
      }
     
      
    }
  }
  removeFile(): void {
    this.item.answer_image.splice(0, 1);
    // this.storeImages.splice(index, 1);
    // console.log(this.displayImages,this.storeImages);
    // return;
    
  }

}
