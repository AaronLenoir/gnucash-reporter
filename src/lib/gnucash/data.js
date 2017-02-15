const fs = require('fs');
const sql = require('sql.js');

const Data = function (path) {
  let self = this;

  self.path = path;
  self.db = null;

  self.LoadDb = function () {
    let filebuffer = fs.readFileSync(path);
    this.db = new sql.Database(filebuffer);
  };

  self.dataToObject = function (data) {
    let result = [];

    if (data[0] === undefined) { return result; }

    for (let rowId = 0; rowId < data[0].values.length; rowId++) {
      result[rowId] = {};
      for (let i = 0; i < data[0].values[rowId].length; i++) {
        result[rowId][data[0].columns[i]] = data[0].values[rowId][i];
      }
    }

    return result;
  };

  self.execToObject = function (query, parameters) {
    // TODO: Allow parameters
    return this.dataToObject(this.db.exec(query));
  };

  self.getDecimal = function (number, denominator) {
    return number / denominator;
  }

  self.LoadDb();
};

Data.prototype.GetTransactions = function (id) {
  return this.execToObject("select * from transactions inner join splits on transactions.guid = splits.tx_guid where splits.account_guid = \"" + id + "\"");
};

Data.prototype.GetAllAccounts = function () {
  let self = this;

  let getChildren = function (data, parentGuid) {
    let childrenResult = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].parent_guid === parentGuid) {
        var account = data[i];
        account.children = getChildren(data, data[i].guid);
        childrenResult.push(account);
      }
    }

    return childrenResult;
  };

  let data = this.execToObject("select * from accounts order by parent_guid");
  let hierarchical = getChildren(data, null);

  return hierarchical;
};

module.exports.CreateData = function (path) {
  return new Data(path);
};
