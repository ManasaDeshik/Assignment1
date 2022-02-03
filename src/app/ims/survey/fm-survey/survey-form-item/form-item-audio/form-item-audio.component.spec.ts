import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemAudioComponent } from './form-item-audio.component';

describe('FormItemAudioComponent', () => {
  let component: FormItemAudioComponent;
  let fixture: ComponentFixture<FormItemAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormItemAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
