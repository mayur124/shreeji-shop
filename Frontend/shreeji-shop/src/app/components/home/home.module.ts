import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { TaglineComponent } from './tagline/tagline.component';

@NgModule({
  declarations: [PaginationComponent, TaglineComponent],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
