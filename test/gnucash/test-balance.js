const assert = require('assert');

const accounts = require('../../src/lib/gnucash/balance')({
  path: `${__dirname}/../assets/example.gnucash`
});

describe('Balance', function () {
  describe('#balance()', function () {
    it('Should return 4 root accounts', function () {
      assert.equal(2, accounts.length);
    });
  });
});

describe('Balance', function () {
  describe('#balance()', function () {
    it('First ROOT account should return have 4 child accounts. ',
      function () {
        assert.equal(4, accounts[0].children.length);
      });
  });
});

describe('Balance', function () {
  describe('#balance()', function () {
    let expected = 623.45;
    it(`First account should have ${expected} as balance. `,
      function () {
        assert.equal(expected, accounts[0].children[0].balance);
      });
  });
});

describe('Balance', function () {
  describe('#balance()', function () {
    let expected = 1123.45;
    it(`Second account should have ${expected} as balance. `,
      function () {
        assert.equal(expected, accounts[0].children[1].balance);
      });
  });
});

describe('Balance', function () {
  describe('#balance()', function () {
    let expected = 500.00;
    it(`Third account should have ${expected} as balance. `,
      function () {
        assert.equal(expected, accounts[0].children[2].balance);
      });
  });
});

describe('Balance', function () {
  describe('#balance()', function () {
    let expected = 0.00;
    it(`Fourth account should have ${expected} as balance. `,
      function () {
        assert.equal(expected, accounts[0].children[3].balance);
      });
  });
});
