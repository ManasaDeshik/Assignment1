import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { CreateUsersComponent } from './users/create-users/create-users.component';
import { ListRolesComponent } from './roles/list-roles/list-roles.component';
import { CreateRolesComponent } from './roles/create-roles/create-roles.component';
import { AuthGuard } from 'src/app/utils/guard/auth.guard';
import { moduleNameKeys, roleAccessKeys } from 'src/app/utils';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'users',
      component: UserManagementComponent,
      children: [
        {
          path: 'list-users',
          component: ListUsersComponent,
          canActivate: [AuthGuard],
          data: {
            moduleName: moduleNameKeys.user,
          }
        },
        {
          path: 'create-user',
          component: CreateUsersComponent,
          canActivate: [AuthGuard],
          data: {
            moduleName: moduleNameKeys.user,
            crudAccessVal: roleAccessKeys.write
          }
        },
        {
          path: 'edit-user/:id',
          component: CreateUsersComponent,
          canActivate: [AuthGuard],
          data: {
            moduleName: moduleNameKeys.user,
            crudAccessVal: roleAccessKeys.edit
          }
        },
        {
          path: '',
          redirectTo: 'list-users',
          pathMatch: 'full'
        }
      ]
    },
    {
      path: 'roles',
      component: UserManagementComponent,
      children: [
        {
          path: 'list-roles',
          component: ListRolesComponent,
          canActivate: [AuthGuard],
          data: {
            moduleName: moduleNameKeys.role,
          }
        },
        {
          path: 'create-role',
          component: CreateRolesComponent,
          canActivate: [AuthGuard],
          data: {
            moduleName: moduleNameKeys.role,
            crudAccessVal: roleAccessKeys.write
          }
        },
        {
          path: 'edit-role/:id',
          component: CreateRolesComponent,
          canActivate: [AuthGuard],
          data: {
            moduleName: moduleNameKeys.role,
            crudAccessVal: roleAccessKeys.edit
          }
        }
      ]
    },
    {
      path: '',
      redirectTo: 'users',
      pathMatch: 'full'
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
