module.exports.GetSummaryTotals = function (self) {
  return function () {
    console.log(self.path);
    
    return {
      totals: [
        {
          currency: "EUR",
          assets: 23000,
          profits: -2000
        },
        {
          currency: "USD",
          assets: 1000,
          profits: 1000
        }
      ]
    };
  };
};
