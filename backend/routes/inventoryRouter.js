const express = require('express');
const router = express.Router();
const inventoryController = require('../controller/inventoryController');

// Route to add a new product
router.post('/add', inventoryController.addProduct);

// Route to update quantity
router.patch('/update-quantity', inventoryController.updateQuantity);

// Route to update product details
router.put('/update-product', inventoryController.updateProduct);

// Route to get all inventory products
router.get('/', inventoryController.getAllInventory);

router.get('/history/:productId', inventoryController.getProductHistory);

// Route to get a specific product by ID
//router.get('/:productId', inventoryController.getProductById);

module.exports = router;
