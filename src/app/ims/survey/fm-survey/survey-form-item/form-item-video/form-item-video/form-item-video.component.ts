import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService, SharedService } from 'src/app/utils';
import { FormItem } from '../../form-item';
export class FormItemVideo extends FormItem {
  hint!: string;
}

@Component({
  selector: 'app-form-item-video',
  templateUrl: './form-item-video.component.html',
  styleUrls: ['./form-item-video.component.scss']
})
export class FormItemVideoComponent implements OnInit {
  videoAdd = {
    url: ''
  }
  public videoField;
  public videoUploaded = [];
  @Input() item!: FormItemVideo;
  @Output() changes = new EventEmitter<FormItemVideo>();
  constructor(private commonService:CommonService, private sharedService : SharedService) { }

  ngOnInit(): void {
  }
  onValueChanges(item:FormItemVideo) {
    //item.answers.push(this.videoUploaded[0]);
    this.changes.emit(item);
  }
}
