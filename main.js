const electron = require ('electron');
const path = require('path');
const StaticServer = require('static-server');
const { registerState, select, patch } = require('./common/dist/state');
const { registerNavigationJson, read, write } = require('./common/dist/db');
const { app, BrowserWindow, ipcMain } = electron;


const server = new StaticServer({
  rootPath: path.resolve(`${__dirname}/client/dist`),
  port: 3000,
});

const serverStarted = new Promise(resolve => server.start(resolve));

let win;

Promise.all([app.whenReady(), serverStarted]).then(() => {
  registerState(electron);
  registerNavigationJson(electron);

  win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
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



  return win.loadURL('https://www.ozon.ru/');
}).then(() => {
  patch({ navigation: read() });
  select(({ navigation }) => navigation).subscribe(write);

  let clientWin;

  ipcMain.addListener('openClient', async ({ sender }) => {
    clientWin = new BrowserWindow({
      width: 800,
      height: 600,
      autoHideMenuBar: true,
      webPreferences: {
        webSecurity: false,
        allowRunningInsecureContent: true,
        nodeIntegration: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
      }
    });

    await clientWin.loadURL('http://localhost:3000');

    clientWin.once('closed', () => {
      sender?.send('closeClient')
      clientWin?.destroy()
      clientWin = null;
    })
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});



