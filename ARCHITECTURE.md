# 📚 Arquitetura - Hamburgueria App

## 🏗️ Visão Geral

A aplicação é um sistema completo para gerenciamento de hamburgueria, construído com arquitetura moderna de **Monorepo** que permite:
- Desenvolvimento separado mas integrado
- Deploy independente de front e back
- Compartilhamento de códigos comuns
- Escalabilidade facilitada

```
hamburgueria-app/
├── backend/           # Node.js + Express + PostgreSQL
├── frontend/          # React + React Router
├── .github/           # Workflows de CI/CD
├── docker-compose.yml # Orquestração de containers
└── lerna.json         # Configuração do Monorepo
```

---

## 🔄 Stack Tecnológico

### Backend

| Camada | Tecnologia | Função |
|--------|-----------|--------|
| **Runtime** | Node.js | Execução JavaScript no servidor |
| **Framework** | Express.js | Framework web minimalista |
| **Banco de Dados** | PostgreSQL | Banco relacional robusto |
| **ORM** | Sequelize | Mapeamento de objetos |
| **Autenticação** | JWT | Tokens seguros |
| **Criptografia** | bcryptjs | Hash de senhas |

### Frontend

| Camada | Tecnologia | Função |
|--------|-----------|--------|
| **Framework** | React 18 | UI declarativa |
| **Roteamento** | React Router | Navegação entre páginas |
| **HTTP** | Axios | Cliente HTTP |
| **Styling** | CSS3 | Estilização responsiva |
| **Icons** | React Icons | Ícones SVG |
| **Storage** | localStorage | Persistência local |

### DevOps

| Ferramenta | Uso |
|-----------|-----|
| **Git** | Versionamento |
| **GitHub** | Repositório remoto |
| **Vercel** | Deploy automático |
| **Docker** | Containerização |
| **PostgreSQL** | Banco de dados |

---

## 🔐 Arquitetura de Segurança

### Autenticação

```
User Login
    ↓
Express POST /api/users/login
    ↓
bcryptjs.compare() ← Valida senha
    ↓
jwt.sign() → Gera token
    ↓
Token enviado ao cliente
    ↓
localStorage (client)
↓
Cada requisição:
Header: Authorization: Bearer <token>
    ↓
authMiddleware verifica token
    ↓
Acesso à rota protegida
```

### Autorização (por role)

```
User tem role: 'admin', 'atendente', 'cozinheiro'
    ↓
roleMiddleware verifica permissão
    ↓
GET /api/users (requer admin)
PUT /api/products (requer admin)
POST /api/orders (requer atendente ou admin)
PUT /api/orders/:id/status (requer cozinheiro ou admin)
```

---

## 📊 Modelos de Dados

### Relacionamentos

```
User
├── role (admin, atendente, cozinheiro)
└── active (boolean)

Customer
├── name
├── email
├── phone
├── address
└── status (ativo/inativo)

Product
├── name
├── category (hamburger, bebida, acompanhamento, sobremesa)
├── price
├── available
└── image (URL)

Order
├── orderNumber (formato: PED20240101001)
├── customerId (FK) → Customer
├── status (pendente, em_preparo, pronto, entregue, cancelado)
├── totalAmount
└── OrderItems (1:N)
    └── OrderItem
        ├── productId (FK)
        ├── quantity
        └── subtotal
```

---

## 🔄 Fluxo de Dados

### Criação de Pedido

```
Frontend (Atendimento)
    ↓
POST /api/orders
{
  customerId: uuid,
  items: [
    { productId: uuid, quantity: 2 },
    { productId: uuid, quantity: 1 }
  ],
  notes: "Sem cebola"
}
    ↓
Backend (orderController.createOrder)
    ↓
Validar itens
    ↓
Calcular total
    ↓
Salvar Order + OrderItems
    ↓
Response com pedido criado
    ↓
Frontend atualiza lista
```

### Atualização de Status

```
Frontend (Cozinha)
    ↓
[Clique em "Iniciando..."]
    ↓
PUT /api/orders/:id/status
{ status: "em_preparo" }
    ↓
Backend valida permissão (cozinheiro)
    ↓
Update Order.status
    ↓
Response com pedido atualizado
    ↓
Frontend atualiza em tempo real
```

---

## 📁 Estrutura de Pastas Detalhada

### Backend

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Conexão Sequelize
│   ├── controllers/
│   │   ├── userController.js    # CRUD de usuários
│   │   ├── customerController.js # CRUD de clientes
│   │   ├── productController.js  # CRUD de produtos
│   │   └── orderController.js    # Lógica de pedidos
│   ├── middleware/
│   │   └── auth.js              # JWT + Roles
│   ├── models/
│   │   ├── User.js              # Schema usuário
│   │   ├── Customer.js          # Schema cliente
│   │   ├── Product.js           # Schema produto
│   │   ├── Order.js             # Schema pedido
│   │   └── OrderItem.js         # Schema item pedido
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── customerRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   └── migrations/
│       └── seed.js              # Dados iniciais
├── server.js                     # Entrada principal
├── package.json
└── vercel.json                   # Config deploy
```

### Frontend

```
frontend/
├── public/
│   └── index.html               # HTML raiz
├── src/
│   ├── components/
│   │   ├── Navbar.js            # Barra de navegação
│   │   └── ProtectedRoute.js    # Proteção de rotas
│   ├── context/
│   │   └── AuthContext.js       # Context de autenticação
│   ├── pages/
│   │   ├── Login.js             # Tela de login
│   │   ├── Atendimento.js       # Módulo atendimento
│   │   ├── Cozinha.js           # Módulo cozinha
│   │   └── Gestao.js            # Módulo gestão
│   ├── services/
│   │   └── api.js               # Cliente Axios
│   ├── styles/
│   │   ├── Navbar.css
│   │   ├── Login.css
│   │   ├── Atendimento.css
│   │   ├── Cozinha.css
│   │   └── Gestao.css
│   ├── App.js                   # Componente raiz
│   └── index.js                 # Ponto de entrada
└── package.json
```

---

## 🚀 Pipelines de Deploy

### CI/CD (Contínuo)

```
Developer
    ↓
git push origin main
    ↓
GitHub Actions (Workflow)
    ├── Backend (Vercel)
    │   ├── npm install
    │   ├── npm run migrate
    │   └── vercel deploy
    └── Frontend (Vercel)
        ├── npm install
        ├── npm run build
        └── vercel deploy
```

---

## 🔄 Ciclo de Vida de um Pedido

```
PENDENTE (Atendimento)
    ↓
[Atendente cria pedido]
    ↓
EM_PREPARO (Cozinha)
    ↓
[Cozinheiro inicia preparo]
    ↓
PRONTO (Cozinha)
    ↓
[Pedido pronto para entrega]
    ↓
ENTREGUE (Atendimento)
    ↓
[Cliente recebeu]

    ou

CANCELADO
    ↓
[Se cancelado em qualquer momento]
```

---

## 📊 Roles e Permissões

### Admin
- ✅ Criar/editar/deletar usuários
- ✅ Gerenciar produtos
- ✅ Gerenciar clientes
- ✅ Ver todos os pedidos
- ✅ Acessar relatórios

### Atendente
- ✅ Criar pedidos
- ✅ Ver pedidos
- ✅ Gerenciar clientes
- ❌ Editar produtos
- ❌ Acessar admin

### Cozinheiro
- ✅ Ver pedidos pendentes
- ✅ Atualizar status de pedidos
- ❌ Criar pedidos
- ❌ Deletar pedidos
- ❌ Acessar admin

---

## 🌐 URLs de Ambiente

### Desenvolvimento Local
```
Frontend:  http://localhost:3000
Backend:   http://localhost:3000/api
Database:  postgresql://user:password@localhost:5432/hamburgueria
Adminer:   http://localhost:8080
```

### Produção (Vercel)
```
Frontend:  https://hamburgueria-frontend.vercel.app
Backend:   https://hamburgueria-backend.vercel.app/api
Database:  aws.neon.tech (exemplo)
```

---

## 📈 Performance e Escalabilidade

### Otimizações Implementadas

1. **Backend**
   - Connection pooling (Sequelize)
   - Middleware de atualização automática
   - Compressão de respostas (helmet)

2. **Frontend**
   - React lazy loading (Router)
   - CSS modules
   - Caching com localStorage

3. **Banco de Dados**
   - Índices em campos principais
   - Queries otimizadas
   - Backups automáticos

### Planos Futuros

- WebSockets para atualizações em tempo real
- Redis cache
- CDN para assets estáticos
- Load balancing
- Microserviços

---

## 🧪 Testes (TODO)

- [ ] Testes unitários (Jest)
- [ ] Testes de integração (Supertest)
- [ ] Testes E2E (Cypress)
- [ ] Code coverage > 80%

---

## 📚 Documentação Gerada

- [Setup Local](SETUP.md)
- [Deploy Vercel](DEPLOY-VERCEL.md)
- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)

---

## 🤝 Contribuindo

1. Clone o repositório
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Adiciona funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

## 📞 Suporte

Para dúvidas ou problemas:
- Consulte a documentação
- Abra uma issue no GitHub
- Entre em contato com o time

---

**Última atualização**: 2024-01-01
**Versão**: 1.0.0
**Status**: ✅ Pronto para Produção
