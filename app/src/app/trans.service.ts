import { Injectable } from '@angular/core';

// Temporary service to provide translations in TypeScript files

@Injectable()
export class TransService {
  texts = {
    fr: {
      antivirus: "Une erreur s'est produite. Si vous avez un antivirus, désactivez-le et réessayez. Il se peut qu'il interfère.",
      dlfinished: 'Téléchargement terminé',
      dlfrom: 'de',
      dldownloaded: 'a été téléchargé',
      songs: 'morceaux',
      edit: 'Édition',
      undo: 'Annuler',
      redo: 'Répéter',
      cut: 'Couper',
      copy: 'Copier',
      paste: 'Coller',
      selectAll: 'Tout sélectionner'
    },
    en: {
      antivirus: 'An error occured. If you have an antivirus, try to deactivate it and try again. It may interfere with AllToMP3.',
      dlfinished: 'Download finished',
      dlfrom: 'from',
      dldownloaded: 'has been downloaded',
      songs: 'songs',
      edit: 'Edit',
      undo: 'Undo',
      redo: 'Redo',
      cut: 'Cut',
      copy: 'Copy',
      paste: 'Paste',
      selectAll: 'Select All'
    },
    it: {
      antivirus: "C'è stato un errore. Se hai un antivirus prova a disattivarlo e riattivarlo. Potrebbe interferire con AllToMP3.",
      dlfinished: 'Download completato',
      dlfrom: 'da',
      dldownloaded: 'è stato scaricato',
      songs: 'brani',
      edit: 'Modifica',
      undo: 'Annulla',
      redo: 'Ripeti',
      cut: 'Taglia',
      copy: 'Copia',
      paste: 'Incolla',
      selectAll: 'Seleziona tutto'
    }
  };

  public t;

  constructor() {
    this.t = this.texts[navigator.language] || this.texts['en'];
  }

}
