import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { WarehouseRoutingModule } from './stock-routing.module';
import { ListStocksComponent } from './list-stocks/list-stocks.component';
import { CreatePurchaseOrderComponent } from './purchase-order/create-purchase-order/create-purchase-order.component';
import { ListOngoingOrdersComponent } from './purchase-order/list-ongoing-orders/list-ongoing-orders.component';
import { CreateTransferOrderComponent } from './transfer-order/create-transfer-order/create-transfer-order.component';
import { UtilsModule } from 'src/app/utils/utils.module';
import { ListProductDetailsComponent } from './list-product-details/list-product-details.component';
import { FormsModule } from '@angular/forms';
// plugins
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { HighchartsChartModule } from 'highcharts-angular';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ListTransferOrderComponent } from './transfer-order/list-transfer-order/list-transfer-order.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ListCreationPoSpareComponent } from './purchase-order/list-creation-po-spare/list-creation-po-spare.component';
import { ListCreationTransferSpareComponent } from './transfer-order/list-creation-transfer-spare/list-creation-transfer-spare.component';
import { DatePipe } from '@angular/common';
import { SocketService } from 'src/app/service/socket.service';
@NgModule({
  declarations: [ListStocksComponent, CreatePurchaseOrderComponent, ListOngoingOrdersComponent,
    CreateTransferOrderComponent, ListProductDetailsComponent, ListTransferOrderComponent, ListCreationPoSpareComponent, ListCreationTransferSpareComponent],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    UtilsModule,
    FormsModule,
    // plugins
    NgSelectModule,
    NgxPaginationModule,
    PerfectScrollbarModule,
    HighchartsChartModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    PdfViewerModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
  {provide: DatePipe},SocketService],
})
export class StockModule { }
