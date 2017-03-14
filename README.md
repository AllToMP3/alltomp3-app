# alltomp3-app
Desktop application with Electron for AllToMP3.

## For developers
### Installation
Install the following requirements:
- Node 7 + NPM (or yarn);
- Electron (you must be able to execute the command `electron`);
- [AllToMP3 requirements](https://github.com/AllToMP3/alltomp3#requirements);
- [angular-cli](https://github.com/angular/angular-cli) (you must be able to execute the command `ng`).

Then install the dependencies:
```bash
cd app
npm install
cd ..
npm install
./node_modules/.bin/electron-rebuild
```

### Launching the app
Currently, you have to go in the `app/` folder and execute `ng serve`.
Then, in another terminal, in the main folder you execute `electron .` (it allows hot-reload of the Angular part).

### Windows Warning
If you have an antivirus, it may interfere with AllToMP3.
If you encounter any problem, try to add an exception for AllToMP3 or to deactivate it.
