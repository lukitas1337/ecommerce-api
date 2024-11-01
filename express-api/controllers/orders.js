const Order = require('../models/Order');
const Product = require('../models/Product');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    let total = 0;
    const validProducts = [];
    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(400).json({ error: `Product ID ${item.productId} does not exist` });
      }
      total += product.price * item.quantity;
      validProducts.push(item);
    }

    const order = await Order.create({ userId, products: validProducts, total });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    let total = 0;
    const validProducts = [];
    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(400).json({ error: `Product ID ${item.productId} does not exist` });
      }
      total += product.price * item.quantity; 
      validProducts.push(item);
    }

    await order.update({ userId, products: validProducts, total });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
};
