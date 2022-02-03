import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from '../../services';
import { FetchDateInfoService } from '../../services';
import { monthArray } from '../../enums';
import { weekDays } from '../../enums';
import { weekListText } from '../../enums';
import { quarterArray } from '../../enums';
import { DateInfoDashboardComponent } from './date-info-dashboard.component';

describe('DateInfoDashboardComponent', () => {
  let component: DateInfoDashboardComponent;
  let fixture: ComponentFixture<DateInfoDashboardComponent>;

  beforeEach(() => {
    const sharedServiceStub = () => ({
      urlSegmentKeys: () => ({ length: {}, path: {} }),
      getBranchData: path => ({})
    });
    const fetchDateInfoServiceStub = () => ({
      dateInfoAdded: { next: () => ({}) }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DateInfoDashboardComponent],
      providers: [
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: FetchDateInfoService, useFactory: fetchDateInfoServiceStub }
      ]
    });
    fixture = TestBed.createComponent(DateInfoDashboardComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`showCalendar has default value`, () => {
    expect(component.showCalendar).toEqual(false);
  });

  it(`showMonthCalendar has default value`, () => {
    expect(component.showMonthCalendar).toEqual(false);
  });

  it(`showMonthInfo has default value`, () => {
    expect(component.showMonthInfo).toEqual(false);
  });

  it(`showYearInfo has default value`, () => {
    expect(component.showYearInfo).toEqual(false);
  });

  it(`showYearCalendar has default value`, () => {
    expect(component.showYearCalendar).toEqual(false);
  });

  it(`showQuarterCalendar has default value`, () => {
    expect(component.showQuarterCalendar).toEqual(false);
  });

  it(`initialGraph has default value`, () => {
    expect(component.initialGraph).toEqual(true);
  });

  it(`updatedGraph has default value`, () => {
    expect(component.updatedGraph).toEqual(false);
  });

  it(`year has default value`, () => {
    expect(component.year).toEqual([]);
  });

  it(`xAxis has default value`, () => {
    expect(component.xAxis).toEqual([]);
  });

  it(`showWeeks has default value`, () => {
    expect(component.showWeeks).toEqual(false);
  });

  it(`weeks has default value`, () => {
    expect(component.weeks).toEqual([]);
  });

  it(`rangeType has default value`, () => {
    expect(component.rangeType).toEqual(`year`);
  });

  it(`monthArray has default value`, () => {
    expect(component.monthArray).toEqual(monthArray);
  });

  it(`daysArray has default value`, () => {
    expect(component.daysArray).toEqual(weekDays);
  });

  it(`weekListText has default value`, () => {
    expect(component.weekListText).toEqual(weekListText);
  });

  it(`quarterArray has default value`, () => {
    expect(component.quarterArray).toEqual(quarterArray);
  });

  it(`array has default value`, () => {
    expect(component.array).toEqual([]);
  });

  it(`active has default value`, () => {
    expect(component.active).toEqual(10);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'fetchParticularBranchInfo').and.callThrough();
  //     spyOn(component, 'storeYear').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.fetchParticularBranchInfo).toHaveBeenCalled();
  //     expect(component.storeYear).toHaveBeenCalled();
  //   });
  // });

  // describe('fetchParticularBranchInfo', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(sharedServiceStub, 'urlSegmentKeys').and.callThrough();
  //     spyOn(sharedServiceStub, 'getBranchData').and.callThrough();
  //     component.fetchParticularBranchInfo();
  //     expect(sharedServiceStub.urlSegmentKeys).toHaveBeenCalled();
  //     expect(sharedServiceStub.getBranchData).toHaveBeenCalled();
  //   });
  // });

  // describe('storeYear', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'sendIntialDate').and.callThrough();
  //     component.storeYear();
  //     expect(component.sendIntialDate).toHaveBeenCalled();
  //   });
  // });

  // describe('openCalendar', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'selectMonth').and.callThrough();
  //     component.openCalendar();
  //     expect(component.selectMonth).toHaveBeenCalled();
  //   });
  // });

  // describe('decreaseYear', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'range').and.callThrough();
  //     component.decreaseYear();
  //     expect(component.range).toHaveBeenCalled();
  //   });
  // });

  // describe('decreaseMonth', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'selectMonth').and.callThrough();
  //     component.decreaseMonth();
  //     expect(component.selectMonth).toHaveBeenCalled();
  //   });
  // });

  // describe('increaseYear', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'range').and.callThrough();
  //     component.increaseYear();
  //     expect(component.range).toHaveBeenCalled();
  //   });
  // });

  // describe('increaseMonth', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'selectMonth').and.callThrough();
  //     component.increaseMonth();
  //     expect(component.selectMonth).toHaveBeenCalled();
  //   });
  // });
});
