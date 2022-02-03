import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/utils/guard/auth.guard';
import { ListBranchesComponent } from 'src/app/utils/components/list-branches/list-branches.component';
import { CreateBranchComponent } from './create-branch/create-branch.component';
import { moduleNameKeys, roleAccessKeys } from 'src/app/utils';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-branches',
    pathMatch: 'full'
  },
  {
    path: 'list-branches',
    component: ListBranchesComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.branch
    }
  },
  {
    path: 'create-branch',
    component: CreateBranchComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.branch,
      crudAccessVal: roleAccessKeys.write
    }
  },
  {
    path: 'edit-branch/:id',
    component: CreateBranchComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.branch,
      crudAccessVal: roleAccessKeys.edit
    }
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchManagementRoutingModule { }
