const { app, BrowserWindow } = require('electron');

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 460,
    backgroundColor: '#ffffff',
    allowRendererProcessReuse : true,
    nodeIntegrationInWorker: true,
    webPreferences: {
      nodeIntegration: true
    },
    icon: "assets/icons/mac/icon.icns",
    /*autoHideMenuBar: true,*/
    /*titleBarStyle: 'hidden',*/
    frame: false,
    darkTheme : true
  })


  win.loadFile( "dist/angular-electron/index.html");

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})
