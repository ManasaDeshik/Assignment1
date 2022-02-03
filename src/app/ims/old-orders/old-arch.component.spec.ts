import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldOrdersComponent } from './old-orders.component';

describe('OldOrdersComponent', () => {
  let component: OldOrdersComponent;
  let fixture: ComponentFixture<OldOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
