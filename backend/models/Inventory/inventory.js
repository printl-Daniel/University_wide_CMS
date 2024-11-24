// models/Inventory.js
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemId: { type: String, required: true },
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitOfMeasure: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  supplier: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  costPerUnit: { type: Number, required: true },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
 