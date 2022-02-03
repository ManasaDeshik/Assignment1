import { TestBed } from '@angular/core/testing';
import { ErrorService } from './error.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedService } from '../shared-service/shared.service';
import { HttpService } from '../http-service/http.service';
import { JwtService } from '../jwt-service/jwt.service';
import { StorageService } from 'ngx-webstorage-service';
import { SessionStorage } from 'ngx-webstorage';
import { LoaderService } from '../loader-service/loader.service';

describe('ErrorService', () => {
  let mockSharedService = SharedService;
  let mockHttpService = HttpService;
  let mockJwtService = JwtService;
  let service: LoaderService;
  const mockSession =  {
    get: () => [],
    set: () => null,
    has: () => true,
    remove: () => null,
    clear: () => null,
    withDefaultTranscoder: () => null
  } as StorageService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      MatSnackBarModule,
      MatDialogModule,
      HttpClientModule,
      RouterTestingModule.withRoutes(
        [],
      )
    ],
    providers: [
      ErrorService,
      { useValue: mockSession },
    ]
  }));

  // it('should be created', () => {
  //   const service: ErrorService = TestBed.inject(ErrorService);
  //   expect(service).toBeTruthy();
  // });
});
