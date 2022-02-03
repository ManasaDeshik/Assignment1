import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorage, SessionStorageService } from 'ngx-webstorage';
import { SharedService, Login, UserInfo, CommonService, RoleRecordList } from 'src/app/utils';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../utils/services/auth-service/auth.service';
import { imageURL } from '../../../utils/enums/shared-const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @SessionStorage('moduleDetails') public moduleDetails;
  @SessionStorage('authenticationToken') public authenticationToken: string;
  @SessionStorage('allowedWarehouse') public allowedWarehouse: any;
  @SessionStorage('registeredWarehouse') public registeredWarehouse: any;
  @SessionStorage('oldtoken') public oldtoken: any;
  @SessionStorage('isInternetConnected') public isInternetConnected: boolean;
  @SessionStorage('userName') public userData: UserInfo;
  public login: FormGroup;
  public inputType = 'password';
  public imageURL;
  public token;
  constructor(
    private router: Router,
    private sessionStorage: SessionStorageService,
    public formBuilder: FormBuilder,
    private commonService: CommonService,
    private sharedService: SharedService,
    private authService: AuthService,
  ) { }
  ngOnInit() {
    this.sessionStorage.clear();
    this.formValidation();
    this.imageURL = imageURL.name
  }

  /**
   * @method - formValidation()
   * @description - the following form validation is life-cycle event, create the login form with validations set for
   * login credentials.
   * @author amitha.shetty
   */
  formValidation(): void {
    this.login = this.formBuilder.group({
      phone_number: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  /**
   * @method - validationControl()
   * @description - the following validationControl() method is used return  user credentials so it make easy to
   * access the form controls on the HTML form.
   * @author amitha.shetty
   */

  get validationControl() { return this.login.controls; }

  /**
   * @method onSubmit()
   * @description - the following onSubmit() method is used submit user details returns response if valid user.
   * POST(postData) method to get the login details with  query params as the login credentials.
   * @author amitha.shetty
   */

 async onSubmit() {
    const data = new Login(this.login.value);
    console.log(data)
    const loginValue:any = await this.authService.loginWithCognito(data);
    this.authenticationToken = sessionStorage.getItem("authenticationToken");
    console.log('72',this.authenticationToken);

    if(this.authenticationToken) {
    this.commonService.getDataNew('users/details').subscribe(response => {
      if (response.success) {
        this.getModuleDetails(response.data);
      }

    }, (err) => {
      this.sharedService.displayErrorMessage(err.statusText);
      console.log(err);
    });
  }
  }
  /**
   * @method  storeAuthToken()
   * @description - the following storeAuthToken() method is used store authentication token
   * @param token: logged in user token
   * @author amitha.shetty
   */
  storeAuthToken(token: string): void {
    this.authenticationToken = token;
  }
  /**
   * @method  storeUserDetails()
   * @description - the following storeUserDetails() method is used store logged in user details
   * @param data: logged in user data
   * @author amitha.shetty
   */
  storeUserDetails(data: any): void {
    console.log(data,"DATAA")
    this.oldtoken=data.token
    if (data.role.name.replace(/\s+/g, '').toLowerCase() !== 'superadmin' && data.assignedWarehouse != null  &&  data.assignedWarehouse.length > 0) {
      const filterId = data.assignedWarehouse
      .map(x => x._id).join(',');
      data.assignedWarehouse.push({
        name: 'All',
        _id: filterId
      });
      this.registeredWarehouse = filterId;
    } else {
      this.registeredWarehouse = data.assignedWarehouseFK;
    }
    data.warehouse_id=this.registeredWarehouse;
    this.allowedWarehouse = data.warehouses;
   // console.log(this.allowedWarehouse,"alloweddd");
    this.userData = new UserInfo(data);
  }
  /**
   * @method  getModuleRoute()
   * @description - the following getModuleRoute() method is used set modules
   * @author amitha.shetty
   */
  getModuleDetails(response) {
    let isAppAccess = false;
    if (response.role) {
      isAppAccess = response.role.is_admin_login_enabled;
    }
    if (isAppAccess) {
      this.storeAuthToken(this.authenticationToken);
      this.storeUserDetails(response);
      this.moduleDetails = new RoleRecordList(response.role, true);
      const moduleInfo = this.sharedService.toCollectModuleIdentifier(this.moduleDetails);
      this.router.navigate([moduleInfo[0].routerLink]);
    } else {
      this.sharedService.displayErrorMessage('You do not have permission to access these details...');
    }
  }

  showHide(text: string) {
    if (text === 'hide') {
      this.inputType = 'password';
    } else {
      this.inputType = 'text';
    }
  }

}
