var Summary = function (reader) {
  let self = this;

  self.reader = reader;

  self.totals = self.GetTotals();
}

Summary.prototype.GetTotals = function() {
  let self = this;
  
  var allTransactions = this.reader.data.GetAllAssetTransactions();

  // From data, create summary
  return [
    { currency: "EUR", assets: 30000, profit: -2000 }
  ];
};

module.exports.CreateSummary = function (reader) {
  return new Summary(reader);
}
