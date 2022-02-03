import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RolePermissionVal, CommonService, SharedService, LoaderService, moduleNameKeys } from 'src/app/utils';
import { Router } from '@angular/router';
import { SessionStorage } from 'ngx-webstorage';
import { TableListBanner, TableViewRequestSetBanner } from 'src/app/utils/models/banner';

@Component({
  selector: 'app-list-banners',
  templateUrl: './list-banners.component.html',
  styleUrls: ['./list-banners.component.scss']
})
export class ListBannersComponent implements OnInit {
  public permissionSets: RolePermissionVal = new RolePermissionVal();
  public bannerList: TableListBanner = new TableListBanner();
  public tableViewRequestData: TableViewRequestSetBanner = new TableViewRequestSetBanner();
  @SessionStorage('moduleDetails') public moduleDetails;
  @ViewChild('bannerInput') public myInputVariable: ElementRef;

  constructor(private commonService: CommonService,
    private sharedService: SharedService,
    private loaderService: LoaderService,
    private router: Router) { }

  ngOnInit() {
    this.modulePermissionSets();
    this.getData();
  }


  /**
 * @method  modulePermissionSets()
 * @description - the following modulePermissionSets() method is used set crud operations for module.
 * @uses toCheckAllPermissionRights() - the function toCheckAllPermissionRights returns right permissions for the
 *  module passing module name  as a params.
 * @author amitha.shetty
 */
  modulePermissionSets(): void {
    this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.banner);
  }

  getData() {
    //m this.loaderService.show('show');
    const request = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
      this.tableViewRequestData.pageNumber;

    this.commonService.getDataNew('users/banner' + request).subscribe(res => {
    //m this.loaderService.show('hide');
      this.bannerList = new TableListBanner(res.payload);
    }, err => {
    //m this.loaderService.show('hide');

    })
  }

  getPage(event): void {
    if (event > 0 && event <= this.bannerList.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getData();
    }
  }

  upload(event) {
    //m this.loaderService.show('show');
    const formData: FormData = new FormData();

    formData.append('image', event.target.files[0]);

    this.commonService.uploadImageNew('users/banner', formData).subscribe(res => {
      //m this.loaderService.show('hide');
      this.getData();
      this.sharedService.displaySuccessMessage('Uploaded Successfully');
      this.myInputVariable.nativeElement.value = '';
    }, err => {
      this.sharedService.displayErrorMessage('Something went wrong');
      this.myInputVariable.nativeElement.value = '';
    });
  }

  deleteBanner(id: string) {
    const dialogRef = this.sharedService.openDialog('Banner');
    dialogRef.afterClosed().subscribe(result => {
      var data = {
        "banner_id": id
    }
      if (result) {        
        this.commonService.deleteDataNew('users/banner',data).subscribe(response => {

          if (response.status == 200) {
            this.sharedService.displaySuccessMessage('Deleted Successfully');
            this.getData();
          }
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
      }
    });
  }
}
