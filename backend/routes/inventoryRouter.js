const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const inventoryController = require("../controller/Inventory/inventoryController");

router.post("/add", inventoryController.addItemInventory);
router.put("/update-item/:itemId", inventoryController.updateItem);
router.get("/display", inventoryController.getInventoryItems);
router.get("/history", inventoryController.getHistory);
router.put("/add-quantity/:itemId", inventoryController.addQuantityToItem);
router.put("/disburse/:itemId", inventoryController.disburseItem);
router.get("/disbursements", inventoryController.getDisbursements);
router.get("/notifications", inventoryController.getNotifications);
router.get("/expired", inventoryController.getExpiredItems);

router.post(
  "/notify-upcoming-expirations",
  inventoryController.notifyUpcomingExpirations
);

router.delete("/remove-expired", inventoryController.removeExpiredItems);

module.exports = router;
