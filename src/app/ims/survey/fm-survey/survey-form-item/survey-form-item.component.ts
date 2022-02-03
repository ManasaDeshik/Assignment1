import { Component, OnInit,Input,Output,EventEmitter,ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormItem, FormItemValidation, FormItemWidget } from './form-item';
import { FormItemVideo, FormItemVideoComponent } from './form-item-video/form-item-video/form-item-video.component';
import { FormItemFileuploadComponent,FormItemFileupload } from './form-item-fileupload/form-item-fileupload/form-item-fileupload.component';
import { FormItemImage, FormItemImageComponent } from './form-item-image/form-item-image.component';
import { FormItemRadio, FormItemRadioComponent } from './form-item-radio/form-item-radio.component';
import { FormItemText, FormItemTextComponent } from './form-item-text/form-item-text.component';
import { FormItemDirective } from './form-item.directive';
import { FormItemImageUpload, FormItemImageuploadComponent } from './form-item-imageupload/form-item-imageupload.component';
import { FormItemRating, FormItemRatingComponent } from './form-item-rating/form-item-rating.component';
import { FormItemAudio, FormItemAudioComponent } from './form-item-audio/form-item-audio.component';
import { FormItemMatrix, FormItemMatrixComponent } from './form-item-matrix/form-item-matrix.component';
import { FormItemImageChoice, FormItemImagechoiceComponent } from './form-item-imagechoice/form-item-imagechoice.component';
import { FormItemInputComponent } from './form-item-input/form-item-input.component';
export let FormItemTypes: { [key: string]: any } = {};
 FormItemTypes={
  string : {
      component: FormItemInputComponent,
      model: FormItem
      //label: 'Short text'
  },
  input : {
    component: FormItemInputComponent,
    //model: FormItemText,
    label: 'Short text'
},
  multiline : {
    component: FormItemInputComponent,
    model: FormItem
    //label: 'Long text'
},
number : {
  component: FormItemInputComponent,
  model: FormItem
  //label: 'Number'
},
decimal : {
  component: FormItemInputComponent,
  model: FormItem
  //label: 'Decimal'
},
name : {
  component: FormItemInputComponent,
  model: FormItem
  //label: 'Name'
},
phone : {
  component: FormItemInputComponent,
  model: FormItem
  //label: 'Phone'
},
email : {
  component: FormItemInputComponent,
  model: FormItem
 // label: 'Email'
},
address : {
  component: FormItemInputComponent,
  model: FormItem
},
date : {
  component: FormItemInputComponent,
  model: FormItem
  //label: 'Date'
},
time : {
  component: FormItemInputComponent,
  model: FormItem
  //label: 'Time'
},
datetime : {
  component: FormItemInputComponent,
  model: FormItem
  //label: 'Date-Time'
},
decisionbox : {
  component: FormItemInputComponent,
  model: FormItem
},
dropdown : {
  component: FormItemRadioComponent,
  model: FormItem
  //label: 'Drop down'
},
radio : {
  component: FormItemRadioComponent,
  model: FormItemRadio
},
image : {
  component: FormItemImageComponent,
  model: FormItemImage,
  label: 'Image'
},
checkbox : {
  component: FormItemRadioComponent,
  model: FormItem
  //label: 'Checkbox'
},
websiteurl : {
  component: FormItemInputComponent,
  model: FormItem
 // label: 'Image Upload'
},
currency : {
  component: FormItemInputComponent,
  model: FormItem
  //label: 'Image Upload'
},
fileupload : {
  component: FormItemFileuploadComponent,
  model: FormItemFileupload,
  label: 'File upload'
},
imageupload : {
  component: FormItemImageuploadComponent,
  model: FormItemImageUpload,
  label: 'Image Upload'
},
section : {
  component: FormItemInputComponent,
  model: FormItem
  //label: 'Image Upload'
},
audio : {
  component: FormItemAudioComponent,
  model: FormItemAudio,
  label: 'Image Upload'
},
slider : {
  component: FormItemInputComponent,
  model: FormItem
  //label: 'Slider'
},
rating : {
  component: FormItemRatingComponent,
  model: FormItemRating,
  label: 'Rating'
},
description : {
  component: FormItemInputComponent,
  model: FormItem
  //label: 'Description'
},
video : {
  component: FormItemVideoComponent,
  model: FormItemVideo,
  label: 'Video'
},
termsandconditions : {
  component: FormItemInputComponent,
  model: FormItem
},
matrix : {
  component: FormItemMatrixComponent,
  model: FormItemMatrix,
  label: 'Matrix'
},
imagechoice : {
  component: FormItemImagechoiceComponent,
  model: FormItemImageChoice,
  label: 'Image Choice'
}
}

export function buildField(type:string, data:any, required?:boolean): FormItem {
  const obj=Object.assign(new (FormItemTypes['string'].model), data);
  obj.type=type;

  if (required) {
      (<FormItemValidation>obj.fieldValidations)={
          rules: [
              {
                  minLength: 1
              }
          ]
      }
  }

  return obj;
}

@Component({
  selector: 'app-survey-form-item',
  templateUrl: './survey-form-item.component.html',
  styleUrls: ['./survey-form-item.component.css']
})
export class SurveyFormItemComponent implements OnInit {
  @Input() type!: string;
  @Input() item!: FormItemText;
  @Input() editable: boolean=true;
  @Input() isMobile: boolean=false;
  @Input() id!: string;
  @Output() changes = new EventEmitter<any>();

  @ViewChild(FormItemDirective, { static: true }) public itemHost!: FormItemDirective;
  private subscription!: Subscription

  constructor( private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.loadComponent();
  }
  loadComponent() {


    this.type = this.type.replace(" ","")

    if (!FormItemTypes[this.type]){
        return;
    }

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormItemTypes[this.type].component);

    let viewContainerRef = this.itemHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<FormItemWidget><unknown>componentRef.instance).item=this.item;
   // (<FormItemWidget>componentRef.instance).editable=this.editable;
    //(<FormItemWidget>componentRef.instance).isMobile=this.isMobile;

    this.subscription=(<FormItemWidget><unknown>componentRef.instance).changes.subscribe(item=>{console.log("CHANGED ITEM",item);this.changes.emit(item)});
}


}
