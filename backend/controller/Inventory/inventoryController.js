const Inventory = require('../../models/Inventory/inventory.js');
const History = require('../../models/Inventory/history.js'); 
const Audit = require('../../models/Inventory/audit.js');
const Disburse = require('../../models/Inventory/disbursement.js');
const mongoose = require('mongoose');
// const cron = require('node-cron');


// Cron job to check for medicines expiring in the next 7 days
// cron.schedule('* * * * *', async () => {
//   try {
//     const today = new Date();
//     const warningPeriod = 7; // Medicines expiring within 7 days

//     // Find medicines that are about to expire within 7 days
//     const expiringMedicines = await Medicine.find({
//       expiryDate: {
//         $gte: today,
//         $lt: new Date(today.getTime() + warningPeriod * 24 * 60 * 60 * 1000), // +7 days
//       },
//     });

//     // If you want to log the expiring medicines or send notifications:
//     console.log("Expiring medicines:", expiringMedicines);

//     // Optionally, send an email notification, or any other form of notification
//   } catch (error) {
//     console.error("Error checking expiring medicines:", error);
//   }
// });

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
    responsiblePerson 
  } = req.body;

  if (!itemId || !itemName || !category || !unitOfMeasure || !expirationDate || !supplier || !purchaseDate) {
    return res.status(400).json({ message: 'Missing required fields' });
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
      actionType: 'Added',
      quantityChanged: 0,
      remainingQuantity: 0,
      responsiblePerson: responsiblePerson || 'Admin',
      reasonForAction: 'Initial stock',
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


// Add Quantity to an Existing Item
exports.addQuantityToItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantityToAdd, responsiblePerson } = req.body;

  if (quantityToAdd === undefined || !responsiblePerson) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const item = await Inventory.findOne({ itemId });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.quantity += quantityToAdd;
    await item.save();

    const newTransactionId = new mongoose.Types.ObjectId();

    const historyEntry = new History({
      transactionId: newTransactionId,
      transactionDate: new Date(),
      itemName: item.itemName,
      actionType: 'Quantity Added',
      quantityChanged: quantityToAdd,
      remainingQuantity: item.quantity,
      responsiblePerson,
      reasonForAction: `Quantity added by ${quantityToAdd} units`,
      supplier: item.supplier,
    });

    await historyEntry.save();

    res.status(200).json({
      message: 'Quantity added successfully!',
      item,
      history: historyEntry,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error adding quantity', error: error.message });
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
      message: 'Failed to fetch history entries',
    });
  }
};

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
    });
  }
};




exports.disburseItem = async (req, res) => {
  const { itemId, quantity, patientName, reason, college, responsiblePerson } = req.body;

  if (!itemId || !quantity || !patientName || !reason || !college || !responsiblePerson) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Fetch the item from the inventory using itemId
    const item = await Inventory.findOne({ itemId });

    if (!item) {
      return res.status(404).json({ message: 'Item not found in inventory' });
    }

    // Check if the quantity requested is less than or equal to the available quantity
    if (item.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock for disbursement' });
    }

    // Reduce the quantity from the inventory
    item.quantity -= quantity;
    await item.save();

    // Log the disbursement action in the Disbursement model
    const disbursementEntry = new Disbursement({
      itemId,
      itemName: item.itemName,
      quantity,
      patientName,
      reason,
      college,
      responsiblePerson,
      date: new Date(),
    });

    await disbursementEntry.save();

    // Log the disbursement action in the History model for auditing
    const historyEntry = new History({
      transactionId: new mongoose.Types.ObjectId(),
      transactionDate: new Date(),
      itemName: item.itemName,
      actionType: 'Disbursement',
      quantityChanged: -quantity, // Negative quantity since it is a reduction
      remainingQuantity: item.quantity,
      responsiblePerson,
      reasonForAction: reason,
      supplier: item.supplier,
    });

    await historyEntry.save();

    res.status(200).json({
      message: 'Item successfully disbursed!',
      disbursement: disbursementEntry,
      history: historyEntry,
    });
  } catch (error) {
    console.error('Error during disbursement:', error);
    res.status(500).json({
      message: 'Server error during disbursement process.',
    });
  }
};


