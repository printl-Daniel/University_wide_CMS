const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  itemId: {
    type: String,
    required: true,
    unique: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Medicine', 'Equipment', 'Medical Supply'], // Possible categories
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: ['Box', 'Bottle', 'Pack'], // Possible units
  },
  threshold: {
    type: Number,
    default: 5, // Minimum stock level before reordering
  },
  lastRestocked: {
    type: Date,
    default: Date.now, // Date when the item was last restocked
  },
  status: {
    type: String,
    enum: ['In Stock', 'Out of Stock', 'Discontinued'],
    default: 'In Stock',
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically update the last updated date
  },
});

// Middleware to update `updatedAt` on every document modification
inventorySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create model
const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
