const express = require('express');
const router = express.Router();
const { addProduct, updateQuantity, getAllInventory, getProductById } = require('../controllers/manageInventoryController');

router.post('/add', addProduct);

// Route to update the quantity of an existing product
router.post('/update-quantity', updateQuantity);

// Route to fetch all inventory products
router.get('/', getAllInventory);

// Route to fetch a specific product by productId
router.get('/:productId', getProductById);

module.exports = router;