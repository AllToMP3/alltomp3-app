import { Component, OnInit, Input } from '@angular/core';
import { Alltomp3Service } from '../alltomp3.service';
import * as _ from 'lodash';
declare var electron: any;

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  coverOver:boolean = false; // if the cursor is over the cover or not
  subOpened:boolean = false; // if the subrequests are opened or not

  @Input()
  request: any;

  @Input()
  abortable: boolean = true;

  constructor(private alltomp3: Alltomp3Service) {
  }

  public abort() {
    if (!this.abortable) {
      return;
    }
    this.abortr(this.request);
  }

  public abortr(request: any) {
    this.alltomp3.abort(request.id);
    request.aborted = true;
  }

  public coverMouseEnter() {
    this.coverOver = true;
  }
  public coverMouseLeave() {
    this.coverOver = false;
  }

  public clickRequest() {
    if (!this.request.playlist) {
      this.openFile();
    }
  }

  public openFile() {
    if (this.request.finished) {
      electron.shell.openItem(this.request.file);
    }
  }

  public clickable():boolean {
    return this.request.finished && !this.request.playlist;
  }

  public openable():boolean {
    return this.request.playlist && this.request.finished;
  }

  public open(event:any) {
    event.stopPropagation();
    let openNext = (i) => {
      if (i < 0) {
        return;
      }
      let r = this.request.subrequests[i];
      electron.shell.openItem(r.file);
      setTimeout(() => { openNext(i - 1); }, 100);
    };
    if (this.openable()) {
      openNext(this.request.subrequests.length - 1);
    }
  }

  public px() {
    return Math.cos(Math.min(this.request.progress, 99.5)/100*2*Math.PI - Math.PI/2)*40 + 42;
  }

  public py() {
    return Math.sin(Math.min(this.request.progress, 99.5)/100*2*Math.PI - Math.PI/2)*40 + 42;
  }

  public pz():string {
    if (this.request.progress > 50) {
      return '1';
    }
    return '0';
  }

  ngOnInit() {
  }

}
