const { Order, OrderProduct } = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// GET /orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: Product, through: { attributes: ['quantity'] } }]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// GET /orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: Product, through: { attributes: ['quantity'] } }]
    });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// POST /orders
exports.createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(400).json({ error: 'User does not exist' });

    let total = 0;
    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      if (!product) return res.status(400).json({ error: `Product with ID ${item.productId} does not exist` });
      total += product.price * item.quantity;
    }

    const order = await Order.create({ userId, total });

    for (const item of products) {
      await OrderProduct.create({ orderId: order.id, productId: item.productId, quantity: item.quantity });
    }

    res.status(201).json({ ...order.toJSON(), products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// PUT /orders/:id
exports.updateOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (userId) {
      const user = await User.findByPk(userId);
      if (!user) return res.status(400).json({ error: 'User does not exist' });
      order.userId = userId;
    }

    let total = 0;
    await OrderProduct.destroy({ where: { orderId: order.id } });
    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      if (!product) return res.status(400).json({ error: `Product with ID ${item.productId} does not exist` });
      total += product.price * item.quantity;
      await OrderProduct.create({ orderId: order.id, productId: item.productId, quantity: item.quantity });
    }

    order.total = total;
    await order.save();

    res.json({ ...order.toJSON(), products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// DELETE /orders/:id
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
};
