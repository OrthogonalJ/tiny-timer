const {app, ipcMain, BrowserWindow, Menu} = require('electron');
const process = require('process');
const path = require('path');
const menu = require('./menu');

// CONSTANTS //
const WINDOW_HEIGHT = 200;
const WINDOW_WIDTH = 400;
const INDEX_FILE = 'build/renderer/index.html';

// MODULE GLOBALS //
let win;

//// MAIN ////

if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
  });
}

Menu.setApplicationMenu(menu);

app.on('ready', () => {
  win = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    webPreferences: {nodeIntegration: true}
  });
  win.loadFile(path.join(__dirname, INDEX_FILE));
});

ipcMain.on('enable-always-on-top', (event, arg) => {
  win.setAlwaysOnTop(true);
  event.reply('enable-always-on-top-reply', null);
});

ipcMain.on('disable-always-on-top', (event, arg) => {
  win.setAlwaysOnTop(false);
  event.reply('disable-always-on-top-reply', null);
});
