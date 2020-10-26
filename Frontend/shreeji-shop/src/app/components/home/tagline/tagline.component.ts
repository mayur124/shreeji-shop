import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tagline',
  templateUrl: './tagline.component.html',
  styleUrls: ['./tagline.component.scss']
})
export class TaglineComponent implements OnInit {

  tagline: string = "Own your latest one"

  constructor() { }

  ngOnInit(): void {
  }

}
