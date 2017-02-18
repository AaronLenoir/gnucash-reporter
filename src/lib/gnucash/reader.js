'use strict';

const getBalance = require('../gnucash/balance');

const Reader = function (options) {
  let self = this;
  self.options = options;
};

Reader.prototype.GetAccounts = function () {
  let self = this;

  return getBalance({
    path: self.options.path
  });
};

module.exports.createReader = function (options) {
  return new Reader(options);
};
