import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormItem } from '../form-item';
import * as moment from 'moment';

@Component({
  selector: 'app-form-item-input',
  templateUrl: './form-item-input.component.html',
  styleUrls: ['./form-item-input.component.scss']
})
export class FormItemInputComponent implements OnInit {
  @Input() item!: FormItem;
  @Input() editable: boolean=true;
  @Output() changes = new EventEmitter<FormItem>();
  public dateField;
  public emailNew;
  public fnameField;
  public mnameField;
  public lnameField;
  public decimalInput:any;
  public address1Field;
  public address2Field;
  public address3Field;
  public cityField;
  public pincodeField;
  public stateField;
  public countryField;
  public min: Date = new Date(2015, 0, 1);
  public datetimeField;
  public type = "USD";
  public slider;
  constructor() { }

  ngOnInit(): void {
    //console.log("item inside",this.item)
    this.item.currency = "Rupees";
    if(this.item.type == 'date'){
      let array = this.item.answer.split('-')
       let date = `${array[1]}-${array[0]}-${array[2]}`
       //this.item.answer = new Date(this.item.answer).toString();
       //this.dateField =  new Date(2018, 1, 12, 10, 30);
       this.dateField = new Date(`${array[1]},${array[0]},${array[2]}`)
       //this.item.answer = date;
     }
     if(this.item.type == 'name') {
   let answer = JSON.parse(this.item.answer);
   this.fnameField = answer.firstName;
   this.mnameField = answer.middleName;
   this.lnameField = answer.lastName;
     }
     if(this.item.type == 'address') {
      let answer = JSON.parse(this.item.answer);
      this.address1Field = answer.addressLineOne;
      this.address2Field = answer.addressLineTwo;
      this.address3Field = answer.addressLineThree;
      this.cityField = answer.city;
      this.pincodeField = answer.pincode;
      this.stateField = answer.state;
      this.countryField = answer.country;
        }
      if(this.item.type == 'datetime') {
        // var dateString=this.item.answer;
        // var dateParts = dateString.split("/");
        // var dateObject = new Date(dateParts[1]+'-'+dateParts[0]+'-'+dateParts[2]); 
        // this.datetimeField = dateObject;
        if(this.item.answer)
        this.datetimeField = new Date(this.item.answer);
      }
   /*if(this.item.type == 'datetime'){
    var dateString=this.datetimeField;
    var dateParts = dateString.split("/");
    
    // month is 0-based, that's why we need dataParts[1] - 1
    var dateObject = new Date(dateParts[1]+'-'+dateParts[0]+'-'+dateParts[2]); 
    console.log(dateObject,dateParts[1] - 1,dateParts[0],dateParts[2])
         this.datetimeField = dateObject;
        console.log('20',this.datetimeField);
   }*/
  }
  convertToDecimal(event){
    console.log(this.item.answer,"ANSWERS")
    this.item.answer = parseFloat(this.item.answer).toFixed(2);
    return this.item.answer;
  }
  ngOnChanges(changes:SimpleChanges):void{
    console.log(changes,"ITEMs")
    this.item.properties[0].firstName =changes.item.currentValue?.properties[0].firstName;
    this.item.properties[0].middleName= changes.item.currentValue?.properties[0].middleName;
    this.item.properties[0].lastName = changes.item.currentValue?.properties[0].lastName;
  }
  onNameValueChanges(item:FormItem) {
    let nameData = {  
      firstName: this.fnameField,  
      lastName: this.lnameField,  
      middleName: this.mnameField  
      };  
      item.answer = JSON.stringify(nameData);
      this.changes.emit(item);
  }
  onDecimalValueChanges(item:FormItem) {
    this.changes.emit(item);
  }
  onSliderValueChanges(item:FormItem) {
    this.changes.emit(item);
  }
  onDateTimeValueChanges(item:FormItem) {
    // var dateSel = new Date(this.datetimeField)
    // var month = dateSel.getMonth()+1;
    // var date_formatted = dateSel.getDate() + '/' + month + '/' + dateSel.getFullYear();
  //  item.answer.push(date_formatted);
   // this.datetimeField = date_formatted;
   item.answer =  new Date(this.datetimeField).toString() ;
    console.log(this.datetimeField,"DATE selected")
    this.changes.emit(item);
  }
  onValueChanges(item:FormItem) {
     let addressData = {  
      addressLineOne: this.address1Field,  
      addressLineTwo: this.address2Field,  
      addressLineThree: this.address3Field,  
      city: this.cityField,  
      pincode: this.pincodeField,  
      state: this.stateField,
      country: this.countryField
      };  
      item.answer = JSON.stringify(addressData);
     console.log('41',item.answer);
     //this.slider.value = this.item.answers;
     //item.answers.push(this.fnameField);
    // this.item.answer = this.fnameField;
     this.changes.emit(item);
   }
   onDateValueChanges(item:FormItem) {
     item.answer=moment(this.dateField).format('DD-MM-YYYY')
     console.log('41',item.answer);
   }
   isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}


}
