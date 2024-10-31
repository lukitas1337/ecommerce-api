const express = require('express');
const orderController = require('../controllers/orders');
const router = express.Router();

// GET /orders
router.get('/', orderController.getAllOrders);

// POST /orders
router.post('/', orderController.createOrder);

// GET /orders/:id
router.get('/:id', orderController.getOrderById);

// PUT /orders/:id
router.put('/:id', orderController.updateOrder);

// DELETE /orders/:id
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
