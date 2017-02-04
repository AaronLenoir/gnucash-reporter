const summary = require("./summary.js");
const expenses = require("./expenses.js");

module.exports = function (path) {
  var self = this;

  self.path = path;
  self.db = undefined;

  this.GetSummaryTotals = new summary.GetSummaryTotals(self);
  this.GetAllExpenses = new expenses.GetAllExpenses(self);
  // ...

  self.load = function () {
    self.db = "Should be the actual DB link ...";
  };

  self.load();
};
