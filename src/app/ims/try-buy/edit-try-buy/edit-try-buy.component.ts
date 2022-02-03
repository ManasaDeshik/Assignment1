import { Component, OnInit } from '@angular/core';
import { SharedService, TryBuyUser, BranchDetails, EditTryBuy, LeadStatus, editTryBuyCollections, CommonService } from 'src/app/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-try-buy',
  templateUrl: './edit-try-buy.component.html',
  styleUrls: ['./edit-try-buy.component.scss']
})
export class EditTryBuyComponent implements OnInit {
  public routeSegmentId: string;
  public tryAndBuyList: TryBuyUser;
  public isSubmit: boolean;
  public branchData: BranchDetails = new BranchDetails();
  public vleCode = [];
  public vles: string;
  public showData = false;
  public statusInfo: any;
  public productTitle: string;
  public orderTabs = editTryBuyCollections;
  public intrestedProduct = [];
  public isBuyDateDisabled = false;
  public allowedWarehouseList = [];
  constructor(private sharedService: SharedService,
    private commonService: CommonService,
    private router: Router) { }

  ngOnInit() {
    this.fetchUrl();
    //this.getProductDetails();
  }


  /**
 * @method fetchUrl()
 * @description: to check whether the user is in edit form using route
 * @author karan
 */
  fetchUrl(): void {
    const urlSegment = this.sharedService.urlSegmentKeys();
    this.routeSegmentId = urlSegment[urlSegment.length - 1].path;
    if (this.routeSegmentId !== 'create-lead') {
      this.getEditData();
    }
  }

  /**
   * @method getProductDetails()
   * @description: put all the products in the intestred products dropdown
   * @author karan
   */
  getProductDetails() {
    const request = '?records_per_page=' + 100+'&userwarehouse=';
    var request1 = '';
    for(var i=0;i< this.allowedWarehouseList.length;i++){
      if(request1 == '')
        request1 += this.allowedWarehouseList[i];
      else
        request1 += ','+this.allowedWarehouseList[i];
    }
    this.commonService.getDataNew('product/webproductDetails' + request+request1).subscribe(res => {
      if (res.success) {
        this.intrestedProduct = res.payload.records;
      }
    }, (err) => {
       this.sharedService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }


  /** filter list of items on edit lead */
  /**
   * @method getEditData()
   * @description: is used to get the lead data to be edited
   * @author karan
   */
  getEditData() {
    this.commonService.getDataNew(`tryAndBuy/view/${this.routeSegmentId}`).subscribe(res => {
      this.tryAndBuyList = new TryBuyUser(res.payload);
      this.showData = true;
      this.statusInfo = this.tryAndBuyList.status;
      if(this.statusInfo.value == 1 || this.statusInfo.value == 3)
        this.isBuyDateDisabled = true;
      else
         this.isBuyDateDisabled = false;
      this.productTitle = this.tryAndBuyList.productTitle;
      for(var item of this.tryAndBuyList.warehouseList){
          this.allowedWarehouseList.push(item.id)
      }
     // this.allowedWarehouseList = this.tryAndBuyList.warehouseList;
      this.getProductDetails();
      this.filterVleCode(this.tryAndBuyList);
    }, (err) => {
       this.sharedService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }


  /**
 * @method filterVleCode()
 * @description: is used to bind the  vles to ng-select from the event passed as a parameter.
 * @param role: contains the vle code of particular lead
 * @author karan
 */
  filterVleCode(event) {
    this.vles = event.vleId;
  }

  /**
   * @method searchVleCode()
   * @param event : text search
   * @description: searching vle code and displaying in vleCode array
   * @author karan
   */
  searchVleCode(event: any) {
    this.commonService.getDataNew(`users?vle_code=${event.term}`).subscribe(res => {
      this.vleCode = res.payload.records;
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }

  /**
 * @method selectedStatus()
 * @description: to set the selected status to fmUserForm status.
 * @param event:  contains selected status
 * @author karan
 */
  selectedStatus(event) {
    if(event.value == 1 || event.value == 3)
        this.isBuyDateDisabled = true;
    else
        this.isBuyDateDisabled = false;
    const update = new LeadStatus(event.value, event.name);
    this.tryAndBuyList.status = update;
  }

  /**
   * @method selectedIntrestedProduct()
   * @description: to set the selected interested products tag to fmUserForm interested products.
   * @param: contains selected interested products
   * @author karan
   */
  selectedIntrestedProduct(event) {
     
    this.tryAndBuyList.product_detail_id = event.id;
  }


  clearEndDate() {
    this.tryAndBuyList.end_date = '';
  }

  updateUser() {
    this.tryAndBuyList.start_date = new Date(this.tryAndBuyList.start_date).toISOString();
    this.tryAndBuyList.end_date = new Date(this.tryAndBuyList.end_date).toISOString();
    this.tryAndBuyList.buying_date = this.tryAndBuyList.buying_date ? new Date(this.tryAndBuyList.buying_date).toISOString() : ''
    const updateTryBuy = new EditTryBuy(this.tryAndBuyList);
    // console.log(this.tryAndBuyList);
    if (this.tryAndBuyList.buying_date == "") {
      delete updateTryBuy.buying_date
    }
    // return;
    this.commonService.putDataNew('tryAndBuy/update', updateTryBuy).subscribe(res => {
      this.sharedService.displaySuccessMessage('Updated succesfully');
      this.router.navigate(['try-buy']);
    }, err => {
      this.sharedService.displaySuccessMessage('something went wrong');
    });

  }

}
