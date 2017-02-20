'use strict';

const getData = require('./data');

function Prices(options) {
  let self = this;

  self.options = options;
}

Prices.prototype.find = function (commodityGuid) {
  let self = this;

  let data = getData(self.options);

  return data.getPricesForCommodity(commodityGuid);
};

Prices.prototype.findMostRecentPrice = function (commodityGuid) {
  let self = this;

  let prices = self.find(commodityGuid);

  prices.sort(function (a, b) {
    return a.date.localeCompare(b.date);
  });

  return prices[prices.length - 1];
};

module.exports = function (options) {
  return new Prices(options);
};
