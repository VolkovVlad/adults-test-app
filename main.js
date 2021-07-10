const { app, BrowserWindow, } = require ('electron');


let win;

app.on('ready', () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: true,
      devTools: true,
      allowRunningInsecureContent: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false
    }
  });
  win.loadURL('http://localhost:8080');
  win.openDevTools();
});
