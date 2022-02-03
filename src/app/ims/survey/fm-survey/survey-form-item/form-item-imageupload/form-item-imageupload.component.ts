import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService, SharedService } from 'src/app/utils';
import { FormItem } from '../form-item';
export class FormItemImageUpload extends FormItem {
  hint!: string;
}
@Component({
  selector: 'app-form-item-imageupload',
  templateUrl: './form-item-imageupload.component.html',
  styleUrls: ['./form-item-imageupload.component.scss']
})
export class FormItemImageuploadComponent implements OnInit {

  public imageField;
  public imageUploaded = [];
  @Input() item!: FormItemImageUpload;
  @Output() changes = new EventEmitter<FormItemImageUpload>();
  constructor(private commonService:CommonService, private sharedService : SharedService ) { }

  ngOnInit(): void {
  }
  onValueChanges(item:FormItemImageUpload) {
    item.answers.push(this.imageUploaded[0]);
    this.changes.emit(item);
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
              this.imageUploaded.push(element);
            });
            console.log(this.imageUploaded, "images uploaded");
          });
      } else {
        this.sharedService.displayErrorMessage(`File size should be in between ${window['restrictImageMinSize']} Kilo bytes to ${window['restrictImageMaxSize']}  Kilo bytes`);
      }
    }
  }
  removeFile(index: number): void {
    this.imageUploaded.splice(index, 1);
    // this.storeImages.splice(index, 1);
    // console.log(this.displayImages,this.storeImages);
    // return;
    
  }

}
