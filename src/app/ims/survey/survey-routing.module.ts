import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSurveyComponent } from './list-survey/list-survey/list-survey.component';
import { AuthGuard } from 'src/app/utils/guard/auth.guard';
import { moduleNameKeys, roleAccessKeys } from 'src/app/utils';
import { SurveymanagementComponent } from './surveymanagement/surveymanagement.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';

import { SurveyMainComponent } from './survey-main/survey-main.component';
import { SideMenuComponent } from './side-menu/side-menu/side-menu.component';
import { ConfirmationComponent } from './confirmation/confirmation/confirmation.component';
import { SurveyViewDetailComponent } from './survey-view-detail/survey-view-detail/survey-view-detail.component';

const routes: Routes = [
  
  {
    path: '',
    component: SurveyMainComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.survey
    }
  },
  {
    path: 'surveymain',
    component: SurveyMainComponent,
   // canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.survey
    }
  },
  {
    path: 'survey-menu/create-survey',
    component: SideMenuComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.survey
    }
  },
  {
    path: 'survey-menu/edit-survey/:id',
    component: SideMenuComponent,
    //canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.survey
    }
  }, // survey/survey-menu/view-survey

  {
    path: 'survey-menu/view-survey/:id',
    component: SideMenuComponent,
    //canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.survey
    }
  },
  
  {
    path: 'list-survey',
    component: ListSurveyComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.survey
    }
  },
  {
    path: 'survey-manage/:id',
    component: SurveymanagementComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.survey
    }
  },
  {
    path: 'survey-manage/view/:id',
    component: SurveyViewDetailComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.survey
    }
  },
  {
    path: 'create-survey',
    component: CreateSurveyComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.survey
    }
  },
  {
    path: 'confirm-survey',
    component: ConfirmationComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.survey
    }
  },
  {
    path: 'home-survey',
    component: SurveyMainComponent,
    canActivate: [AuthGuard],
    data: {
      moduleName: moduleNameKeys.survey
    }
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
