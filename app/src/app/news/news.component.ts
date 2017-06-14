import { Component, ApplicationRef } from '@angular/core';
declare var electron: any;

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {

  releaseNotes:any[] = [];
  news:any[] = [];

  constructor(private appRef: ApplicationRef) {
    electron.ipcRenderer.on('releasenotes', (event, arg) => {
      this.releaseNotes = this.fa(arg, ['notes']);
      if (this.releaseNotes.length > 0) {
        this.appRef.tick();
      }
    });
    electron.ipcRenderer.on('news', (event, arg) => {
      this.news = this.fa(arg, ['title', 'content']);
      if (this.news.length > 0) {
        this.appRef.tick();
      }
    });
    electron.ipcRenderer.send('app.ready');
    setInterval(() => {
      if (this.news.length > 0 || this.releaseNotes.length > 0) {
        this.news = [];
        this.releaseNotes = [];
        this.appRef.tick();
      }
    }, 30000);
  }

  private fa(a:any[], props:any[]) {
    return a.map(aa => {
      props.forEach(prop => {
        aa[prop] = this.fl(aa[prop]);
      });
      return aa;
    });
  }

  // filter an object according to the language
  private fl(o) {
    return o[navigator.language] || o['en'];
  }

}
