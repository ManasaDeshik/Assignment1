import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadManagementRoutingModule } from './lead-management-routing.module';
import { LeadManagementComponent } from './lead-management/lead-management.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';
import { CreateEditLeadComponent } from './create-edit-lead/create-edit-lead.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [LeadManagementComponent, CreateEditLeadComponent],
  imports: [
    CommonModule,
    LeadManagementRoutingModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule,
    NgxPaginationModule,
    FormsModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    OwlDateTimeModule,
    PerfectScrollbarModule,
    MatTooltipModule
  ]
})
export class LeadManagementModule { }
