const electron = require("electron");
const gnucash = require("./lib/gnucash/reader.js");

const { app, BrowserWindow } = electron;

let mainWindow;

app.on("ready", function () {
  //mainWindow = new BrowserWindow();

  //mainWindow.loadURL(`file://${__dirname}/main.html`);

  // mainWindow.on("close", function () {
  //  mainWindow = null;
  //});

  var reader = gnucash.CreateReader(`${__dirname}/example.gnucash`);
  console.log(reader.GetSummary().totals);

  let accounts = reader.GetAccounts();
  printAccounts(accounts, 0);
});

var printAccounts = function (accounts, acc) {
  for (let i = 0; i < accounts.length; i++) {
    console.log(acc);
    console.log(accounts[i].name);
    printAccounts(accounts[i].children, acc + 1);
  }
};

require('electron-reload')(__dirname);
