import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListStocksComponent } from './list-stocks/list-stocks.component';
import { CreatePurchaseOrderComponent } from './purchase-order/create-purchase-order/create-purchase-order.component';
import { CreateTransferOrderComponent } from './transfer-order/create-transfer-order/create-transfer-order.component';
import { ListProductDetailsComponent } from './list-product-details/list-product-details.component';
import { ListOngoingOrdersComponent } from './purchase-order/list-ongoing-orders/list-ongoing-orders.component';
import { StockTableListComponent } from 'src/app/utils/components/stock';

import { ListTransferOrderComponent } from './transfer-order/list-transfer-order/list-transfer-order.component';
import { ListWarehouseManufacturerFranchiseComponent } from 'src/app/utils/components/stock/warehouse-and-manufacturer-and-franchise/list-warehouse-manufacturer-franchise/list-warehouse-manufacturer-franchise.component';
import { CreateWarehouseManufacturerFranchiseComponent } from 'src/app/utils/components/stock/warehouse-and-manufacturer-and-franchise/create-warehouse-manufacturer-franchise/create-warehouse-manufacturer-franchise.component';
import { moduleNameKeys, roleAccessKeys } from 'src/app/utils';
import { AuthGuard } from 'src/app/utils/guard/auth.guard';
import { ListCreationPoSpareComponent } from './purchase-order/list-creation-po-spare/list-creation-po-spare.component';
import { ListCreationTransferSpareComponent } from './transfer-order/list-creation-transfer-spare/list-creation-transfer-spare.component';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      redirectTo: 'list-stocks',
      pathMatch: 'full'
    },
    {
      path: 'create-purchase-order/:id/:id',
      component: CreatePurchaseOrderComponent,
      canActivate: [AuthGuard],
      data: {
        moduleName: moduleNameKeys.purchaseOrder,
        crudAccessVal: roleAccessKeys.write
      }
    },
    {
      path: 'list-create-po-spare/:id',
      component: ListCreationPoSpareComponent,
      canActivate: [AuthGuard],
      data: {
        moduleName: moduleNameKeys.purchaseOrder,
        crudAccessVal: roleAccessKeys.write
      }
    },
    {
      path: 'create-transfer-order/:id/:id',
      component: CreateTransferOrderComponent,
      canActivate: [AuthGuard],
      data: {
        moduleName: moduleNameKeys.transportation,
        crudAccessVal: roleAccessKeys.write
      }
    },
    {
      path: 'list-create-transfer-spare/:id',
      component: ListCreationTransferSpareComponent,
      canActivate: [AuthGuard],
      data: {
        moduleName: moduleNameKeys.transportation,
        crudAccessVal: roleAccessKeys.write
      }
    },
    {
      path: 'order-history/:type',
      component: StockTableListComponent,
      canActivate: [AuthGuard],
      data: {
        moduleName: moduleNameKeys.purchaseOrder,
      }
    },
    {
      path: 'ongoing-order-transit/:type',
      component: StockTableListComponent,
      canActivate: [AuthGuard],
      data: {
        moduleName: moduleNameKeys.transportation,
      }
    },
    {
      path: 'ongoing-transit',
      component: ListTransferOrderComponent,
      canActivate: [AuthGuard],
      data: {
        moduleName: moduleNameKeys.transportation,
      }
    },
    {
      path: 'ongoing-orders',
      component: ListOngoingOrdersComponent,
      canActivate: [AuthGuard],
      data: {
        moduleName: moduleNameKeys.purchaseOrder,
      }
    },
    {
      path: '',
      redirectTo: 'list-stocks',
      pathMatch: 'full'
    },
    {
      path: 'list-stocks',
      component: ListStocksComponent,
      canActivate: [AuthGuard],
      data: {
        moduleName: moduleNameKeys.stocks,
      }
    },
    {
      path: 'product-details/:id',
      component: ListProductDetailsComponent,
      canActivate: [AuthGuard],
      data: {
        moduleName: moduleNameKeys.stocks,
      }
    },
    {
      path: 'manufacturer',
      children: [
        {
          path: 'list-manufacturer',
          component: ListWarehouseManufacturerFranchiseComponent,
          canActivate: [AuthGuard],
          data: {
            moduleName: moduleNameKeys.manufacturer,
          }
        },
        {
          path: 'create-manufacturer',
          component: CreateWarehouseManufacturerFranchiseComponent,
          canActivate: [AuthGuard],
          data: {
            moduleName: moduleNameKeys.manufacturer,
            crudAccessVal: roleAccessKeys.write
          }
        },
        {
          path: 'edit-manufacturer/:id',
          component: CreateWarehouseManufacturerFranchiseComponent,
          canActivate: [AuthGuard],
          data: {
            moduleName: moduleNameKeys.manufacturer,
            crudAccessVal: roleAccessKeys.edit
          }
        }
      ]
    },
    {
      path: 'franchise',
      children: [
        {
          path: 'list-franchise',
          component: ListWarehouseManufacturerFranchiseComponent,
          canActivate: [AuthGuard],
          data: {
            moduleName: moduleNameKeys.franchise,
          }
        },
        {
          path: 'create-franchise',
          component: CreateWarehouseManufacturerFranchiseComponent,
          canActivate: [AuthGuard],
          data: {
            moduleName: moduleNameKeys.franchise,
            crudAccessVal: roleAccessKeys.write
          }
        },
        {
          path: 'edit-franchise/:id',
          component: CreateWarehouseManufacturerFranchiseComponent,
          canActivate: [AuthGuard],
          data: {
            moduleName: moduleNameKeys.franchise,
            crudAccessVal: roleAccessKeys.edit
          }
        }
      ]
    }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
