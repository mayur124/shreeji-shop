import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { UserActionComponent } from './user-action.component';

const routes: Routes = [
  {
    path: ':action', component: UserActionComponent,
    children: [
      { path: 'authenticate', component: AuthComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserActionRoutingModule { }
