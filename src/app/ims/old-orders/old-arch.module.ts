import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OldArchRoutingModule } from './old-arch-routing.module';
import { OldArchComponent } from './old-arch.component';

import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  declarations: [OldArchComponent],
  imports: [
    CommonModule,
    OldArchRoutingModule,
    MatTabsModule
  ]
})
export class OldArchModule { }
