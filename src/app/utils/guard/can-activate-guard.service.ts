import { Injectable } from '@angular/core';
import { SharedService } from '..';
import { Router } from '@angular/router';
import { SessionStorage } from 'ngx-webstorage';
import { moduleNameKeys } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService {
  @SessionStorage('authenticationtoken') public authenticationToken;
  @SessionStorage('moduleDetails') public moduleDetails;
  constructor(private router: Router, private sharedService: SharedService) { }
  /**
   * @method isAllowedUser() - to check whether the user has permissions to access the modules
   * @param url - the activated route
   * @param moduleData - contains moduleName and crudAccessValue if exists and defaultRoute if exists
   */

  isAllowedUser(url: string, moduleData?: any): boolean {
    let isAllowedPath = false;

    if (this.moduleDetails) {
      if (this.moduleDetails.roles.length > 0) {
        // filter the module being accessed
        const currentModule = this.moduleDetails.roles.find(module =>
          module.name.replace(/\s+/g, '').toLowerCase() === moduleData.moduleName);

        // to check whether user has a read permission for current module
        if (currentModule  && currentModule.permission.read) {
          // if crudAccesValue exists - check whether user has got  permission for create , delete , update
          if (moduleData.crudAccessVal) {
            // tslint:disable-next-line: no-bitwise
            // IF -  if pathAccess exists and the user is allowed to access the componnet navigate to requested route
            // ELSE - show the warning and stay in the current route itself
            if (currentModule.permission[moduleData.crudAccessVal]) {
              isAllowedPath = true;
            } else {
              this.router.navigate(['dashboard']);
              this.sharedService.displayErrorMessage('You do not have permission to access these details...');
              return false;
            }
          } else {
            isAllowedPath = true;
          }
        }
      }
    }
    // IF -   if authtoken exists and the user is allowed to access the module navigate to requested route
    // ELSE - show the warning and stay in the current route itself
    if (this.authenticationToken && isAllowedPath) {
      this.router.navigate[url];
      return true;
    } else {
      if (this.authenticationToken) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['']);
      }
      this.sharedService.displayErrorMessage('You do not have permission to access these details...');
      return false;
    }
  }
}
