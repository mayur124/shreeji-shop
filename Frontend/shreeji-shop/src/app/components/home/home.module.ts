import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { LoginComponent } from "../auth/login/login.component";

@NgModule({
  declarations: [PaginationComponent, LoginComponent],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
