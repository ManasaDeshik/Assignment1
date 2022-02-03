import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './ims/app-common/layout/layout.component';
import { NotFoundComponent } from './utils';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./ims/app-common/app-common.module').then(m => m.AppCommonModule)
},
{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: 'dashboard',
      loadChildren: () => import('./ims/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'orders',
      loadChildren: () => import('./ims/order-management/order-management.module').then(m => m.OrderManagementModule)
    },
    {
      path: 'old-orders',
      loadChildren: () => import('./ims/old-orders/old-arch.module').then(m => m.OldArchModule)
    },
    {
      path: 'lead-management',
      loadChildren: () => import('./ims/lead-management/lead-management.module').then(m => m.LeadManagementModule)
    },
    {
      path: 'user-management',
      loadChildren: () => import('./ims/user-management/user-management.module').then(m => m.UserManagementModule)
    },
    {
      path: 'try-buy',
      loadChildren: () => import('./ims/try-buy/try-buy.module').then(m => m.TryBuyModule)
    },
    {
      path: 'product-management',
      loadChildren: () => import('./ims/product-management/product-management.module').then(m => m.ProductManagementModule)
    },
    {
      path: 'branch-management',
      loadChildren: () => import('./ims/branch-management/branch-management.module').then(m => m.BranchManagementModule)
    },
    {
      path: 'stock',
      loadChildren: () => import('./ims/stocks/stock.module').then(m => m.StockModule)
    },
    {
      path: 'branch-warehouse',
      loadChildren: () => import('./ims/branch-warehouse-management/branch-warehouse-management.module').then(m => m.BranchWarehouseManagementModule)
    },
    {
      path: 'demo-management',
      loadChildren: () => import('./ims/demo-product-management/demo-product-management.module').then(m => m.DemoProductManagementModule)
    },
    {
      path: 'banner-management',
      loadChildren: () => import('./ims/banner-management/banner-management.module').then(m => m.BannerManagementModule)
    },
    {
      path: 'survey',
      loadChildren: () => import('./ims/survey/survey.module').then(m => m.SurveyModule)
    },
    {
      path: 'customer-management',
      loadChildren: () => import('./ims/customer-management/customer-management.module').then(m => m.CustomerManagementModule)
    },
    {
      path: 'help',
      loadChildren: () => import('./ims/help/help.module').then(m => m.HelpModule)
    },
    {
      path: 'download',
      loadChildren: () => import('./ims/download-management/download-management.module').then(m => m.DownloadManagementModule)
    }
  ]
},
{
  path: 'not-found',
  component: NotFoundComponent
},
{
  path: '**',
  redirectTo: 'not-found',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
