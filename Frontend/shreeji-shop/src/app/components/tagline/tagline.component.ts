import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-tagline',
  templateUrl: './tagline.component.html',
  styleUrls: ['./tagline.component.scss']
})
export class TaglineComponent implements OnInit {

  tagline: string = "Own your latest one";

  constructor(private common: CommonService) { }

  ngOnInit(): void {
    this.common.getTagLine().subscribe(
      response => {
        this.tagline = response;
      },
      error => {
        console.log("Error in tagline watcher > ", error);
      });
  }

}
