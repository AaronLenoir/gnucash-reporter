const Balance = function (reader) {
  let self = this;
  self.reader = reader;

  self.CalculateBalance = function (account) {
    let self = this;

    let result = 0.0;
    let transactions = self.reader.data.GetTransactions(account.guid);
    for(let i = 0; i < transactions.length; i++) {
      let transaction = transactions[i];
      result += self.reader.data.getDecimal(transaction.quantity_num, transaction.quantity_denom);
    }

    for(let i = 0; i < account.children.length; i++) {
      result += self.CalculateBalance(account.children[i]);
    }

    if (account.account_type === "INCOME") { result *= -1; } /* ?? */

    return result;
  };
};

Balance.prototype.AddToAccounts = function (accounts) {
  let self = this;

  for (let i = 0; i < accounts.length; i++) {
    let account = accounts[i];
    account.balance = self.CalculateBalance(account);
    self.AddToAccounts(account.children);
  }
};

module.exports.CreateBalance = function (reader) {
  return new Balance(reader);
}
