import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFieldEditComponent } from './dialog-field-edit.component';

describe('DialogFieldEditComponent', () => {
  let component: DialogFieldEditComponent;
  let fixture: ComponentFixture<DialogFieldEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFieldEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFieldEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
