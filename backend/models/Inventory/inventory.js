const mongoose = require('mongoose');

// Inventory Model
const inventorySchema = new mongoose.Schema({
  itemId: { 
    type: String, // Custom itemId as a string (e.g., '001-PA500')
    required: true,
    unique: true, // Ensure itemId is unique
  },
  itemName: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true,
    default: 0
  },
  unitOfMeasure: { 
    type: String, 
    required: true 
  },
  expirationDate: { 
    type: Date, 
    required: true 
  },
  supplier: { 
    type: String, 
    required: true 
  },
  purchaseDate: { 
    type: Date, 
    required: true 
  },
  threshold: {  // Add threshold to monitor low stock
    type: Number,
    required: true,
    default: 5  // You can set a default threshold value
  },
}, { timestamps: true });  // Optionally add timestamps to track createdAt and updatedAt

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
