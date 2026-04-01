# Hamburgueria Backend

Backend API para gerenciamento de hamburgueria desenvolvida com Node.js e Express.

## 🚀 Tecnologias

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT (JSON Web Tokens)
- bcryptjs (Criptografia de senhas)

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Execute as migrações:
```bash
npm run migrate
```

4. Popule o banco com dados de exemplo:
```bash
npm run seed
```

## 🏃 Executando

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

O servidor será iniciado em `http://localhost:3000`

## 📚 Estrutura do Projeto

```
backend/
├── src/
│   ├── config/      # Configuração do banco de dados
│   ├── controllers/ # Lógica de negócio
│   ├── middleware/  # Middlewares (autenticação, validação)
│   ├── models/      # Modelos Sequelize
│   ├── routes/      # Rotas da API
│   └── migrations/  # Migrations e seeds
├── server.js        # Arquivo principal
└── package.json
```

## 📡 Endpoints da API

### Autenticação
- `POST /api/users/register` - Registrar novo usuário
- `POST /api/users/login` - Login

### Usuários
- `GET /api/users` - Listar usuários (admin)
- `GET /api/users/:id` - Obter usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

### Clientes
- `GET /api/customers` - Listar clientes
- `POST /api/customers` - Criar cliente
- `GET /api/customers/:id` - Obter cliente
- `PUT /api/customers/:id` - Atualizar cliente
- `DELETE /api/customers/:id` - Deletar cliente

### Produtos
- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Obter produto
- `POST /api/products` - Criar produto (admin)
- `PUT /api/products/:id` - Atualizar produto (admin)
- `DELETE /api/products/:id` - Deletar produto (admin)

### Pedidos
- `GET /api/orders` - Listar pedidos
- `POST /api/orders` - Criar pedido
- `GET /api/orders/:id` - Obter pedido
- `PUT /api/orders/:id/status` - Atualizar status do pedido
- `PUT /api/orders/:id/cancel` - Cancelar pedido
- `DELETE /api/orders/:id` - Deletar pedido

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Todos os endpoints protegidos requerem o header:
```
Authorization: Bearer <token>
```

## 🌐 Deploy no Vercel

1. Conecte seu repositório do GitHub ao Vercel
2. Configure as variáveis de ambiente:
   - `DATABASE_URL`: URL de conexão PostgreSQL
   - `JWT_SECRET`: Chave secreta para JWT
   - `NODE_ENV`: production

3. Deploy automático será acionado a cada push para a branch principal

## 📝 Licença

MIT
