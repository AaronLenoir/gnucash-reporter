var Emitter = require("events").EventEmitter;
var util = require("util");
var View = require("./view");
var gnucash = require("./gnucash/reader.js");

var App = function(){
  var self = this;

  self.on("hello", function () {
    console.log("Received 'hello' from view.");
  });

  self.on("open-view", function (name, data) {
    var view = new View(name);
    view.toHtml(data, function (html) {
      self.emit("view-rendered", html);
    });
  });

  self.on("request-reader", function () {
    var reader = gnucash.CreateReader(`${__dirname}/../example.gnucash`);
    self.emit("reader-ready", reader);
  });

  self.emit("open-view", "home");
};

util.inherits(App, Emitter);
module.exports = new App();
