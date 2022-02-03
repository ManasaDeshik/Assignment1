import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService, SharedService } from 'src/app/utils';

@Component({
  selector: 'app-actions-dialog',
  templateUrl: './actions-dialog.component.html',
  styleUrls: ['./actions-dialog.component.scss']
})
export class ActionsDialogComponent implements OnInit {
  id;
  constructor(public dialogRef: MatDialogRef<ActionsDialogComponent>,
  @Inject(MAT_DIALOG_DATA) data:any, private commonService : CommonService,
  private sharedService : SharedService,
  private router : Router) {
    this.id  = data.Id;
    this.dialogRef.backdropClick().subscribe(_ => {
      this.dialogRef.close();
    })
  }
  ngOnInit(): void {
  }
  closeDialog(){
    this.dialogRef.close();
  }
  deleteClicked(){
    var data = {
      "id": this.id,
      "status": 3,
      "reason": ""
  }
  this.commonService.deleteDataNew('survey?id='+this.id).subscribe(response => {
    if (response.status == 200) {
      this.sharedService.displaySuccessMessage('Survey Deleted Successfully');
      /*Below code included for clearing the search filter after successful deletion*/
      //this.router.navigate([]);
      this.dialogRef.close();
    }
  }, err => {
    this.sharedService.displayErrorMessage(err.statusText);
  });
    console.log("Delete clicked")
  }

  editClicked(id) {
    this.router.navigate([`survey/survey-menu/edit-survey/${id}`]);
    this.dialogRef.close();
  }
  duplicateClicked(id){
    this.commonService.getDataNew('survey/duplicate/'+this.id).subscribe(response => {
        console.log(response,"RESPONSE IN DUPLICATE")
        this.dialogRef.close();
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  exportClicked(id) {
    // let requestset ='email=&type=survey_response&page_number=1&records_per_page=5&sort_by_name=1&status=' +this.currentTab + 
    // '&state=' + this.stateSelected + '&district=' + this.districtSelected + '&branch=' + this.branchSelected + 
    // '&village=' + this.villageSelected + '&saheli=' + this.saheliSelected + '&survey_id=' + this.routeSegmentId;
    let requestset ='email=&type=survey_response&page_number=1&records_per_page=5&sort_by_name=1&status=&state=&district=&branch=&village=&saheli=&survey_id=' + this.id;
    this.commonService.getDataNew('download/getlist?' + requestset).subscribe(response => {
      if (response) {
          this.sharedService.displayErrorMessage(response.data);
          this.dialogRef.close();
      //m this.loaderService.show('hide');
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
      this.dialogRef.close();
    //m this.loaderService.show('hide');
    });
  }
}
