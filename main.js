const { app, BrowserWindow } = require('electron');

app.disableHardwareAcceleration();

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntregation: true,
        } // por causa dele, eu posso fazer importe das coisas do Node dentro do HTML
    });

    win.loadFile('index.html');
    win.webContents.openDevTools();
};

app.whenReady().then(createWindow)

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    };
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    };
});


// =============================================================

const { ipcMain } = require('electron');

ipcMain.on('renderer/salvar_arquivo', function(event, mensagem) {
    const conteudoDoArquivo = mensagem;

    console.log(conteudoDoArquivo);

    event.reply('main/salvar_arquivo', { status: 200 }); // Aqui eu crio o canal de comunicação da tela entre o main
});