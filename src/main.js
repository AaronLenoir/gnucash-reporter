const electron = require("electron");
const gnucash = require("./lib/gnucash/reader.js");

const { app, BrowserWindow } = electron;

let mainWindow;

app.on("ready", function () {
  mainWindow = new BrowserWindow();

  mainWindow.loadURL(`file://${__dirname}/main.html`);

  mainWindow.on("close", function () {
    mainWindow = null;
  });

  var reader = gnucash.CreateReader("/some/path");
  console.log(reader.GetSummary().totals);
});

require('electron-reload')(__dirname);
