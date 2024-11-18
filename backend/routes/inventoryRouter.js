const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const inventoryController = require('../controller/inventoryController');

router.post('/add-item', inventoryController.addInventoryItem);
router.get('/display-items', inventoryController.gettAllItems);
router.put('/update-item/:itemId', inventoryController.updateItem);


module.exports = router;
    