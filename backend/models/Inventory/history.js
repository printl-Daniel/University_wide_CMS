const mongoose = require('mongoose');

// History Model
const historySchema = new mongoose.Schema({
  transactionId: { 
    type: mongoose.Schema.Types.ObjectId,  // MongoDB auto-generated _id used as transactionId
    required: true,
  },
  transactionDate: { 
    type: Date, 
    required: true 
  },
  itemName: { 
    type: String, 
    required: true 
  },
  actionType: { 
    type: String, 
    required: true, 
  
  },
  quantityChanged: { 
    type: Number, 
    required: true 
  },
  remainingQuantity: { 
    type: Number, 
    required: true 
  },
  responsiblePerson: { 
    type: String, 
    required: true 
  },
  reasonForAction: { 
    type: String, 
    required: true 
  },
  supplier: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

const History = mongoose.model('History', historySchema);

module.exports = History;
