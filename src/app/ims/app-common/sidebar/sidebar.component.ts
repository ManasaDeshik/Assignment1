import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  SideNavService, onSideNavChange, animateText, SideBarProperties, SharedService
} from 'src/app/utils';
import { SessionStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class SidebarComponent implements OnInit, OnDestroy {
  public sideNavState = false;
  public linkText = false;
  public imgToggle = false;
  public isActive = false;
  private subscription: Subscription;
  public moduleIdentifier: SideBarProperties[] = [];
  public selectedBtnVal = 0;

  @SessionStorage('moduleDetails') public moduleDetails;
  constructor(private sidenavService: SideNavService, public router: Router, private sharedService: SharedService) {
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe((data: any) => {
      this.testEvent(data);
    }, (err) => {
      this.sharedService.displayErrorMessage(err.statusText);
    })
    this.subscription = this.sidenavService.getSideNav().subscribe(res => {
      this.sideNavState = res.text;
      setTimeout(() => {
        this.linkText = this.sideNavState;
        if (this.linkText === false) {
          this.imgToggle = false;
        } else {
          this.imgToggle = true;
        }
      }, 200);
      this.sidenavService.sideNavState$.next(this.sideNavState);
    }, (err) => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }

  ngOnInit() {
    this.getSidebarDetails();
  }

  /**
   * @method  getSidebarDetails()
   * @description - the following getSidebarDetails() method is used  display side bar details(modules).
   */
  getSidebarDetails() {
    
    this.moduleIdentifier = this.sharedService.toCollectModuleIdentifier(this.moduleDetails);
  }

  /**
   * @method ngOnDestroy()
   * @description: A callback method that performs custom clean-up, invoked immediately after a directive, pipe,
   * or service instance is destroyed.
   * @author karan
   */

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    // this.subscription.unsubscribe();
  }

  navigateTo(route: string, item, array) {
    // this.clickMe();
    // debugger;
    // console.log(route,'****',item);
    // item.active = !item.active;
    if (route == '/lead-management' || route == '/orders' || route == '/survey') {
      this.selectedBtnVal = item.val;
      this.sidenavService.setSubText(item);
    } else if (route == '/customer-management') {
      this.selectedBtnVal = item.val;
      this.sidenavService.setCustomer(item);
      localStorage.setItem(route, JSON.stringify(item));
      this.router.navigate([`/customer-management/view-customer-orders/${1}`]);
    }

  }

  check(item, array) {
    item.active = true;
    array.forEach(element => {
      if (element.title !== item.title)
        element.active = false;
    });
  }
  testEvent(selectedBtnVal) {
    this.selectedBtnVal = selectedBtnVal
  }
  clickEventsubscription: Subscription;
}
