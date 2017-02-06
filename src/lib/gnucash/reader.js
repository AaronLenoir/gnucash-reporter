// GnuCash file Reader

const data = require("./data.js");
const summary = require("./summary.js");

var Reader = function (path) {
  this.path = path;

  this.data = data.CreateData(path);
}

Reader.prototype.GetSummary = function() {
  return summary.CreateSummary(this);
}

module.exports.CreateReader = function (path) { return new Reader(path); }
