import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadManagementComponent } from './lead-management/lead-management.component';
import { CreateEditLeadComponent } from './create-edit-lead/create-edit-lead.component';
import { AuthGuard } from 'src/app/utils/guard/auth.guard';
import { moduleNameKeys, roleAccessKeys } from 'src/app/utils';

const routes: Routes = [
  {
    path: '',
    component: LeadManagementComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.lead
    }
  },
  {
    path: 'create-lead',
    component: CreateEditLeadComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.lead,
      crudAccessVal: roleAccessKeys.write
    }
  },
  {
    path: 'edit-lead/:id',
    component: CreateEditLeadComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.lead,
      crudAccessVal: roleAccessKeys.edit
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadManagementRoutingModule { }
