const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "Smart Print Desk",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// 🚀 AUTO-PRINT HARDWARE COMMAND 🚀
ipcMain.on('print-document', (event, printSettings) => {
    mainWindow.webContents.print({
        silent: true, // Bina kisi pop-up ke direct print nikalega
        copies: printSettings.copies || 1,
        color: printSettings.color || false
    }, (success, failureReason) => {
        if (!success) console.log("Print Failed:", failureReason);
    });
});
