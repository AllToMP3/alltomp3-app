import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class LoggerService {

  public logs:any[] = [];

  constructor() {
    console.log('[Logger] init');
  }

  public log(...args : any[]) {
    this.logs.push(args);
    console.log(args);
  }

}
