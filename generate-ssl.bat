@echo off
echo Gerando certificados SSL auto-assinados para desenvolvimento...
echo.

.\Node.js\openssl.exe req -nodes -new -x509 -keyout server.key -out server.cert -days 365 -subj "/C=BR/ST=SP/L=Sao Paulo/O=Dev/CN=localhost"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Certificados gerados com sucesso!
    echo server.key e server.cert criados.
    echo.
    echo Agora você pode iniciar o servidor com HTTPS.
) else (
    echo.
    echo ❌ Erro ao gerar certificados.
    echo Verifique se o OpenSSL está instalado.
)

pause
