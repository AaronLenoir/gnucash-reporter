const data = require("./data");
const balance = require("./balance");

var Reader = function (path) {
  let self = this;

  self.path = path;
  self.data = data.CreateData(path);
  self.balance = balance.CreateBalance(self);
}

Reader.prototype.GetAccounts = function () {
  let self = this;

  let accounts = self.data.GetAllAccounts();
  self.balance.AddToAccounts(accounts);

  return accounts;
}

module.exports.CreateReader = function (path) { return new Reader(path); }
