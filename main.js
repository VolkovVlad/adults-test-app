const { app, BrowserWindow, } = require ('electron');


let win;

app.on('ready', () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
      devTools: true,
      allowRunningInsecureContent: true,
      nodeIntegration: true,
      preload: `${__dirname}/test.js`
    }
  });
  win.loadURL('https://www.ozon.ru//');
  win.openDevTools();
});
