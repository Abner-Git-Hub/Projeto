const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client.html'));
});

app.use(express.static(path.join(__dirname, '..')));

const PORT = process.env.PORT || 3001;
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;
const HOST = '0.0.0.0'; // Aceitar conexões de qualquer IP na rede

// Detectar se está rodando no Render (HTTPS)
const isRender = process.env.RENDER || process.env.PORT;
let server, io;

if (isRender) {
  // No Render, usar HTTPS com o servidor HTTP (Render faz proxy HTTPS)
  server = http.createServer(app);
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    },
    transports: ['polling'], // Forçar polling para Render
    allowUpgrades: false
  });
} else {
  // Local, usar HTTP
  server = http.createServer(app);
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });
}

// Rota para buscar histórico de mensagens
app.get('/api/messages', (req, res) => {
  db.all('SELECT * FROM messages ORDER BY timestamp DESC LIMIT 50', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows.reverse());
  });
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('Usuário conectado:', socket.id);

  // Enviar histórico de mensagens ao conectar
  db.all('SELECT * FROM messages ORDER BY timestamp DESC LIMIT 50', (err, rows) => {
    if (!err && rows) {
      socket.emit('message_history', rows.reverse());
    }
  });

  // Receber mensagem
  socket.on('send_message', (data) => {
    const { username, message } = data;
    
    // Salvar no banco de dados
    db.run(
      'INSERT INTO messages (username, message) VALUES (?, ?)',
      [username, message],
      function(err) {
        if (err) {
          console.error('Erro ao salvar mensagem:', err);
          return;
        }
        
        // Buscar a mensagem salva com timestamp
        db.get('SELECT * FROM messages WHERE id = ?', [this.lastID], (err, row) => {
          if (!err && row) {
            // Enviar para todos os clientes conectados
            io.emit('receive_message', row);
          }
        });
      }
    );
  });

  // Usuário desconectado
  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
  });
});

// Tentar usar HTTPS se certificados existirem
let sslOptions = null;
try {
  sslOptions = {
    key: fs.readFileSync(path.join(__dirname, '..', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'server.cert'))
  };
  console.log('Certificados SSL encontrados, iniciando servidor HTTPS...');
} catch (err) {
  console.log('Certificados SSL não encontrados, usando apenas HTTP...');
  console.log('Para usar HTTPS (necessário para PWA), gere certificados:');
  console.log('  openssl req -nodes -new -x509 -keyout server.key -out server.cert');
}

// Iniciar servidor
server.listen(PORT, HOST, () => {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  
  if (isRender) {
    console.log(`\n🚀 Servidor rodando no Render na porta ${PORT}`);
    console.log(`🔗 URL: https://chattempreal.onrender.com`);
  } else {
    console.log(`\n🚀 Servidor HTTP rodando em http://localhost:${PORT}`);
    console.log(`Para acessar na rede local, use um destes IPs:`);
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          console.log(`  http://${iface.address}:${PORT}`);
        }
      }
    }
  }
});

// Iniciar servidor HTTPS se certificados existirem
if (sslOptions) {
  const httpsServer = https.createServer(sslOptions, app);
  const httpsIo = new Server(httpsServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  // Copiar eventos do Socket.io para o servidor HTTPS
  httpsIo.on('connection', (socket) => {
    console.log('Usuário conectado (HTTPS):', socket.id);

    db.all('SELECT * FROM messages ORDER BY timestamp DESC LIMIT 50', (err, rows) => {
      if (!err && rows) {
        socket.emit('message_history', rows.reverse());
      }
    });

    socket.on('send_message', (data) => {
      const { username, message } = data;
      
      db.run(
        'INSERT INTO messages (username, message) VALUES (?, ?)',
        [username, message],
        function(err) {
          if (err) {
            console.error('Erro ao salvar mensagem:', err);
            return;
          }
          
          db.get('SELECT * FROM messages WHERE id = ?', [this.lastID], (err, row) => {
            if (!err && row) {
              httpsIo.emit('receive_message', row);
              io.emit('receive_message', row); // Também enviar para clientes HTTP
            }
          });
        }
      );
    });

    socket.on('disconnect', () => {
      console.log('Usuário desconectado (HTTPS):', socket.id);
    });
  });

  httpsServer.listen(HTTPS_PORT, HOST, () => {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    console.log(`\n🔒 Servidor HTTPS rodando em https://localhost:${HTTPS_PORT}`);
    console.log(`Para acessar na rede local (PWA), use um destes IPs:`);
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          console.log(`  https://${iface.address}:${HTTPS_PORT}`);
        }
      }
    }
    console.log('\n⚠️  Aviso: O navegador pode mostrar alerta de certificado auto-assinado.');
    console.log('   Isso é normal para desenvolvimento. Aceite o certificado para continuar.');
  });
}
