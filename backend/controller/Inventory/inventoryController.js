const Inventory = require('../../models/Inventory/inventory.js')
const History = require('../../models/Inventory/history.js'); 
const Audit = require('../../models/Inventory/audit.js');
const mongoose = require('mongoose');

exports.addItemInventory = async (req, res) => {
  const { 
    itemId, 
    itemName, 
    category, 
    quantity, 
    unitOfMeasure, 
    expirationDate, 
    supplier, 
    purchaseDate, 
    costPerUnit, 
    responsiblePerson 
  } = req.body;

  if (!itemId || !itemName || !category || !quantity || !unitOfMeasure || !expirationDate || !supplier || !purchaseDate || !costPerUnit) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Create new inventory item
    const newItem = new Inventory({
      itemId,
      itemName,
      category,
      quantity,
      unitOfMeasure,
      expirationDate,
      supplier,
      purchaseDate,
      costPerUnit
    });
    
    await newItem.save();

    // Create history entry after adding item
    const historyEntry = new History({
      transactionId: newItem._id,  // Using the newly created inventory item's _id as transactionId
      transactionDate: new Date(),
      itemName: newItem.itemName,
      actionType: 'Added',  // Action type is 'Added' for adding an item to inventory
      quantityChanged: quantity,
      remainingQuantity: quantity,  // Quantity is the same after addition
      responsiblePerson: responsiblePerson || 'Admin',  // Default to 'Admin' if no person specified
      reasonForAction: 'Initial stock',  // Reason for action
      supplier: newItem.supplier
    });

    await historyEntry.save();

    res.status(201).json({
      message: 'Item added to inventory and history logged successfully!',
      item: newItem,
      history: historyEntry
    });

  } catch (error) {
    res.status(400).json({ message: 'Error adding item to inventory', error: error.message });
  }
};


exports.logHistory = async (req, res) => {
    const { itemName, actionType, quantityChanged, remainingQuantity, responsiblePerson, reasonForAction, supplier } = req.body;
  
    try {
      const historyEntry = new History({
        transactionId: newItem._id,
        transactionDate: new Date(),
        itemName,
        actionType,
        quantityChanged,
        remainingQuantity,
        responsiblePerson,
        reasonForAction,
        supplier
      });
  
      await historyEntry.save();
  
      res.status(201).json({
        message: 'History logged successfully!',
        history: historyEntry
      });
    } catch (err) {
      res.status(400).json({ message: 'Error logging history', error: err.message });
    }
  };

  // // Get All Inventory Items
  exports.getInventoryItems = async (req, res) => {
    try {
      const inventoryItems = await Inventory.find();  // Retrieve all items from DB
      res.status(200).json({
        success: true,
        data: inventoryItems,
      });
    } catch (error) {
      console.error("Error fetching items:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch items",
      });
    }
  };
  
  
  

  // Add quantity to an existing item
// Inventory Controller
exports.addQuantityToItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantityToAdd, responsiblePerson } = req.body;

  if (quantityToAdd === undefined || !responsiblePerson) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Find the item in the inventory by itemId
    const item = await Inventory.findOne({ itemId });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Add the specified quantity to the existing quantity
    item.quantity += quantityToAdd;

    // Save the updated item in the database
    await item.save();

    // Generate a new transactionId to avoid conflicts
    const newTransactionId = new mongoose.Types.ObjectId();  // Generate a new ObjectId for the history

    // Create a history entry for this action
    const historyEntry = new History({
      transactionId: newTransactionId,  // Ensure it's a new transactionId every time
      transactionDate: new Date(),
      itemName: item.itemName,
      actionType: 'Quantity Added',  // Action type is 'Quantity Added' here
      quantityChanged: quantityToAdd,
      remainingQuantity: item.quantity,
      responsiblePerson: responsiblePerson,
      reasonForAction: `Quantity added by ${quantityToAdd} units`,
      supplier: item.supplier,
    });

    // Save the history entry
    await historyEntry.save();

    // Respond with a success message and the updated item and history
    res.status(200).json({
      message: 'Quantity added successfully!',
      item: item,
      history: historyEntry,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error adding quantity', error: error.message });
  }
};




exports.getHistory = async (req, res) => {
  try {
    // Retrieve all history entries from the History collection
    const historyEntries = await History.find().sort({ transactionDate: -1 }); // Sort by transaction date (most recent first)

    // Respond with the fetched history entries
    res.status(200).json({
      success: true,
      data: historyEntries,
    });
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch history entries",
    });
  }
};