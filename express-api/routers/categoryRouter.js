// routes/categoryRouter.js
const express = require('express');
const categoryController = require('../controllers/categories');
const router = express.Router();

router.get('/', categoryController.getAllCategories);

router.post('/', categoryController.createCategory);

router.get('/:id', categoryController.getCategoryById);

router.put('/:id', categoryController.updateCategory);

router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
