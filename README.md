# 💬 Chat em Tempo Real - PWA

Chat em tempo real com PWA (Progressive Web App) que pode ser instalado no celular!

## 📦 Versões Disponíveis

### 1. Versão Local (`index.html`)
- Funciona apenas entre abas do **mesmo navegador no mesmo computador**
- Usa BroadcastChannel API e localStorage
- Não precisa de Node.js

### 2. Versão Rede Local (`client.html` + servidor Node.js)
- Funciona entre **computadores diferentes na mesma rede**
- Usa Socket.io e servidor Node.js
- Precisa de Node.js instalado

### 3. Versão PWA (Progressive Web App) - **NOVO!**
- Pode ser **instalada no celular** (Android e iOS)
- Funciona offline com cache
- Precisa de **HTTPS** para funcionar
- Usa Socket.io e servidor Node.js

---

## 🚀 Versão PWA (Para Celular)

### Passo 1: Instalar Node.js
1. Acesse https://nodejs.org/
2. Baixe e instale a versão LTS (recomendada)
3. Reinicie o computador após a instalação

### Passo 2: Instalar Dependências
Abra o terminal na pasta do projeto e rode:
```bash
npm install
```

### Passo 3: Gerar Ícones
```bash
node generate-icons.js
```

### Passo 4: Configurar HTTPS (Obrigatório para PWA)

**Opção A: Hospedar em serviço com HTTPS (Recomendado)**
- Use serviços como: Render, Railway, Vercel, ou Heroku
- Estes serviços fornecem HTTPS automaticamente
- Basta fazer deploy do projeto

**Opção B: Usar HTTPS localmente (Apenas para testes)**
1. Instale OpenSSL se não tiver
2. Rode: `openssl req -nodes -new -x509 -keyout server.key -out server.cert`
3. Inicie o servidor (ele detectará os certificados automaticamente)

### Passo 5: Iniciar o Servidor
```bash
node server/index.js
```

O servidor vai mostrar os IPs disponíveis na sua rede, por exemplo:
```
🚀 Servidor HTTP rodando em http://localhost:3001
Para acessar na rede local, use um destes IPs:
  http://192.168.1.100:3001
  http://192.168.1.101:3001

🔒 Servidor HTTPS rodando em https://localhost:3443
Para acessar na rede local (PWA), use um destes IPs:
  https://192.168.1.100:3443
  https://192.168.1.101:3443
```

### Passo 6: Instalar no Celular

**Android:**
1. Abra o Chrome no celular
2. Acesse: `https://SEU_IP:3443/client.html`
3. Aceite o certificado (se for auto-assinado)
4. Toque no menu (três pontos) > "Adicionar à tela inicial"
5. O app será instalado como se fosse nativo!

**iOS:**
1. Abra o Safari no celular
2. Acesse: `https://SEU_IP:3443/client.html`
3. Aceite o certificado (se for auto-assinado)
4. Toque no botão de compartilhar > "Adicionar à Tela de Início"
5. O app será instalado como se fosse nativo!

---

## 🌐 Versão Rede Local (Computadores Diferentes)

### Passo 1: Instalar Node.js
1. Acesse https://nodejs.org/
2. Baixe e instale a versão LTS (recomendada)
3. Reinicie o computador após a instalação

### Passo 2: Instalar Dependências
Abra o terminal na pasta do projeto e rode:
```bash
npm install
```

### Passo 3: Iniciar o Servidor
```bash
node server/index.js
```

O servidor vai mostrar os IPs disponíveis na sua rede, por exemplo:
```
Servidor rodando em http://localhost:3001
Para acessar na rede local, use um destes IPs:
  http://192.168.1.100:3001
  http://192.168.1.101:3001
```

### Passo 4: Acessar na Rede Local

**No seu computador:**
- Abra: `http://localhost:3001/client.html`

**No computador da sua esposa:**
- Abra: `http://SEU_IP_LOCAL:3001/client.html`
- Substitua `SEU_IP_LOCAL` pelo IP mostrado no passo 3 (ex: `http://192.168.1.100:3001/client.html`)

### Passo 5: Configurar Firewall (se necessário)

Se não funcionar, você precisa liberar a porta 3001 no firewall:

**Windows Defender:**
1. Abra "Firewall do Windows Defender com Segurança Avançada"
2. Clique em "Regras de Entrada" > "Nova Regra"
3. Selecione "Porta" > "TCP" > porta "3001"
4. Selecione "Permitir a conexão"
5. Marque todas as opções (Domínio, Particular, Público)
6. Dê um nome (ex: "Chat Server")

---

## 🚀 Versão Local (Mesmo Computador)

1. Abra o arquivo `index.html` no seu navegador
2. Digite um nome de usuário e clique em "Entrar"
3. Abra o mesmo arquivo em outra aba/janela do navegador
4. Entre com outro nome de usuário
5. As mensagens serão sincronizadas entre as abas em tempo real!

---

## ✨ Funcionalidades

- **Comunicação em tempo real** entre computadores na rede local
- **PWA instalável no celular** (Android e iOS)
- **Funciona offline** com cache do service worker
- **Persistência de mensagens** no banco de dados SQLite
- **Interface moderna** com design responsivo e animações
- **Histórico de mensagens** (últimas 50 mensagens)
- **Status de conexão** em tempo real
- **Proteção contra XSS** nas mensagens

## 🛠️ Tecnologias

- **Backend**: Node.js + Express + Socket.io + SQLite
- **Frontend**: HTML5 + CSS3 + JavaScript puro
- **PWA**: Service Worker + Manifest
- **Banco de dados**: SQLite (arquivo local)

## 📱 Como Testar PWA

1. Instale Node.js e inicie o servidor com HTTPS
2. Abra `https://localhost:3443/client.html` no seu navegador
3. Entre com um nome de usuário
4. No celular, abra `https://SEU_IP:3443/client.html`
5. Instale o app no celular (menu > Adicionar à tela inicial)
6. Envie mensagens e veja a sincronização em tempo real!

## 🔧 Solução de Problemas

**PWA não instala:**
- Verifique se está usando HTTPS (obrigatório)
- Verifique se o manifest.json está acessível
- Verifique se o service worker está registrado (abra o console)

**Não conecta:**
- Verifique se o servidor está rodando
- Verifique o IP correto no comando `ipconfig` (Windows)
- Libere a porta 3001 e 3443 no firewall
- Desative temporariamente o antivirus para testar

**Como descobrir seu IP:**
```bash
ipconfig
```
Procure por "IPv4 Address" (ex: 192.168.1.100)

## 🎨 Personalização

Edite as cores CSS nos arquivos HTML:
- Gradiente principal: `#667eea` → `#764ba2`
- Cores de fundo, bordas, etc.

## 📝 Notas

- As mensagens ficam salvas no arquivo `server/chat.db`
- O servidor precisa estar rodando para o chat funcionar
- PWA requer HTTPS obrigatoriamente
- Para uso na internet, seria necessário hospedar o servidor com HTTPS

## 🌍 Hospedagem Recomendada

Para usar o PWA na internet, hospede em um destes serviços:
- **Render** (gratuito, HTTPS automático)
- **Railway** (gratuito, HTTPS automático)
- **Vercel** (gratuito, HTTPS automático)
- **Heroku** (plano gratuito disponível)
