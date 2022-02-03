import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import {
  NotFoundComponent, HttpService, SideNavService, ErrorService
} from './index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { DateInfoDashboardComponent, StockTableListComponent, StockProductInfoComponent, AddSpareComponent } from './components';
import { ListBranchesComponent } from './components/list-branches/list-branches.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { PackageRequestPopUpComponent } from './components/package-request-pop-up/package-request-pop-up.component';
import { ViewPoComponent } from './components/view-po/view-po.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BarcodeComponent } from './components/stock/barcode/barcode.component';
import { CreateWarehouseManufacturerFranchiseComponent } from './components/stock/warehouse-and-manufacturer-and-franchise/create-warehouse-manufacturer-franchise/create-warehouse-manufacturer-franchise.component';
import { ListWarehouseManufacturerFranchiseComponent } from './components/stock/warehouse-and-manufacturer-and-franchise/list-warehouse-manufacturer-franchise/list-warehouse-manufacturer-franchise.component';
import { FilterDialogComponent } from './components/filter-dialog/filter-dialog.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TransferSpareShareComponent } from './components/transfer-spare-share/transfer-spare-share.component';
import { ServiceActionDialogComponent } from './components/service-action-dialog/service-action-dialog.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { ViewProductsDialogComponent } from './components/view-products-dialog/view-products-dialog.component';
import { SequenceDialogComponent } from './components/sequence-dialog/sequence-dialog.component';
import {MatChipsModule} from '@angular/material/chips';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [NotFoundComponent, ConfirmationDialogComponent, DateInfoDashboardComponent, ListBranchesComponent, StockTableListComponent,
    StockProductInfoComponent, PackageRequestPopUpComponent, CreateWarehouseManufacturerFranchiseComponent, ListWarehouseManufacturerFranchiseComponent,
    ViewPoComponent, BarcodeComponent, FilterDialogComponent, AddSpareComponent, TransferSpareShareComponent, ServiceActionDialogComponent,
    ViewOrdersComponent, AddOrderComponent, AddOrderComponent, ViewProductsDialogComponent, SequenceDialogComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatSnackBarModule,
    FormsModule,
    MatRadioModule,
    NgSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    NgxPaginationModule,
    PerfectScrollbarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule,
    PdfViewerModule,
    MatTooltipModule,
    MatChipsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [
    HttpService,
    ErrorService,
    SideNavService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports: [DateInfoDashboardComponent, ListBranchesComponent, StockTableListComponent, StockProductInfoComponent,
    BarcodeComponent, ViewOrdersComponent, ViewProductsDialogComponent, AddOrderComponent, SequenceDialogComponent],
  entryComponents: [ConfirmationDialogComponent, PackageRequestPopUpComponent, ViewPoComponent, FilterDialogComponent,
    AddSpareComponent, TransferSpareShareComponent, ServiceActionDialogComponent, AddOrderComponent, ViewProductsDialogComponent, SequenceDialogComponent]

})
export class UtilsModule { }
