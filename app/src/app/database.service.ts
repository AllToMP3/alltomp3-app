import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
declare var electron: any;

@Injectable()
export class DatabaseService {

  // Paths
  public userPath: string;
  private savingPathP: Promise<any>;
  private helpDisplaynP: Promise<any>;

  constructor(private logger: LoggerService) {
    this.reloadSavingPath();
    this.reloadHelpDisplayed();
    this.userPath = electron.remote.app.getPath('home');
  }

  private reloadSavingPath() {
    this.savingPathP = this.findOne('config', { name: 'saving-path' });
  }
  private reloadHelpDisplayed() {
    this.helpDisplaynP = this.findOne('config', { name: 'help-displayedn' });
  }

  private dbQuery(action:string, data):Promise<any> {
    this.logger.log('[DB]', action, data);
    return new Promise((resolve, reject) => {
      let v = electron.ipcRenderer.sendSync('db.' + action, data);
      this.logger.log('[DB]', 'answer', v);
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

  public getHelpDisplayed():Promise<number> {
    return this.helpDisplaynP.then(p => p.value);
  }
  public setHelpDisplayed(value: number):Promise<any> {
    return this.update('config', { name: 'help-displayedn' }, { $set: { value: value } }).then(() => this.reloadHelpDisplayed());
  }

}
