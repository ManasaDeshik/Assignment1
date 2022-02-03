import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'saheli-inventory-management-system';
  constructor() {
  }

  ngOnInit(){
    console.clear()
  }

  ngOnDestroy(){
  }

}
