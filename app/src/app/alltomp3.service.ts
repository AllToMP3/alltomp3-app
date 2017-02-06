import { Injectable, ApplicationRef } from '@angular/core';
import { DatabaseService } from './database.service';
import * as _ from 'lodash';
declare var electron: any;

@Injectable()
export class Alltomp3Service {

  public requests:any[] = []; //[TODO]: create a TS object

  constructor(private db: DatabaseService, private appRef: ApplicationRef) {
    electron.ipcRenderer.on('at3.event', (event, arg) => {
      this.eventReceived(event, arg);
    });
  }

  private randomString(length:number):string {
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  private trailingZeros(n:number, size:number = 2):string {
    let out = '' + n;
    let nb = size - out.length;
    for (let i = 0; i < nb; i++) {
      out = '0' + out;
    }
    return out;
  }
  private formatDuration(duration:number):string {
    let out = '';
    if (duration > 3600) {
      out = this.trailingZeros(Math.floor(duration/3600)) + ':';
    }
    out += this.trailingZeros(Math.floor((duration%3600)/60)) + ':';
    out += this.trailingZeros(duration%60);
    return out;
  }

  private query(action:string, data):Promise<any> {
    console.log('[AT3]', action, data);
    return new Promise((resolve, reject) => {
      let v = electron.ipcRenderer.sendSync('at3.' + action, data);
      console.log('[AT3]', 'answer', v);
      resolve(v);
    });
  }

  private eventReceived(event, data) {
    console.log('[AT3]', 'eventReceived', data);
    if (data.id) {
      let type = data.name;
      let r = _.find(this.requests, {id: data.id});
      if (type == 'download') {
        r.progress = Math.floor(parseFloat(data.data.progress)/2);
      } else if (type == 'convert') {
        r.progress = Math.floor(50 + parseFloat(data.data.progress)/2);
      } else if (type == 'convert-end') {
        r.progress = 100;
      } else if (type == 'infos') {
        let infos = data.data;
        r.title = infos.title;
        r.artistName = infos.artistName;
        r.cover = infos.cover;
        if (_.isNumber(infos.duration)) {
          r.length = this.formatDuration(infos.duration);
        }
      } else if (type == 'end') {
        r.finished = true;
        r.file = data.data.file;
      }
    }

    this.appRef.tick();
  }

  public abort(id: string) {
    electron.ipcRenderer.send('at3.abort.' + id);
  }

  public suggestions(q: string):Promise<any> {
    return this.query('suggestions', q);
  }

  public downloadTrack(track: any):string {
    let id = this.randomString(10);
    this.requests.unshift({
      track: track,
      id: id,
      status: 'launched',
      title: track.title,
      artistName: track.artistName,
      cover: track.cover,
      progress: 0
    });
    this.db.getSavingPath().then(p => {
      electron.ipcRenderer.send('at3.downloadTrack', {
        track: track,
        folder: p + '/',
        id: id
      });
    });
    return id;
  }

  public downloadSingleURL(url: string):string {
    let id = this.randomString(10);
    this.requests.unshift({
      query: url,
      id: id,
      status: 'launched',
      title: url,
      progress: 0
    });
    this.db.getSavingPath().then(p => {
      electron.ipcRenderer.send('at3.downloadSingleURL', {
        url: url,
        folder: p + '/',
        id: id
      });
    });
    return id;
  }

}
