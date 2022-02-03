import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadManagementComponent } from './download-management/download-management.component';
import { FormsModule } from '@angular/forms';
import { DownloadManagementRoutingModule } from './download-management-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { DownloadTableComponent } from './download-table/download-table.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [DownloadManagementComponent, DownloadTableComponent],
  imports: [
    CommonModule,
    DownloadManagementRoutingModule,
    FormsModule,
    MatTabsModule,
    PerfectScrollbarModule,
    NgxPaginationModule
  ]
})
export class DownloadManagementModule { }
