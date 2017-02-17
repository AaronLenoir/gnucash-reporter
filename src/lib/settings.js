const settings = require('electron-settings');

/*
settings.set('name', {
  first: 'Cosmo',
  last: 'Kramer'
}).then(() => {
  settings.get('name.first').then(val => {
    console.log(val);
  });
});
*/

function getPreviousFilePath (callback) {
  settings.get('previousFilePath').then(val => { callback(val); });
}

function setPreviousFilePath (path) {
  settings.set('previousFilePath', path);
}

module.exports.getPreviousFilePath = getPreviousFilePath;
module.exports.setPreviousFilePath = setPreviousFilePath;
