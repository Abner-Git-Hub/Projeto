const { spawn } = require('child_process');
const { exec } = require('child_process');

// Iniciar o servidor
const serverProcess = spawn('node', ['server/index.js'], {
  cwd: __dirname,
  stdio: 'inherit'
});

console.log('Iniciando servidor...');

serverProcess.on('error', (err) => {
  console.error('Erro ao iniciar servidor:', err);
});

// Aguardar um momento para o servidor iniciar
setTimeout(() => {
  console.log('Abrindo navegador...');
  // Abrir o navegador com o client.html
  const url = 'http://localhost:3001';
  
  // Abrir no navegador padrão do Windows
  exec(`start ${url}`, (err) => {
    if (err) {
      console.error('Erro ao abrir navegador:', err);
    }
  });
  
  console.log('App iniciado! Acesse http://localhost:3001');
}, 2000);

// Encerrar servidor quando o script for encerrado
process.on('SIGINT', () => {
  console.log('\nEncerrando servidor...');
  serverProcess.kill();
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('\nEncerrando servidor...');
  serverProcess.kill();
  process.exit();
});
