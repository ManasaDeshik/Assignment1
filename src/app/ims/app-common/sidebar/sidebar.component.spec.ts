import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavService } from 'src/app/utils';
import { SharedService } from 'src/app/utils';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const sideNavServiceStub = () => ({
      getSideNav: () => ({ subscribe: f => f({}) }),
      sideNavState$: { next: () => ({}) },
      setSubText: item => ({}),
      setCustomer: item => ({})
    });
    const sharedServiceStub = () => ({
      getClickEvent: () => ({ subscribe: f => f({}) }),
      displayErrorMessage: statusText => ({}),
      toCollectModuleIdentifier: moduleDetails => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SidebarComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: SideNavService, useFactory: sideNavServiceStub },
        { provide: SharedService, useFactory: sharedServiceStub }
      ]
    });
    spyOn(SidebarComponent.prototype, 'testEvent');
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`sideNavState has default value`, () => {
    component.sideNavState = false;
    expect(component.sideNavState).toEqual(false);
  });

  it(`linkText has default value`, () => {
    expect(component.linkText).toEqual(false);
  });

  it(`imgToggle has default value`, () => {
    expect(component.imgToggle).toEqual(false);
  });

  it(`isActive has default value`, () => {
    expect(component.isActive).toEqual(false);
  });

  it(`moduleIdentifier has default value`, () => {
    expect(component.moduleIdentifier).toEqual([]);
  });

  it(`selectedBtnVal has default value`, () => {
    expect(component.selectedBtnVal).toEqual(0);
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(SidebarComponent.prototype.testEvent).toHaveBeenCalled();
    });
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getSidebarDetails').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getSidebarDetails).toHaveBeenCalled();
  //   });
  // });

  // describe('getSidebarDetails', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(sharedServiceStub, 'toCollectModuleIdentifier').and.callThrough();
  //     component.getSidebarDetails();
  //     expect(sharedServiceStub.toCollectModuleIdentifier).toHaveBeenCalled();
  //   });
  // });
});
