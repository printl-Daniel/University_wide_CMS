const Inventory = require('../models/manageInventory');

exports.addInventoryItem = async (req, res) => {
  try {
    // Create a new inventory item based on the data sent in the request body
    const addItem = new Inventory({
      itemId: req.body.itemId,
      itemName: req.body.itemName,
      category: req.body.category,
      quantity: req.body.quantity,
      unit: req.body.unit,
      threshold: req.body.threshold,
      price: req.body.price
    });
    // Save the new item to the database
    await addItem.save();
    res.status(201).json({
      message: 'Item added successfully!',
      item: addItem
    });

  } catch (error) {
    res.status(400).json({
      message: 'Error adding item',
      error: error.message
    });
  }
};

exports.gettAllItems = async (req, res) => {
  try {
    const allItems = await Inventory.find();
    res.status(200).json({
      message: 'Inventory items retrieved successfully',
      items: allItems
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error fetching inventory items',
      error: error.message
    });
  }
}

exports.updateItem = async (req, res) => {
  const { itemId } = req.params;
  const updateItem = req.body;

  try {
    const updatedItem = await Inventory.findOneAndUpdate({ itemId }, updateItem, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(400).json({ message: 'Error updating item', error: error.message });
  }
};
