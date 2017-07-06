# AllToMP3 <a href="https://packagecloud.io/"><img alt="Private Maven, RPM, DEB, PyPi and RubyGem Repository | packagecloud" height="46" src="https://packagecloud.io/images/packagecloud-badge.png" width="158" /></a>

[AllToMP3](https://alltomp3.org) is a desktop application to download and convert YouTube, SoundCloud, Spotify and Deezer in 256 kb/s MP3, **with tags: cover, title, artist, genre, and even lyrics!**.

You can download it here: https://alltomp3.org

## For developers
### Installation
Install the following requirements:
- Node 7 + NPM (or yarn);
- Electron (you must be able to execute the command `electron`);
- [angular-cli](https://github.com/angular/angular-cli) (you must be able to execute the command `ng`).

On Linux you will need [AllToMP3 requirements](https://github.com/AllToMP3/alltomp3#requirements) (ffmpeg, fpcalc, python)

Then install the dependencies:
```bash
cd app
npm install
cd ..
npm install
./node_modules/.bin/electron-rebuild
```

### Launching the app
Go in the `app/` folder and execute `ng serve`.
Then, in another terminal, in the main folder execute `electron .` (it allows hot-reload of the Angular part).

### Building the app
In the `main.js` file, you must set the variable `DEV` (around line 12) to `false`, to deactivate the web inspector and turn on auto-updates.
Then simply run `npm run dist`. On macOS or Windows you will need a valid certificate so the application can be signed.

### Windows Warning
If you have an antivirus, it may interfere with AllToMP3.
If you encounter any problem, try to add an exception for AllToMP3 or to deactivate it.
