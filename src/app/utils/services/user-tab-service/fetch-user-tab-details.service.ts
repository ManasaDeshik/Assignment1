import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { DownloadSubscribeParams, ProductManagementSubscribeParams } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class FetchUserTabDetailsService {
  public fullName$: Subject<boolean> = new Subject();
  public featureName = new Subject<any>();
  private userRoleVal = new Subject<DownloadSubscribeParams>();
  public orderStatusVal = new Subject<DownloadSubscribeParams>();
  public leadStatusVal = new Subject<DownloadSubscribeParams>();
  public customerStatusVal = new Subject<DownloadSubscribeParams>();
  public tryBuyVal = new Subject<DownloadSubscribeParams>();
  public branchStatus = new Subject<DownloadSubscribeParams>();
  public manufactureStatus = new Subject<DownloadSubscribeParams>();
  public warehouseStatus = new Subject<DownloadSubscribeParams>();
  public franchiseStatus = new Subject<DownloadSubscribeParams>();
  public productStatus = new Subject<DownloadSubscribeParams>();
  public categoryStatus = new Subject<DownloadSubscribeParams>();
  public ongoingPOStatus = new Subject<DownloadSubscribeParams>();
  public demoProductStatus = new Subject<DownloadSubscribeParams>();
  public updateProductRequestList = new Subject<ProductManagementSubscribeParams>();
  public serachRoleStatusListRole = new Subject<string>();
  public updateUserList = new Subject<any>();
  public barCode = new Subject<any>();

  private serviceData = new BehaviorSubject('no data');
  private leadData = new BehaviorSubject('no data');
  private customerData = new BehaviorSubject('no data');
  currentMessage = this.serviceData.asObservable();
  leadDataMessage = this.leadData.asObservable();
  customerDataMessage = this.customerData.asObservable();
  constructor() { }

  setFeatureName(message: any) {
    this.featureName.next(message);
  }

  getFeatureName(): Observable<any> {
    return this.featureName.asObservable();
  }
  setSelectedUserRole(val: DownloadSubscribeParams) {
    this.userRoleVal.next(val);
  }
  getSelectedUserRole(): Observable<DownloadSubscribeParams> {
    return this.userRoleVal.asObservable();
  }

  setSelectedOrderStatus(val: DownloadSubscribeParams) {
    this.orderStatusVal.next(val);
  }
  getSelectedOrderStatus(): Observable<DownloadSubscribeParams> {
    return this.orderStatusVal.asObservable();
  }
  getSelectedServiceStatus(): Observable<DownloadSubscribeParams> {
    return this.orderStatusVal.asObservable();
  }
  setSelectedLeadStatus(val: DownloadSubscribeParams) {
    this.leadStatusVal.next(val);
  }
  getSelectedLeadStatus(): Observable<DownloadSubscribeParams> {
    return this.leadStatusVal.asObservable();
  }

  setCustomerStatus(val: DownloadSubscribeParams) {
    this.customerStatusVal.next(val);
  }

  getCustomerStatus(): Observable<DownloadSubscribeParams> {
    return this.customerStatusVal.asObservable();
  }

  setTryBuyStatus(val: DownloadSubscribeParams) {
    this.tryBuyVal.next(val);
  }

  getTryBuyStatus(): Observable<DownloadSubscribeParams> {
    return this.tryBuyVal.asObservable();
  }
  setBranchSubscribeStatus(val: DownloadSubscribeParams) {
    this.branchStatus.next(val);
  }

  getBranchSubscribeStatus(): Observable<DownloadSubscribeParams> {
    return this.branchStatus.asObservable();
  }
  setManufactureSubscribeStatus(val: DownloadSubscribeParams) {
    this.manufactureStatus.next(val);
  }
  setWarehouseSubscribeStatus(val: DownloadSubscribeParams) {
    this.warehouseStatus.next(val);
  }

  setFranchiseSubscribeStatus(val: DownloadSubscribeParams) {
    this.franchiseStatus.next(val);
  }
  setProductsSubscribeStatus(val: DownloadSubscribeParams) {
    this.productStatus.next(val);
  }
  setCategorySubscribeStatus(val: DownloadSubscribeParams) {
    this.categoryStatus.next(val);
  }
  getManufactureSubscribeStatus(): Observable<DownloadSubscribeParams> {
    return this.manufactureStatus.asObservable();
  }
  getWarehouseSubscribeStatus(): Observable<DownloadSubscribeParams> {
    return this.warehouseStatus.asObservable();
  }
  getFranchiseSubscribeStatus(): Observable<DownloadSubscribeParams> {
    return this.franchiseStatus.asObservable();
  }
  getCategorySubscribeStatus(): Observable<DownloadSubscribeParams> {
    return this.categoryStatus.asObservable();
  }
  getProductsSubscribeStatus(): Observable<DownloadSubscribeParams> {
    return this.productStatus.asObservable();
  }
  setOngoingPOSubscribeStatus(val: DownloadSubscribeParams) {
    this.ongoingPOStatus.next(val);
  }

  getOngoingPOSubscribeStatus(): Observable<DownloadSubscribeParams> {
    return this.ongoingPOStatus.asObservable();
  }
  setDemoProductSubscribeStatus(val: DownloadSubscribeParams) {
    this.demoProductStatus.next(val);
  }

  getDemoProductSubscribeStatus(): Observable<DownloadSubscribeParams> {
    return this.demoProductStatus.asObservable();
  }


  setUpdateList(message: any) {
    this.updateUserList.next(message);
  }

  getUpdateList(): Observable<any> {
    return this.updateUserList.asObservable();
  }

  getRequestProductParams(): Observable<any> {
    return this.updateProductRequestList.asObservable();
  }
  setRequestProductParams(val: ProductManagementSubscribeParams) {
    this.updateProductRequestList.next(val);
  }
  setBarCode(message: any) {
    this.barCode.next(message);
  }

  getBarCode(): Observable<any> {
    return this.barCode.asObservable();
  }
  // list role
  setRoleStatusListRole(message: any) {
    this.serachRoleStatusListRole.next(message);
  }
  getRoleStatusListRole(): Observable<any> {
    return this.serachRoleStatusListRole.asObservable();
  }
  shareServiceData(message: any) {
    this.serviceData.next(message);
    //  console.log(message);
  }
  shareLeadData(data: any) {
    this.leadData.next(data);
  }
  shareCustomerData(data: any) {
    this.customerData.next(data);
  }
}
