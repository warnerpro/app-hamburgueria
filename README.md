# 🍔 Hamburgueria App

Aplicação completa de gerenciamento de hamburgueria com módulos de atendimento, cozinha e gestão.

## 📋 Estrutura do Projeto

```
hamburgueria-app/
├── backend/          # API Node.js/Express
├── frontend/         # React App
├── .github/          # Configurações do GitHub
└── package.json      # Workspace root
```

## 🚀 Funcionalidades

### Front-end
- ✅ Interface responsiva em React
- ✅ Navegação entre 3 módulos:
  - **Atendimento**: Gestão de pedidos dos clientes
  - **Cozinha**: Visualização e preparo de pedidos
  - **Gestão**: Relatórios, cardápio e configurações

### Back-end
- ✅ API REST com Express
- ✅ Autenticação e controle de acesso
- ✅ Endpoints para:
  - Pedidos
  - Clientes
  - Cardápio
  - Permissões de usuários

### Banco de Dados
- ✅ PostgreSQL
- ✅ Migrações automáticas
- ✅ Segurança com ORM (Sequelize/Prisma)

## 🛠️ Tecnologias

- **Frontend**: React, Axios, React Router, Tailwind CSS
- **Backend**: Node.js, Express, PostgreSQL, ORM (Sequelize)
- **DevOps**: Git, Docker (opcional), Vercel
- **Autenticação**: JWT

## 📦 Instalação

### Pré-requisitos
- Node.js 16+
- PostgreSQL 12+
- Git

### Setup

1. Clone o repositório
```bash
git clone <seu-repositorio>
cd hamburgueria-app
```

2. Instale as dependências
```bash
npm run install-all
```

3. Configure variáveis de ambiente
```bash
cp .env.example .env.local
```

4. Configure o banco de dados
```bash
# No backend
npm run migrate
npm run seed
```

## 🎯 Iniciando

### Desenvolvimento Local

```bash
npm run dev
```

Isso iniciará:
- Backend em `http://localhost:3000`
- Frontend em `http://localhost:3001`

### Apenas Backend
```bash
npm run backend
```

### Apenas Frontend
```bash
npm run frontend
```

## 📊 Estrutura do Banco de Dados

### Tabelas principais:
- `users`: Usuários do sistema
- `customers`: Clientes
- `products`: Cardápio
- `orders`: Pedidos
- `order_items`: Itens dos pedidos
- `roles`: Papéis/permissões

## 🔐 Autenticação

O sistema usa JWT para autenticação:
- Tokens armazenados no localStorage
- Refresh token para renovação automática
- Roles baseados em permissões

## 🚢 Deploy no Vercel

### Backend
```bash
vercel --prod
```


## 👥 Autor

Warner de Melo Filho / warner.melo.wm@gmail.com
