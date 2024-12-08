const Inventory = require("../../models/Inventory/inventory.js");
const History = require("../../models/Inventory/history.js");
const Audit = require("../../models/Inventory/audit.js");
const ClinicVisitLog = require("../../models/Clinic/clinicVisitLog.js");
const mongoose = require("mongoose");

// Add Item to Inventory
exports.addItemInventory = async (req, res) => {
  const {
    itemId,
    itemName,
    category,
    unitOfMeasure,
    expirationDate,
    supplier,
    purchaseDate,
    responsiblePerson,
  } = req.body;

  if (
    !itemId ||
    !itemName ||
    !category ||
    !unitOfMeasure ||
    !expirationDate ||
    !supplier ||
    !purchaseDate
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newItem = new Inventory({
      itemId,
      itemName,
      category,
      quantity: req.body.quantity || 0,
      unitOfMeasure,
      expirationDate,
      supplier,
      purchaseDate,
    });

    await newItem.save();

    const historyEntry = new History({
      transactionId: newItem._id,
      transactionDate: new Date(),
      itemName: newItem.itemName,
      actionType: "Added",
      quantityChanged: 0,
      remainingQuantity: 0,
      responsiblePerson: responsiblePerson || "Admin",
      reasonForAction: "Initial stock",
      supplier: newItem.supplier,
    });

    await historyEntry.save();

    res.status(201).json({
      message: "Item added to inventory and history logged successfully!",
      item: newItem,
      history: historyEntry,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error adding item to inventory",
      error: error.message,
    });
  }
};

// Log Clinic Visit
exports.logClinicVisit = async (req, res) => {
  const {
    controlNo,
    nameOfPatient,
    course,
    year,
    grade,
    enrolee,
    transferee,
    visitor,
    chiefComplaint,
    treatmentOrMedication,
    remarks,
  } = req.body;

  if (
    !controlNo ||
    !nameOfPatient ||
    !chiefComplaint ||
    !treatmentOrMedication
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newVisitLog = new ClinicVisitLog({
      controlNo,
      nameOfPatient,
      internal: { course, year, grade },
      external: {
        enrolee: enrolee || false,
        transferee: transferee || false,
        visitor: visitor || false,
      },
      chiefComplaint,
      treatmentOrMedication,
      remarks,
    });

    await newVisitLog.save();

    res.status(201).json({
      message: "Clinic visit logged successfully!",
      visitLog: newVisitLog,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error logging clinic visit", error: error.message });
  }
};

// Get All Clinic Visit Logs
exports.getClinicVisitLogs = async (req, res) => {
  try {
    const visitLogs = await ClinicVisitLog.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      data: visitLogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch clinic visit logs",
    });
  }
};

// // Log Clinic Visit
// exports.logClinicVisit = async (req, res) => {
//   const {
//     controlNo,
//     nameOfPatient,
//     course,
//     year,
//     grade,
//     enrolee,
//     transferee,
//     visitor,
//     chiefComplaint,
//     treatmentOrMedication,
//     remarks,
//   } = req.body;

//   if (
//     !controlNo ||
//     !nameOfPatient ||
//     !chiefComplaint ||
//     !treatmentOrMedication
//   ) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     // const newVisitLog = new ClinicVisitLog({
//     //   controlNo,
//     //   nameOfPatient,
//     //   internal: { course, year, grade },
//     //   external: {
//     //     enrolee: enrolee || false,
//     //     transferee: transferee || false,
//     //     visitor: visitor || false,
//     //   },
//     //   chiefComplaint,
//     //   treatmentOrMedication,
//     //   remarks,
//     // });

//     await newVisitLog.save();

//     res.status(201).json({
//       message: "Clinic visit logged successfully!",
//       visitLog: newVisitLog,
//     });
//   } catch (error) {
//     res
//       .status(400)
//       .json({ message: "Error logging clinic visit", error: error.message });
//   }
// };

// // Get All Clinic Visit Logs
// exports.getClinicVisitLogs = async (req, res) => {
//   try {
//     const visitLogs = await ClinicVisitLog.find().sort({ date: -1 });
//     res.status(200).json({
//       success: true,
//       data: visitLogs,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch clinic visit logs",
//     });
//   }
// };

// Add Quantity to an Existing Item
exports.addQuantityToItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantityToAdd, responsiblePerson } = req.body;

  if (quantityToAdd === undefined || !responsiblePerson) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const item = await Inventory.findOne({ itemId });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.quantity += quantityToAdd;
    await item.save();

    const newTransactionId = new mongoose.Types.ObjectId();

    const historyEntry = new History({
      transactionId: newTransactionId,
      transactionDate: new Date(),
      itemName: item.itemName,
      actionType: "Quantity Added",
      quantityChanged: quantityToAdd,
      remainingQuantity: item.quantity,
      responsiblePerson,
      reasonForAction: `Quantity added by ${quantityToAdd} units`,
      supplier: item.supplier,
    });

    await historyEntry.save();

    res.status(200).json({
      message: "Quantity added successfully!",
      item,
      history: historyEntry,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding quantity", error: error.message });
  }
};

// Get Inventory History
exports.getHistory = async (req, res) => {
  try {
    const historyEntries = await History.find().sort({ transactionDate: -1 });
    res.status(200).json({
      success: true,
      data: historyEntries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch history entries",
    });
  }
};
