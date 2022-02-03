import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// Created Modules
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UtilsModule } from './utils/utils.module';
import { AppCommonModule } from './ims/app-common/app-common.module';
import { NgxSpinnerModule } from "ngx-spinner";

// Packages
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HttpInterceptorService } from './utils/interceptors/httpconfig.interceptor';
import { LoaderService } from './utils/services/loader-service/loader.service';
import { GlobalErrorHandler } from './utils/services/globalErrorHandler/global-error-handler.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    UtilsModule,
    HttpClientModule,
    AppCommonModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    FormsModule,
    NgxWebstorageModule.forRoot(),
    NgxSpinnerModule,
    InfiniteScrollModule
    // Ng4LoadingSpinnerModule.forRoot()
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    //{provide: ErrorHandler, useClass: GlobalErrorHandler}
    // { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
