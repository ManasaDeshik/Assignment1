import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceListComponent } from './service-list/service-list.component';
import { moduleNameKeys } from 'src/app/utils';
import { AuthGuard } from 'src/app/utils/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-service',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ServiceListComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.service,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceManagementRoutingModule { }
