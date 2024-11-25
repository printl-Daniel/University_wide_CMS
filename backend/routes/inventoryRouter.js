const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const inventoryController = require('../controller/Inventory/inventoryController');

router.post('/add', inventoryController.addItemInventory);
router.get('/display', inventoryController.getInventoryItems);


module.exports = router;
    