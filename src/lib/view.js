'use strict';

const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');
const HandlebarsIntl = require('handlebars-helper-intl');

HandlebarsIntl.registerWith(Handlebars);

Handlebars.registerHelper('json', function (context) {
  return JSON.stringify(context);
});

var View = function (name) {
  var self = this;
  this.name = name;

  this.toHtml = function (data, callback) {
    var templatePath =
      path.join(__dirname, '../views', this.name + '.hbs');
    fs.readFile(templatePath, 'utf8', function (err,
      templateContent) {
      var template = Handlebars.compile(templateContent);
      callback(template(data));
    });
  };
};

module.exports = View;
