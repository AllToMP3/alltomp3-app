import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {

  // The suggestion object, containing title, artist, cover...
  @Input()
  suggestion: any;

  // 'album' or 'song'
  @Input()
  type: string;

  // Is this suggestion selected by the user
  @Input()
  active: boolean;

  // Is this suggestion the last one of the list
  @Input()
  last: boolean;

  constructor() { }

  ngOnInit() {
  }

}
