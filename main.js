const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const autoUpdater = require("electron-updater").autoUpdater;
const path = require('path');
const url = require('url');
const nedb = require('nedb-promise');
const util = require('util');
const os = require('os');
const ncp = require('ncp');
const request = require('request');
const alltomp3 = require('alltomp3');
const VERSION = app.getVersion();
const DEV = true;

// autoUpdater
if (!DEV && os.platform() != 'linux') {
  autoUpdater.checkForUpdates();
}

var db = {
  config: nedb.datastore({ filename: path.join(app.getPath('userData'), 'config.db'), autoload: true })
};
var perrors = [];
process.on('uncaughtException', function (error) {
  perrors.push(error);
  console.log(error);
});

// Configure alltomp3 library binaries
function asarPath(p) {
  return p.replace('app.asar', 'app.asar.unpacked');
}
alltomp3.tempFolder = app.getPath('temp') + path.sep;

if (os.platform() == 'win32') { // On Windows, we need to move eyeD3 in the tempFolder
  let eyeD3Folder = alltomp3.tempFolder + 'eyeD3';
  let eyeD3Exe = path.join(eyeD3Folder, 'main.exe');
  ncp(asarPath(path.join(__dirname, 'bin/eyeD3')), eyeD3Folder, () => {});
  alltomp3.setFfmpegPaths(asarPath(path.join(__dirname, 'bin/ffmpeg.exe')), asarPath(path.join(__dirname, 'bin/ffprobe.exe')));
  alltomp3.setFpcalcPath(asarPath(path.join(__dirname, 'bin/fpcalc.exe')));
  alltomp3.configEyeD3(eyeD3Exe, eyeD3Folder, (m) => {
    function changep(p) {
      return path.join('..', path.basename(p));
    }
    if (m.lyrics) {
      m.lyrics = changep(m.lyrics);
    }
    if (m.image) {
      m.image = changep(m.image);
    }
    return m;
  });
} else if (os.platform() == 'darwin') {
  alltomp3.setFfmpegPaths(asarPath(path.join(__dirname, 'bin/ffmpeg')), asarPath(path.join(__dirname, 'bin/ffprobe')));
  alltomp3.setFpcalcPath(asarPath(path.join(__dirname, 'bin/fpcalc')));
  alltomp3.configEyeD3(asarPath(path.join(__dirname, 'bin/eyeD3/bin/eyeD3')), asarPath(path.join(__dirname, 'bin/eyeD3/build/lib')));
} else if (os.platform() == 'linux') {
  alltomp3.configEyeD3(asarPath(path.join(__dirname, 'bin/eyeD3/bin/eyeD3')), asarPath(path.join(__dirname, 'bin/eyeD3/build/lib')));
}

// Database
// Initialization
db.config.findOne({ name: 'saving-path' }).then(conf => {
  console.log(conf);
  if (!conf) {
    return db.config.insert({ name: 'saving-path', value: app.getPath('music') });
  }
  return conf;
});
let firstLaunch = false;
db.config.findOne({ name: 'help-displayedn' }).then(helpDisplayed => {
  if (!helpDisplayed) {
    firstLaunch = true;
    return db.config.insert({ name: 'help-displayedn', value: 0 });
  }
});

// Messages so the renderer can query the database
ipcMain.on('db.findOne', (event, arg) => {
  console.log('[DB] findOne', arg);
  db[arg.db].findOne(arg.query).then(record => {
    console.log(record);
    event.returnValue = record;
  });
});
ipcMain.on('db.update', (event, arg) => {
  console.log('[DB] update', arg);
  db[arg.db].update(arg.query, arg.update).then(num => {
    console.log(num, 'records updated');
    event.returnValue = num;
  });
});

ipcMain.on('app.ready', (event, arg) => {
  db.config.findOne({ name: 'previous-version' }).then(previousVersion => {
    if ((!firstLaunch && !previousVersion) || (previousVersion && previousVersion.value !== VERSION)) {
      let pv;
      if (previousVersion) {
        pv = previousVersion.value;
      } else {
        pv = '0.2.5';
      }
      request({
        uri: 'https://app.alltomp3.org/release-notes/' + pv + '/' + VERSION,
        json: true
      }, (e, r, releaseNotes) => {
        if (!e && releaseNotes && releaseNotes.length > 0) {
          event.sender.send('releasenotes', releaseNotes);
        }
      });
    }
    if (!previousVersion) {
      db.config.insert({ name: 'previous-version', value: VERSION });
    } else if (previousVersion !== VERSION) {
      db.config.update({ name: 'previous-version' }, { name: 'previous-version', value: VERSION });
    }
  });

  db.config.findOne({ name: 'last-news' }).then(lastNews => {
    if (lastNews) {
      request({
        uri: 'https://app.alltomp3.org/news/' + os.platform() + '/' + VERSION + '/' + lastNews.value,
        json: true
      }, (e, r, news) => {
        if (!e && news && news.length > 0) {
          event.sender.send('news', news);
        }
      });
    }
    if (!lastNews) {
      db.config.insert({ name: 'last-news', value: (new Date()).toISOString() });
    } else {
      db.config.update({ name: 'last-news' }, { name: 'last-news', value: (new Date()).toISOString() });
    }
  });
});

// alltomp3 library
function forwardEvents(emitter, sender, id, allData) {
  let events = ['download', 'download-end', 'convert', 'error', 'infos', 'convert-end', 'end', 'begin-url', 'end-url'];
  events.forEach(e => {
    emitter.on(e, forwardEvent(e, sender, id, allData));
  });
  ipcMain.once('at3.abort.' + id, () => {
    emitter.emit('abort');
  });
}
function forwardEvent(name, sender, id, allData) {
  return function(d) {
    console.log('[AT3] event', name, d);
    if (d instanceof Error) {
      d = { error: true, name: d.name, message: d.message, stack: d.stack };
    }
    sender.send('at3.event', {
      id: id,
      name: name,
      data: d,
      allData: allData
    });
  }
}
ipcMain.on('at3.suggestions', (event, id, q) => {
  console.log('[AT3] suggestions', q);
  let type = alltomp3.typeOfQuery(q);
  if (type == 'text') {
    Promise.all([
      alltomp3.suggestedSongs(q, 5),
      alltomp3.suggestedAlbums(q, 5),
    ]).then(suggestions => {
      event.sender.send('at3.answer.' + id, {
        type: type,
        suggestions: {
          songs: suggestions[0],
          albums: suggestions[1]
        }
      });
    });
  } else {
    event.sender.send('at3.answer.' + id, {
      type: type,
      urlType: alltomp3.guessURLType(q)
    });
  }
});
/**
* q = {
* url: 'url to download',
* folder: 'folder where downloading the song',
* id: 'identifier choosen by the renderer to identify this download'
* }
*/
ipcMain.on('at3.downloadSingleURL', (event, q) => {
  console.log('[AT3] downloadSingleURL', q);
  let e = alltomp3.downloadAndTagSingleURL(q.url, q.folder);
  forwardEvents(e, event.sender, q.id);
});
/**
* q = {
* track: 'trackInfos',
* folder: 'folder where downloading the song',
* id: 'identifier choosen by the renderer to identify this download'
* }
*/
ipcMain.on('at3.downloadTrack', (event, q) => {
  console.log('[AT3] downloadTrack', q);
  let e = alltomp3.downloadTrack(q.track, q.folder);
  forwardEvents(e, event.sender, q.id);
});
/**
* q = {
* url: 'track url',
* folder: 'folder where downloading the song',
* id: 'identifier choosen by the renderer to identify this download'
* }
*/
ipcMain.on('at3.downloadTrackURL', (event, q) => {
  console.log('[AT3] downloadTrackURL', q);
  let e = alltomp3.downloadTrackURL(q.url, q.folder);
  forwardEvents(e, event.sender, q.id);
});
/**
* q = {
* url: 'playlist URL',
* folder: 'folder where downloading the playlist',
* id: 'identifier choosen by the renderer to identify this download'
* }
*/
ipcMain.on('at3.downloadPlaylist', (event, q) => {
  console.log('[AT3] downloadPlaylist', q);
  let e = alltomp3.downloadPlaylist(q.url, q.folder, () => {}, 3, path.join('{artist}', '{title}'));
  e.on('playlist-infos', playlistInfos => {
    forwardEvents(e, event.sender, q.id, playlistInfos.items);
    event.sender.send('at3.event', {
      id: q.id,
      name: 'playlist-infos',
      data: playlistInfos,
      allData: playlistInfos
    });
  });
});

// Install update
ipcMain.on('update.install', (event) => {
  autoUpdater.quitAndInstall();
});
autoUpdater.on('update-downloaded', () => {
  win.webContents.send('update.downloaded');
});
autoUpdater.on('update-available', () => {
  win.webContents.send('update.available');
});

// Feedback
let feedbackWin = null;
ipcMain.on('feedback.launch', (event, infos) => {
  console.log('[Feedback] launch');
  if (feedbackWin != null) {
    return;
  }
  feedbackWin = new BrowserWindow({width: 800, height: 460})

  feedbackWin.webContents.on('did-finish-load', () => {
    win.capturePage(image => {
      infos.os = {
        platform: process.platform,
        version: os.release()
      };
      infos.version = VERSION;
      infos.perrors = util.inspect(perrors);
      infos.errors = util.inspect(infos.errors);
      infos.screenshot = image.toPNG().toString('base64');
      infos.locale = app.getLocale();
      let infosify = JSON.stringify(infos);
      feedbackWin.webContents.send('feedback.infos', infosify);
    });
  });

  feedbackWin.loadURL(url.format({
    pathname: path.join(__dirname, 'feedback/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  if (DEV) {
    feedbackWin.webContents.openDevTools();
  }

  feedbackWin.on('closed', () => {
    feedbackWin = null;
  });
});

let menuTexts = {
  en: {
    about: 'About',
    quit: 'Quit',
    edit: 'Edit',
    undo: 'Undo',
    redo: 'Redo',
    cut: 'Cut',
    copy: 'Copy',
    paste: 'Paste',
    selectAll: 'Select All'
  },
  fr: {
    about: 'À propos',
    quit: 'Quitter',
    edit: 'Édition',
    undo: 'Annuler',
    redo: 'Répéter',
    cut: 'Couper',
    copy: 'Copier',
    paste: 'Coller',
    selectAll: 'Tout sélectionner'
  }
};

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  let locales = app.getLocale().split('-');
  let locale = locales[0];
  if (locales.length == 2) {
    alltomp3.regionCode = locales[1];
  } else {
    alltomp3.relevanceLanguage = locale;
  }
  let supportedLocales = ['en', 'fr'];
  let supportedLocale = 'en';
  if (supportedLocales.indexOf(locale) > -1) {
    supportedLocale = locale;
  }

  // Create the browser window.
  win = new BrowserWindow({width: 400, height: 700})

  // and load the index.html of the app.
  if (DEV) {
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'app/dist/' + supportedLocale + '/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Open the DevTools.
  if (DEV) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });

  let menuText = menuTexts[supportedLocale];

  let template = [{
      label: "AllToMP3",
      submenu: [
          { label: menuText.about, selector: "orderFrontStandardAboutPanel:" },
          { type: "separator" },
          { label: menuText.quit, accelerator: "Command+Q", click: function() { app.quit(); }}
      ]}, {
      label: menuText.edit,
      submenu: [
          { label: menuText.undo, accelerator: "CmdOrCtrl+Z", selector: "undo:" },
          { label: menuText.redo, accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
          { type: "separator" },
          { label: menuText.cut, accelerator: "CmdOrCtrl+X", selector: "cut:" },
          { label: menuText.copy, accelerator: "CmdOrCtrl+C", selector: "copy:" },
          { label: menuText.paste, accelerator: "CmdOrCtrl+V", selector: "paste:" },
          { label: menuText.selectAll, accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]}
  ];

  if (os.platform() == 'darwin') {
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
