import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoProductManagementRoutingModule } from './demo-product-management-routing.module';
import { ListDemoProductComponent } from './list-demo-product/list-demo-product.component';
import { AddDemoProductComponent } from './add-demo-product/add-demo-product.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ListDemoProductComponent, AddDemoProductComponent],
  imports: [
    CommonModule,
    DemoProductManagementRoutingModule,
    FormsModule,
    NgSelectModule,
    PerfectScrollbarModule,
    NgxPaginationModule
  ]
})
export class DemoProductManagementModule { }
