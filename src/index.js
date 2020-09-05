const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

function createWindow () {

  const targetScreen = screen.getPrimaryDisplay().workAreaSize;
  const [winWidth, winHeight] = [350, 600];

  const win = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    x: targetScreen.width - winWidth,
    y: targetScreen.height - winHeight,
    frame: false,
    resizable: false,
    show: false,
    alwaysOnTop: true,
    transparent: true,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile(path.join(__dirname, '/views/index.html'));

  win.on('ready-to-show', () => {
    win.show();
  })
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});