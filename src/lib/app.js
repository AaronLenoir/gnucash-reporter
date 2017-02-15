const Emitter = require("events").EventEmitter;
const gnucash = require("./gnucash/reader.js");
const util = require("util");
const View = require("./view");

const App = function(){
  var self = this;
  self.reader = gnucash.CreateReader(`${__dirname}/../example.gnucash`);

  self.events = {
    openView: "open-view",
    readAccounts: "read-accounts",
    accountsRead: "accounts-read"
  };

  self.getReader = function () {
    return self.reader;
  };

  self.on(self.events.openView, function (name, data) {
    let view = new View(name);
    view.toHtml(data, function (html) {
      self.emit("view-rendered", html);
    });
  });

  self.on(self.events.readAccounts, function () {
    let reader = self.getReader();
    let accounts = reader.GetAccounts();
    self.emit(self.events.accountsRead, accounts);
  });

  self.emit(self.events.openView, "home");
};

util.inherits(App, Emitter);
module.exports = new App();
