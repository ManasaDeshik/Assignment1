import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerManagementRoutingModule } from './customer-management-routing.module';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { UtilsModule } from 'src/app/utils/utils.module';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [ListCustomerComponent],
  imports: [
    CommonModule,
    CustomerManagementRoutingModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule,
    NgxPaginationModule,
    FormsModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    OwlDateTimeModule,
    PerfectScrollbarModule,
    UtilsModule,
    MatTooltipModule
  ]
})
export class CustomerManagementModule { }
