import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CommonService } from 'src/app/utils';
import { DownloadManagementComponent } from './download-management.component';

describe('DownloadManagementComponent', () => {
  let component: DownloadManagementComponent;
  let fixture: ComponentFixture<DownloadManagementComponent>;

  beforeEach(() => {
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DownloadManagementComponent],
      providers: [{ provide: CommonService, useFactory: commonServiceStub }]
    });
    fixture = TestBed.createComponent(DownloadManagementComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`tableHeaders has default value`, () => {
    expect(component.tableHeaders).toEqual([{ header: 'S.No', width: '10%' }, { header: 'Type' },{ header: 'From Date' } ,{ header: 'To Date' }]);
  });

  it(`page_number has default value`, () => {
    expect(component.page_number).toEqual(1);
  });

  it(`listDownloads has default value`, () => {
    expect(component.listDownloads).toEqual([]);
  });

  // describe('tabChange', () => {
  //   it('makes expected calls', () => {
  //     const matTabChangeEventStub: MatTabChangeEvent = <any>{};
  //     spyOn(component, 'getList').and.callThrough();
  //     component.tabChange(matTabChangeEventStub);
  //     expect(component.getList).toHaveBeenCalled();
  //   });
  // });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getList').and.callThrough();
      component.ngOnInit();
      expect(component.getList).toHaveBeenCalled();
    });
  });
});
