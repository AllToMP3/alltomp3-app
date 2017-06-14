import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {

  @Input()
  selectProposal: any;

  helpProposalsURLs:string[] = [
    'https://youtube.com/watch?v=IhP3J0j9JmY',
    'https://soundcloud.com/overwerk/daybreak',
    'https://deezer.com/album/14880539',
    'https://open.spotify.com/album/7zuqkqhGkTH3PSdywhLgY4',
  ];
  helpProposalsSongs:string[] = [
    'coldplay paradise',
    'lorde',
    'ed sheeran',
    'on top of the world',
  ];

  constructor() { }

}
