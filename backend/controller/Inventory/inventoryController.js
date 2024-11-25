const Inventory = require('../../models/Inventory/inventory.js')
const History = require('../../models/Inventory/history.js'); 
const Audit = require('../../models/Inventory/audit.js');

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
  
  // Create Audit Entry
  // exports.createAuditEntry = async (req, res) => {
  //   const { itemId, itemName, quantityOnRecord, quantityCounted, discrepancy, reasonForDiscrepancy, auditFindings, actionTaken } = req.body;
  
  //   try {
  //     const auditEntry = new Audit({
  //     //  auditId: uuidv4(),
  //       auditDate: new Date(),
  //       auditName: 'Quarterly Audit',
  //       itemId,
  //       itemName,
  //       quantityOnRecord,
  //       quantityCounted,
  //       discrepancy,
  //       reasonForDiscrepancy,
  //       auditFindings,
  //       actionTaken
  //     });
  
  //     await auditEntry.save();
  
  //     res.status(201).json({
  //       message: 'Audit entry saved successfully!',
  //       audit: auditEntry
  //     });
  //   } catch (err) {
  //     res.status(400).json({ message: 'Error saving audit entry', error: err.message });
  //   }
  // };
  
  // // Get All Inventory Items
  exports.getInventoryItems = async (req, res) => {
    try {
      const inventoryItems = await Inventory.find();  // Retrieve all items from DB
      res.status(200).json({
      });
    } catch (error) {
      console.error("Error fetching items:", error);
      res.status(500).json({
      });
    }
  };
  
  // // Get All History Entries
  // exports.getAllHistory = async (req, res) => {
  //   try {
  //     const history = await History.find();
  //     res.status(200).json({ history });
  //   } catch (err) {
  //     res.status(400).json({ message: 'Error fetching history logs', error: err.message });
  //   }
  // };
  
  // // Get All Audit Entries
  // exports.getAllAudits = async (req, res) => {
  //   try {
  //     const audits = await Audit.find();
  //     res.status(200).json({ audits });
  //   } catch (err) {
  //     res.status(400).json({ message: 'Error fetching audit logs', error: err.message });
  //   }
  // };