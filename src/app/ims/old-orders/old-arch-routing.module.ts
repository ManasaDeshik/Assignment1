import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/utils/guard/auth.guard';
import { OldArchComponent } from './old-arch.component';
import { moduleNameKeys, roleAccessKeys } from 'src/app/utils';


const routes: Routes = [{
  path: '',
  component: OldArchComponent,
  canActivate: [AuthGuard],
  data: {
    moduleName: moduleNameKeys.old
  }
  }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OldArchRoutingModule { }
