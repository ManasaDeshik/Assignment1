// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { SharedService } from 'src/app/utils/services';
// import { CommonService } from 'src/app/utils/services';
// import { LoaderService } from 'src/app/utils/services';
// import { FetchUserTabDetailsService } from 'src/app/utils/services';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { ListWarehouseManufacturerFranchiseComponent } from './list-warehouse-manufacturer-franchise.component';
// import { PaginatePipe, PaginationService } from 'ngx-pagination';

// describe('ListWarehouseManufacturerFranchiseComponent', () => {
//   let component: ListWarehouseManufacturerFranchiseComponent;
//   let fixture: ComponentFixture<ListWarehouseManufacturerFranchiseComponent>;

//   beforeEach(() => {
//     const sharedServiceStub = () => ({
//       urlSegmentKeys: () => ({}),
//       toCheckAllPermissionRights: arg => ({}),
//       displayErrorMessage: statusText => ({})
//     });
//     const commonServiceStub = () => ({
//       getDataNew: arg => ({ subscribe: f => f({}) })
//     });
//     const loaderServiceStub = () => ({});
//     const fetchUserTabDetailsServiceStub = () => ({
//       setManufactureSubscribeStatus: subscribeData => ({}),
//       setWarehouseSubscribeStatus: subscribeData => ({}),
//       setFranchiseSubscribeStatus: subscribeData => ({})
//     });
//     const routerStub = () => ({ navigate: array => ({}) });
//     TestBed.configureTestingModule({
//       imports: [FormsModule],
//       schemas: [NO_ERRORS_SCHEMA],
//       declarations: [ListWarehouseManufacturerFranchiseComponent, PaginatePipe],
//       providers: [
//         { provide: SharedService, useFactory: sharedServiceStub },
//         { provide: CommonService, useFactory: commonServiceStub },
//         { provide: LoaderService, useFactory: loaderServiceStub },
//         { provide: PaginatePipe}, PaginationService,
//         {
//           provide: FetchUserTabDetailsService,
//           useFactory: fetchUserTabDetailsServiceStub
//         },
//         { provide: Router, useFactory: routerStub }
//       ]
//     });
//     fixture = TestBed.createComponent(
//       ListWarehouseManufacturerFranchiseComponent
//     );
//     component = fixture.componentInstance;
//   });

//   it('can load instance', () => {
//     expect(component).toBeTruthy();
//   });

//   it(`urlSegmentKeys has default value`, () => {
//     expect(component.urlSegmentKeys).toEqual([]);
//   });

//   // describe('ngOnInit', () => {
//   //   it('makes expected calls', () => {
//   //     spyOn(component, 'setTableInfoDetails').and.callThrough();
//   //     component.ngOnInit();
//   //     expect(component.setTableInfoDetails).toHaveBeenCalled();
//   //   });
//   // });

//   // describe('ngOnInit', () => {
//   //   it('makes expected calls', () => {
//   //     spyOn(component, 'ngOnInit').and.callThrough();
//   //     component.ngOnInit();
//   //     expect(component.ngOnInit).toHaveBeenCalled();
//   //   });
//   // });

//   // describe('setTableInfoDetails', () => {
//   //   it('makes expected calls', () => {
//   //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
//   //       SharedService
//   //     );
//   //     spyOn(component, 'modulePermissionSets').and.callThrough();
//   //     spyOn(component, 'getData').and.callThrough();
//   //     spyOn(sharedServiceStub, 'urlSegmentKeys').and.callThrough();
//   //     component.setTableInfoDetails();
//   //     expect(component.modulePermissionSets).toHaveBeenCalled();
//   //     expect(component.getData).toHaveBeenCalled();
//   //     expect(sharedServiceStub.urlSegmentKeys).toHaveBeenCalled();
//   //   });
//   // });

//   describe('modulePermissionSets', () => {
//     it('makes expected calls', () => {
//       const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
//         SharedService
//       );
//       spyOn(sharedServiceStub, 'toCheckAllPermissionRights').and.callThrough();
//       component.modulePermissionSets();
//       expect(sharedServiceStub.toCheckAllPermissionRights).toHaveBeenCalled();
//     });
//   });

//   // describe('getData', () => {
//   //   it('makes expected calls', () => {
//   //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
//   //       SharedService
//   //     );
//   //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
//   //       CommonService
//   //     );
//   //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
//   //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
//   //     component.getData();
//   //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
//   //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
//   //   });
//   // });

//   describe('route', () => {
//     it('makes expected calls', () => {
//       const routerStub: Router = fixture.debugElement.injector.get(Router);
//       spyOn(routerStub, 'navigate').and.callThrough();
//       component.route();
//       expect(routerStub.navigate).toHaveBeenCalled();
//     });
//   });

//   describe('getPage', () => {
//     it('makes expected calls', () => {
//       spyOn(component, 'getPage').and.callThrough();
//       component.getPage(2);
//       expect(component.getPage).toHaveBeenCalled();
//     });
//   });

//   describe('getPage', () => {
//     it('makes expected calls', () => {
//       component.tableList.totalRecords = 10;
//       spyOn(component, 'getPage').and.callThrough();
//       component.getPage(2);
//       expect(component.getPage).toHaveBeenCalled();
//     });
//   });

//   describe('setSearchText', () => {
//     it('makes expected calls', () => {
//       component.tableTypeData.pageTitle = 'Manufacturer';
//       spyOn(component, 'setSearchText').and.callThrough();
//       component.setSearchText('test','test');
//       expect(component.setSearchText).toHaveBeenCalled();
//     });

//     it('makes expected calls', () => {
//       component.tableTypeData.pageTitle = 'Warehouse';
//       const event = { key: 'Enter' }; 
//       spyOn(component, 'setSearchText').and.callThrough();
//       component.setSearchText(event,'test');
//       expect(component.setSearchText).toHaveBeenCalled();
//     });

//     it('makes expected calls', () => {
//       component.tableTypeData.pageTitle = 'Test';
//       const event = { key: 'Enter' }; 
//       spyOn(component, 'setSearchText').and.callThrough();
//       component.setSearchText(event,'test');
//       expect(component.setSearchText).toHaveBeenCalled();
//     });
//   });

// });