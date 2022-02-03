import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDemoProductComponent } from './add-demo-product.component';

describe('AddDemoProductComponent', () => {
  let component: AddDemoProductComponent;
  let fixture: ComponentFixture<AddDemoProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDemoProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDemoProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
