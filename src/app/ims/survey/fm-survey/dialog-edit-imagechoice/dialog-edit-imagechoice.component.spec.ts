import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditImagechoiceComponent } from './dialog-edit-imagechoice.component';

describe('DialogEditImagechoiceComponent', () => {
  let component: DialogEditImagechoiceComponent;
  let fixture: ComponentFixture<DialogEditImagechoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditImagechoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditImagechoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
