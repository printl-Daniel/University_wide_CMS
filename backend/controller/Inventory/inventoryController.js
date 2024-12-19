const Inventory = require("../../models/Inventory/inventory.js");
const History = require("../../models/Inventory/history.js");
const Audit = require("../../models/Inventory/audit.js");
const Disburse = require("../../models/Inventory/disbursement.js");
const Notification = require("../../models/Inventory/notification.js");
const mongoose = require("mongoose");

// Add Item to Inventory
exports.addItemInventory = async (req, res) => {
  const {
    itemId,
    itemName,
    category,
    expirationDate,
    supplier,
    purchaseDate,
    responsiblePerson,
  } = req.body;

  if (
    !itemId ||
    !itemName ||
    !category ||
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

// Update Item in Inventory
exports.updateItem = async (req, res) => {
  const { itemId } = req.params; // Get itemId from request parameters
  const {
    itemName,
    category,
    expirationDate,
    supplier,
    purchaseDate,
    quantity,
  } = req.body; 


  if (!itemId) {
    return res.status(400).json({ message: "Item ID is required." });
  }

  try {
    // Find the item in the inventory
    const item = await Inventory.findOne({ itemId });

    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    // Update item fields if provided
    if (itemName) item.itemName = itemName;
    if (category) item.category = category;
    if (expirationDate) item.expirationDate = expirationDate;
    if (supplier) item.supplier = supplier;
    if (purchaseDate) item.purchaseDate = purchaseDate;
    if (quantity !== undefined) item.quantity = quantity; // Update quantity only if provided

    // Save the updated item
    await item.save();

    // Log the update in history
    const historyEntry = new History({
      transactionId: new mongoose.Types.ObjectId(),
      transactionDate: new Date(),
      itemName: item.itemName,
      actionType: "Updated",
      quantityChanged: 0, // No quantity change in this case
      remainingQuantity: item.quantity,
      responsiblePerson: "Admin", 
      reasonForAction: "Item details updated",
      supplier: item.supplier,
    });

    await historyEntry.save();

    res.status(200).json({
      message: "Item updated successfully!",
      item,
      history: historyEntry,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({
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
    const items = await Inventory.find({ status: 'active' }); // Only fetch active items
    res.status(200).json({ data: items });
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory items", error: error.message });
  }
};

exports.disburseItem = async (req, res) => {
  const { itemId } = req.params; // Identify the item in inventory
  const { quantityToDisburse, patientName, reason, college } = req.body;

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
      return res
        .status(400)
        .json({ message: "Insufficient stock for disbursement" });
    }

    // Deduct the quantity
    item.quantity -= quantityToDisburse;
    const updatedItem = await item.save();

    // Record the disbursement with itemId
    const disbursement = new Disburse({
      itemId: item.itemId, // Save the itemId here
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
    res
      .status(500)
      .json({ message: "Error fetching disbursements", error: error.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ status: "unread" }).sort({
      date: -1,
    }); // Fetch latest notifications
    res.status(200).json({
      success: true,
      notifications: notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res
      .status(500)
      .json({ message: "Error fetching notifications", error: error.message });
  }
};

exports.getExpiredItems = async (req, res) => {
  try {
    const today = new Date();
    const expiredItems = await Inventory.find({
      expirationDate: { $lt: today },
    });

    res.status(200).json({
      success: true,
      expiredItems,
    });
  } catch (error) {
    console.error("Error fetching expired items:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch expired items",
      error: error.message,
    });
  }
};

exports.notifyUpcomingExpirations = async (req, res) => {
  try {
    const today = new Date();
    const upcomingThreshold = new Date();
    upcomingThreshold.setDate(today.getDate() + 7); // Notify for items expiring in the next 7 days

    const itemsToExpire = await Inventory.find({
      expirationDate: { $gte: today, $lte: upcomingThreshold },
    });

    for (const item of itemsToExpire) {
      const notification = new Notification({
        message: `Item "${
          item.itemName
        }" is nearing expiration (expires on ${item.expirationDate.toDateString()})`,
        itemId: item.itemId,
      });
      await notification.save();
    }

    res.status(200).json({
      success: true,
      message: "Notifications for upcoming expirations sent successfully",
    });
  } catch (error) {
    console.error("Error notifying upcoming expirations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to notify upcoming expirations",
      error: error.message,
    });
  }
};

// Remove Expired Items
exports.removeExpiredItems = async (req, res) => {
  try {
    const today = new Date();
    const expiredItems = await Inventory.find({
      expirationDate: { $lt: today },
    });

    if (expiredItems.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No expired items to remove",
      });
    }

    for (const item of expiredItems) {
      await item.remove();

      // Optional: Log removal in history
      const historyEntry = new History({
        transactionId: new mongoose.Types.ObjectId(),
        transactionDate: new Date(),
        itemName: item.itemName,
        actionType: "Removed (Expired)",
        quantityChanged: -item.quantity,
        remainingQuantity: 0,
        responsiblePerson: "System",
        reasonForAction: "Expired",
        supplier: item.supplier,
      });
      await historyEntry.save();
    }

    res.status(200).json({
      success: true,
      message: "Expired items removed successfully",
    });
  } catch (error) {
    console.error("Error removing expired items:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove expired items",
      error: error.message,
    });
  }
};


exports.archiveItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const item = await Inventory.findOne({ itemId });

    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    item.status = 'archived'; // Update status to archived
    await item.save();

    res.status(200).json({ message: "Item archived successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error archiving item", error: error.message });
  }
};

exports.restoreItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const item = await Inventory.findOne({ itemId });

    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    item.status = 'active'; // Update status to active
    await item.save();

    res.status(200).json({ message: "Item restored successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error restoring item", error: error.message });
  }
};

exports.deleteArchivedItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    // Find the item to be deleted
    const item = await Inventory.findOneAndDelete({ itemId });

    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    // Create a history entry for the deletion
    const historyEntry = new History({
      transactionId: new mongoose.Types.ObjectId(), // Create a new transaction ID
      transactionDate: new Date(),
      itemName: item.itemName,
      actionType: "Deleted",
      quantityChanged: 0, // No quantity change in this case
      remainingQuantity: 0, // Item is deleted, so remaining quantity is 0
      responsiblePerson: "Admin", // You can modify this to reflect the actual user
      reasonForAction: "Item deleted from inventory",
      supplier: item.supplier,
    });

    await historyEntry.save(); // Save the history entry

    res.status(200).json({ message: "Item deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error: error.message });
  }
};

exports.getArchivedItems = async (req, res) => {
  try {
    const archivedItems = await Inventory.find({ status: 'archived' });
    res.status(200).json({ success: true, data: archivedItems });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch archived items", error: error.message });
  }
};

exports.getDisbursementHistory = async (req, res) => {
  const { itemId } = req.params; 

  try {
    const disbursements = await Disburse.find({ itemId }).sort({ date: -1 }); // Sort by most recent
    res.status(200).json(disbursements);
  } catch (error) {
    console.error("Error fetching disbursement history:", error);
    res.status(500).json({
      message: "Error fetching disbursement history",
      error: error.message,
    });
  }
};