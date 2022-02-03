import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, UrlSegment, ActivatedRoute,NavigationStart } from '@angular/router';
import { SessionStorage, SessionStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment'; 
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-old-arch',
  templateUrl: './old-arch.component.html',
  styleUrls: ['./old-arch.component.scss']
})
export class OldArchComponent implements OnInit {
  public urlSegment: UrlSegment[] = [];
  public path:any;
  constructor(private storage:SessionStorageService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    var token=this.storage.retrieve('oldtoken')
   this.path=this.sanitizer.bypassSecurityTrustResourceUrl(environment.oldBaseUrl+'new/orders?token='+token)
  }
  tabChange(event: MatTabChangeEvent)
  {
    var token=this.storage.retrieve('oldtoken')
    const tab = event.tab.textLabel;
   
    switch(tab)
    {
      case 'Orders':
      this.path=this.sanitizer.bypassSecurityTrustResourceUrl(environment.oldBaseUrl+'new/orders?token='+token)
      break;
      case 'Customer Management':
        this.path=this.sanitizer.bypassSecurityTrustResourceUrl(environment.oldBaseUrl+'new/customers?token='+token)
        break;
        case 'Demo Management':
          this.path=this.sanitizer.bypassSecurityTrustResourceUrl(environment.oldBaseUrl+'new/demo?token='+token)
          break;
    }
    
console.log(this.path)    
    
  }
}
