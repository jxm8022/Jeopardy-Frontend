import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { StartComponent } from './start/start.component';
import { TeamComponent } from './team/team.component';

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
    path: 'home/admin',
    component: AdminComponent
  },
  {
    path: 'home/create/:type',
    component: CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
