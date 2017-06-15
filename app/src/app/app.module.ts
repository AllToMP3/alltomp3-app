import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DatabaseService } from './database.service';
import { Alltomp3Service } from './alltomp3.service';
import { LoggerService } from './logger.service';
import { LoggerErrorService } from './loggererror.service';
import { TransService } from './trans.service';
import { ContextMenuService } from './contextmenu.service';

import { AppComponent } from './app.component';
import { SavingPathComponent } from './saving-path/saving-path.component';
import { RequestComponent } from './request/request.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HelpComponent } from './help/help.component';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    SavingPathComponent,
    RequestComponent,
    SuggestionComponent,
    FeedbackComponent,
    HelpComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    DatabaseService,
    Alltomp3Service,
    TransService,
    LoggerService,
    ContextMenuService,
    {provide: ErrorHandler, useClass: LoggerErrorService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
