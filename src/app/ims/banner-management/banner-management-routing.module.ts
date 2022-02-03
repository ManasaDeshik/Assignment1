import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBannersComponent } from './list-banners/list-banners.component';
import { AuthGuard } from 'src/app/utils/guard/auth.guard';
import { moduleNameKeys, roleAccessKeys } from 'src/app/utils';
import { CreateEditComponent } from './create-edit/create-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-banner',
    pathMatch: 'full'
  },
  {
    path: 'list-banner',
    component: ListBannersComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.banner
    }
  },
  {
    path: 'create-banner',
    component: CreateEditComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.banner,
      crudAccessVal: roleAccessKeys.write
    }
  },
  {
    path: 'edit-banner/:id',
    component: CreateEditComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.banner,
      crudAccessVal: roleAccessKeys.edit
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerManagementRoutingModule { }
