var path = require("path");
var fs = require("fs");
var Handlebars = require("handlebars");
var HandlebarsIntl = require('handlebars-helper-intl');

HandlebarsIntl.registerWith(Handlebars);

var View = function (name) {
  var self = this;
  this.name = name;

  this.toHtml = function (data, callback) {
    var templatePath = path.join(__dirname, "../views", this.name + ".hbs");
    fs.readFile(templatePath, "utf8", function (err, templateContent) {
      var template = Handlebars.compile(templateContent);
      callback(template(data));
    });
  };
};

module.exports = View;
