const electron = require("electron");

const { app } = electron;

app.on('ready', function () {
  console.log('test');
});
