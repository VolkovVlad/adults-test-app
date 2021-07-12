const { app, BrowserWindow, } = require ('electron');
const path = require('path');
const StaticServer = require('static-server');
require('./common/dist/store');

const server = new StaticServer({
  rootPath: path.resolve(`${__dirname}/client/dist`),            // required, the root of the server file tree
  port: 3000,
});

const serverStarted = new Promise(resolve => server.start(resolve));


let win;

Promise.all([app.whenReady(), serverStarted]).then(() => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
      devTools: true,
      allowRunningInsecureContent: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      preload: `${__dirname}/spy/dist/spy.js`,
      webviewTag: true
    }
  });
  // win.loadFile('./q.html');
  win.loadURL('https://www.ozon.ru/');
  // win.loadURL('http://localhost:3000');
  // win.openDevTools();
  new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
      devTools: true,
      allowRunningInsecureContent: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      webviewTag: true
    }
  }).loadURL('http://localhost:3000/index.html')
});



