const Product = require('../models/Product');

// Criar produto
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image
    });

    res.status(201).json({
      message: 'Produto criado com sucesso',
      product
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

// Listar produtos
exports.listProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category } : {};
    
    const products = await Product.findAll({ where });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
};

// Obter produto por ID
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter produto' });
  }
};

// Atualizar produto
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, available } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (image) product.image = image;
    if (available !== undefined) product.available = available;

    await product.save();

    res.json({
      message: 'Produto atualizado com sucesso',
      product
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

// Deletar produto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await product.destroy();

    res.json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};
