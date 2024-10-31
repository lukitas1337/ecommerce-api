// routes/categoryRouter.js
const express = require('express');
const categoryController = require('../controllers/categories');
const router = express.Router();

// GET /categories - Fetch all categories
router.get('/', categoryController.getAllCategories);

// POST /categories - Create a new category
router.post('/', categoryController.createCategory);

// GET /categories/:id - Get a category by ID
router.get('/:id', categoryController.getCategoryById);

// PUT /categories/:id - Update a category by ID
router.put('/:id', categoryController.updateCategory);

// DELETE /categories/:id - Delete a category by ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
