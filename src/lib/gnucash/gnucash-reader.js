'use strict';

const Reader = function (options) {
  let self = this;
  self.options = options;
};

Reader.prototype.GetAccounts = function () {
  let self = this;

  return require('../gnucash/gnucash-balance')({ path: self.options.path });
};

module.exports.createReader = function (options) {
  return new Reader(options);
};
