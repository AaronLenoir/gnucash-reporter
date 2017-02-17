'use strict';

const fs = require('fs'),
      sql = require('sql.js');

let db, lastPath;

function openDb(path) {
  if (db === undefined || lastPath !== path) {
    lastPath = path;
    let filebuffer = fs.readFileSync(path);
    db = new sql.Database(filebuffer);
  }

  return db;
}

module.exports.openDb = openDb;
