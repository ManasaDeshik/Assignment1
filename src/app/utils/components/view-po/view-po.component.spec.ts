import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewPoComponent } from './view-po.component';

describe('ViewPoComponent', () => {
  let component: ViewPoComponent;
  let fixture: ComponentFixture<ViewPoComponent>;

  beforeEach(() => {
    const matDialogRefStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ViewPoComponent],
      providers: [{ provide: MatDialogRef, useFactory: matDialogRefStub }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    });
    fixture = TestBed.createComponent(ViewPoComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
