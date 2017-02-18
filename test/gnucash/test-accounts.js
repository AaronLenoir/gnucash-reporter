const assert = require('assert');

const accounts = require('../../src/lib/gnucash/accounts')({
  path: `${__dirname}/../assets/example.gnucash`
});

describe('Accounts', function () {
  describe('#accounts()', function () {
    it('Should return 4 root accounts', function () {
      assert.equal(2, accounts.length);
    });
  });
});

describe('Accounts', function () {
  describe('#accounts()', function () {
    it('First ROOT account should return have 4 child accounts. ',
      function () {
        assert.equal(4, accounts[0].children.length);
      });
  });
});
