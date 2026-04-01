const Customer = require('../models/Customer');

// Criar cliente
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, city } = req.body;

    const customer = await Customer.create({
      name,
      email,
      phone,
      address,
      city
    });

    res.status(201).json({
      message: 'Cliente criado com sucesso',
      customer
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
};

// Listar clientes
exports.listCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar clientes' });
  }
};

// Obter cliente por ID
exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter cliente' });
  }
};

// Atualizar cliente
exports.updateCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, city, status } = req.body;
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    if (name) customer.name = name;
    if (email) customer.email = email;
    if (phone) customer.phone = phone;
    if (address) customer.address = address;
    if (city) customer.city = city;
    if (status) customer.status = status;

    await customer.save();

    res.json({
      message: 'Cliente atualizado com sucesso',
      customer
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
};

// Deletar cliente
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    await customer.destroy();

    res.json({ message: 'Cliente deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar cliente' });
  }
};
