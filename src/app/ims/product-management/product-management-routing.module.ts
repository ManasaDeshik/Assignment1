import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { AuthGuard } from 'src/app/utils/guard/auth.guard';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { moduleNameKeys, roleAccessKeys } from 'src/app/utils';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        redirectTo: 'list-products',
        pathMatch: 'full',
      },
      {
        path: 'list-products',
        component: ListProductsComponent,
        canActivate: [AuthGuard],
        data: {
          moduleName: moduleNameKeys.product
        }
      },
      {
        path: 'create-product',
        component: CreateProductComponent,
        canActivate: [AuthGuard],
        data: {
          moduleName: moduleNameKeys.product,
          crudAccessVal: roleAccessKeys.write
        }
      },
      {
        path: 'edit-product/:lang/:id',
        component: CreateProductComponent,
        canActivate: [AuthGuard],
        data: {
          moduleName: moduleNameKeys.product,
          crudAccessVal: roleAccessKeys.edit
        }
      },
      {
        path: 'view-product/:lang/:id',
        component: CreateProductComponent,
        canActivate: [AuthGuard],
        data: {
          moduleName: moduleNameKeys.product,
          crudAccessVal: roleAccessKeys.read
        }
      }
    ]
  },
  {
    path: 'category',
    children: [
      {
        path: 'list-category',
        component: ListCategoryComponent,
        canActivate: [AuthGuard],
        data: {
          moduleName: moduleNameKeys.category,
        }
      },
      {
        path: 'create-category',
        component: CreateCategoryComponent,
        canActivate: [AuthGuard],
        data: {
          moduleName: moduleNameKeys.category,
          crudAccessVal: roleAccessKeys.write
        }
      },
      {
        path: 'edit-category/:lang/:id',
        component: CreateCategoryComponent,
        canActivate: [AuthGuard],
        data: {
          moduleName: moduleNameKeys.category,
          crudAccessVal: roleAccessKeys.edit
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
