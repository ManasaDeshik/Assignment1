import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FetchUserTabDetailsService } from 'src/app/utils/services';
import { BarcodeComponent } from './barcode.component';

describe('BarcodeComponent', () => {
  let component: BarcodeComponent;
  let fixture: ComponentFixture<BarcodeComponent>;

  beforeEach(() => {
    const fetchUserTabDetailsServiceStub = () => ({
      getBarCode: () => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BarcodeComponent],
      providers: [
        {
          provide: FetchUserTabDetailsService,
          useFactory: fetchUserTabDetailsServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(BarcodeComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const fetchUserTabDetailsServiceStub: FetchUserTabDetailsService = fixture.debugElement.injector.get(
  //       FetchUserTabDetailsService
  //     );
  //     spyOn(component, 'toLetters').and.callThrough();
  //     spyOn(fetchUserTabDetailsServiceStub, 'getBarCode').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.toLetters).toHaveBeenCalled();
  //     expect(fetchUserTabDetailsServiceStub.getBarCode).toHaveBeenCalled();
  //   });
  // });
});