const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');

// Gerar número de pedido único
const generateOrderNumber = async () => {
  const date = new Date();
  const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  const count = await Order.count({ where: {} });
  return `PED${dateStr}${String(count + 1).padStart(5, '0')}`;
};

// Criar pedido
exports.createOrder = async (req, res) => {
  try {
    const { customerId, items, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Pedido deve ter itens' });
    }

    let totalAmount = 0;
    const orderNumber = await generateOrderNumber();

    const order = await Order.create({
      orderNumber,
      customerId,
      totalAmount: 0,
      notes
    });

    // Criar itens do pedido
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        throw new Error(`Produto ${item.productId} não encontrado`);
      }

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        subtotal
      });
    }

    order.totalAmount = totalAmount;
    await order.save();

    res.status(201).json({
      message: 'Pedido criado com sucesso',
      order: {
        ...order.toJSON(),
        items
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
};

// Listar pedidos
exports.listOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};

    const orders = await Order.findAll({
      where,
      include: [
        {
          model: OrderItem,
          include: [Product]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar pedidos' });
  }
};

// Obter pedido por ID
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderItem,
          include: [Product]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter pedido' });
  }
};

// Atualizar status do pedido
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    order.status = status;
    await order.save();

    res.json({
      message: 'Status do pedido atualizado',
      order
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar pedido' });
  }
};

// Cancelar pedido
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    order.status = 'cancelado';
    await order.save();

    res.json({
      message: 'Pedido cancelado',
      order
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cancelar pedido' });
  }
};

// Deletar pedido
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    // Deletar itens associados
    await OrderItem.destroy({ where: { orderId: order.id } });
    await order.destroy();

    res.json({ message: 'Pedido deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar pedido' });
  }
};
