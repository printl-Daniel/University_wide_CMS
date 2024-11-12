const Inventory = require('../models/manageInventory');

exports.addInventoryItem = async (req, res) => {
  try {
    // Create a new inventory item based on the data sent in the request body
    const newItem = new Inventory({
      itemId: req.body.itemId,
      itemName: req.body.itemName,
      category: req.body.category,
      quantity: req.body.quantity,
      unit: req.body.unit,
      threshold: req.body.threshold || 5,
      status: req.body.status || 'In-Stock', 
    });
    // Save the new item to the database
    await newItem.save();
    res.status(201).json({
      message: 'Item added successfully!',
      item: newItem
    });

  } catch (error) {
    res.status(400).json({
      message: 'Error adding item',
      error: error.message
    });
  }
};


