const mongoose = require('mongoose');

// Inventory Model
const inventorySchema = new mongoose.Schema({
  itemId: { 
    type: String, 
    required: true,
    unique: true, 
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
  status: { type: String, enum: ['active', 'archived'], default: 'active' },

}, { timestamps: true }); 

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
