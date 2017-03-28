import { Component, OnInit, ErrorHandler, Injector } from '@angular/core';
import { LoggerService } from '../logger.service';
import { Alltomp3Service } from '../alltomp3.service';

declare var electron: any;

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  loggerError = this.injector.get(ErrorHandler);
  updateAvailable:boolean = false;

  constructor(private alltomp3: Alltomp3Service, private logger: LoggerService, private injector: Injector) {
    electron.ipcRenderer.on('update.downloaded', () => {
      this.updateAvailable = true;
    });
  }

  public wantFeedback() {
    // pass information?
    let debugInfos = {
      requests: this.alltomp3.requests,
      logs: this.logger.logs,
      errors: this.loggerError.errors
    };
    electron.ipcRenderer.send('feedback.launch', debugInfos);
  }

  public installUpdate() {
    electron.ipcRenderer.send('update.install');
  }

  ngOnInit() {
  }

}
