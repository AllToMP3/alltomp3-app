import { Component, OnInit, Input } from '@angular/core';
import { Alltomp3Service } from '../alltomp3.service';
declare var electron: any;

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  coverOver:boolean = false; // if the cursor is over the cover or not
  subOpened:boolean = true; // if the subrequests are opened or not

  @Input()
  request: any;

  constructor(private alltomp3: Alltomp3Service) {
  }

  public abort() {
    this.alltomp3.abort(this.request.id);
    this.request.aborted = true;
  }

  public coverMouseEnter() {
    this.coverOver = true;
  }
  public coverMouseLeave() {
    this.coverOver = false;
  }

  public clickRequest() {
    if (this.request.playlist) {
      this.subOpened = !this.subOpened;
    } else {
      this.openFile();
    }
  }

  public openFile() {
    if (this.request.finished) {
      electron.shell.openItem(this.request.file);
    }
  }

  public clickable():boolean {
    return this.request.playlist || this.request.finished;
  }

  ngOnInit() {
  }

}
