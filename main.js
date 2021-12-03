/** подключение зависимостей */
const { app, BrowserWindow } = require('electron');

/**
 *  Это инициализирует окно приложения
 */
app.whenReady().then(() => {
    /** настройки окна (мин ширина итд) */
    const win = new BrowserWindow({
        // minHeight: 900,
        minWidth: 630,
        show: false,
        autoHideMenuBar: true,
    });

    /** загрузка html файла с приложением в окно */
    win.loadFile('index.html');

    win.webContents.on('did-finish-load', () => {
        win.maximize();
        win.show();
    });
});
