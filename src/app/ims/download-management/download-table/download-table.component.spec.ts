import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from 'src/app/utils';
import { CommonService } from 'src/app/utils';
import { DownloadTableComponent } from './download-table.component';
import { PaginatePipe, PaginationService } from 'ngx-pagination';

describe('DownloadTableComponent', () => {
  let component: DownloadTableComponent;
  let fixture: ComponentFixture<DownloadTableComponent>;

  beforeEach(() => {
    const sharedServiceStub = () => ({
      toCheckAllPermissionRights: role => ({})
    });
    const commonServiceStub = () => ({
      getdevNew: arg => ({ subscribe: f => f({}) }),
      getDataNew: arg => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DownloadTableComponent, PaginatePipe],
      providers: [
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        PaginationService,
        { provide: PaginatePipe}
      ]
    });
    fixture = TestBed.createComponent(DownloadTableComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'modulePermissionSets').and.callThrough();
      component.ngOnInit();
      expect(component.modulePermissionSets).toHaveBeenCalled();
    });
  });

  describe('modulePermissionSets', () => {
    it('makes expected calls', () => {
      const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
        SharedService
      );
      spyOn(sharedServiceStub, 'toCheckAllPermissionRights').and.callThrough();
      component.modulePermissionSets();
      expect(sharedServiceStub.toCheckAllPermissionRights).toHaveBeenCalled();
    });
  });
});
