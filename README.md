# AllToMP3 <a href="https://packagecloud.io/"><img alt="Private Maven, RPM, DEB, PyPi and RubyGem Repository | packagecloud" height="46" src="https://packagecloud.io/images/packagecloud-badge.png" width="158" /></a>

[AllToMP3](https://alltomp3.org) は、YouTube、SoundCloud、Spotify、Deezerを256 kb/s MP3でダウンロードできるデスクトップアプリケーションです。 **タグ：カバー、タイトル、アーティスト、ジャンル、さらには歌詞！**

ここからダウンロード: https://alltomp3.org

## Windowsでの注意事項
ウイルス対策ソフトを使用している場合、AllToMP3に反応する場合があります。
問題が発生した場合は、AllToMP3をホワイトリストを追加するか、ソフトを無効にしてみてください。

## 開発者向け
### Installation
動作環境:
- Node 9 + NPM (または yarn);
- Electron 1.8.2 (`electron`コマンドを実行できる必要があります);
- [angular-cli](https://github.com/angular/angular-cli) (you must be able to execute the command `ng`).

Linuxでは、 [AllToMP3 requirements](https://github.com/AllToMP3/alltomp3#requirements)が必要となります (ffmpeg, fpcalc, python)

インストール方法:
```bash
cd app
npm install
cd ..
npm install
```

### アプリを起動する
`app /`フォルダに移動し、 `ng serve`を実行します。
次に、別の端末で、メインフォルダ内で`electron`を実行します（角部のホットリロードが可能です）.

### アプリをビルドする
`main.js`ファイルで、変数` DEV`（12行目）を `false`に設定して、Webインスペクタを無効にし、自動更新を有効にする必要があります。
```
cd app/
./build.sh
cd ../
npm run dist
```
macOSまたはWindowsでは、アプリケーションに署名できるように有効な証明書が必要です.

### 翻訳
このアプリは、英語、フランス語、フィンランド語、アラビア語で利用できます。
新しい言語を作成したい場合は私に連絡してください :) .

#### アプリを翻訳する
You need basic knowledge of programming and using Github to create translation. Also you need to know two letter country code for language (for example finnish `FI`).

1. レポジトリをフォークする
1. Duplicate some file in folder `/app/src/locale/` and change it's name to `messages.[TWO LETTER COUNTRY CODE].xlf` in your forked repository
1. Modify `target` tags according to `source` tags in the file
1. セーブする
1. Modify `/main.js` file (use find in next 2 steps)  
   1. Add your language in `menuTexts` object and translate it (duplicate it and modify), call object with your two letter country code
   1. Add your language's two letter country code in `supportedLocales` array
   1. セーブする
1. プルリクエストを作成

## 参加者

|翻訳|作成者|Eメール|間違った翻訳を指摘|
|---|---|---|---|
|Arabic|Esmail EL BoB|esmailelbob01124320019@gmail.com|http://bit.ly/2EVnQWr|
|Finnish|[0x4d48](https://github.com/0x4d48)|e4d48@outlook.com|via email|
