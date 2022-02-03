import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { OrderManagementRoutingModule } from './order-management-routing.module';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ComboScanPackageComponent } from './combo-scan-package/combo-scan-package.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [OrdersComponent, ComboScanPackageComponent],
  imports: [
    CommonModule,
    OrderManagementRoutingModule,
    PerfectScrollbarModule,
    NgxPaginationModule,
    MatTabsModule,
    FormsModule,
    NgSelectModule,
    PdfViewerModule,
    MatExpansionModule,
    MatTooltipModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  
})
export class OrderManagementModule { }
