const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const inventoryController = require("../controller/Inventory/inventoryController");

router.post("/add", inventoryController.addItemInventory);
router.get("/display", inventoryController.getInventoryItems);
router.get("/history", inventoryController.getHistory);
router.put("/add-quantity/:itemId", inventoryController.addQuantityToItem);
router.put("/disburse/:itemId", inventoryController.disburseItem);
router.get("/disbursements", inventoryController.getDisbursements);
router.get("/notifications", inventoryController.getNotifications);



module.exports = router;
