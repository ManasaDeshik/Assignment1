import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { BreadcrumbComponent } from './breadcrumb.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { BreadCrumb, SharedService } from 'src/app/utils';
import { of } from 'rxjs/internal/observable/of';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let mockSharedService: SharedService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbComponent ],
      imports: [
        MatSnackBarModule,
        MatDialogModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(
          [{path: '', component: BreadcrumbComponent}],
        )
      ],
      providers: [ { provide: Router, useValue: { navigate : jasmine.createSpy("navigate"), events: of(new NavigationEnd(0, 'test/url', 'test/url'))}},
      {provide: SharedService, useValue: {urlSegmentKeys : ()=> []}}]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(BreadcrumbComponent);
  //   component = fixture.componentInstance;
  //   mockSharedService = TestBed.inject(SharedService);
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.debugElement.componentInstance;
    expect(component).toBeDefined();
  });
  it(`breadcrumbsItems has default value`, () => {
    expect(component.breadcrumbsItems).toEqual([]);
  });
  it('should create', () => {
  const spy = spyOn(Subscription.prototype, 'unsubscribe');
component.ngOnDestroy();
});
});
