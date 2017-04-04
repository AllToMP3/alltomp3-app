import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DatabaseService } from './database.service';
import { Alltomp3Service } from './alltomp3.service';
import { LoggerService } from './logger.service';
import { LoggerErrorService } from './loggererror.service';
import { TransService } from './trans.service';

import { AppComponent } from './app.component';
import { SavingPathComponent } from './saving-path/saving-path.component';
import { RequestComponent } from './request/request.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    SavingPathComponent,
    RequestComponent,
    SuggestionComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DatabaseService, Alltomp3Service, TransService, LoggerService, {provide: ErrorHandler, useClass: LoggerErrorService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
