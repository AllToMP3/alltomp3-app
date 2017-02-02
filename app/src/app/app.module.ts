import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SavingPathComponent } from './saving-path/saving-path.component';
import { DatabaseService } from './database.service';
import { Alltomp3Service } from './alltomp3.service';

@NgModule({
  declarations: [
    AppComponent,
    SavingPathComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DatabaseService, Alltomp3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
