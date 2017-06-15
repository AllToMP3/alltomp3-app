import { Injectable } from '@angular/core';
import { TransService } from './trans.service';
declare var electron: any;

@Injectable()
export class ContextMenuService {

  public editMenu;

  constructor(private trans: TransService) {
    this.editMenu = electron.remote.Menu.buildFromTemplate([{
           label: trans.t.undo,
           role: 'undo',
       }, {
           label: trans.t.redo,
           role: 'redo',
       }, {
           type: 'separator',
       }, {
           label: trans.t.cut,
           role: 'cut',
       }, {
           label: trans.t.copy,
           role: 'copy',
       }, {
           label: trans.t.paste,
           role: 'paste',
       }, {
           type: 'separator',
       }, {
           label: trans.t.selectAll,
           role: 'selectall',
       },
   ]);
  }

  public openEditMenu() {
    this.editMenu.popup(electron.remote.getCurrentWindow());
  }

}
