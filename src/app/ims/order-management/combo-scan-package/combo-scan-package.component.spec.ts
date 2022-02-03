import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboScanPackageComponent } from './combo-scan-package.component';

describe('ComboScanPackageComponent', () => {
  let component: ComboScanPackageComponent;
  let fixture: ComponentFixture<ComboScanPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboScanPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboScanPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
