const fs = require('fs');

const os = process.argv[2];
const packageJson = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf8' }));
const version = packageJson.version;

if (os === 'linux') {
  fs.unlinkSync('build/icon.icns');
  delete packageJson.build.asarUnpack;
  packageJson.build.asar = false;
  fs.writeFileSync('./package.json', JSON.stringify(packageJson));
} else if (os === 'linux_old') {
  fs.renameSync(`dist/AllToMP3_${version}_amd64.deb`, `dist/AllToMP3_${version}_amd64_new.deb`);
  packageJson.build.deb.depends.slice(0, 1);
  fs.writeFileSync('./package.json', JSON.stringify(packageJson));
} else if (os === 'linux_end') {
  fs.renameSync(`dist/AllToMP3_${version}_amd64.deb`, `dist/AllToMP3_${version}_amd64_old.deb`);
}
