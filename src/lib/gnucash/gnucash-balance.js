'use strict';

const math = require('./gnucash-math');

function Balance (options) {
  let self = this;

  self.options = options;
  self.accounts = require('./gnucash-accounts')(self.options);
  self.transactions = require('./gnucash-transactions')(self.options);
}

Balance.prototype.calculateBalance = function (account) {
  let self = this;

  let result = 0.0;
  let transactions = self.transactions.find(account.guid);
  for(let i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];
    result += math.getDecimal(transaction.quantity_num, transaction.quantity_denom);
  }

  for(let i = 0; i < account.children.length; i++) {
    result += self.calculateBalance(account.children[i]);
  }

  if (account.account_type === "INCOME") { result *= -1; } /* ?? */

  return result;
};

Balance.prototype.addBalanceToAccounts = function (accounts) {
  let self = this;

  for (let i = 0; i < accounts.length; i++) {
    let account = accounts[i];
    account.balance = self.calculateBalance(account);
    self.addBalanceToAccounts(account.children);
  }
};

Balance.prototype.getAccountsWithBalance = function () {
  let self = this;

  self.addBalanceToAccounts(self.accounts);

  return self.accounts;
};

module.exports = function (options) {
  if (!options || !options.path) {
    throw new Error('Mandatory option "path" missing, should point to a gnucash sqlite file.');
  }

  return new Balance(options).getAccountsWithBalance();
}
