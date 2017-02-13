// Data access layer for the GnuCash files
//
// Sqlite

const fs = require('fs');
const sql = require('sql.js');

var Data = function (path) {
  self = this;
  this.path = path;
  this.db = null;

  this.LoadDb = function () {
    var filebuffer = fs.readFileSync(path);
    this.db = new sql.Database(filebuffer);
  };

  this.dataToObject = function (data) {
    var result = [];

    if (data[0] === undefined) { return result; }

    for (let rowId = 0; rowId < data[0].values.length; rowId++) {
      result[rowId] = {};
      for (let i = 0; i < data[0].values[rowId].length; i++) {
        result[rowId][data[0].columns[i]] = data[0].values[rowId][i];
      }
    }
    return result;
  };

  this.execToObject = function (query, parameters) {
    // TODO: Allow parameters
    console.log(query);
    return this.dataToObject(this.db.exec(query));
  };

  this.LoadDb();
};

Data.prototype.GetTransactions = function (id) {
  return this.execToObject("select * from transactions inner join splits on transactions.guid = splits.tx_guid where splits.account_guid = \"" + id + "\"");
};

Data.prototype.CalculateBalance = function (id) {
  let transactions = this.GetTransactions(id);
  return 100;
};

Data.prototype.GetAllAccounts = function () {
  let getChildren = function (data, parentGuid) {
    let childrenResult = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].parent_guid === parentGuid) {
        var account = data[i];
        account.balance = self.CalculateBalance(data[i].guid);
        childrenResult.push(data[i]);
        childrenResult[childrenResult.length-1].children = getChildren(data, data[i].guid);
      }
    }
    return childrenResult;
  };

  let result = [];
  let data = this.execToObject("select * from accounts order by parent_guid");
  let hierarchical = getChildren(data, null);
  return hierarchical;
};

module.exports.CreateData = function (path) {
  return new Data(path);
};
