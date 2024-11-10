const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // This can store the barcode or any unique identifier for the product (e.g., '1234567890')
  },
  productName: {
    type: String,
    required: true,
    trim: true,
    // Example: 'Paracetamol', 'Syringes', 'Bandages', 'Gloves'
  },
  description: {
    type: String,
    trim: true,
    // Description of the product, e.g., 'Pain reliever for fever and mild pain'
  },
  category: {
    type: String,
    enum: ['medicine', 'medical supply', 'equipment'],
    required: true,
    // Category of the product, e.g., 'medicine' or 'medical supply'
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
    // The number of items available in the inventory
  },
 
  expirationDate: {
    type: Date,
    // Expiration date for medicines or perishable supplies
  },

  status: {
    type: String,
    enum: ['in-stock', 'out-of-stock', 'discontinued'],
    default: 'in-stock',
    // The current status of the stock: 'in-stock', 'out-of-stock', or 'discontinued'
  },
  history: [
    {
      action: {
        type: String,
        enum: ['added', 'quantity-updated'], // Added 'quantity-updated' to reflect quantity changes
        required: true,
        // Record actions such as stock being added or updated
      },
      quantityChange: {
        type: Number,
        required: true,
        // Track how much stock was added (only quantity increases, no direct edits allowed)
      },
      date: {
        type: Date,
        default: Date.now,
        // Timestamp of the action
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: true,
        // Reference to the staff member who performed the action
      },
    },
  ],
}, {
  timestamps: true,
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
