import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDemoProductComponent } from './list-demo-product/list-demo-product.component';
import { AddDemoProductComponent } from './add-demo-product/add-demo-product.component';
import { AuthGuard } from 'src/app/utils/guard/auth.guard';
import { moduleNameKeys, roleAccessKeys } from 'src/app/utils';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-demo-products',
    pathMatch: 'full'
  },
  {
    path: 'list-demo-products',
    component: ListDemoProductComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.demoProduct
    }
  }, {
    path: 'add-issue-demo-product',
    component: AddDemoProductComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.demoProduct,
      crudAccessVal: roleAccessKeys.write
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoProductManagementRoutingModule { }
