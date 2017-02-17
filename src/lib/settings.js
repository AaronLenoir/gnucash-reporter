const settings = require('electron-settings');

function getPreviousFilePath (callback) {
  settings.get('previousFilePath').then(val => { callback(val); });
}

function setPreviousFilePath (path) {
  settings.set('previousFilePath', path);
}

module.exports.getPreviousFilePath = getPreviousFilePath;
module.exports.setPreviousFilePath = setPreviousFilePath;
