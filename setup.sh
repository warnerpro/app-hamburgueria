#!/bin/bash

# Script de Setup Automático - Hamburgueria App

echo "🍔 Bem-vindo ao Setup da Hamburgueria App!"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Instale de https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# Verificar Git
if ! command -v git &> /dev/null; then
    echo "❌ Git não está instalado."
    exit 1
fi

echo "✅ Git encontrado: $(git --version)"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm run install-all

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo "✅ Dependências instaladas!"
echo ""

# Configurar ambiente
if [ ! -f ".env.local" ]; then
    echo "📝 Criando arquivo .env.local..."
    cp .env.example .env.local
    echo "✅ Arquivo .env.local criado. Edite com suas configurações."
else
    echo "✅ .env.local já existe"
fi

echo ""
echo "✅ Setup concluído com sucesso!"
echo ""
echo "🚀 Próximos passos:"
echo "1. Edite .env.local com suas configurações"
echo "2. Imicie o Docker: docker-compose up -d"
echo "3. Execute o seed: npm run seed"
echo "4. Inicie a aplicação: npm run dev"
echo ""
echo "📚 Para mais informações, consulte SETUP.md"
