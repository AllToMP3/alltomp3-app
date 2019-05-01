# AllToMP3 <a href="https://packagecloud.io/"><img alt="Private Maven, RPM, DEB, PyPi and RubyGem Repository | packagecloud" height="46" src="https://packagecloud.io/images/packagecloud-badge.png" width="158" /></a>

[AllToMP3](https://alltomp3.org) merupakan aplikasi desktop untuk mendownload dan mengkonversi YouTube, SoundCloud, Spotify dan Deezer dalam Bitrate 256 kb/s dan format MP3, **termasuk tag: cover, judul, artis, genre, dan juga lirik!**.
Support Playlist YouTube, Deezer dan Spotify, dan juga terintegrasi dengan search engine agar anda dapat mencara judul lagu atau album dan AllToMP3 akan mendownload nya.

Anda dapat mendownload AllToMP3 untuk Windows, macOS dan Linux disini: https://alltomp3.org

[![AllToMP3](alltomp3.png)](https://alltomp3.org)

## Perhatian untuk pengguna Windows
Jika anda menggunakan antivirus, maka dapat mengganggu aktivitas AllToMP3.
Jika anda mengalami masalah apapun, anda dapat menambahkan pengecualian untuk AllToMP3 atay menonaktifkannya (https://github.com/AllToMP3/alltomp3-app/issues/67).

## Bagi Pengembang
### Instalasi
Install persyaratan berikut:
- Node 10 + NPM;
- `npm install -g @angular/cli@1.0.0`

Pada Linux anda akan membutuhkan [AllToMP3 requirements](https://github.com/AllToMP3/alltomp3#requirements) (ffmpeg, fpcalc, python)

Lalu install dependencies:
```bash
cd app
npm install
cd ..
npm install
```

### Menjalankan aplikasi
Masuk ke folder `app/` dan jalankan `ng serve`.
Kemudian, pada terminal baru, pada folder utama jalankan `npm start` (untuk mereload bagian Angular).

### Membangun aplikasi
```
cd app/
./build.sh
cd ../
npm run dist
```
Pada macOS atau Windows anda membutuhkan sertifikat agar aplikasi dapat terverifikasi.

### Terjemahan
Untuk membuat terjemahan baru, Anda harus memahami pemrograman dasar dan cara menggunakan Github.
Dan juga anda harus tahu dua huruf kode negara (contoh finnish `FI`).

1. Fork repository ini;
1. Duplikat salah satu file dalam folder `/app/src/locale/` dan ubah namanya menjadi `messages.[DUA HURUF KODE NEGARA].xlf` pada repository yang di forke;
1. Ubah tag `target` dan cocokkan dengan tag `source` pada file;
1. Ubah file `/main.js` (gunakan find pada 2 langkah berikut):
   1. Perbarui objek pada `menuTexts`;
   1. Tambahkan dua huruf kode negara pada `supportedLocales`.
1. Buat sebuah pull request dengan perubahan yang anda buat.

## Credit

|Translation|Made by|Email|Report wrong translation|
|---|---|---|---|
|Arabic|Esmail EL BoB|esmailelbob01124320019@gmail.com|via email|
|Finnish|[0x4d48](https://github.com/0x4d48)|e4d48@outlook.com|via email|
|Japanese|[opera7133](https://github.com/opera7133)|opera7133@aol.com|via email|
|Russian|[aerohub](https://github.com/aerohub)|aerohub@users.noreply.github.com|via email|
|Indonesian|[elhakimyasya](https://github.com/elhakimyasya)|yasyaelhakim@gmail.com|via email|
