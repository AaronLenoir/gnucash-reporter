const assert = require('assert');
const math = require('../../src/lib/gnucash/math');

const prices = require('../../src/lib/gnucash/prices')({
  path: `${__dirname}/../assets/example-with-prices.gnucash`
});

const commodityGuid = '8bdaf234a90df1866842fa8f7dd8b0ea';

describe('Prices', function () {
  describe('#prices.find', function () {
    it('Should return 2 prices', function () {
      assert.equal(2, prices.find(commodityGuid).length);
    });
  });
});

describe('Prices', function () {
  describe('#prices.findMostRecentPrice', function () {
    it('Should get price of 22.', function () {
      let price = prices.findMostRecentPrice(commodityGuid);
      let calculatedPrice = math.getDecimal(
        price.value_num,
        price.value_denom
      );
      assert.equal(22.0, calculatedPrice);
    });
  });
});
