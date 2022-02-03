import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductsDialogComponent } from './view-products-dialog.component';

describe('ViewProductsDialogComponent', () => {
  let component: ViewProductsDialogComponent;
  let fixture: ComponentFixture<ViewProductsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProductsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
