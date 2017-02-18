'use strict';

const fs = require('fs');
const sql = require('sql.js');
const db = require('./db');

function Data(options) {
  let self = this;

  self.path = options.path;
  self.db = null;

  self.getDb = function () {
    return db.openDb(self.path);
  };

  self.execToObject = function (query) {
    let db = self.getDb();
    return this.dataToObject(db.exec(query));
  };

  self.dataToObject = function (data) {
    // Converts (single) dataset to array of objects.
    let result = [];

    if (data[0] === undefined) {
      return result;
    }

    for (let rowId = 0; rowId < data[0].values.length; rowId++) {
      result[rowId] = {};
      for (let i = 0; i < data[0].values[rowId].length; i++) {
        result[rowId][data[0].columns[i]] = data[0].values[rowId][i];
      }
    }

    return result;
  };
}

Data.prototype.getAccounts = function () {
  let self = this;

  return self.execToObject('select * from accounts order by parent_guid');
};

Data.prototype.getTransactionsForAccount = function (accountGuid) {
  let self = this;

  return self.execToObject(
    `select * from transactions
      inner join splits on transactions.guid = splits.tx_guid
      where splits.account_guid = "${accountGuid}"`
  );
};

module.exports = function (options) {
  if (!options || !options.path) {
    throw new Error(
      'Mandatory option "path" missing, should point to a gnucash sqlite file.'
    );
  }

  return new Data(options);
};
