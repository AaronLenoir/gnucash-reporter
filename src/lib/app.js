'use strict';

const Emitter = require('events').EventEmitter;
const gnucash = require('./gnucash/reader.js');
const openFile = require('./open-file');
const settings = require('./settings');
const util = require('util');
const View = require('./view');

const {
  dialog
} = require('electron').remote;

const App = function () {
  var self = this;

  self.events = {
    openView: 'open-view',
    readAccounts: 'read-accounts',
    accountsRead: 'accounts-read',
    openFile: 'open-file'
  };

  self.getReader = function () {
    return self.reader;
  };

  self.on(self.events.openView, function (name, data) {
    let view = new View(name);
    view.toHtml(data, function (html) {
      self.emit('view-rendered', html);
    });
  });

  self.on(self.events.readAccounts, function () {
    let reader = self.getReader();
    let accounts = reader.GetAccounts();
    self.emit(self.events.accountsRead, accounts);
  });

  self.on(self.events.openFile, function () {
    openFile(self.open);
  });

  self.open = function (path) {
    self.reader = gnucash.createReader({
      path: path
    });
    self.emit(self.events.openView, 'home');
    settings.setPreviousFilePath(path);
  };

  self.init = function () {
    settings.getPreviousFilePath(function (previousFilePath) {
      if (previousFilePath) {
        self.open(previousFilePath);
      } else {
        self.emit(self.events.openFile);
      }
    });
  };

  self.init();
};

util.inherits(App, Emitter);
module.exports = new App();
