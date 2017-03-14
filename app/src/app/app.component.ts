import { Component } from '@angular/core';
import * as _ from 'lodash';
declare var electron: any;
import { Alltomp3Service } from './alltomp3.service';
import { DatabaseService } from './database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  processQueryDebounce = _.debounce(this.processQuery, 300);
  legend:boolean = false;
  unsupported:boolean = false;
  lastQuery:string;
  lastResult:any;
  queryi:string;
  requests:any[];
  suggestions:any = {}; // {songs: [], albums: []}
  activeSuggestion:number = 0; // for keyboard navigation -1: no selection, >= 0 song and then album
  helpProposals:string[] = [
    'https://youtube.com/watch?v=IhP3J0j9JmY',
    'https://soundcloud.com/overwerk/daybreak',
    'https://deezer.com/album/14880539',
    'coldplay paradise',
    'lorde'
  ];
  displayHelp:boolean = false;

  constructor(private alltomp3: Alltomp3Service, private db: DatabaseService) {
    this.requests = alltomp3.requests;

    this.db.getHelpDisplayed().then(helpDisplayed => {
      this.displayHelp = !helpDisplayed;
    });
  }

  private init() {
    this.lastQuery = '';
    this.lastResult = undefined;
    this.legend = false;
    this.unsupported = false;
    this.queryi = '';
    this.suggestions = {};
    this.activeSuggestion = 0;
  }

  public selectProposal(proposal:string) {
    this.queryi = proposal;
    document.getElementById("input-main").focus();
    this.processQuery();
  }

  public search(event:any) {
    if ((this.suggestions.albums || this.suggestions.songs) && (event.keyCode == 40 || event.keyCode == 38)) {
      if (event.keyCode == 40) { // keydown
        this.activeSuggestion = Math.min(this.suggestions.songs.length + this.suggestions.albums.length, this.activeSuggestion+1);
      } else if (event.keyCode == 38) { // keyup
        this.activeSuggestion = Math.max(-1, this.activeSuggestion-1);
      }
      event.preventDefault();
    } else {
      this.processQueryDebounce();
    }
  }

  public execute(event:any) {
    event.preventDefault();
    if (!this.lastResult) {
      return;
    }
    let type = this.lastResult.type;
    if (type  == 'single-url') {
      this.alltomp3.downloadSingleURL(this.lastQuery);
      this.init();
    } else if (type == 'playlist-url') {
      this.alltomp3.downloadPlaylist(this.lastQuery);
      this.init();
    } else if (this.activeSuggestion >= 0) {
      let songsl = this.suggestions.songs.length;
      if (this.activeSuggestion >= songsl) {
        var suggestion = this.suggestions.albums[this.activeSuggestion - songsl];
        var stype = 'album';
      } else {
        var suggestion = this.suggestions.songs[this.activeSuggestion];
        var stype = 'track';
      }
      this.selectSuggestion(suggestion, stype);
    }
  }

  public selectSuggestion(suggestion, type) {
    if (type == 'track') {
      this.alltomp3.downloadTrack(suggestion);
      this.init();
    } else if (type == 'album') {
      this.alltomp3.downloadPlaylist(suggestion.link);
      this.init();
    }
  }

  public hideHelp() {
    if (this.displayHelp) {
      this.displayHelp = false;
      this.db.setHelpDisplayed(true);
    }
  }

  private processQuery() {
    if (this.lastQuery == this.queryi) {
      return;
    }
    this.hideHelp();
    if (this.queryi) {
      this.alltomp3.suggestions(this.queryi).then(s => {
        this.unsupported = s.type == 'not-supported';
        this.legend = s.type != 'text';
        this.lastResult = s;
        if (s.type == 'text') {
          this.suggestions = s.suggestions;
        } else {
          this.suggestions = {};
        }
      });
    } else {
      this.unsupported = false;
      this.legend = false;
      this.suggestions = {};
    }
    this.lastQuery = this.queryi;
  }
}
