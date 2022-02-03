import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOfTryBuyComponent } from './list-of-try-buy/list-of-try-buy.component';
import { AuthGuard } from 'src/app/utils/guard/auth.guard';
import { EditTryBuyComponent } from './edit-try-buy/edit-try-buy.component';
import { moduleNameKeys, roleAccessKeys } from 'src/app/utils';

const routes: Routes = [
  {
    path: '',
    component: ListOfTryBuyComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.tryAndBuy
    }
  },
  {
    path: 'view/:id',
    component: EditTryBuyComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.tryAndBuy,
      crudAccessVal: roleAccessKeys.edit
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TryBuyRoutingModule { }
