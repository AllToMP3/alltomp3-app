import { Component, OnInit, ApplicationRef } from '@angular/core';
import { DatabaseService } from '../database.service';
declare var electron: any;

@Component({
  selector: 'saving-path',
  templateUrl: './saving-path.component.html',
  styleUrls: ['./saving-path.component.css']
})
export class SavingPathComponent implements OnInit {

  path: string;
  completePath: string;

  constructor(private appRef: ApplicationRef, private db: DatabaseService) {
    this.updatePath();
  }

  public openPath() {
    electron.shell.openExternal('file://' + this.completePath + '/');
  }

  public updatePath() {
    this.db.getSavingPath().then(path => {
      this.completePath = path;
      this.path = path.replace(this.db.userPath, '~');
      this.appRef.tick();
    });
  }

  public changePath() {
    electron.remote.dialog.showOpenDialog({
      title: "Select the folder to download the songs",
      defaultPath: this.completePath,
      properties: ['openDirectory', 'createDirectory']
    }, paths => {
      if (paths && paths.length == 1) {
        this.db.setSavingPath(paths[0]).then(() => this.updatePath());
      }
    });
  }

  ngOnInit() {
  }

}
