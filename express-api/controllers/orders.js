const Order = require('../models/Order');
const Product = require('../models/Product');

// GET /orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// GET /orders/:id
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

// POST /orders
exports.createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Validate products and calculate total price
    let total = 0;
    const validProducts = [];
    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(400).json({ error: `Product ID ${item.productId} does not exist` });
      }
      total += product.price * item.quantity; // Calculate total price
      validProducts.push(item);
    }

    const order = await Order.create({ userId, products: validProducts, total });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// PUT /orders/:id
exports.updateOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Validate products and calculate new total price
    let total = 0;
    const validProducts = [];
    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(400).json({ error: `Product ID ${item.productId} does not exist` });
      }
      total += product.price * item.quantity; // Calculate total price
      validProducts.push(item);
    }

    await order.update({ userId, products: validProducts, total });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// DELETE /orders/:id
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
