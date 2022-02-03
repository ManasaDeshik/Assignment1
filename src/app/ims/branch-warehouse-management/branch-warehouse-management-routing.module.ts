import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/utils/guard/auth.guard';
import { CreateWarehouseManufacturerFranchiseComponent } from 'src/app/utils/components/stock/warehouse-and-manufacturer-and-franchise/create-warehouse-manufacturer-franchise/create-warehouse-manufacturer-franchise.component';
import { ListWarehouseManufacturerFranchiseComponent } from 'src/app/utils/components/stock/warehouse-and-manufacturer-and-franchise/list-warehouse-manufacturer-franchise/list-warehouse-manufacturer-franchise.component';
import { moduleNameKeys, roleAccessKeys } from 'src/app/utils';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'list-warehouse',
        pathMatch: 'full'
      },
      {
        path: 'list-warehouse',
        component: ListWarehouseManufacturerFranchiseComponent,
        canActivate: [AuthGuard],
        data: {
          moduleName: moduleNameKeys.warehouse,
        }
      },
      {
        path: 'create-warehouse',
        component: CreateWarehouseManufacturerFranchiseComponent,
        canActivate: [AuthGuard],
        data: {
          moduleName: moduleNameKeys.warehouse,
          crudAccessVal: roleAccessKeys.write,
        }
      },
      {
        path: 'edit-warehouse/:id',
        component: CreateWarehouseManufacturerFranchiseComponent,
        canActivate: [AuthGuard],
        data: {
          moduleName: moduleNameKeys.warehouse,
          crudAccessVal: roleAccessKeys.edit,
        }
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchWarehouseManagementRoutingModule { }
