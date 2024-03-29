import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { TeamComponent } from './team/team.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard_components/leaderboard/leaderboard.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin_components/admin-login/admin.component';
import { StatusbarComponent } from './statusbar/statusbar.component';
import { SavedgamesComponent } from './savedgames/savedgames.component';
import { PlayersComponent } from './leaderboard_components/players/players.component';
import { AddAdminComponent } from './admin_components/add-admin/add-admin.component';
import { UpdateAdminComponent } from './admin_components/update-admin/update-admin.component';
import { DeleteAdminComponent } from './admin_components/delete-admin/delete-admin.component';
import { CreateCategoryComponent } from './create_components/create-category/create-category.component';
import { CreateSubcategoryComponent } from './create_components/create-subcategory/create-subcategory.component';
import { CreateQuestionComponent } from './create_components/create-question/create-question.component';
import { CreateMenuComponent } from './create_components/create-menu/create-menu.component';
import { UpdateMenuComponent } from './update_components/update-menu/update-menu.component';
import { UpdateCategoryComponent } from './update_components/update-category/update-category.component';
import { UpdateSubcategoryComponent } from './update_components/update-subcategory/update-subcategory.component';
import { UpdateQuestionComponent } from './update_components/update-question/update-question.component';
import { DeleteMenuComponent } from './delete_components/delete-menu/delete-menu.component';
import { DeleteCategoryComponent } from './delete_components/delete-category/delete-category.component';
import { DeleteSubcategoryComponent } from './delete_components/delete-subcategory/delete-subcategory.component';
import { DeleteQuestionComponent } from './delete_components/delete-question/delete-question.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    TeamComponent,
    NavBarComponent,
    HomeComponent,
    LeaderboardComponent,
    GameboardComponent,
    CategoryComponent,
    AdminComponent,
    StatusbarComponent,
    SavedgamesComponent,
    PlayersComponent,
    AddAdminComponent,
    UpdateAdminComponent,
    DeleteAdminComponent,
    CreateCategoryComponent,
    CreateSubcategoryComponent,
    CreateQuestionComponent,
    CreateMenuComponent,
    UpdateMenuComponent,
    UpdateCategoryComponent,
    UpdateSubcategoryComponent,
    UpdateQuestionComponent,
    DeleteMenuComponent,
    DeleteCategoryComponent,
    DeleteSubcategoryComponent,
    DeleteQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MdbModalModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
