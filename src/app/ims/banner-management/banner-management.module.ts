import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerManagementRoutingModule } from './banner-management-routing.module';
import { ListBannersComponent } from './list-banners/list-banners.component';
import { CreateEditComponent } from './create-edit/create-edit.component';


import { NgxPaginationModule } from 'ngx-pagination';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
@NgModule({
  declarations: [ListBannersComponent, CreateEditComponent],
  imports: [
    CommonModule,
    BannerManagementRoutingModule,
    NgxPaginationModule,
    PerfectScrollbarModule
  ]
})
export class BannerManagementModule { }
