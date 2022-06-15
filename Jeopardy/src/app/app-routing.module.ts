import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  {
    path: '',
    component: StartComponent
  },
  {
    path: 'team',
    component: TeamComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
