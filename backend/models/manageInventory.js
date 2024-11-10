const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true, // Ensure productId is unique (like a barcode)
    trim: true,
  },
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: ['medicine', 'medical supply', 'equipment'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ['in-stock', 'out-of-stock', 'discontinued'],
    default: 'in-stock',
  },
  history: [
    {
      action: {
        type: String,
        enum: ['added', 'quantity-updated', 'updated'],
        required: true,
      },
      previousQuantity: {
        type: Number,
      },
      newQuantity: {
        type: Number,
      },
      quantityChange: {
        type: Number,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: true,
      },
    },
  ],
}, {
  timestamps: true,
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;
