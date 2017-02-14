const Emitter = require("events").EventEmitter;
const gnucash = require("./gnucash/reader.js");
const util = require("util");
const View = require("./view");

const App = function(){
  var self = this;

  self.on("open-view", function (name, data) {
    let view = new View(name);
    view.toHtml(data, function (html) {
      self.emit("view-rendered", html);
    });
  });

  self.on("request-reader", function () {
    let reader = gnucash.CreateReader(`${__dirname}/../example.gnucash`);
    self.emit("reader-ready", reader);
  });

  self.emit("open-view", "home");
};

util.inherits(App, Emitter);
module.exports = new App();
