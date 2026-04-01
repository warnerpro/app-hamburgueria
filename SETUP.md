# Setup e Configuração Inicial

## 🐳 Usando Docker Compose (Recomendado)

### 1. Instalar Docker e Docker Compose
- Windows: [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Mac: `brew install docker docker-compose`
- Linux: Consulte a documentação da sua distribuição

### 2. Iniciar containers
```bash
docker-compose up -d
```

Isso iniciará:
- PostgreSQL em `localhost:5432`
- Adminer (interface do banco) em `http://localhost:8080`

### 3. Credenciais padrão
```
Usuario: user
Senha: password
Banco: hamburgueria
```

---

## 🚀 Setup Manual (Sem Docker)

### 1. Instalar PostgreSQL
- [Download PostgreSQL](https://www.postgresql.org/download/)
- Durante a instalação, anote a senha do usuário `postgres`

### 2. Criar banco de dados
```bash
# Conectar ao PostgreSQL
psql -U postgres

# Criar banco
CREATE DATABASE hamburgueria;
CREATE USER user WITH PASSWORD 'password';
ALTER ROLE user SET client_encoding TO 'utf8';
ALTER ROLE user SET default_transaction_isolation TO 'read committed';
ALTER ROLE user SET default_transaction_deferrable TO on;
ALTER ROLE user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE hamburgueria TO user;
\q
```

---

## 📦 Instalação do Projeto

### 1. Instalar Node.js
- [Download Node.js 16+](https://nodejs.org/)

### 2. Instalar dependências
```bash
# Instalar tudo (back + front)
npm run install-all

# Ou separado:
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configurar variables de ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite com suas configurações
```

### 4. Popular banco de dados (opcional)
```bash
cd backend
npm run seed
```

---

## 🏃 Rodando a Aplicação

### Desenvolvimento (Back + Front)
```bash
npm run dev
```

### Apenas Backend
```bash
npm run backend
```

### Apenas Frontend
```bash
npm run frontend
```

### Build para Produção
```bash
npm run build
```

---

## 🌐 Acessar a Aplicação

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3000/api`
- Adminer (BD): `http://localhost:8080`

---

## 🔑 Contas de Teste

```
👤 Atendente
Email: atendente@hamburgueria.com
Senha: 123456

👨‍🍳 Cozinheiro
Email: cozinheiro@hamburgueria.com
Senha: 123456

📊 Admin
Email: admin@hamburgueria.com
Senha: 123456
```

---

## 🐛 Troubleshooting

### Erro de conexão com PostgreSQL
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais em `.env.local`
- Se usar Docker: `docker ps` para confirmar se o container está ativo

### Problema ao instalar dependências
```bash
# Limpar cache do npm
npm cache clean --force

# Deletar node_modules
rm -r node_modules package-lock.json

# Reinstalar
npm install
```

### Porta já em uso
```bash
# Mudar porta no .env.local
API_PORT=3001
```

---

## 📚 Documentação Adicional

- [Documentação Express](https://expressjs.com/)
- [Documentação React](https://react.dev/)
- [Documentação Sequelize](https://sequelize.org/)
- [Documentação PostgreSQL](https://www.postgresql.org/docs/)

---

## 💡 Comandos Úteis

```bash
# Git
git add .
git commit -m "Descrição das mudanças"
git push origin main

# Banco de dados
npm run migrate        # Executar migrações
npm run migrate:undo   # Desfazer última migração
npm run seed           # Popular com dados de exemplo
npm run seed:undo      # Desfazer seed

# Docker
docker-compose ps           # Ver status dos containers
docker-compose logs         # Ver logs
docker-compose down         # Parar containers
docker-compose down -v      # Parar containers e limpar volumes
```

---

## 🚀 Deploy no Vercel

### Backend
1. Crie um novo projeto no Vercel
2. Conecte o repositório
3. Configure as variáveis de ambiente:
   - `DATABASE_URL`: Sua string de conexão PostgreSQL
   - `JWT_SECRET`: Chave secreta
   - `NODE_ENV`: production
4. Deploy automático com cada push

### Frontend
1. Crie um novo projeto no Vercel
2. Conecte o repositório
3. Configure:
   - Framework: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Variáveis:
     - `REACT_APP_API_URL`: URL da API no Vercel

---

Para dúvidas ou problemas, consulte a documentação dos projetos ou abra uma issue no repositório!
