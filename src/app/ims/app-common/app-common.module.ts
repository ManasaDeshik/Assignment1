import { NgModule, NO_ERRORS_SCHEMA , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { AppCommonRoutingModule } from './app-common-routing.module';

// module imported from angular materials
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CountdownModule } from 'ngx-countdown';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from 'src/app/utils/utils.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MatSliderModule } from '@angular/material/slider';
import { SocketService } from 'src/app/service/socket.service';


@NgModule({
  declarations: [FooterComponent, HeaderComponent, SidebarComponent, LayoutComponent, LoginComponent, BreadcrumbComponent],
  imports: [
    CommonModule,
    AppCommonRoutingModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatExpansionModule,
    RouterModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    CountdownModule,
    UtilsModule,
    MatSliderModule
  ],
  schemas: [NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
    ],
  exports: [LayoutComponent, HeaderComponent, SidebarComponent, FooterComponent, BreadcrumbComponent],
  providers : [    SocketService,
  ]
})
export class AppCommonModule { }
