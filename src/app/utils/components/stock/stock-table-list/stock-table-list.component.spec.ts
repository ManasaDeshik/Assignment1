import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from 'src/app/utils/services';
import { CommonService } from 'src/app/utils/services';
import { LoaderService } from 'src/app/utils/services';
import { StockTableListComponent } from './stock-table-list.component';

describe('StockTableListComponent', () => {
  let component: StockTableListComponent;
  let fixture: ComponentFixture<StockTableListComponent>;

  beforeEach(() => {
    const sharedServiceStub = () => ({
      urlSegmentKeys: () => ({}),
      displayErrorMessage: string => ({})
    });
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) }),
      getData: arg => ({ subscribe: f => f({}) })
    });
    const loaderServiceStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StockTableListComponent],
      providers: [
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: LoaderService, useFactory: loaderServiceStub }
      ]
    });
    fixture = TestBed.createComponent(StockTableListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`dataList has default value`, () => {
    expect(component.dataList).toEqual([]);
  });

  it(`urlSegments has default value`, () => {
    expect(component.urlSegments).toEqual([]);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'setTableInfoDetails').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.setTableInfoDetails).toHaveBeenCalled();
  //   });

  // describe('setTableInfoDetails', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'getLists').and.callThrough();
  //     spyOn(component, 'getTransistHistory').and.callThrough();
  //     spyOn(sharedServiceStub, 'urlSegmentKeys').and.callThrough();
  //     component.setTableInfoDetails();
  //     expect(component.getLists).toHaveBeenCalled();
  //     expect(component.getTransistHistory).toHaveBeenCalled();
  //     expect(sharedServiceStub.urlSegmentKeys).toHaveBeenCalled();
  //   });
  // });

  // describe('getLists', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(commonServiceStub, 'getData').and.callThrough();
  //     component.getLists();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(commonServiceStub.getData).toHaveBeenCalled();
  //   });
  //});

  // describe('getTransistHistory', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(commonServiceStub, 'getData').and.callThrough();
  //     component.getTransistHistory();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(commonServiceStub.getData).toHaveBeenCalled();
  //   });
  // });

});