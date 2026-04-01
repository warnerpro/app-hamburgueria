# Guia de Deploy - Vercel

## 📋 Pré-requisitos

1. Conta no Vercel ([vercel.com](https://vercel.com))
2. Repositório no GitHub, GitLab ou Bitbucket
3. Banco de dados PostgreSQL (recomendado: [Heroku Postgres](https://www.heroku.com/postgres) ou [Neon](https://neon.tech/))

---

## 🚀 Deploy do Backend

### 1. Preparar o Banco de Dados

#### Opção A: Usar Neon (Recomendado)
1. Acesse [neon.tech](https://neon.tech/)
2. Crie uma conta gratuita
3. Crie um novo projeto e banco de dados
4. Copie a connection string

#### Opção B: Usar Heroku Postgres
1. Acesse [heroku.com](https://www.heroku.com/)
2. Crie um novo app
3. Adicione add-on "Heroku Postgres"
4. Copie a connection string

### 2. Deploy do Backend

```bash
# 1. Instale Vercel CLI (opcional)
npm i -g vercel

# 2. Deploy (primeira vez)
cd backend
vercel

# 3. Escolha as opções:
# - Link to existing project? No
# - Project name: hamburgueria-backend
# - Directory: ./
# - Override settings? No
```

### 3. Configurar Variáveis de Ambiente

No dashboard do Vercel:

1. Acesse seu projeto `hamburgueria-backend`
2. Vá para **Settings** > **Environment Variables**
3. Adicione:

```
DATABASE_URL=postgresql://user:password@host/dbname
JWT_SECRET=seu_super_secret_key_muito_seguro_aqui
NODE_ENV=production
API_PORT=3000
```

### 4. Deploy automático

```bash
# Fazer commit e push
git add .
git commit -m "Deploy backend Vercel"
git push origin main
```

O deploy será automático a cada push!

**Backend URL**: `https://seu-project.vercel.app`

---

## 🎨 Deploy do Frontend

### 1. Configurar a URL da API

Edite [frontend/.env.production](./../frontend/.env) ou configure no Vercel:

```
REACT_APP_API_URL=https://seu-backend.vercel.app/api
```

### 2. Deploy do Frontend

```bash
# 1. Pelo Vercel Website (Recomendado)
# - Acesse vercel.com
# - Import Project
# - Selecione seu repositório
# - Root Directory: frontend
# - Framework: Create React App

# 2. Pelo CLI
cd frontend
vercel
```

### 3. Configurar Variáveis

No dashboard do Vercel (projeto frontend):

1. **Settings** > **Environment Variables**
2. Adicione:

```
REACT_APP_API_URL=https://seu-backend.vercel.app/api
```

### 4. Deploy automático

Pronto! A cada push para `main`, o frontend será automaticamente deployado.

**Frontend URL**: `https://seu-project.vercel.app`

---

## ✅ Checklist de Deploy

- [ ] Banco de dados PostgreSQL criado
- [ ] Connection string do banco copiada
- [ ] Backend deployado no Vercel
- [ ] Variáveis de ambiente do backend configuradas
- [ ] Frontend deployado no Vercel
- [ ] URL da API configurada no frontend
- [ ] Teste de login em produção
- [ ] Verified que os pedidos são salvos no banco

---

## 🔗 URLs Importantes

```
Frontend:     https://seu-frontend.vercel.app
Backend:      https://seu-backend.vercel.app
API:          https://seu-backend.vercel.app/api
Health Check: https://seu-backend.vercel.app/health
```

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
# No backend
npm install

# No frontend
npm install

# Commit e push
git add .
git commit -m "Fix dependencies"
git push
```

### Erro: "Database connection failed"
- Verifique a `DATABASE_URL` no Vercel
- Confirme que o endereço do banco está acessível
- Verifique credenciais (user, senha, nome do banco)

### Frontend não conecta com backend
- Confirme a variável `REACT_APP_API_URL`
- Verifique CORS no server.js (deve estar habilitado)
- Teste no console do navegador (F12 > Console)

### Build falha no Vercel
- Verifique logs: Dashboard > Deployments > Failed
- Confirme que `npm run build` funciona localmente
- Verifique variáveis de ambiente

---

## 📊 Monitoramento

### Logs em Produção

```bash
# Ver logs do backend
vercel logs hamburgueria-backend

# Ver logs do frontend
vercel logs hamburgueria-frontend
```

### Métricas

Acesse o dashboard do Vercel para:
- Deploy history
- Performance metrics
- Error tracking
- Analytics

---

## 🔐 Segurança

### Antes de ir para produção:

1. ✅ Mude o `JWT_SECRET` para algo muito seguro
2. ✅ Habilite HTTPS (padrão no Vercel)
3. ✅ Adicione rate limiting
4. ✅ Implemente validação de entrada
5. ✅ Configure backups do banco de dados
6. ✅ Use variáveis de ambiente para dados sensíveis

---

## 🚀 Próximos Passos

1. Monitorar performance
2. Configurar alertas
3. Planejar CI/CD melhorado
4. Adicionar testes automáticos
5. Configurar domínio customizado

---

## 📞 Suporte

- [Documentação Vercel](https://vercel.com/docs)
- [Suporte Neon](https://neon.tech/docs)
- [Community Vercel](https://vercel.com/community)

Bom deploy! 🎉
