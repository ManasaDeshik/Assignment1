import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/utils/guard/auth.guard';
import { moduleNameKeys } from 'src/app/utils';
import { DownloadManagementComponent } from './download-management/download-management.component';

const routes: Routes = [
  {
    path: '',
    component: DownloadManagementComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.download,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadManagementRoutingModule { }
