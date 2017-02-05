import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {

  @Input()
  suggestion: any;

  @Input()
  type: string;

  constructor() { }

  ngOnInit() {
  }

}
