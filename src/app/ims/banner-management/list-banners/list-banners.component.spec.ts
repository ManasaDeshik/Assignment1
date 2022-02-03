import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs/internal/Subject';
import { CommonService } from 'src/app/utils/services/common-service/common.service';
import { LoaderService } from 'src/app/utils/services/loader-service/loader.service';
import { SharedService } from 'src/app/utils/services/shared-service/shared.service';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { ListBannersComponent } from './list-banners.component';
import { of } from 'rxjs/internal/observable/of';
import { HttpService } from 'src/app/utils/services/http-service/http.service';
import { Route } from '@angular/compiler/src/core';
import { PaginatePipe, PaginationService } from 'ngx-pagination';
import { FormGroup, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

describe('ListBannersComponent', () => {
  let component: ListBannersComponent;
  let fixture: ComponentFixture<ListBannersComponent>;
  let router : Router;

  beforeEach(async(() => {
    const events = new Subject<{}>();
    //const router = TestBed.inject(Router);
    //spyOn(router.events, 'pipe').and.returnValue(events);
    //events.next('Result of pipe');
    const commonServiceStub = () => ({
      getDataNew: arg => ({ subscribe: f => f({}) }),
      uploadImageNew: (string, formData) => ({ subscribe: f => f({}) }),
      deleteDataNew: (string, data) => ({ subscribe: f => f({}) })
    });
    const sharedServiceStub = () => ({
      toCheckAllPermissionRights: banner => ({}),
      displaySuccessMessage: string => ({}),
      displayErrorMessage: string => ({}),
      openDialog: string => ({ afterClosed: () => ({ subscribe: f => f({}) }) })
    });
    const loaderServiceStub = () => ({});
   // const routerStub = () => ({});
    TestBed.configureTestingModule({
      declarations: [ ListBannersComponent, PaginatePipe ],
      imports: [
        MatSnackBarModule,
        MatDialogModule,
        FormsModule,
        BrowserModule,
        HttpClientTestingModule ,
        RouterTestingModule
      ],
      providers: [
       // { provide: Router, useValue: { navigate : jasmine.createSpy("navigate"), events: of(new NavigationEnd(0, 'test/url', 'test/url'))}},
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: LoaderService, useFactory: loaderServiceStub },
        PaginationService,
        { provide: PaginatePipe}
      ]
    })
    .compileComponents();
    router = TestBed.inject(Router);
   spyOn(router.events, 'pipe').and.returnValue(events);
   events.next('Result of pipe');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    fixture = TestBed.createComponent(ListBannersComponent);
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'modulePermissionSets').and.callThrough();
      spyOn(component, 'getData').and.callThrough();
      component.ngOnInit();
      expect(component.modulePermissionSets).toHaveBeenCalled();
      expect(component.getData).toHaveBeenCalled();
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

  describe('getData', () => {
    it('makes expected calls', () => {
      const commonServiceStub: CommonService = fixture.debugElement.injector.get(
        CommonService
      );
      spyOn(commonServiceStub, 'getDataNew').and.callThrough();
      component.getData();
      expect(commonServiceStub.getDataNew).toHaveBeenCalled();
    });
  });

  // describe('upload', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     var formData = new FormData();
  //     const mockValue = ['a', 'b'];
  //     const result = jasmine.createSpyObj('result', ['split']);
  //     result.split.and.callFake(() => mockValue);
  //     const mockReader = { result } as FileReader;
  //   const mockFormGroup: FormGroup = jasmine.createSpyObj('FormGroup', ['patchValue']);
  //   const mockFile = new File([''], 'filename', { type: 'text/html' });
  //   const mockEvt = { target: { files: [mockFile] } };
  //     spyOn(commonServiceStub, 'uploadImageNew').and.callThrough();
  //     component.upload('mockEvt');
  //     expect(commonServiceStub.uploadImageNew).toHaveBeenCalled();
  //   });
  // });

  
  describe('getPage', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getPage').and.callThrough();
      component.getPage('1234');
      expect(component.getPage).toHaveBeenCalled();
    });
  });

  describe('deleteData', () => {
    it('makes expected calls', () => {
      const commonServiceStub: CommonService = fixture.debugElement.injector.get(
        CommonService
      );
      spyOn(commonServiceStub, 'deleteDataNew').and.callThrough();
      component.deleteBanner('1234');
      expect(commonServiceStub.deleteDataNew).toHaveBeenCalled();
    });
  });

  // describe('uploadBanner', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     spyOn(commonServiceStub, 'uploadImageNew').and.callThrough();
  //     component.upload('1234');
  //     expect(commonServiceStub.uploadImageNew).toHaveBeenCalled();
  //   });
  // });
});
