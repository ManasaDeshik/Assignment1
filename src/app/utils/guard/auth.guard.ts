import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivateGuardService } from './can-activate-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private canActivateService: CanActivateGuardService) {}
  canActivate(
    activeRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivateService.isAllowedUser(state.url , activeRoute.data);
    //return true;//this.canActivateService.isAllowedUser(state.url , activeRoute.data);
  }
}
