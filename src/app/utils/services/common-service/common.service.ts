import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpService } from './../http-service/http.service';
import { ErrorService } from '../error-service/error.service';
import { ConnectionService } from 'ng-connection-service';
import { SharedService } from '../shared-service/shared.service';
import { of } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private httpService: HttpService, private errorService: ErrorService, private connectionService: ConnectionService,
    private sharedService: SharedService) {
    this.isInternetConnection();
  }

  getData(url): any {
    return this.httpService.get(url)
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        }),
        map((res: Response) => {
          return res;
        }));
  }
  getdevNew(url): any {
    return this.httpService.getNew(url)
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        }),
        map((res: Response) => {
          return res;
        }));
  }

  getDataNew(url): any {
    return this.httpService.getNew(url)
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        }),
        map((res: Response) => {
          return res;
        }));
  }
  getDataForTranslateNew(url): any {
    return this.httpService.getTranslateAPINew(url)
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        }),
        map((res: Response) => {
          return res;
        }));
  }
  getDataModified(url): any {
    return this.httpService.getDataModified(url)
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        }),
        map((res: Response) => {
          return res;
        }));
  }

  postData(url, data): any {
    return this.httpService.post(url, data)
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        }),
        map((res: Response) => {
          return res;
        }));
  }

  postDataNew(url, data): any {
    return this.httpService.postNew(url, data)
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        }),
        map((res: Response) => {
          return res;
        }));
  }

  patchData(url, data): any {
    return this.httpService.patch(url, data)
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        }),
        map((res: Response) => {
          return res;
        }));
  }

  patchDataNew(url, data): any {
    return this.httpService.patchNew(url, data)
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        }),
        map((res: Response) => {
          return res;
        }));
  }

  deleteData(url, data?): any {
    return this.httpService.delete(url, data)
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        }),
        map((res: Response) => {
          return res;
        }));
  }

  deleteDataNew(url, data?): any {
    return this.httpService.deleteNew(url, data)
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        }),
        map((res: Response) => {
          return res;
        }));
    }

  deleteBanner(url): any {
    return this.httpService.deleteBanner(url)
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        }),
        map((res: Response) => {
          return res;
        }));
  }

  putData(url, data): any {
    return this.httpService.put(url, data)
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        }),
        map((res: Response) => {
          return res;
        }));
  }

  putDataNew(url , data): any{
    return this.httpService.putNew(url, data)
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        }),
        map((res: Response) => {
          return res;
        }));
  }

  uploadImage(url, data: any): any {
    return this.httpService.postUpload(url, data)
      .pipe(catchError((err) => {
        return this.errorHandler(err);
      }),
        map((res: Response) => {
          return res;
        }));
  }

  uploadImageNew(url, data: any): any {
    return this.httpService.postUploadNew(url, data)
      .pipe(catchError((err) => {
        return this.errorHandler(err);
      }),
        map((res: Response) => {
          return res;
        }));
  }

  uploadExcel(url, data: any): any {
    return this.httpService.fileDataDownload(url, data)
      .pipe(catchError((err) => {
        return this.errorHandler(err);
      }),
        map((res: any) => {
          return res;
        }));
  }
  uploadExcelNew(url, data: any): any {
    return this.httpService.fileDataDownloadNew(url, data)
      .pipe(catchError((err) => {
        return this.errorHandler(err);
      }),
        map((res: any) => {
          return res;
        }));
  }
  uploadExcelPut(url, data: any): any {
    return this.httpService.fileDataDownloadPut(url, data)
      .pipe(catchError((err) => {
        return this.errorHandler(err);
      }),
        map((res: any) => {
          return res;
        }));
  }
  uploadExcelPutNew(url, data: any): any {
    return this.httpService.fileDataDownloadPutNew(url, data)
      .pipe(catchError((err) => {
        return this.errorHandler(err);
      }),
        map((res: any) => {
          return res;
        }));
  }
  updateImage(url, data: any): any {
    return this.httpService.updateUpload(url, data)
      .pipe(catchError((err) => {
        return this.errorHandler(err);
      }),
        map((res: Response) => {
          return res;
        }));
  }

  updateImageNew(url, data: any): any {
    return this.httpService.updateUploadNew(url, data)
      .pipe(catchError((err) => {
        return this.errorHandler(err);
      }),
        map((res: Response) => {
          return res;
        }));
  }

  fileupload(url, data: any): any {
    return this.httpService.fileupload(url, data)
      .pipe(catchError((err) => {
        return this.errorHandler(err);
      }),
        map((res: Response) => {
          return res;
        }));
  }

  fileDownload(url): any {
    return this.httpService.fileDownload(url).pipe(
      catchError(err => {
        return this.errorHandler(err);
      }),
      map((res: Response) => {
        return res;
      })
    );
  }
  fileDownloadNew(url): any {
    return this.httpService.fileDownloadNew(url).pipe(
      catchError(err => {
        return this.errorHandler(err);
      }),
      map((res: Response) => {
        return res;
      })
    );
  }
  fileDataDownload(url, data): any {
    return this.httpService.fileDataDownload(url, data).pipe(
      catchError(err => {
        return this.errorHandler(err);
      }),
      map((res: Response) => {
        return res;
      })
    );
  }
  
  fileDataDownloadNew(url, data): any {
    return this.httpService.fileDataDownloadNew(url, data).pipe(
      catchError(err => {
        return this.errorHandler(err);
      }),
      map((res: Response) => {
        return res;
      })
    );
  }

  getFile(imgSrc: any) {
    return this.httpService.getFile(imgSrc).pipe(
      catchError(err => {
        return this.errorHandler(err);
      }),
      map((res) => {
        return res;
      })
    );
  }


  errorHandler(error: any) {
    if (!navigator.onLine) {
      this.sharedService.displayErrorMessage('There is no Internet Connection.Check the network Cable or router');
    }
    let errorResponse = this.errorService.errorHandler(error);
    error = (errorResponse) ? errorResponse : error
    console.log(error)
    return throwError(error);
  }
  isInternetConnection(): void {
    this.connectionService.monitor().subscribe(isConnected => {
      if (isConnected) {
        this.sharedService.displaySuccessMessage('Back to Online');
        window.location.reload();
      } else {
        this.sharedService.displayErrorMessage('There is no Internet Connection.Check the network Cable or router');
      }
    });
  }
}
