'use strict';

const getData = require('./data');
const math = require('./math');

function Transactions(options) {
  let self = this;

  self.options = options;
}

Transactions.prototype.find = function (account) {
  let self = this;

  let data = getData(self.options);
  return data.getTransactionsForAccount(account.guid);
};

Transactions.prototype.sumAllTransactionsForAccount = function (account) {
  let self = this;
  let sum = 0.0;

  let transactions = self.find(account);
  for (let i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];
    sum += math.getDecimal(
      transaction.quantity_num,
      transaction.quantity_denom);
  }

  if (account.account_type === 'INCOME' ||
    account.account_type === 'EQUITY') {
    sum *= -1;
  }

  return sum;
};

module.exports = function (options) {
  return new Transactions(options);
};
