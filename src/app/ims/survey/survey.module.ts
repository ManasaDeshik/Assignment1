import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { SurveyRoutingModule } from './survey-routing.module';
import { ListSurveyComponent } from './list-survey/list-survey/list-survey.component';
import { MatTabsModule } from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxPaginationModule } from 'ngx-pagination';
import { SurveymanagementComponent } from './surveymanagement/surveymanagement.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { SurveyMainComponent } from './survey-main/survey-main.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { SurveyMainDetailComponent } from './survey-main-detail/survey-main-detail.component';
import { SideMenuComponent } from './side-menu/side-menu/side-menu.component';
import { ConfirmationComponent } from './confirmation/confirmation/confirmation.component';
import { SurveyManagementDetailComponent } from './survey-management-detail/survey-management-detail.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BuilderComponent } from './builder/builder.component';
import { SurveyFormBuilderComponent } from './fm-survey/survey-form-builder/survey-form-builder.component';
import { SurveyFormItemComponent } from './fm-survey/survey-form-item/survey-form-item.component';
import { FormItemTextComponent } from './fm-survey/survey-form-item/form-item-text/form-item-text.component';
import { FmSurveyComponent } from './fm-survey/fm-survey.component';
import { FormItemDirective } from './fm-survey/survey-form-item/form-item.directive';
import { DialogFieldEditComponent } from './fm-survey/dialog-field-edit/dialog-field-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';

import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {
  MatTableModule
} from '@angular/material/table';
import { ActionsDialogComponent } from './actions-dialog/actions-dialog.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { FormItemRadioComponent } from './fm-survey/survey-form-item/form-item-radio/form-item-radio.component';
import { DialogRadioComponent } from './fm-survey/dialog-radio/dialog-radio.component';
import { FormItemImageComponent } from './fm-survey/survey-form-item/form-item-image/form-item-image.component';
import { FormItemFileuploadComponent } from './fm-survey/survey-form-item/form-item-fileupload/form-item-fileupload/form-item-fileupload.component';
import {MatSliderModule} from '@angular/material/slider';
import { FormItemVideoComponent } from './fm-survey/survey-form-item/form-item-video/form-item-video/form-item-video.component';
import { FormItemImageuploadComponent } from './fm-survey/survey-form-item/form-item-imageupload/form-item-imageupload.component';
import { FormItemRatingComponent } from './fm-survey/survey-form-item/form-item-rating/form-item-rating.component';
import { FormItemAudioComponent } from './fm-survey/survey-form-item/form-item-audio/form-item-audio.component';
import { FormItemMatrixComponent } from './fm-survey/survey-form-item/form-item-matrix/form-item-matrix.component';
import { DialogEditMatrixComponent } from './fm-survey/dialog-edit-matrix/dialog-edit-matrix.component';
import { FormItemImagechoiceComponent } from './fm-survey/survey-form-item/form-item-imagechoice/form-item-imagechoice.component';
import { DialogEditImagechoiceComponent } from './fm-survey/dialog-edit-imagechoice/dialog-edit-imagechoice.component';
import { SurveyViewDetailComponent } from './survey-view-detail/survey-view-detail/survey-view-detail.component';
import { RulesComponent } from './rules/rules.component';
import { AutosizeModule } from 'ngx-autosize';
import { FormItemInputComponent } from './fm-survey/survey-form-item/form-item-input/form-item-input.component';
@NgModule({
  declarations: [
    SurveyFormBuilderComponent,
    SurveyFormItemComponent,
    FormItemTextComponent,
    FmSurveyComponent,
    FormItemDirective,
    DialogFieldEditComponent,
    ListSurveyComponent, SurveymanagementComponent,BuilderComponent,CreateSurveyComponent, SurveyMainComponent, SurveyMainDetailComponent, SideMenuComponent, ConfirmationComponent, SurveyManagementDetailComponent, ActionsDialogComponent, FormItemRadioComponent, DialogRadioComponent, FormItemImageComponent, FormItemFileuploadComponent, FormItemImageuploadComponent,FormItemVideoComponent,FormItemRatingComponent, FormItemAudioComponent, FormItemMatrixComponent, DialogEditMatrixComponent, FormItemImagechoiceComponent, DialogEditImagechoiceComponent, SurveyViewDetailComponent,RulesComponent, FormItemInputComponent],
  imports: [
   // FmSurveyModule,
    SurveyRoutingModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatDatepickerModule,
    PerfectScrollbarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    NgSelectModule,
    MatSidenavModule,
    MatCardModule,
    MatSelectModule,
    MatSliderModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    DragDropModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatChipsModule,
    NgxPaginationModule,
    NgxMaterialTimepickerModule,
    AutosizeModule
  ]
})
export class SurveyModule { }
