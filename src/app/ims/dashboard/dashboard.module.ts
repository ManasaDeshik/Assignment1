import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FmpDashboardComponent } from './fmp-dashboard/fmp-dashboard.component';
import { FmpDashboardBranchInfoComponent } from './fmp-dashboard-branch-info/fmp-dashboard-branch-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// pagination plugin
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HighchartsChartModule } from 'highcharts-angular';
import { UtilsModule } from 'src/app/utils/utils.module';
import { Ng9OdometerModule } from 'ng9-odometer';
import { FmpDashboardBranchComponent } from './fmp-dashboard-branch/fmp-dashboard-branch.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [FmpDashboardComponent, FmpDashboardBranchInfoComponent, FmpDashboardBranchComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgSelectModule,
    FormsModule,
    NgxPaginationModule,
    PerfectScrollbarModule,
    HighchartsChartModule,
    Ng9OdometerModule.forRoot(),

    MatSelectModule,
    UtilsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }]
})
export class DashboardModule { }
