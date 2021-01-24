import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserActionComponent } from './user-action.component';

const routes: Routes = [
  {
    path: ':action', component: UserActionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserActionRoutingModule { }
