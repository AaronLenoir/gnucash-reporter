// Data access layer for the GnuCash files
//
// Sqlite

var Data = function (path) {
  this.path = path;
}

Data.prototype.GetAllAssetTransactions = function () {
  console.log("Open '" + this.path + "'");

  return [
    { accountId: 123, transaction: 200 },
    { accountId: 123, transaction: -100 }
  ];
};

module.exports.CreateData = function (path) {
  return new Data(path);
}
