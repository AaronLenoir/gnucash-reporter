'use strict';

function Transactions (options) {
  let self = this;

  self.options = options;
}

Transactions.prototype.find = function (accountGuid) {
  let self = this;

  let data = require('./gnucash-data')(self.options);
  return data.getTransactionsForAccount(accountGuid);
};

module.exports = function (options) {
  return new Transactions(options);
};
