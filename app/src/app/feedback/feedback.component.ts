import { Component, OnInit } from '@angular/core';
declare var electron: any;
import { Alltomp3Service } from '../alltomp3.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private alltomp3: Alltomp3Service) {

  }

  public wantFeedback() {
    // pass information?
    let debugInfos = {
      requests: this.alltomp3.requests
    };
    electron.ipcRenderer.send('feedback.launch', debugInfos);
  }

  ngOnInit() {
  }

}
