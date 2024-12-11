const Inventory = require("../../models/Inventory/inventory.js");
const History = require("../../models/Inventory/history.js");
const Audit = require("../../models/Inventory/audit.js");
const Disburse = require("../../models/Inventory/disbursement.js")
const Notification = require("../../models/Inventory/notification.js");
const mongoose = require("mongoose");

// Add Item to Inventory
exports.addItemInventory = async (req, res) => {
  const {
    itemId,
    itemName,
    category,
    unitOfMeasure,
    expirationDate,
    supplier,
    purchaseDate,
    responsiblePerson,
  } = req.body;

  if (
    !itemId ||
    !itemName ||
    !category ||
    !unitOfMeasure ||
    !expirationDate ||
    !supplier ||
    !purchaseDate
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newItem = new Inventory({
      itemId,
      itemName,
      category,
      quantity: req.body.quantity || 0,
      unitOfMeasure,
      expirationDate,
      supplier,
      purchaseDate,
    });

    await newItem.save();

    const historyEntry = new History({
      transactionId: newItem._id,
      transactionDate: new Date(),
      itemName: newItem.itemName,
      actionType: "Added",
      quantityChanged: 0,
      remainingQuantity: 0,
      responsiblePerson: responsiblePerson || "Admin",
      reasonForAction: "Initial stock",
      supplier: newItem.supplier,
    });

    await historyEntry.save();

    res.status(201).json({
      message: "Item added to inventory and history logged successfully!",
      item: newItem,
      history: historyEntry,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error adding item to inventory",
      error: error.message,
    });
  }
};

exports.updateItemInventory = async (req, res) => {
  const { itemId } = req.params;
  const {
    itemName,
    category,
    unitOfMeasure,
    expirationDate,
    supplier,
    purchaseDate,
    responsiblePerson,
  } = req.body;

  if (!itemId || !itemName || !category || !unitOfMeasure || !expirationDate || !supplier || !purchaseDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Find the item by itemId
    const item = await Inventory.findOne({ itemId });

    if (!item) {
      return res.status(404).json({ message: "Item not found in inventory" });
    }

    // Update the item details (excluding quantity)
    item.itemName = itemName;
    item.category = category;
    item.unitOfMeasure = unitOfMeasure;
    item.expirationDate = expirationDate;
    item.supplier = supplier;
    item.purchaseDate = purchaseDate;

    await item.save();

    // Log the update in history
    const historyEntry = new History({
      transactionId: new mongoose.Types.ObjectId(),
      transactionDate: new Date(),
      itemName: item.itemName,
      actionType: "Updated",
      quantityChanged: 0,
      remainingQuantity: item.quantity, // Ensure quantity remains unchanged
      responsiblePerson: responsiblePerson || "Admin",
      reasonForAction: "Item details updated (Quantity not editable)",
      supplier: item.supplier,
    });

    await historyEntry.save();

    res.status(200).json({
      message: "Item updated successfully!",
      item,
      history: historyEntry,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating item",
      error: error.message,
    });
  }
};

// Add Quantity to an Existing Item
exports.addQuantityToItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantityToAdd, responsiblePerson } = req.body;

  if (quantityToAdd === undefined || !responsiblePerson) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const item = await Inventory.findOne({ itemId });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.quantity += quantityToAdd;
    await item.save();

    const newTransactionId = new mongoose.Types.ObjectId();

    const historyEntry = new History({
      transactionId: newTransactionId,
      transactionDate: new Date(),
      itemName: item.itemName,
      actionType: "Quantity Added",
      quantityChanged: +quantityToAdd,
      remainingQuantity: item.quantity,
      responsiblePerson,
      reasonForAction: `Quantity added by ${quantityToAdd} units`,
      supplier: item.supplier,
    });

    await historyEntry.save();

    res.status(200).json({
      message: "Quantity added successfully!",
      item,
      history: historyEntry,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding quantity", error: error.message });
  }
};

// Get Inventory History
exports.getHistory = async (req, res) => {
  try {
    const historyEntries = await History.find().sort({ transactionDate: -1 });
    res.status(200).json({
      success: true,
      data: historyEntries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch history entries",
    });
  }
};


exports.getInventoryItems = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find(); 

    const lowStockItems = inventoryItems.filter(item => item.quantity < item.threshold);
    if (lowStockItems.length > 0) {
      for (let item of lowStockItems) {
        // Create a notification for low stock items
        const notification = new Notification({
          message: `Low stock alert: ${item.itemName} has reached a quantity below threshold (${item.quantity})`,
          itemId: item.itemId,
        });

        await notification.save();
      }
    }
    res.status(200).json({
      success: true,
      data: inventoryItems,
      lowStockItems: lowStockItems,
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({});
  }
};


exports.disburseItem = async (req, res) => {
  const { itemId } = req.params; // Identify the item in inventory
  const { quantityToDisburse, patientName, reason, college} = req.body;

  if (!quantityToDisburse || !patientName || !reason || !college) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Fetch the inventory item
    const item = await Inventory.findOne({ itemId });

    if (!item) {
      return res.status(404).json({ message: "Item not found in inventory" });
    }

    // Check if sufficient quantity is available
    if (item.quantity < quantityToDisburse) {
      return res.status(400).json({ message: "Insufficient stock for disbursement" });
    }

    // Deduct the quantity
    item.quantity -= quantityToDisburse;
    const updatedItem = await item.save();

    // Record the disbursement
    const disbursement = new Disburse({
      itemName: item.itemName,
      quantity: quantityToDisburse,
      patientName,
      reason,
      college,
    });

    await disbursement.save();

    // Log the action in history
    const historyEntry = new History({
      transactionId: new mongoose.Types.ObjectId(),
      transactionDate: new Date(),
      itemName: item.itemName,
      actionType: "Disbursed",
      quantityChanged: -quantityToDisburse,
      remainingQuantity: item.quantity,
      responsiblePerson: "Admin",
      reasonForAction: `Disbursed to ${patientName}`,
      supplier: item.supplier,
    });

    await historyEntry.save();

    res.status(200).json({
      message: "Disbursement recorded successfully!",
      disbursement,
      item: updatedItem,
      history: historyEntry,
    });
  } catch (error) {
    console.error("Error disbursing item:", error);
    res.status(500).json({
      message: "Error disbursing item",
      error: error.message,
    });
  }
};

exports.getDisbursements = async (req, res) => {
  try {
    const disbursements = await Disburse.find().sort({ date: -1 }); // Sort by most recent
    res.status(200).json(disbursements);
  } catch (error) {
    console.error("Error fetching disbursements:", error);
    res.status(500).json({ message: "Error fetching disbursements", error: error.message });
  }
};

