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

#### Translating
You need basic knowledge of programming and using Github to create translation. Also you need to know two letter country code for language (for example finnish `FI`).

1. Fork this repository
1. Duplicate some file in folder `/app/src/locale/` and change it's name to `messages.[TWO LETTER COUNTRY CODE].xlf` in your forked repository
1. Modify `target` tags according to `source` tags in the file
1. Save it
1. Modify `/main.js` file (use find in next 2 steps)  
   1. Add your language in `menuTexts` object and translate it (duplicate it and modify), call object with your two letter country code
   1. Add your language's two letter country code in `supportedLocales` array
   1. Save it
1. Create pull request

## Credits

|Translation|Made by|Email|Report wrong translation|
|---|---|---|---|
|Arabic|Esmail EL BoB|esmailelbob01124320019@gmail.com|http://bit.ly/2EVnQWr|
|Finnish|[0x4d48](https://github.com/0x4d48)|e4d48@outlook.com|via email|
|Japanese|[0x4d48](https://github.com/opera7133)|opera7133@aol.com|via email|
