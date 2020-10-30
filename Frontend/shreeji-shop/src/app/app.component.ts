import { Component } from '@angular/core';
import { CommonService } from './services/common/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shreeji-shop';

  constructor(private common: CommonService) {
    this.common.setTagline("Own your latest one");
  }
}
