import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConnectionService } from 'ng-connection-service';
import { ErrorService } from '../error-service/error.service';
import { HttpService } from '../http-service/http.service';
import { SharedService } from '../shared-service/shared.service';

import { CommonService } from './common.service';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    const httpServiceStub = () => ({
      get: url => ({ pipe: () => ({}) }),
      getNew: url => ({ pipe: () => ({}) }),
      getDataModified: url => ({ pipe: () => ({}) }),
      post: (url, data) => ({ pipe: () => ({}) }),
      postNew: (url, data) => ({ pipe: () => ({}) }),
      patch: (url, data) => ({ pipe: () => ({}) }),
      patchNew: (url, data) => ({ pipe: () => ({}) }),
      delete: (url, data) => ({ pipe: () => ({}) }),
      deleteNew: (url, data) => ({ pipe: () => ({}) }),
      deleteBanner: url => ({ pipe: () => ({}) }),
      put: (url, data) => ({ pipe: () => ({}) }),
      putNew: (url, data) => ({ pipe: () => ({}) }),
      postUpload: (url, data) => ({ pipe: () => ({}) }),
      postUploadNew: (url, data) => ({ pipe: () => ({}) }),
      fileDataDownload: (url, data) => ({ pipe: () => ({}) }),
      fileDataDownloadPut: (url, data) => ({ pipe: () => ({}) }),
      fileDataDownloadPutNew: (url, data) => ({ pipe: () => ({}) }),
      updateUpload: (url, data) => ({ pipe: () => ({}) }),
      updateUploadNew: (url, data) => ({ pipe: () => ({}) }),
      fileupload: (url, data) => ({ pipe: () => ({}) }),
      fileDownload: url => ({ pipe: () => ({}) }),
      fileDownloadNew: url => ({ pipe: () => ({}) }),
      fileDataDownloadNew: (url, data) => ({ pipe: () => ({}) }),
      getFile: imgSrc => ({ pipe: () => ({}) })
    });
    const errorServiceStub = () => ({ errorHandler: error => ({}) });
    const connectionServiceStub = () => ({
      monitor: () => ({ subscribe: f => f({}) })
    });
    const sharedServiceStub = () => ({
      displayErrorMessage: string => ({}),
      displaySuccessMessage: string => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        CommonService,
        { provide: HttpService, useFactory: httpServiceStub },
        { provide: ErrorService, useFactory: errorServiceStub },
        { provide: ConnectionService, useFactory: connectionServiceStub },
        { provide: SharedService, useFactory: sharedServiceStub }
      ]
    });
    spyOn(CommonService.prototype, 'isInternetConnection');
    service = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    const service: CommonService = TestBed.inject(CommonService);
    expect(service).toBeTruthy();
  });

  describe('constructor getDataNew', () => {
    it('makes expected calls', () => {
      const service: CommonService = TestBed.inject(CommonService);
    spyOn(service, 'getDataNew').and.callThrough();
    service.getDataNew('test');
    expect(service.getDataNew).toHaveBeenCalled();
    });
  });

 // describe('constructor getData', () => {
  //   it('makes expected calls', () => {
  //     const service: CommonService = TestBed.inject(CommonService);
  //   spyOn(service, 'getData').and.callThrough();
  //   service.getData('test');
  //   expect(service.getData).toHaveBeenCalled();
  //   });
  // });
  // it("should throw error", () => {
  //   const service: CommonService = TestBed.inject(CommonService);
  //    let error: string;
  //   let httpTestingController = TestBed.inject(HttpTestingController);
  //   const testData = {
  //     id: 2,
  //     firstName: "John",
  //     lastName: "Kelly",
  //     city: "Boston",
  //     country: "USA",
  //     age: 18
  //   };
  // (done: DoneFn) => {
  //   service.getObservableValue().subscribe(value => {
  //      expect(value).toBe('observable value');
  //      done();
  //   });
  // });
//     service.getData('test').subscribe(null, e => {
//       error = e;
//     });
//     let req = HttpTestingController.prototype.expectOne("test");
//     req.flush("Something went wrong", {
//       status: 404,
//       statusText: "Network error"
//     });
   
//     expect(error.indexOf("Error retrieving data") >= 0).toBeTruthy();
//   });
// });

  describe('constructor getData', () => {
    it('makes expected calls', () => {
      const service: CommonService = TestBed.inject(CommonService);
    spyOn(service, 'getData').and.callThrough();
    service.getData(null);
    expect(service.getData).toHaveBeenCalled();
    });
  });

  describe('constructor getdevNew', () => {
    it('makes expected calls', () => {
      const service: CommonService = TestBed.inject(CommonService);
    spyOn(service, 'getdevNew').and.callThrough();
    service.getdevNew('test');
    expect(service.getdevNew).toHaveBeenCalled();
    });
  });

  describe('constructor getDataModified', () => {
    it('makes expected calls', () => {
      const service: CommonService = TestBed.inject(CommonService);
    spyOn(service, 'getDataModified').and.callThrough();
    service.getDataModified('test');
    expect(service.getDataModified).toHaveBeenCalled();
    });
  });

  describe('constructor postData', () => {
    it('makes expected calls', () => {
      const service: CommonService = TestBed.inject(CommonService);
    spyOn(service, 'postData').and.callThrough();
    service.postData('test','test');
    expect(service.postData).toHaveBeenCalled();
    });
  });

  describe('constructor postDataNew', () => {
    it('makes expected calls', () => {
      const service: CommonService = TestBed.inject(CommonService);
    spyOn(service, 'postDataNew').and.callThrough();
    service.postDataNew('test','test');
    expect(service.postDataNew).toHaveBeenCalled();
    });
  });

  describe('constructor patchData', () => {
    it('makes expected calls', () => {
      const service: CommonService = TestBed.inject(CommonService);
    spyOn(service, 'patchData').and.callThrough();
    service.patchData('test','test');
    expect(service.patchData).toHaveBeenCalled();
    });
  });

  describe('constructor patchDataNew', () => {
    it('makes expected calls', () => {
      const service: CommonService = TestBed.inject(CommonService);
    spyOn(service, 'patchDataNew').and.callThrough();
    service.patchDataNew('test','test');
    expect(service.patchDataNew).toHaveBeenCalled();
    });
  });

  describe('constructor deleteData', () => {
    it('makes expected calls', () => {
      const service: CommonService = TestBed.inject(CommonService);
    spyOn(service, 'deleteData').and.callThrough();
    service.deleteData('test','test');
    expect(service.deleteData).toHaveBeenCalled();
    });
  });

  describe('constructor deleteDataNew', () => {
    it('makes expected calls', () => {
      const service: CommonService = TestBed.inject(CommonService);
    spyOn(service, 'deleteDataNew').and.callThrough();
    service.deleteDataNew('test','test');
    expect(service.deleteDataNew).toHaveBeenCalled();
    });
  });

  describe('constructor deleteBanner', () => {
    it('makes expected calls', () => {
      const service: CommonService = TestBed.inject(CommonService);
    spyOn(service, 'deleteBanner').and.callThrough();
    service.deleteBanner('test');
    expect(service.deleteBanner).toHaveBeenCalled();
    });

    describe('constructor putData', () => {
      it('makes expected calls', () => {
        const service: CommonService = TestBed.inject(CommonService);
      spyOn(service, 'putData').and.callThrough();
      service.putData('test','test');
      expect(service.putData).toHaveBeenCalled();
      });
    });
  
    describe('constructor putDataNew', () => {
      it('makes expected calls', () => {
        const service: CommonService = TestBed.inject(CommonService);
      spyOn(service, 'putDataNew').and.callThrough();
      service.putDataNew('test','test');
      expect(service.putDataNew).toHaveBeenCalled();
      });
    });

    describe('constructor uploadImage', () => {
      it('makes expected calls', () => {
        const service: CommonService = TestBed.inject(CommonService);
      spyOn(service, 'uploadImage').and.callThrough();
      service.uploadImage('test','test');
      expect(service.uploadImage).toHaveBeenCalled();
      });
    });
  
    describe('constructor uploadImageNew', () => {
      it('makes expected calls', () => {
        const service: CommonService = TestBed.inject(CommonService);
      spyOn(service, 'uploadImageNew').and.callThrough();
      service.uploadImageNew('test','test');
      expect(service.uploadImageNew).toHaveBeenCalled();
      });
    });

    describe('constructor uploadImageNew', () => {
      it('makes expected calls', () => {
        const service: CommonService = TestBed.inject(CommonService);
      spyOn(service, 'uploadImageNew').and.callThrough();
      service.uploadImageNew('test','test');
      expect(service.uploadImageNew).toHaveBeenCalled();
      });
    });

    describe('constructor uploadExcel', () => {
      it('makes expected calls', () => {
        const service: CommonService = TestBed.inject(CommonService);
      spyOn(service, 'uploadExcel').and.callThrough();
      service.uploadExcel('test','test');
      expect(service.uploadExcel).toHaveBeenCalled();
      });
    });

    describe('constructor uploadExcelPut', () => {
      it('makes expected calls', () => {
        const service: CommonService = TestBed.inject(CommonService);
      spyOn(service, 'uploadExcelPut').and.callThrough();
      service.uploadExcelPut('test','test');
      expect(service.uploadExcelPut).toHaveBeenCalled();
      });
    });

    describe('constructor uploadExcelPutNew', () => {
      it('makes expected calls', () => {
        const service: CommonService = TestBed.inject(CommonService);
      spyOn(service, 'uploadExcelPutNew').and.callThrough();
      service.uploadExcelPutNew('test','test');
      expect(service.uploadExcelPutNew).toHaveBeenCalled();
      });
    });

    describe('constructor updateImage', () => {
      it('makes expected calls', () => {
        const service: CommonService = TestBed.inject(CommonService);
      spyOn(service, 'updateImage').and.callThrough();
      service.updateImage('test','test');
      expect(service.updateImage).toHaveBeenCalled();
      });
    });

    describe('constructor updateImageNew', () => {
      it('makes expected calls', () => {
        const service: CommonService = TestBed.inject(CommonService);
      spyOn(service, 'updateImageNew').and.callThrough();
      service.updateImageNew('test','test');
      expect(service.updateImageNew).toHaveBeenCalled();
      });
    });

    describe('constructor fileupload', () => {
      it('makes expected calls', () => {
        const service: CommonService = TestBed.inject(CommonService);
      spyOn(service, 'fileupload').and.callThrough();
      service.fileupload('test','test');
      expect(service.fileupload).toHaveBeenCalled();
      });
    });

    describe('constructor fileDownload', () => {
      it('makes expected calls', () => {
        const service: CommonService = TestBed.inject(CommonService);
      spyOn(service, 'fileDownload').and.callThrough();
      service.fileDownload('test');
      expect(service.fileDownload).toHaveBeenCalled();
      });
    });

    describe('constructor fileDownloadNew', () => {
      it('makes expected calls', () => {
        const service: CommonService = TestBed.inject(CommonService);
      spyOn(service, 'fileDownloadNew').and.callThrough();
      service.fileDownloadNew('test');
      expect(service.fileDownloadNew).toHaveBeenCalled();
      });
    });

    describe('constructor fileDataDownload', () => {
      it('makes expected calls', () => {
        const service: CommonService = TestBed.inject(CommonService);
      spyOn(service, 'fileDataDownload').and.callThrough();
      service.fileDataDownload('test','test');
      expect(service.fileDataDownload).toHaveBeenCalled();
      });
    });

    describe('constructor fileDataDownloadNew', () => {
      it('makes expected calls', () => {
        const service: CommonService = TestBed.inject(CommonService);
      spyOn(service, 'fileDataDownloadNew').and.callThrough();
      service.fileDataDownloadNew('test','test');
      expect(service.fileDataDownloadNew).toHaveBeenCalled();
      });
    });

    describe('constructor getFile', () => {
      it('makes expected calls', () => {
        const service: CommonService = TestBed.inject(CommonService);
      spyOn(service, 'getFile').and.callThrough();
      service.getFile('test');
      expect(service.getFile).toHaveBeenCalled();
      });
    });

    describe('constructor errorHandler', () => {
      it('makes expected calls', () => {
        const service: CommonService = TestBed.inject(CommonService);
      spyOn(service, 'errorHandler').and.callThrough();
      service.errorHandler('test');
      expect(service.errorHandler).toHaveBeenCalled();
      });
    });

    // describe('constructor isInternetConnection', () => {
    //   it('makes expected calls', () => {
    //     const service: CommonService = TestBed.inject(CommonService);
    //   spyOn(service, 'isInternetConnection').and.callThrough();
    //   service.isInternetConnection();
    //   expect(service.isInternetConnection).toHaveBeenCalled();
    //   });
    // });
  //  describe('isInternetConnection', () => {
  //   it('makes expected calls', () => {
  //     const connectionServiceStub: ConnectionService = TestBed.inject(
  //       ConnectionService
  //     );
  //     const sharedServiceStub: SharedService = TestBed.inject(SharedService);
  //     spyOn(connectionServiceStub, 'monitor').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     (<jasmine.Spy>service.isInternetConnection).and.callThrough();
  //     service.isInternetConnection();
  //     expect(connectionServiceStub.monitor).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });
});
  });