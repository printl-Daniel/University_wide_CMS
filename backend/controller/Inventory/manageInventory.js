const Inventory = require('../../models/Inventory/inventory.js')
const History = require('../../models/Inventory/history.js'); 
const Audit = require('../../models/Inventory/audit.js');

exports.addItemInventory = async (req, res) =>{
    const { itemId, 
        itemName, 
        category, 
        quantity, 
        unitOfMeasure, 
        expirationDate, 
        supplier, 
        purchaseDate, 
        costPerUnit, 
        responsiblePerson } = req.body;

        try{
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

              const historyEntry = new History({
              //  transactionId: uuidv4(),
                transactionDate: new Date(),
                itemName: newItem.itemName,
                actionType: 'Added',  // Default action type for adding inventory
                quantityChanged: quantity,
                remainingQuantity: quantity,  // After addition, quantity is the same
                responsiblePerson: responsiblePerson || 'Unknown',  // If no person specified, default to 'Unknown'
                reasonForAction: 'Initial stock',  // Default reason for adding item
                supplier: newItem.supplier
              });

              await historyEntry.save();

              res.status(201).json({
                message: 'Item added to inventory and history logged successfully!',
                item: newItem,
                history: historyEntry
              });
        } catch (error) {
            res.status(400).json({ message: 'Error adding item to inventory', error: err.message });
        }
        
}

exports.logHistory = async (req, res) => {
    const { itemName, actionType = 'Added', quantityChanged, remainingQuantity, responsiblePerson, reasonForAction, supplier } = req.body;
  
    try {
      const historyEntry = new History({
       // transactionId: uuidv4(),
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
  exports.createAuditEntry = async (req, res) => {
    const { itemId, itemName, quantityOnRecord, quantityCounted, discrepancy, reasonForDiscrepancy, auditFindings, actionTaken } = req.body;
  
    try {
      const auditEntry = new Audit({
      //  auditId: uuidv4(),
        auditDate: new Date(),
        auditName: 'Quarterly Audit',
        itemId,
        itemName,
        quantityOnRecord,
        quantityCounted,
        discrepancy,
        reasonForDiscrepancy,
        auditFindings,
        actionTaken
      });
  
      await auditEntry.save();
  
      res.status(201).json({
        message: 'Audit entry saved successfully!',
        audit: auditEntry
      });
    } catch (err) {
      res.status(400).json({ message: 'Error saving audit entry', error: err.message });
    }
  };
  
  // Get All Inventory Items
  exports.getAllInventoryItems = async (req, res) => {
    try {
      const inventory = await Inventory.find();
      res.status(200).json({ inventory });
    } catch (err) {
      res.status(400).json({ message: 'Error fetching inventory items', error: err.message });
    }
  };
  
  // Get All History Entries
  exports.getAllHistory = async (req, res) => {
    try {
      const history = await History.find();
      res.status(200).json({ history });
    } catch (err) {
      res.status(400).json({ message: 'Error fetching history logs', error: err.message });
    }
  };
  
  // Get All Audit Entries
  exports.getAllAudits = async (req, res) => {
    try {
      const audits = await Audit.find();
      res.status(200).json({ audits });
    } catch (err) {
      res.status(400).json({ message: 'Error fetching audit logs', error: err.message });
    }
  };