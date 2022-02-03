import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { AuthGuard } from 'src/app/utils/guard/auth.guard';
import { moduleNameKeys } from 'src/app/utils';
import { ViewOrdersComponent } from 'src/app/utils/components/view-orders/view-orders.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-customer',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ListCustomerComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.customer,
    }
  },
  {
    path: 'view-customer-orders/:id',
    component: ViewOrdersComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.customer,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }
