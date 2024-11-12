const express = require('express');
const router = express.Router();
const inventoryController = require('../controller/inventoryController');

router.post('/add-item', inventoryController.addInventoryItem);


module.exports = router;
