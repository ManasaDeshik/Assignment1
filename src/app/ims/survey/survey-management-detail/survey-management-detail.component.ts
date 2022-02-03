// export class SurveyManagementDetailComponent implements OnInit {
//   constructor() {}
//   totalRecords = 10;
//   nameOfSurvey = 'Survey_Name';
//   ngOnInit(): void {}
// }

import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  moduleNameKeys,
  RolePermissionVal,
  SharedService,
  TableViewRoleRequestSet,
} from 'src/app/utils';
import { CommonService } from 'src/app/utils';
import { ConfirmationDialogComponent } from 'src/app/utils/components/confirmation-dialog/confirmation-dialog.component';
import { SurveyViewDetailComponent } from '../survey-view-detail/survey-view-detail/survey-view-detail.component';
@Component({
  selector: 'app-survey-management-detail',
  templateUrl: './survey-management-detail.component.html',
  styleUrls: ['./survey-management-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SurveyManagementDetailComponent implements OnInit {
  public permissionSets: RolePermissionVal = new RolePermissionVal();

  @Input() tableHeaders;
  @Input() listUserSurvey;
  @Input() status;
  public usersurvey;
 // @() listUserSurvey = new EventEmitter<any>();
  @Output() pagination = new EventEmitter<string>();
  @Output() onSubmit = new EventEmitter<string>();

  maxValue: any;
  public fromDate: string;
  public toDate: string;
  public filter: any;
  readOnly:boolean=true;
  public tableViewRequestData: TableViewRoleRequestSet = new TableViewRoleRequestSet();

  constructor(private sharedService: SharedService, private router : Router, private commonService: CommonService, public dialog: MatDialog,) {}

  ngOnChanges(){
    console.log(this.status);
  }
  ngOnInit(): void {
    this.modulePermissionSets();
    console.log(this.tableHeaders,"TABLE HEADERS")
   
    console.log(this.listUserSurvey);
    //this.usersurvey = this.listUserSurvey;
   
    this.maxValue = Math.floor(Math.random() * 100) + 1 + '%';
  }

  /**
   * @method  modulePermissionSets()
   * @description - the following modulePermissionSets() method is used set crud operations for module.
   * @uses toCheckAllPermissionRights() - the function toCheckAllPermissionRights returns right permissions for the
   *  module passing module name  as a params.
   * @author amitha.shetty
   */
  modulePermissionSets(): void {
    this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.role);
  }

  getPage(event) {
    if (event > 0 && event <= this.usersurvey.count) {
      this.tableViewRequestData.pageNumber = event;
      this.pagination.emit(event);
      this.onSubmit.emit(event)
    }
  }

  delete(item:any){
    this.commonService.deleteDataNew('survey/remove',{id:item.id}).subscribe((response) => {
      this.sharedService.displaySuccessMessage('Deleted Updated.');
      this.pagination.emit('1');
      this.onSubmit.emit("")
    });
  } //survey-manage/view/:id

  viewSurveyData(event, id) {
    this.router.navigate([`survey/survey-manage/view/${id}`]);
  }
  openSectionDialog (index:number,item): void {
    const dialogRef = this.dialog.open(SurveyViewDetailComponent, {
      minHeight: '100%',
      height: '100%',
      width: '70%',
      position: { left: '30%' },
        data: {
            params: {
                 readOnly: this.readOnly,
                 surveyId: item.id,
                 surveyQuestionId: item.survey_id,
                 tabIndex : this.status
                // dialogType : dialogtype,
                // fields : item.surveyItems[index]
            }
        },
    });
  
    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.pagination.emit('1');
        this.onSubmit.emit("");
       // this.surveyItems[index]=_.extend(this.surveyItems[index],result)
    });
  }
  updateStatus(status,val)
  {
    this.submitStatus(status,{id:val.id})
  }
  rejectStatus(status,val)
  {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      height: '350px',
      data: { message: 'Are You Sure You Want to Reject', userName: name, from: 'Survey' },
      panelClass: 'confirmation-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
     // let status = result.status;
     // console.log('126',status);
      let obj={id:val.id,reason:result.remark}
      if(obj.reason) {
      this.submitStatus(status,obj)
      }
      else {
        if(result) {
        this.sharedService.displayErrorMessage("Please mention the rejection reason");
        this.rejectStatus(status,val);
        }
      }
    })
  }

  submitStatus(status,val)
  {
    this.commonService.patchDataNew('survey/user/survey',{status:status,...val}).subscribe((response) => {
      if (response.success) {
        this.sharedService.displaySuccessMessage('Successfully Updated.');
        this.pagination.emit('1');
        this.onSubmit.emit("")
      }
    });
  }
  getFilter(params) {
    let query = '?';
    Object.keys(params).map((val) => {
      query += `${val}=${params[val]}&`;
    });
    this.fromDate = params.start_date;
    this.toDate = params.end_date;
    this.commonService.getDataNew('download/filter' + query).subscribe((response) => {
      if (response.success) {
        let data = response.payload;
        this.filter = Object.values(data.records);
      }
    });
  }
}
