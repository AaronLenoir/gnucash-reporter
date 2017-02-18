'use strict';

const getData = require('./data');

function appendChildAccounts(data, parentGuid) {
  if (parentGuid === undefined) {
    parentGuid = null;
  }

  let childrenResult = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].parent_guid === parentGuid) {
      var account = data[i];
      account.children = appendChildAccounts(data, data[i].guid);
      childrenResult.push(account);
    }
  }

  return childrenResult;
}

function GetAccounts(options) {
  let data = getData(options);
  return appendChildAccounts(data.getAccounts());
}

module.exports = function (options) {
  // Exports the full account hierarchy.
  return GetAccounts(options);
};
