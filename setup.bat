@echo off
REM Script de Setup Automático - Hamburgueria App (Windows)

echo 🍔 Bem-vindo ao Setup da Hamburgueria App!
echo.

REM Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js não está instalado. Instale de https://nodejs.org/
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js encontrado: %NODE_VERSION%

REM Verificar Git
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Git não está instalado.
    exit /b 1
)

echo ✅ Git encontrado
echo.

REM Instalar dependências
echo 📦 Instalando dependências...
call npm run install-all

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro ao instalar dependências
    exit /b 1
)

echo ✅ Dependências instaladas!
echo.

REM Configurar ambiente
if not exist ".env.local" (
    echo 📝 Criando arquivo .env.local...
    copy .env.example .env.local
    echo ✅ Arquivo .env.local criado. Edite com suas configurações.
) else (
    echo ✅ .env.local já existe
)

echo.
echo ✅ Setup concluído com sucesso!
echo.
echo 🚀 Próximos passos:
echo 1. Edite .env.local com suas configurações
echo 2. Inicie o Docker: docker-compose up -d
echo 3. Execute o seed: npm run seed
echo 4. Inicie a aplicação: npm run dev
echo.
echo 📚 Para mais informações, consulte SETUP.md
