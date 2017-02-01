import { Injectable } from '@angular/core';
declare var electron: any;

@Injectable()
export class DatabaseService {

  // Paths
  public userPath: string;
  private savingPathP: Promise<any>;

  constructor() {
    this.reloadSavingPath();
    this.userPath = electron.remote.app.getPath('home');
  }

  private reloadSavingPath() {
    this.savingPathP = this.findOne('config', { name: 'saving-path' });
  }

  private dbQuery(action:string, data):Promise<any> {
    console.log('[DB]', action, data);
    return new Promise((resolve, reject) => {
      let v = electron.ipcRenderer.sendSync('db.' + action, data);
      console.log('[DB]', 'answer', v);
      resolve(v);
    });
  }

  private findOne(db:string, query):Promise<any> {
    return this.dbQuery('findOne', {
      db: db,
      query: query
    });
  }

  private update(db:string, query, update):Promise<number> {
    return this.dbQuery('update', {
      db: db,
      query: query,
      update: update
    });
  }

  public getSavingPath():Promise<string> {
    return this.savingPathP.then(p => p.value);
  }

  public setSavingPath(path: string):Promise<any> {
    return this.update('config', { name: 'saving-path' }, { $set: { value: path } }).then(() => this.reloadSavingPath());
  }

}
