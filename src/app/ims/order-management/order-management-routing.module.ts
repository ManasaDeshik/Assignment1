import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { AuthGuard } from 'src/app/utils/guard/auth.guard';
import { moduleNameKeys } from 'src/app/utils';
import { ComboScanPackageComponent } from './combo-scan-package/combo-scan-package.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.order,
    }
  },
  {
    path: 'combo-offer-scan/:executiveId/:warehouseId/:orderId',
    component: ComboScanPackageComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.order,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrderManagementRoutingModule { }
