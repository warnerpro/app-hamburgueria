const User = require('../models/User');
const Customer = require('../models/Customer');
const Product = require('../models/Product');
const { sequelize } = require('../config/database');

const seed = async () => {
  try {
    console.log('🌱 Iniciando seed do banco de dados...');

    // Sincronizar banco
    await sequelize.sync({ force: false });
    console.log('✅ Banco sincronizado');

    // Criar usuários
    const users = [
      {
        name: 'Administrador',
        email: 'admin@hamburgueria.com',
        password: '123456',
        role: 'admin'
      },
      {
        name: 'João Atendente',
        email: 'atendente@hamburgueria.com',
        password: '123456',
        role: 'atendente'
      },
      {
        name: 'Maria Cozinheira',
        email: 'cozinheiro@hamburgueria.com',
        password: '123456',
        role: 'cozinheiro'
      }
    ];

    for (const user of users) {
      const exists = await User.findOne({ where: { email: user.email } });
      if (!exists) {
        await User.create(user);
        console.log(`✅ Usuário criado: ${user.email}`);
      }
    }

    // Criar clientes
    const customers = [
      {
        name: 'João Silva',
        email: 'joao@email.com',
        phone: '11912345678',
        address: 'Rua A, 123',
        city: 'São Paulo'
      },
      {
        name: 'Maria Santos',
        email: 'maria@email.com',
        phone: '11987654321',
        address: 'Av B, 456',
        city: 'São Paulo'
      },
      {
        name: 'Pedro Costa',
        email: 'pedro@email.com',
        phone: '11999999999',
        address: 'Rua C, 789',
        city: 'São Paulo'
      }
    ];

    for (const customer of customers) {
      const exists = await Customer.findOne({ where: { email: customer.email } });
      if (!exists) {
        await Customer.create(customer);
        console.log(`✅ Cliente criado: ${customer.name}`);
      }
    }

    // Criar produtos
    const products = [
      // Hamburgers
      {
        name: 'Hamburger Clássico',
        description: 'Hambúrguer 100g, pão, alface, tomate',
        price: 25.00,
        category: 'hamburger',
        available: true
      },
      {
        name: 'Hamburger Duplo',
        description: 'Dois hambúrgueres, queijo, bacon',
        price: 35.00,
        category: 'hamburger',
        available: true
      },
      {
        name: 'Hamburger Premium',
        description: 'Hambúrguer especial, queijo cheddar, bacon, ovos',
        price: 45.00,
        category: 'hamburger',
        available: true
      },
      // Bebidas
      {
        name: 'Refrigerante 250ml',
        description: 'Coca, Guaraná ou Sprite',
        price: 5.00,
        category: 'bebida',
        available: true
      },
      {
        name: 'Suco Natural 300ml',
        description: 'Laranja, maçã ou melancia',
        price: 8.00,
        category: 'bebida',
        available: true
      },
      // Acompanhamentos
      {
        name: 'Batata Frita Pequena',
        description: 'Porção pequena de batata frita',
        price: 10.00,
        category: 'acompanhamento',
        available: true
      },
      {
        name: 'Batata Frita Grande',
        description: 'Porção grande de batata frita',
        price: 15.00,
        category: 'acompanhamento',
        available: true
      },
      {
        name: 'Onion Rings',
        description: 'Cebola frita crocante',
        price: 12.00,
        category: 'acompanhamento',
        available: true
      },
      // Sobremesas
      {
        name: 'Sorvete Sundae',
        description: 'Sorvete com calda de chocolate',
        price: 12.00,
        category: 'sobremesa',
        available: true
      },
      {
        name: 'Brownie com Sorvete',
        description: 'Brownie quentinho com sorvete',
        price: 15.00,
        category: 'sobremesa',
        available: true
      }
    ];

    for (const product of products) {
      const exists = await Product.findOne({ where: { name: product.name } });
      if (!exists) {
        await Product.create(product);
        console.log(`✅ Produto criado: ${product.name}`);
      }
    }

    console.log('\n✅ Seed concluído com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao fazer seed:', error);
    process.exit(1);
  }
};

seed();
