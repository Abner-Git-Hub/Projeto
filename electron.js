const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let serverProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    title: 'Chat em Tempo Real',
    icon: path.join(__dirname, 'icon.svg'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Carregar o client.html
  mainWindow.loadFile('client.html');

  // Abrir DevTools em desenvolvimento (opcional)
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function startServer() {
  // Iniciar o servidor Node.js em background
  serverProcess = spawn('node', ['server/index.js'], {
    cwd: __dirname,
    stdio: 'inherit'
  });

  serverProcess.on('error', (err) => {
    console.error('Erro ao iniciar servidor:', err);
  });

  serverProcess.on('exit', (code, signal) => {
    console.log(`Servidor encerrado com código ${code}`);
  });
}

app.whenReady().then(() => {
  startServer();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // Encerrar o servidor quando todas as janelas fecharem
    if (serverProcess) {
      serverProcess.kill();
    }
    app.quit();
  }
});

app.on('before-quit', () => {
  // Encerrar o servidor antes de fechar o app
  if (serverProcess) {
    serverProcess.kill();
  }
});
