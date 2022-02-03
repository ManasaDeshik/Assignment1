import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormItem } from '../form-item';
export class FormItemRadio extends FormItem {
  hint!: string;
}
export class DynamicGrid{   
  type:string;
 value:string;
 answer_id:string;
 id:string;
}
@Component({
  selector: 'app-form-item-radio',
  templateUrl: './form-item-radio.component.html',
  styleUrls: ['./form-item-radio.component.scss']
})
export class FormItemRadioComponent implements OnInit {
 
  public radioField;
  public radio;
  public checkboxField=[];
  @Input() item!: FormItemRadio;
  public choice = 4;
  public choicelist = [];
  public selected={id:[],answer:[],group_id:[]}; 
  @Output() changes = new EventEmitter<FormItemRadio>();
  constructor() { }

  ngOnInit(): void {
    this.item.choice = 4;
    var dynamicArray:Array<DynamicGrid> = [];
    this.item.answer = this.radioField;
    this.item.answer_radio = this.item.answer_radio;
console.log(this.item,"ITEM!!")//,this.item.radioAnswers.map((v)=>v.id))
    if(this.item.type == 'checkbox'){
      
      this.item.answer_radio = JSON.parse(this.item.answer_radio);
      this.item.answer_radio = (this.item.answer_radio && this.item.answer_radio.regular)?this.item.answer_radio.regular:this.item.answer_radio;
      this.checkboxField = this.item.answer_radio;
      
    }
  this.item.radioAnswers.forEach((element)=>{
    element.forEach(element => {
      this.selected.group_id.push(element.answer_group_id);
      this.selected.id.push(element.id);
      console.log(element.answer,"ANSWER!@#",element)
      this.selected.answer.push(element.answer);
    });
  })
  console.log(this.selected,"SELECTED**")
   //this.selected.push(this.item.radioAnswers.map((v)=>v.id))
    this.item?.choices?.en.forEach((element1)=>{
      console.log(element1,"ELEMENT1")
      //for(var i =0; i< element1)
      dynamicArray.push({type:element1.type,value:element1.value,answer_id:element1.id,id:element1.id});
     })
    this.item.choices.en = this.item.choices.en;  
    //console.log(this.item.choices);
  }
  createChoice(number){
   var choiceList = [];
   
   choiceList = number;
    return choiceList;
  }
  onValueChanges(event,item:FormItemRadio) {
    //item.answers.push(this.radioField);
    //console.log(this.item.answers,"ANSWER IN RADIO",event.target.value)
    //this.item.answer = event.target.value;
   
    console.log(this.radio,"ngmodel")
    if(this.item.type == "checkbox"){
      if(event.target.checked == true){
        this.checkboxField.push(event.target.value)
      }
      else {
        var index = this.checkboxField.indexOf(event.target.value);
        this.checkboxField.splice(index,1);
      }
       this.item.answer = JSON.stringify(this.checkboxField);  
      console.log(event.target.value,"target**",this.checkboxField);
    }
    else{
      this.radioField = event.target.value;
      console.log(this.radioField,"RADIO FIELD")
      this.item.answer = this.radioField;
      this.item.choices.en.forEach((ele)=>{
        if(ele.value == event.target.value){
          this.item.answer_id = ele.answer_id;
        }
      })
    }
   
    this.changes.emit(item);
  }
  ngOnChanges(){
    console.log(this.item.answer,"ANSWERSS")
  }

}
