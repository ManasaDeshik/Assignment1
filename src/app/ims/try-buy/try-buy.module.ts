import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TryBuyRoutingModule } from './try-buy-routing.module';
import { ListOfTryBuyComponent } from './list-of-try-buy/list-of-try-buy.component';
import { FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { EditTryBuyComponent } from './edit-try-buy/edit-try-buy.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
@NgModule({
  declarations: [ListOfTryBuyComponent, EditTryBuyComponent],
  imports: [
    CommonModule,
    TryBuyRoutingModule,
    FormsModule,

    NgxPaginationModule,
    NgSelectModule,
    PerfectScrollbarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class TryBuyModule { }
