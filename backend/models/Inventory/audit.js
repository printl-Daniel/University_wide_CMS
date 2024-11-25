const mongoose = require('mongoose');

// Audit Model
const auditSchema = new mongoose.Schema({
  auditId: { 
    type: mongoose.Schema.Types.ObjectId, // MongoDB's auto-generated ObjectId as auditId
    required: true,
    unique: true, // Ensure uniqueness
    default: mongoose.Types.ObjectId // Automatically generates a unique ID
  },
  auditDate: { 
    type: Date, 
    required: true 
  },
  auditName: { 
    type: String, 
    required: true 
  },
  itemName: { 
    type: String, 
    required: true 
  },
  quantityOnRecord: { 
    type: Number, 
    required: true 
  },
  quantityCounted: { 
    type: Number, 
    required: true 
  },
  discrepancy: { 
    type: Number, 
    required: true 
  },
  reasonForDiscrepancy: { 
    type: String, 
    required: true 
  },
  auditFindings: { 
    type: String, 
    required: true 
  },
  actionTaken: { 
    type: String, 
    required: true 
  },
}, { timestamps: true }); // Optional: add timestamps for tracking creation time

const Audit = mongoose.model('Audit', auditSchema);

module.exports = Audit;
