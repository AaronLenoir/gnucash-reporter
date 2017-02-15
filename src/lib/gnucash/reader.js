const data = require("./data");
const summary = require("./summary");
const balance = require("./balance");

var Reader = function (path) {
  let self = this;

  self.path = path;
  self.data = data.CreateData(path);
  self.balance = balance.CreateBalance(self);
  self.summary = summary.CreateSummary(self);
}

Reader.prototype.GetAccounts = function () {
  let self = this;

  let accounts = self.data.GetAllAccounts();
  self.balance.AddToAccounts(accounts);

  return accounts;
}

module.exports.CreateReader = function (path) { return new Reader(path); }
