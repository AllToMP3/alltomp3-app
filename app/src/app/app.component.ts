import { Component } from '@angular/core';
import * as _ from "lodash";
import { Alltomp3Service } from './alltomp3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  processQueryDebounce = _.debounce(this.processQuery, 300);
  legend:boolean = false;
  unsupported:boolean = false;

  constructor(private alltomp3: Alltomp3Service) {

  }

  public search(event:any) {
    this.processQueryDebounce(event.target.value);
  }

  private processQuery(v) {
    if (v) {
      console.log("Search for", v);
      this.alltomp3.suggestions(v).then(s => {
        this.unsupported = s.type == 'not-supported';
        this.legend = s.type != 'text';
      });
    } else {
      this.unsupported = false;
      this.legend = false;
    }
  }
}
