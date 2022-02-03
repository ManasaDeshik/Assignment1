import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FmpDashboardComponent } from './fmp-dashboard/fmp-dashboard.component';
import { FmpDashboardBranchInfoComponent } from './fmp-dashboard-branch-info/fmp-dashboard-branch-info.component';
import { AuthGuard } from 'src/app/utils/guard/auth.guard';
import { moduleNameKeys } from 'src/app/utils';
import { FmpDashboardBranchComponent } from './fmp-dashboard-branch/fmp-dashboard-branch.component';

const routes: Routes = [
  {
    path: 'fm-dashboard',
    component: FmpDashboardComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.dashboard
    }
  },
  {
    path: ':id',
    component: FmpDashboardBranchComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.dashboard
    }
  },
  {
    path: ':sel-branch/:branch-info/:branch-name/:id',
    component: FmpDashboardBranchInfoComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.dashboard
    }
  },
  {
    path: '',
    redirectTo: 'fm-dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
