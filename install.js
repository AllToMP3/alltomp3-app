const request = require('request');
const os = require('os');
const fs = require('fs');
const unzip = require('unzip2');
const platform = os.platform();
const DIST = './bin';

const urls = {
  darwin: 'https://dl.bintray.com/ntag/alltomp3/darwin.zip',
  win32: 'https://dl.bintray.com/ntag/alltomp3/win32.zip',
  linux: 'https://dl.bintray.com/ntag/alltomp3/linux.zip',
};
const files = {
  darwin: ['ffmpeg', 'fpcalc', 'ffprobe', 'eyeD3/bin/eyeD3'],
  linux: ['bin/eyeD3/bin/eyeD3'],
  win32: [],
};

const dlUnzip = (url, execFiles) => {
  if (!fs.existsSync(DIST)) {
    fs.mkdirSync(DIST);
  }
  console.log('Downloading binaries...');
  const dl = request(url).pipe(fs.createWriteStream('./bin.zip'));
  dl.on('finish', () => {
    console.log('Unzipping binaries...');
    const unz = fs.createReadStream('./bin.zip').pipe(unzip.Extract({ path: DIST }));
    unz.on('finish', () => {
      execFiles.forEach((file) => {
        fs.chmodSync(DIST + '/' + file, 0755);
      });
      console.log('Done!');
    });
  });
};

if (urls[platform]) {
  dlUnzip(urls[platform], files[platform]);
} else {
  console.warning(`No binaries for your platform ${platform}, that's strange`);
}
