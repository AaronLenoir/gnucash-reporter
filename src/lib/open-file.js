'use strict';

const app = require('./app');

const { dialog } = require('electron').remote;

function openGnuCashFile (callback) {
  let result = dialog.showOpenDialog({
    title: "Open GnuCash File",
    defaultPath: `${__dirname}`,
    filters: [
      {name: 'GnuCash', extensions: ['gnucash']}
    ],
    properties: [
      'openFile'
    ]
  }, function (filePaths) {
    if (filePaths) {
      let path = filePaths[0];
      callback(path);
    }
  });
}

module.exports = openGnuCashFile;
