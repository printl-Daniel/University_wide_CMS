const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const inventoryController = require('../controller/Inventory/inventoryController');

router.post('/add', inventoryController.addItemInventory);
router.get('/display', inventoryController.getInventoryItems);
router.get('/history', inventoryController.getHistory);
router.put('/add-quantity/:itemId', inventoryController.addQuantityToItem);
//router.post('/reduce-stock/:itemId', inventoryController.reduceQuantityFromItem);




module.exports = router;
    