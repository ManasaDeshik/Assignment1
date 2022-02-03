import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchManagementRoutingModule } from './branch-management-routing.module';
import { UtilsModule } from 'src/app/utils/utils.module';
import { CreateBranchComponent } from './create-branch/create-branch.component';
import { FormsModule } from '@angular/forms';

// plugins
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgSelectModule } from '@ng-select/ng-select';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [CreateBranchComponent],
  imports: [
    CommonModule,
    BranchManagementRoutingModule,
    UtilsModule,
    FormsModule,

    // plugins
    PerfectScrollbarModule,
    NgSelectModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
})
export class BranchManagementModule { }
