import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchWarehouseManagementRoutingModule } from './branch-warehouse-management-routing.module';
import { UtilsModule } from 'src/app/utils/utils.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BranchWarehouseManagementRoutingModule,
    UtilsModule
  ]
})
export class BranchWarehouseManagementModule { }
