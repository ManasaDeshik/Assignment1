import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { CommonService, SharedService, SurveyList, TableSurveylist, TableViewRequestSet, TableViewRoleRequestSet } from 'src/app/utils';
import { ActionsDialogComponent } from '../actions-dialog/actions-dialog.component';
@Component({
  selector: 'app-survey-main-detail',
  templateUrl: './survey-main-detail.component.html',
  styleUrls: ['./survey-main-detail.component.scss']
})
export class SurveyMainDetailComponent implements OnInit {

  constructor(private router : Router, private commonService: CommonService, 
    private dialog: MatDialog, private sharedService: SharedService ) { }
  //totalRecords = 10;
  public page=1;
  toggleActive = true;
  displayActions = false;
  tabledisp = '1';
  //tableListData;
  @Input() tabSelected;
  @Input() tableListData;
  @Input() totalRecords;
  @Output() refresh = new EventEmitter<any>();
  @Output() pagination = new EventEmitter<string>();
  @Input() tableViewRequestData;
  //public tableListData: TableSurveylist = new TableSurveylist();
  public config;
  public enableToggle: boolean = true;
  ngOnInit(): void {
    console.log('17',this.tableListData, this.tabSelected);
    /*if(this.tableListData.status == 0) {
        this.toggleActive = false;
    }
    else {
      this.toggleActive = true;
    }*/
    //this.getList(1)
    console.log(this.tableListData.totalRecords,"TOTAL ITEM")
    this.config={id: '1' , itemsPerPage:this.tableViewRequestData.recordsPerPage, currentPage:this.page, totalItems:this.tableListData.totalRecords}
    
  }

  loadSurveyData(event,id){
    console.log('26',event);
    console.log('27',id);
    this.router.navigate(['survey/survey-manage/' + id]);
  }

  viewSurveyData(event, id) {
    this.router.navigate([`survey/survey-menu/view-survey/${id}`]);
  }

  getList(status): void {
    this.commonService.getDataNew('survey?' + 'page_number='+this.tableViewRequestData.pageNumber+'&records_per_page=10&sort_by_name=&lang=hi&status='+status).subscribe(res => {
    this.tableListData = new TableSurveylist(res.payload);
    console.log(this.tableListData,"INSIDE MAIN DETAIL")
    this.config={id: '1' , itemsPerPage:this.tableViewRequestData.recordsPerPage, currentPage:this.page, totalItems:this.tableListData.totalRecords}
    
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
}
showDialog(event,Id) {
  console.log(event.target.getBoundingClientRect());
  let targetAttr = event.target.getBoundingClientRect();
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

  dialogConfig.data = {
    Id: Id
  };
  dialogConfig.width = "13vw";
  dialogConfig.height = "20vh";
  dialogConfig.position = {
    top: targetAttr.y + targetAttr.height + 10 + "px",
    left: targetAttr.x - targetAttr.width - 50 + "px"
  };

  const dialogRef = this.dialog.open(ActionsDialogComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(data => {
    this.refresh.emit();
    if(this.tabSelected == 0)
    this.getList(1);
 else if(this.tabSelected == 1)
    this.getList(0);
 else
    this.getList('')
  });
}


getPage(event) {

  console.log(event,'sdsd')
 // setTimeout(()=>{
  
//},1000)
  if (event > 0 && event <= this.tableListData.totalRecords) {
    this.tableViewRequestData.pageNumber = event;
    this.page=event
    //this.pagination.emit(event);
    if(this.tabSelected == 0)
         this.getList(1);
      else if(this.tabSelected == 1)
         this.getList(0);
      else
         this.getList('')
   // console.log(this.tableViewRequestData.pageNumber)
  }
}
  disableSurvey(id,status) {
    var statsToBeChanged;
    if(this.enableToggle)
      this.enableToggle = false;
    else
       this.enableToggle = true; 
    if(status == 0)
    statsToBeChanged = 1;
    else
    statsToBeChanged = 0;
    var data={
      "id": id,
      "status": statsToBeChanged
  }
    this.commonService.patchDataNew('survey' ,data).subscribe(res => {
      console.log("inside success")
      this.sharedService.displayErrorMessage('Survey status changed successfully')
      this.refresh.emit();
      //this.changeTab.emit();
      if(this.tabSelected == 0)
         this.getList(1);
      else if(this.tabSelected == 1)
         this.getList(0);
      else
         this.getList('')
      //window.location.reload();
      //this.router.navigate(['survey/survey-menu'])
      //  this.totalPrice = res.data.total_value;
      }, err => {
        this.sharedService.displayErrorMessage('');
      });
  }
}
