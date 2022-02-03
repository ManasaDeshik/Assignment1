import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { FormItem } from '../form-item';
export class FormItemMatrix extends FormItem {
  hint!: string;
}
@Component({
  selector: 'app-form-item-matrix',
  templateUrl: './form-item-matrix.component.html',
  styleUrls: ['./form-item-matrix.component.scss']
})
export class FormItemMatrixComponent implements OnInit,OnChanges {
  @Input() item!: FormItemMatrix;
  @Input() editable: boolean=true;
  @Output() changes = new EventEmitter<FormItemMatrix>();
  
  rows=2;
  cols=2;
form=new FormArray([]);
  constructor() { }

 
  
  ngOnChanges(changes: SimpleChanges) {
        
    console.log(changes,"ITEMSS in onchanges",this.item)
  
    
}
add(x,y){
  this.form=new FormArray([]);
  this.rows=x//this.item.matrixrow
  this.cols=y//this.item.matrixcol
   for (let i = 0; i < this.rows; i++) {
       this.form.push(new FormArray([]))
       for (let j = 0; j < this.cols; j++) {
         (this.form.at(i) as FormArray).push(new FormControl())
       }
   }
   return this.form.controls;
}
ngOnInit()
{
  if(!(this.item && this.item.properties[0] && this.item.properties[0].matrixcol))
  {this.item.properties[0].matrixcol=this.item.coldata['en'].length
  this.item.properties[0].matrixrow=this.item.rowdata['en'].length

  }
  
 }

}
