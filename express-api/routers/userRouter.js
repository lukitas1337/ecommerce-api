// express-api/routers/userRouter.js
const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();

// Define routes and attach the corresponding controller functions
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
