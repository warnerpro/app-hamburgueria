const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/hamburgueria',
  {
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Testar conexão
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexão com PostgreSQL estabelecida');
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao PostgreSQL:', err);
  });

module.exports = { sequelize };
