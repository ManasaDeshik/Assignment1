import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {CommonService} from 'src/app/utils';
import { interval } from 'rxjs';
@Component({
  selector: 'app-download-management',
  templateUrl: './download-management.component.html',
  styleUrls: ['./download-management.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DownloadManagementComponent implements OnInit {
  
  public tableHeaders = [
    { header: 'S.No' , width : "10%"},
    { header: 'Type' },
    {
      header: 'From Date'
    },
    {
      header: 'To Date'
    }
  ];
  public tableHeadersList = {1:[
    { header: 'S.No' , width : "10%"},
    { 
      header: 'Type'    },
    {
      header : "Downloaded By",
    },
    {
      header: 'Date'
    },
    {
      header : "Applied Filter"
    },
    {
      header:'Progress'
    }
   
  ],2:[
    { header: 'S.No', width : "10%" },
    { header: 'Type' , 
  },
    {
      header : "Downloaded By",
    },
    {
      header: 'Date'
    },
    {
      header : "Applied Filter"
    },
    {
      header: 'Download'
    }
  ]};

public page_number:number=1;
  public listDownloads = []

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.tableHeaders=this.tableHeadersList[1];
    this.getList(1)
    //interval(120000).subscribe(x =>this.getList(1))
  
  }

  tabChange(event: MatTabChangeEvent)
  {
    const tab = event.tab.textLabel;
    var type=(tab == "Inprogress")?1:2;
    this.tableHeaders=this.tableHeadersList[type];
    this.getList(type);
  }
  getList(data:number): void {
    this.commonService.getDataNew('download/list?status='+data+'&records_per_page=10&page_number='+this.page_number).subscribe(response => {
      if (response.success) {
        let data=response.payload;
        let totalRecords=response.totalRecords
        this.listDownloads={...data,totalRecords};
      }
  });
}
getPage(id,type){
  this.page_number=id;
  this.getList(type);
}


}
