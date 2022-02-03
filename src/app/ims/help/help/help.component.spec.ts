import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonService } from 'src/app/utils/services/common-service/common.service';
import { SharedService } from 'src/app/utils/services/shared-service/shared.service';
import { FormsModule } from '@angular/forms';
import { HelpComponent } from './help.component';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;
  let records: {'test'};

  beforeEach(() => {
    const commonServiceStub = () => ({
      getDataNew: string => ({ subscribe: f => f({}) }),
      postDataNew: (string, postData) => ({ subscribe: f => f({}) }),
      deleteDataNew: (string, data) => ({ subscribe: f => f({}) }),
      putDataNew: (string, dataHelpDetails) => ({ subscribe: f => f({}) })
    });
    const sharedServiceStub = () => ({
      show: string => ({}),
      getListLang: () => ({ then: () => ({}) }),
      displayErrorMessage: statusText => ({}),
      displaySuccessMessage: string => ({}),
      openDialog: url => ({ afterClosed: () => ({ subscribe: f => f({}) }) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HelpComponent],
      providers: [
        { provide: CommonService, useFactory: commonServiceStub, useValue: records },
        { provide: SharedService, useFactory: sharedServiceStub }
      ]
    });
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`listHelpVideos has default value`, () => {
    expect(component.listHelpVideos).toEqual([]);
  });

  it(`isView has default value`, () => {
    expect(component.isView).toEqual(false);
  });

  it(`isAddHelp has default value`, () => {
    expect(component.isAddHelp).toEqual(false);
  });

  it(`isSaveProduct has default value`, () => {
    expect(component.isSaveProduct).toEqual(true);
  });

  it(`isEng has default value`, () => {
    expect(component.isEng).toEqual(true);
  });

  it(`availableLang has default value`, () => {
    expect(component.availableLang).toEqual([]);
  });

  it(`selectedLang has default value`, () => {
    expect(component.selectedLang).toEqual(`en`);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'getHelp').and.callThrough();
  //     spyOn(component, 'getLangList').and.callThrough();
  //     spyOn(sharedServiceStub, 'show').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getHelp).toHaveBeenCalled();
  //     expect(component.getLangList).toHaveBeenCalled();
  //     expect(sharedServiceStub.show).toHaveBeenCalled();
  //   });
  // });

  describe('getLangList', () => {
    it('makes expected calls', () => {
      const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
        SharedService
      );
      spyOn(sharedServiceStub, 'getListLang').and.callThrough();
      component.getLangList();
      expect(sharedServiceStub.getListLang).toHaveBeenCalled();
    });
  });

  // describe('getHelp', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'show').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getHelp();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.show).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('getHelpForSequencing', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'show').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.getHelpForSequencing();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.show).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('cancel', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getHelp').and.callThrough();
  //     component.cancel();
  //     expect(component.getHelp).toHaveBeenCalled();
  //   });
  // });

  // describe('saveHelp', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'getHelp').and.callThrough();
  //     spyOn(commonServiceStub, 'postDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'show').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     component.saveHelp();
  //     expect(component.getHelp).toHaveBeenCalled();
  //     expect(commonServiceStub.postDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.show).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('updateHelp', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'getHelpForSequencing').and.callThrough();
  //     spyOn(commonServiceStub, 'putDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'show').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.updateHelp();
  //     expect(component.getHelpForSequencing).toHaveBeenCalled();
  //     expect(commonServiceStub.putDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.show).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });
});
