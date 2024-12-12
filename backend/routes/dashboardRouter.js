const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/Inventory/dashboardController");

//DANIEL
router.get("/total-items", dashboardController.getTotalItems);
router.get(
  "/near-expiry-count",
  dashboardController.getExpiringSoonProductCount
);
router.get("/total-low-items-count", dashboardController.getLowStockItemCount);
router.get("/items-need-attention", dashboardController.itemsNeedAttention);

module.exports = router;
