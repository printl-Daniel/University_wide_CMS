const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  itemId: {
    type: String,
    required: true,
    unique: true,
    index: true, // Create an index for faster lookups
  },
  itemName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true, // Mark category as required
  },
  quantity: {
    type: Number,
    required: true,
    min: 0, // Ensure quantity cannot be negative
  },
  unit: {
    type: String,
    required: true, // Mark unit as required
  },
  threshold: {
    type: Number,
    default: 5, // Minimum stock level before reordering
    min: 0, // Ensure threshold cannot be negative
  },
  lastRestocked: {
    type: Date,
    default: Date.now, // Date when the item was last restocked
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensure price cannot be negative
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