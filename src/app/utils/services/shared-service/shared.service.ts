import { Injectable } from '@angular/core';
import { SnackBarSuccessMessage, SnackBarErrorMessage, SideBarProperties } from '../../models';
import { RolePermissionVal } from 'src/app/utils/models';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material//snack-bar'
import {
  Router,
  UrlTree,
  UrlSegmentGroup,
  PRIMARY_OUTLET,
  UrlSegment
} from '@angular/router';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { HttpService } from '.././http-service/http.service';
import { BranchInfoCollections } from '../../enums/fmp-dashboard-const';
import { SessionStorage } from 'ngx-webstorage';
import { sidebarCollections } from '../../enums/shared-const';
import { BranchInfoSet } from '../../models/fmp-dashboard';
import { Observable, Subject } from 'rxjs';







@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public errorMessage: SnackBarErrorMessage = new SnackBarErrorMessage();
  public successMessage: SnackBarSuccessMessage = new SnackBarSuccessMessage();
  @SessionStorage('moduleDetails') public moduleDetails;
  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog,
    private http: HttpService
  ) { }



  /**
   * @method displaySuccessMessage()
   * @description
   * Function to display the success message
   * @param successContent - success content to append to success message body
   * @uses SnackBarSuccessMessage : Class to display the successMessage obtained from param to the required format.
   * @author amitha.shetty
   */
  displaySuccessMessage(successContent) {
    this.successMessage.body = successContent;
    this.openSnackBar(new SnackBarSuccessMessage(this.successMessage));
  }
  /**
   * @method displayErrorMessage()
   * @description
   * Function to display the error message
   * @param errorContent - success content to append to error message body
   * @uses SnackBarErrorMessage : Class to display the errorMessage obtained from param to the required format.
   * @author amitha.shetty
   */
   displayErrorMessage(errorContent) {
    if (errorContent.status === 401 || errorContent.status === 403) {
      errorContent = "Your token is invalid or expired. Please Sign in again.";
      this.errorMessage.body = errorContent;
      this.openSnackBar(new SnackBarErrorMessage(this.errorMessage));
    }
    else {
    this.errorMessage.body = errorContent;
    console.log('sharedService', errorContent);
    this.openSnackBar(new SnackBarErrorMessage(this.errorMessage));
    }
  }
  /**
   * @method openSnackBar()
   * @description
   * Function to display the  message through snackbar by setting display message properties.
   * @param message - contains body and title
   * @author amitha.shetty
   */
  openSnackBar(message) {
    this.snackBar.open(message.body, message.title, window['snackbarConfig']);
  }
  /**
   * @method urlSegmentKeys()
   * @description
   * Function to return the  segments of an url
   * @author amitha.shetty
   */
  urlSegmentKeys() {
    const urlTree: UrlTree = this.router.parseUrl(this.router.url);
    const segmentGroup: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const urlSegment: UrlSegment[] = segmentGroup.segments;
    return urlSegment;
  }

  getBranchData(identifier): BranchInfoSet {
    const branchInfoCollections = BranchInfoCollections;
    const branchInfoData = new BranchInfoSet(branchInfoCollections[identifier]);
    return branchInfoData;
  }
  show(type: string) {
    if (type === 'show') {
      this.spinnerService.show();
    } else if (type === 'hide') {
      this.spinnerService.hide();
    }
  }

  openDialog(leadName?: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are You Sure You Want to Delete ' + leadName },
      panelClass: 'confirmation-dialog',
    });

    return dialogRef;
  }
  changeLangResponse(data) {
    const result = Object.keys(data).map(key => {
      return { _id: key, ...data[key] };
    });
    return result;
  }
  getListLang() {
    return new Promise((resolve, reject) => {
      this.http.getNew('product/multilingual').subscribe(response => {
        resolve(response.payload);
      }, err => {
        reject(err);
      });
    });
  }
  setJsonResponse(type, langSelect) {
    return new Promise((resolve, reject) => {
      this.http.get(`api/language?language=${type}-${langSelect}`).subscribe(response => {
        resolve(this.changeLangResponse(response.payload));
      }, err => {
        reject(err);
      });
    });
  }
  formateDate(date) {
    if (date) {
      // console.log(date)
      let newDate = new Date(date);
      let dd = String(newDate.getDate()).padStart(2, '0');
      let mm = String(newDate.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = newDate.getFullYear();
      let Date1 = mm + '/' + dd + '/' + yyyy;
      // return new Date(date).toISOString();
      return Date1;
    } else {
      return '';
    }
  }
  formateIndianDate(date) {
    if (date) {
      // console.log(date)
      let newDate = new Date(date);
      let dd = String(newDate.getDate()).padStart(2, '0');
      let mm = String(newDate.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = newDate.getFullYear();
      let Date1 = dd + '/' + mm + '/' + yyyy;
      // return new Date(date).toISOString();
      return Date1;
    } else {
      return '';
    }
  }
  /**
     * @method  toCheckAllPermissionRights()
     * @description - the function toCheckAllPermissionRights returns right permissions for the
     *  module passing current module name  as a param
     * @param currentModuleName - current module name
     * @author amitha.shetty
     */
  toCheckAllPermissionRights(currentModuleName: string): RolePermissionVal {
    let rolePermissionInfo = new RolePermissionVal();
    if (this.moduleDetails.roles.length > 0) {
      const moduleData = this.moduleDetails.roles.find(val => val.name.replace(/\s+/g, '').toLowerCase() === currentModuleName);
      if (moduleData) {
        rolePermissionInfo = moduleData.permission;
      }
    }
    return rolePermissionInfo;
  }
  /**
   * @method  toCollectModuleIdentifier()
   * @description - the function toCollectModuleIdentifier returns right module identifiers
   * @param moduleInfo - module details
   * @author amitha.shetty
   */
  toCollectModuleIdentifier(moduleInfo: any): any {
    let moduleIdentifier: any = [];
    let submodules = []
    let data: any = [];
    moduleInfo.roles.map((ele, index) => {
      // console.log((ele.sub_module ? ele.sub_module.length : 0))
      if ((((ele.sub_module ? ele.sub_module.length : 0) === 0) && (ele.name.trim() === "Lead Management")) ||
        (((ele.sub_module ? ele.sub_module.length : 0) === 0) && (ele.name.trim() === "Customer Management")) ||
        (((ele.sub_module ? ele.sub_module.length : 0) === 0) && (ele.name.trim() === "Order Management"))) {
        moduleInfo.roles.splice(index, 1);
      }
      if ((ele.sub_module ? ele.sub_module.length : 0) > 0) {
        submodules.push({ name: ele.name.trim(), sub_module: ele.sub_module, index: index });
      }

      const elementIdentifier = ele.name.replace(/\s+/g, '').toLowerCase();
      data.push(new SideBarProperties(sidebarCollections[elementIdentifier]))
      moduleIdentifier.push(new SideBarProperties(sidebarCollections[elementIdentifier]));
    });
    if (moduleIdentifier) {
      if (moduleIdentifier.length > 0) {
        moduleIdentifier.forEach((ele1, i) => {
          if (submodules.length > 0) {
            submodules.forEach((mod, j) => {
              if (mod.name === (ele1.title ? ele1.title.trim() : "")) {
                let sub = data[i];
                moduleIdentifier[i].subtitle = [];
                let a = 0;
                if (mod.sub_module) {
                  // console.log(mod.sub_module);
                  mod.sub_module.forEach((mod1, ij) => {
                    sub.subtitle.forEach((mod2, ji) => {
                      // console.log(mod1.name, mod2.name)
                      if (mod1.name === mod2.name) {
                        moduleIdentifier[i].subtitle.push(mod2);
                        a = a + 1;
                      }
                    })
                  })
                }
              }
              // console.log(mod.name)
            })
          }
        })
        console.log(moduleIdentifier)
      }
    }
    return moduleIdentifier = moduleIdentifier.filter(ele => ele.title !== '');
  }
  private subject = new Subject<any>();
  sendClickEvent(selectedBtnVal) {
    this.subject.next(selectedBtnVal);
  }
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }


}
