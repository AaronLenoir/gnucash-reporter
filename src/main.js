const electron = require("electron");

const { app, BrowserWindow } = electron;

let mainWindow;

app.on("ready", function () {
  mainWindow = new BrowserWindow();

  mainWindow.loadURL(`file://${__dirname}/main.html`);

  mainWindow.on("close", function () {
    mainWindow = null;
  });
});

require('electron-reload')(__dirname);
