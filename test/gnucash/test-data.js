const assert = require('assert');

const data = require('../../src/lib/gnucash/data')({
  path: `${__dirname}/../assets/example.gnucash`
});

describe('Data', function () {
  describe('#getAccounts()', function () {
    it('Should return 10 accounts', function () {
      let accounts = data.getAccounts();
      assert.equal(10, accounts.length);
    });
  });
});

describe('Data', function () {
  describe('#getTransactionsForAccount', function () {
    it('Should return 2 transactions', function () {
      const account_guid = '978525e98a90756f1eeb2cad2b0b205f';
      let transactions = data.getTransactionsForAccount(
        account_guid);
      assert.equal(2, transactions.length);
    });
  });
});
