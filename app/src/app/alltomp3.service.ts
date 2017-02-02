import { Injectable } from '@angular/core';
declare var electron: any;

@Injectable()
export class Alltomp3Service {

  constructor() { }

  private query(action:string, data):Promise<any> {
    console.log('[AT3]', action, data);
    return new Promise((resolve, reject) => {
      let v = electron.ipcRenderer.sendSync('at3.' + action, data);
      console.log('[AT3]', 'answer', v);
      resolve(v);
    });
  }

  public suggestions(q: string):Promise<any> {
    return this.query('suggestions', q);
  }

}
