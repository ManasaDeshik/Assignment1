import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { moduleNameKeys } from 'src/app/utils/enums/shared-const';
import { AuthGuard } from 'src/app/utils/guard/auth.guard';
import { HelpComponent } from './help/help.component';

const routes: Routes = [
  {
    path: '',
    component: HelpComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.help,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
