const {app, BrowserWindow} = require('electron')

app.whenReady().then(() => {
    const win = new BrowserWindow({
        show: false,
        autoHideMenuBar: true,
    })

    win.loadFile('index.html')

    win.webContents.on('did-finish-load', () => {
        win.maximize()
        win.show()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})