import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { TeamComponent } from './team/team.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { CreateComponent } from './create/create.component';
import { StatusbarComponent } from './statusbar/statusbar.component';

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
    CreateComponent,
    StatusbarComponent
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
