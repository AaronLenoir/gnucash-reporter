const electron = require("electron");
const gnucash = require("./lib/gnucash-reader");

const { app, BrowserWindow } = electron;

let mainWindow;

app.on("ready", function () {
  mainWindow = new BrowserWindow();

  mainWindow.loadURL(`file://${__dirname}/main.html`);

  mainWindow.on("close", function () {
    mainWindow = null;
  });

  var gcFile = new gnucash.Reader("/some/location/for/the/file.gnucash");

  console.log(gcFile.GetSummaryTotals());
  console.log(gcFile.GetAllExpenses());
});

require('electron-reload')(__dirname);
