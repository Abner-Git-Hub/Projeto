@echo off
echo ========================================
echo   Instalador do Chat em Tempo Real
echo ========================================
echo.

SET "DEST_DIR=%USERPROFILE%\ChatApp"
SET "SHORTCUT=%USERPROFILE%\Desktop\Chat App.lnk"

echo Criando pasta de instalacao...
if not exist "%DEST_DIR%" mkdir "%DEST_DIR%"

echo Copiando arquivos...
xcopy "server" "%DEST_DIR%\server\" /E /I /Y
copy "client.html" "%DEST_DIR%\" /Y
copy "index.html" "%DEST_DIR%\" /Y
copy "start-app.js" "%DEST_DIR%\" /Y
copy "package.json" "%DEST_DIR%\" /Y
copy "icon.svg" "%DEST_DIR%\" /Y

echo Copiando Node.js...
xcopy "Node.js" "%DEST_DIR%\Node.js\" /E /I /Y

echo Criando atalho na area de trabalho...
powershell -Command "$WshShell = New-Object -comObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%SHORTCUT%'); $Shortcut.TargetPath = '%DEST_DIR%\Node.js\node.exe'; $Shortcut.Arguments = 'start-app.js'; $Shortcut.WorkingDirectory = '%DEST_DIR%'; $Shortcut.Description = 'Chat em Tempo Real'; $Shortcut.Save()"

echo.
echo ========================================
echo   Instalacao concluida com sucesso!
echo ========================================
echo.
echo O app foi instalado em: %DEST_DIR%
echo Um atalho foi criado na area de trabalho.
echo.
echo Pressione qualquer tecla para sair...
pause >nul
