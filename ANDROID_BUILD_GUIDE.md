# 📱 Guia para Publicar App na Play Store com Capacitor

## 📋 Pré-requisitos

1. **Android Studio** instalado
2. **Java JDK 11 ou superior** instalado
3. **Conta Google Play Developer** ($25 taxa única)
4. **Android SDK** configurado

---

## 🔧 Passo 1: Abrir Projeto no Android Studio

1. Abra o Android Studio
2. Selecione "Open an Existing Project"
3. Navegue até a pasta `android` do seu projeto
4. Clique em "OK"

---

## 🏗️ Passo 2: Build do APK de Debug (Para Testes)

### Via Android Studio:
1. Clique em `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`
2. Aguarde o build completar
3. Clique em "locate" para encontrar o APK
4. O APK estará em: `android/app/build/outputs/apk/debug/app-debug.apk`

### Via Linha de Comando:
```bash
cd android
./gradlew assembleDebug
```
O APK estará em: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🔐 Passo 3: Gerar Chave de Assinatura (Keystore)

### Via Android Studio:
1. Clique em `Build` > `Generate Signed Bundle / APK`
2. Selecione "APK"
3. Clique em "Create new..."
4. Preencha os campos:
   - **Key store path**: Escolha onde salvar (ex: `chat-release.keystore`)
   - **Password**: Crie uma senha forte
   - **Key alias**: `chat-key`
   - **Key password**: Crie uma senha forte
   - **Validity**: 25 anos (recomendado)
   - **Certificate**: Preencha seus dados
5. Clique em "OK"

### Via Linha de Comando:
```bash
keytool -genkey -v -keystore chat-release.keystore -alias chat-key -keyalg RSA -keysize 2048 -validity 10000
```

---

## 📦 Passo 4: Build do APK de Release

### Via Android Studio:
1. Clique em `Build` > `Generate Signed Bundle / APK`
2. Selecione "APK"
3. Escolha o keystore criado no passo anterior
4. Selecione "release"
5. Clique em "Finish"

### Via Linha de Comando:
```bash
cd android
./gradlew assembleRelease
```
O APK estará em: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

---

## ✍️ Passo 5: Assinar o APK (Se necessário)

Se o APK não estiver assinado:

```bash
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore chat-release.keystore app-release-unsigned.apk chat-key
zipalign -v 4 app-release-unsigned.apk chat-release.apk
```

---

## 🚀 Passo 6: Testar o APK

1. Transfira o APK para seu celular
2. Habilite "Instalação de apps desconhecidos" nas configurações
3. Instale o APK
4. Teste todas as funcionalidades

---

## 📝 Passo 7: Criar Conta Google Play Developer

1. Acesse: https://play.google.com/console
2. Clique em "Criar conta"
3. Pague a taxa de $25 (única)
4. Preencha suas informações

---

## 🎯 Passo 8: Publicar na Play Store

### 8.1 Criar App no Console:
1. Acesse o Google Play Console
2. Clique em "Criar app"
3. Preencha:
   - **Nome do app**: "Chat em Tempo Real"
   - **Idioma**: Português (Brasil)
   - **Gratuito ou pago**: Gratuito
   - **Declarações de conteúdo**: Preencha conforme necessário
4. Clique em "Criar app"

### 8.2 Configurar App:
1. **Informações do app**:
   - Nome: "Chat em Tempo Real"
   - Descrição curta: "Chat em tempo real para comunicação instantânea"
   - Descrição completa: Descreva as funcionalidades
   - Ícone: Use os ícones gerados (512x512)
   - Capturas de tela: Adicione screenshots do app

2. **Classificação de conteúdo**:
   - Responda o questionário
   - Geralmente será "Para todos"

3. **Lista de lojas**:
   - Selecione os países onde quer publicar
   - Brasil e outros países de sua escolha

4. **Privacidade**:
   - Adicione política de privacidade
   - Você pode usar um gerador online

### 8.3 Fazer Upload do APK:
1. Vá em "Lançamento de produção" ou "Lançamento de teste"
2. Clique em "Criar novo lançamento"
3. Arraste o APK assinado para a área de upload
4. Aguarde o processamento

### 8.4 Configurar lançamento:
1. **Nome do lançamento**: "Versão 1.0"
2. **Notas da versão**: Descreva as novidades
3. Clique em "Revisar lançamento"
4. Clique em "Iniciar lançamento"

### 8.5 Aguardar revisão:
- O Google revisará seu app (pode levar de 1 a 7 dias)
- Você receberá notificação quando for aprovado

---

## ⚠️ Notas Importantes

### Sobre o Servidor:
- O app Android precisa que o servidor esteja rodando
- Para produção, você precisa hospedar o servidor em um serviço como:
  - Render (gratuito)
  - Railway (gratuito)
  - Vercel (gratuito)
  - Heroku (plano gratuito)

### Atualizar URL do Servidor:
No arquivo `capacitor.config.json`, altere:
```json
{
  "server": {
    "url": "https://seu-servidor.com",
    "cleartext": false
  }
}
```

### Permissões:
O app já tem as permissões necessárias configuradas:
- INTERNET (para conectar ao servidor)
- ACCESS_NETWORK_STATE (para verificar conexão)
- WAKE_LOCK (para manter conexão ativa)

---

## 🔄 Atualizar App no Futuro

1. Faça as alterações no código
2. Rode: `npx cap sync android`
3. Gere novo APK de release
4. Faça upload no Google Play Console
5. Publique nova versão

---

## 📞 Suporte

- Documentação Capacitor: https://capacitorjs.com/docs
- Google Play Console: https://play.google.com/console
- Android Studio: https://developer.android.com/studio
