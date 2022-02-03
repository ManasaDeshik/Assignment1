import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormItem } from '../form-item';
export class FormItemRating extends FormItem {
  hint!: string;
}
@Component({
  selector: 'app-form-item-rating',
  templateUrl: './form-item-rating.component.html',
  styleUrls: ['./form-item-rating.component.scss']
})
export class FormItemRatingComponent implements OnInit {

 rating: number = 3;
   starCount: number = 5;
  @Input('color') private color: string = 'warn';
  @Input() item!: FormItemRating;
  @Output() changes = new EventEmitter<FormItemRating>();
  ratingArr = [1,2];
 
  constructor() {
  }


  ngOnInit() {
    this.item.min=1;
    this.item.max=5;
    if(this.item.answer == ''){
      this.item.answer = "0";
    }
    console.log(this.item.answer,"ANSWERS")
  }
  createStars(min,max){
    //console.log(max,"MAX")
    var ratingArr = [];
    for(var i=parseInt(min);i<=parseInt(max);i++){
      ratingArr.push(i);
    }
     return ratingArr;
   }
  onClickrating(rating:number,item:FormItemRating) {
    this.item.answer = rating.toString();
    //this.rating = rating;
    //item.answers.push(rating.toString());
    //this.changes.emit(item);
    //return false;
  }
}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}