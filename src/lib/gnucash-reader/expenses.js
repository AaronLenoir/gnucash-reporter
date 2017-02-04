module.exports.GetAllExpenses = function (self) {
  return function () {
    return self.GetSummaryTotals();
  };
};
