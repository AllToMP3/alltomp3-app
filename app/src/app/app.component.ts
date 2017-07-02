import { Component } from '@angular/core';
import * as _ from 'lodash';
declare var electron: any;
import { Alltomp3Service } from './alltomp3.service';
import { DatabaseService } from './database.service';
import { ContextMenuService } from './contextmenu.service';
const Clipboard = require('clipboard');

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
    'https://open.spotify.com/album/7zuqkqhGkTH3PSdywhLgY4',
    'coldplay paradise',
    'lorde',
    'ed sheeran',
    'on top of the world',
    'get lucky',
    'milky blossom',
    'truth is a beautiful thing',
    'shape of you',
    'petit biscuit sunset',
  ];
  currentProposal:number = 0; // the proposal displayed in placeholder
  displayHelpn:number = 0;
  displayHelp:boolean = false;
  displayHelpMax:number = 2;
  shareCopied:boolean = false; // if the link to AllToMP3 website has been copied
  shareTimeout = undefined; // the timeout to change back the tooltip

  constructor(private alltomp3: Alltomp3Service, private db: DatabaseService, private contextMenu: ContextMenuService) {
    this.requests = alltomp3.requests;

    this.db.getHelpDisplayed().then(helpDisplay => {
      this.displayHelpn = helpDisplay;
      if (helpDisplay < this.displayHelpMax) {
        this.displayHelp = true;
      }
    });

    setInterval(() => { this.changePlaceholder.apply(this) }, 5000);
  }

  ngOnInit() {
    new Clipboard('#share-btn');
  }

  private changePlaceholder() {
    if (this.suggestions.songs || this.suggestions.albums) {
      document.getElementById('input-main').className = 'input-main input-main-open fade';
    } else {
      document.getElementById('input-main').className = 'input-main fade';
    }
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById('input-main')).placeholder = this.helpProposals[this.currentProposal++ % this.helpProposals.length];
      if (this.suggestions.songs || this.suggestions.albums) {
        document.getElementById('input-main').className = 'input-main input-main-open';
      } else {
        document.getElementById('input-main').className = 'input-main';
      }
    }, 500);
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

  public selectProposal() {
    return (proposal) => {
      this.queryi = proposal;
      document.getElementById("input-main").focus();
      this.processQuery();
    };
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
  } else if (type  == 'track-url') {
    this.alltomp3.downloadTrackURL(this.lastQuery);
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
    this.displayHelp = false;
    if (this.displayHelpn < 2) {
      this.displayHelpn += 1;
      this.db.setHelpDisplayed(this.displayHelpn);
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

  public shareClick() {
    this.shareCopied = true;
  }
  public shareLeave() {
    if (this.shareTimeout || !this.shareCopied) {
      return;
    }
    this.shareTimeout = setTimeout(() => {
      this.shareCopied = false;
      this.shareTimeout = undefined;
    }, 1000);
  }
}
