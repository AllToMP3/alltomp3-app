# AllToMP3 <a href="https://packagecloud.io/"><img alt="Private Maven, RPM, DEB, PyPi and RubyGem Repository | packagecloud" height="46" src="https://packagecloud.io/images/packagecloud-badge.png" width="158" /></a>

[AllToMP3](https://alltomp3.org) is a desktop application to download and convert YouTube, SoundCloud, Spotify and Deezer in 256 kb/s MP3, **with tags: cover, title, artist, genre, and even lyrics!**.

You can download it here: https://alltomp3.org

## Windows Warning
If you have an antivirus, it may interfere with AllToMP3.
If you encounter any problem, try to add an exception for AllToMP3 or to deactivate it.

## For developers
### Installation
Install the following requirements:
- Node 9 + NPM (or yarn);
- Electron 1.8.2 (you must be able to execute the command `electron`);
- [angular-cli](https://github.com/angular/angular-cli) (you must be able to execute the command `ng`).

On Linux you will need [AllToMP3 requirements](https://github.com/AllToMP3/alltomp3#requirements) (ffmpeg, fpcalc, python)

Then install the dependencies:
```bash
cd app
npm install
cd ..
npm install
```

### Launching the app
Go in the `app/` folder and execute `ng serve`.
Then, in another terminal, in the main folder execute `electron .` (it allows hot-reload of the Angular part).

### Building the app
In the `main.js` file, you must set the variable `DEV` (around line 12) to `false`, to deactivate the web inspector and turn on auto-updates.
```
cd app/
./build.sh
cd ../
npm run dist
```
On macOS or Windows you will need a valid certificate so the application can be signed.

### Translations
The app is available in English, French, Finnish and Arabic.
Contact me if you want to propose a new language :) .

## Credits

|Translation|Made by|Email|Report wrong translation|
|---|---|---|---|
|Arabic|Esmail EL BoB|esmailelbob01124320019@gmail.com|http://bit.ly/2EVnQWr|
|Finnish|[0x4d48](https://github.com/0x4d48)|e4d48@outlook.com|via email|
