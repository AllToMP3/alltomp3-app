import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class LoggerErrorService implements ErrorHandler {

  public errors:any[] = [];

  constructor() {
    console.log('[LoggerError] init');
  }

  handleError(error) {
    this.errors.push(error);
    console.error(error);
  }

}
