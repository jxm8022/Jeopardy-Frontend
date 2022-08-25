import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdminComponent } from './admin_components/add-admin/add-admin.component';
import { AdminComponent } from './admin_components/admin-login/admin.component';
import { DeleteAdminComponent } from './admin_components/delete-admin/delete-admin.component';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard_components/leaderboard/leaderboard.component';
import { StartComponent } from './start/start.component';
import { TeamComponent } from './team/team.component';
import { UpdateAdminComponent } from './admin_components/update-admin/update-admin.component';
import { CreateMenuComponent } from './create_components/create-menu/create-menu.component';
import { CreateCategoryComponent } from './create_components/create-category/create-category.component';
import { CreateSubcategoryComponent } from './create_components/create-subcategory/create-subcategory.component';
import { CreateQuestionComponent } from './create_components/create-question/create-question.component';

const routes: Routes = [
  {
    path: '',
    component: StartComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home/leaderboard',
    component: LeaderboardComponent
  },
  {
    path: 'home/game',
    component: TeamComponent
  },
  {
    path: 'home/admin/login',
    component: AdminComponent
  },
  {
    path: 'home/admin/settings',
    component: AdminComponent
  },
  {
    path: 'home/admin/settings/add',
    component: AddAdminComponent
  },
  {
    path: 'home/admin/settings/update',
    component: UpdateAdminComponent
  },
  {
    path: 'home/admin/settings/delete',
    component: DeleteAdminComponent
  },
  {
    path: 'home/create',
    component: CreateMenuComponent
  },
  {
    path: 'home/create/category',
    component: CreateCategoryComponent
  },
  {
    path: 'home/create/subcategory',
    component: CreateSubcategoryComponent
  },
  {
    path: 'home/create/question',
    component: CreateQuestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
