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
  // threshold: {  // Add threshold to monitor low stock
  //   type: Number,
  //   required: true,
  //   default: 5  // You can set a default threshold value
  // },
  isArchived: { // New field to mark items as archived
    type: Boolean,
    default: false // Default value is false (not archived)
  }


}, { timestamps: true }); 

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
