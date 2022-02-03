import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUsersComponent } from './create-users.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/utils/services/shared-service/shared.service';
import { CommonService } from 'src/app/utils';

describe('CreateUsersComponent', () => {
  let component: CreateUsersComponent;
  let fixture: ComponentFixture<CreateUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUsersComponent ],
      imports: [
        MatSnackBarModule,
        MatDialogModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(
          [{path: '', component: CreateUsersComponent}],
        )
      ],
      providers: [ { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
      {provide: SharedService},
      {provide: CommonService},
      [CreateUsersComponent]]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  // it('should call ngOnInit method', () => {
  //   const component: CreateUsersComponent = TestBed.inject(CreateUsersComponent);
  //   spyOn(component, 'ngOnInit');
  //   component.ngOnInit();
  //   expect(component.ngOnInit).toHaveBeenCalled();
  // });
});
