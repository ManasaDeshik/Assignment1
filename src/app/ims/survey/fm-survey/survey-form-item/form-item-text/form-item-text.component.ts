import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormItem } from '../form-item';

export class FormItemText extends FormItem {
  hint!: string;
  
}
@Component({
  selector: 'app-form-item-text',
  templateUrl: './form-item-text.component.html',
  styleUrls: ['./form-item-text.component.css']
})
export class FormItemTextComponent implements OnInit {
  @Input() item!: FormItemText;
  @Input() editable: boolean=true;
  @Output() changes = new EventEmitter<FormItemText>();
  public textField;
  public videoField : string[];
  public imageField : [];
  constructor() { }

  ngOnInit(): void {
    console.log('21',this.item,"INSIDE")
    if(this.item.videos) {
    //  this.videoField = 'https://www.youtube.com/watch?v=' + this.item.videos[0];
    this.videoField = [];
    this.item.videos.forEach((element) => {
      this.videoField.push('https://www.youtube.com/watch?v=' + element);
     // this.videoField = this.item.videos;
    });
   // console.log('30',this.item.videos);
      console.log('25',this.videoField);
    }
    if(this.item.images) {
      this.item.images.forEach((element) => {
        this.item.images.push(element);
      });
      this.imageField = this.item.images;
      console.log('30',this.imageField);
    }
  }
  onValueChanges(item:FormItemText) {
    //item.answers.push(this.textField);
    this.changes.emit(item);
  }

}
