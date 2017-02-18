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
    let expected = 'Activa';
    it(`First account should have ${expected} as description. `,
      function () {
        assert.equal(expected, accounts[0].children[0].description);
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
    let expected = 'Inkomsten';
    it(`Second account should have ${expected} as description. `,
      function () {
        assert.equal(expected, accounts[0].children[1].description);
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
    let expected = 'Uitgaven';
    it(`Third account should have ${expected} as description. `,
      function () {
        assert.equal(expected, accounts[0].children[2].description);
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

describe('Balance', function () {
  describe('#balance()', function () {
    let expected = 'Vermogen';
    it(`Fourth account should have ${expected} as description. `,
      function () {
        assert.equal(expected, accounts[0].children[3].description);
      });
  });
});
