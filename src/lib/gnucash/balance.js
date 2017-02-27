'use strict';

const getAccounts = require('./accounts');
const getTransactions = require('./transactions');
const getPrices = require('./prices');
const math = require('./math');

function Balance(options) {
  let self = this;

  self.options = options;
  self.accounts = getAccounts(self.options);
  self.transactions = getTransactions(self.options);
  self.prices = getPrices(self.options);
}

Balance.prototype.calculateBalance = function (account) {
  let self = this;

  let result = 0.0;

  result += self.transactions.sumAllTransactionsForAccount(account);

  if (account.account_type === 'MUTUAL') {
    let price = self.prices.findMostRecentPrice(account.commodity_guid);
    result *= math.getDecimal(price.value_num, price.value_denom);
  }

  for (let i = 0; i < account.children.length; i++) {
    result += self.calculateBalance(account.children[i]);
  }

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
  return new Balance(options).getAccountsWithBalance();
};
