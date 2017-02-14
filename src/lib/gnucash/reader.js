const data = require("./data.js");
const summary = require("./summary.js");

var Reader = function (path) {
  let self = this;

  self.path = path;
  self.data = data.CreateData(path);
}

Reader.prototype.GetAccounts = function () {
  return this.data.GetAllAccounts();
}

Reader.prototype.GetSummary = function () {
  return summary.CreateSummary(this);
}

module.exports.CreateReader = function (path) { return new Reader(path); }
