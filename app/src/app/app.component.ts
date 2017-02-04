import { Component } from '@angular/core';
import * as _ from 'lodash';
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
  lastQuery:string;
  lastResult:any;
  queryi:string;
  requests:any[];

  constructor(private alltomp3: Alltomp3Service) {
    this.requests = alltomp3.requests;
  }

  private init() {
    this.lastQuery = '';
    this.lastResult = undefined;
    this.legend = false;
    this.unsupported = false;
    this.queryi = '';
  }

  public search(event:any) {
    this.processQueryDebounce(event.target.value);
  }

  public execute(event:any) {
    event.preventDefault();
    if (this.lastResult && this.lastResult.type == 'single-url') {
      this.alltomp3.downloadSingleURL(this.lastQuery);
      this.init();
    }
  }

  private processQuery(v) {
    if (this.lastQuery == v) {
      return;
    }
    if (v) {
      console.log("Search for", v);
      this.alltomp3.suggestions(v).then(s => {
        this.unsupported = s.type == 'not-supported';
        this.legend = s.type != 'text';
        this.lastResult = s;
      });
    } else {
      this.unsupported = false;
      this.legend = false;
    }
    this.lastQuery = v;
  }
}
