import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/utils';
import { FormItem } from '../form-item';
export class FormItemAudio extends FormItem {
  hint!: string;
}
@Component({
  selector: 'app-form-item-audio',
  templateUrl: './form-item-audio.component.html',
  styleUrls: ['./form-item-audio.component.scss']
})
export class FormItemAudioComponent implements OnInit {

  public audioField;
  //public videoUploaded = [];
  @Input() item!: FormItemAudio;
  @Output() changes = new EventEmitter<FormItemAudio>();
  constructor() { }

  ngOnInit(): void {
  }
  onValueChanges(item:FormItemAudio) {
   item.answers.push(this.audioField);
    this.changes.emit(item);
  }

}
