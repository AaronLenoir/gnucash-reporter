var Summary = function (reader) {
  this.reader = reader;

  this.totals = this.GetTotals();
}

Summary.prototype.GetTotals = function() {
  var allTransactions = this.reader.data.GetAllAssetTransactions();

  // From data, create summary
  return [
    { currency: "EUR", assets: 30000, profit: -2000 }
  ];
};

module.exports.CreateSummary = function (reader) {
  return new Summary(reader);
}
