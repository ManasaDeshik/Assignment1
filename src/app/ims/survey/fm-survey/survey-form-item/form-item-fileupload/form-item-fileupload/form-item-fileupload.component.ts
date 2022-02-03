import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService, SharedService } from 'src/app/utils';
import { FormItem } from '../../form-item';
export class FormItemFileupload extends FormItem {
  hint!: string;
}

@Component({
  selector: 'app-form-item-fileupload',
  templateUrl: './form-item-fileupload.component.html',
  styleUrls: ['./form-item-fileupload.component.scss']
})
export class FormItemFileuploadComponent implements OnInit {
  public fileUploaded = [];
  @Input() item!: FormItemFileupload;
  @Output() changes = new EventEmitter<FormItemFileupload>();

  constructor(private commonService:CommonService, private sharedService : SharedService) { }

  ngOnInit(): void {
  }
  onValueChanges(item:FormItemFileupload) {
    item.answers.push(this.fileUploaded[0]);
    this.changes.emit(item);
  }
  addFile(index: number, event) {
    // this.uploadFile(event);
     for (const file of event.srcElement.files) {
       if (file) {
         // if (!this.storeImages.some(val => val.name === file.name)) {
         const formData: FormData = new FormData();
         const { v4: uuid } = require("uuid");
 
         let id = uuid();
         if (file) {
           formData.append("files", file);
           //formData.append('survey_id','76b14630-8c43-41ba-9e3a-292d676eea7f')
           //formData.append('type', 'products');
         }
         this.commonService
           .fileupload("survey/question/upload", formData)
           .subscribe((response) => {
             if (response) console.log("insideee");
             console.log("123", response);
             var ids = [];
             response.data.image.forEach((element) => {
               this.fileUploaded.push(element);
             });
             console.log(this.fileUploaded, "File uploaded");
           });
       } else {
         this.sharedService.displayErrorMessage(
           "File has been already uploaded"
         );
       }
     }
   }
}
