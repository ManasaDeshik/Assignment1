import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, UrlSegment } from '@angular/router';
import { filter, } from 'rxjs/operators';
import { BreadCrumb, SharedService } from 'src/app/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  public breadcrumbsItems: BreadCrumb[] = [];
  public store: Subscription;
  constructor(private router: Router, private sharedService: SharedService) {
    this.getBreadCrumbData();
  }

  ngOnInit() {
  }
  /**
   * @method - getBreadCrumbData()
   * @description - the following getBreadCrumbData() method is used to get route segments so that breadCrumb items can be set based on route details
   * @author amitha.shetty
   */
  getBreadCrumbData(): void {
   this.store =  this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(route => {
        this.breadcrumbsItems = [];
        const urlSegmentKeys = this.sharedService.urlSegmentKeys();
        this.setBreadcrumbLink(urlSegmentKeys);
      });
  }
  /**
   * @method - setBreadcrumbLink()
   * @description - the following setBreadcrumbLink() method is used to display breadCrumbs by matching its urlSegmentKeys
   * @param urlSegmentKeys - route segmnet keys so that breadCrumb can be set
   * @author amitha.shetty
   */
  setBreadcrumbLink(urlSegmentKeys: UrlSegment[]): void {
    urlSegmentKeys.filter((element) => {
        this.breadcrumbsItems.push(new BreadCrumb(element.path));
    });
    this.breadcrumbsItems = this.breadcrumbsItems.filter(ele => ele.label !== '');
  }
  /**
   * @method ngOnDestroy()
   * @description: A callback method that performs custom clean-up, invoked immediately after a directive, pipe, 
   * or service instance is destroyed.
   * @author karan
   */

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.store.unsubscribe();
  }
}
