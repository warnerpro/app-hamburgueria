# Hamburgueria Frontend

Front-end responsivo para gerenciamento de hamburgueria desenvolvido com React.

## 🚀 Tecnologias

- React 18
- React Router DOM
- Axios (HTTP Client)
- React Icons
- CSS Responsivo

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

A aplicação abrirá em `http://localhost:3000`

## 📚 Estrutura do Projeto

```
frontend/
├── public/          # Arquivos públicos
├── src/
│   ├── components/  # Componentes reutilizáveis
│   ├── context/     # Context API (autenticação)
│   ├── pages/       # Páginas principais
│   ├── services/    # Serviços API
│   ├── styles/      # Arquivos CSS
│   └── App.js       # Componente raiz
└── package.json
```

## 🏗️ Módulos Disponíveis

### 👤 Atendimento
- Visualizacao de pedidos
- Criação de novos pedidos
- Filtro por status

### 👨‍🍳 Cozinha
- Visualização de pedidos pendentes
- Atualização de status (Pendente → Em Preparo → Pronto)
- Refresh automático a cada 5 segundos

### 📊 Gestão (Admin)
- Gerenciamento de produtos
- Gerenciamento de clientes
- Relatórios e estatísticas

## 🔐 Autenticação

A autenticação é feita por email e senha. Os tokens JWT são armazenados no localStorage.

### Contas de Teste

```
Atendente:
  Email: atendente@hamburgueria.com
  Senha: 123456

Cozinheiro:
  Email: cozinheiro@hamburgueria.com
  Senha: 123456

Admin:
  Email: admin@hamburgueria.com
  Senha: 123456
```

## 🌐 Deploy no Vercel

1. Conecte seu repositório do GitHub ao Vercel
2. Configure a variável de ambiente:
   - `REACT_APP_API_URL`: URL da API (ex: https://seu-backend.vercel.app/api)

3. Deploy automático será acionado a cada push para a branch principal

## 📦 Build para Produção

```bash
npm run build
```

Isso cria uma pasta `build` otimizada pronta para deploy.

## 🧪 Testes

```bash
npm test
```

## 📝 Licença

MIT
