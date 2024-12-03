const Item = require("./models/Item");
const StockReductionLog = require("./models/StockReductionLog");

// Example: Reducing stock
async function reduceStock(itemId, patientName, reason, college, quantity) {
  try {
    const item = await Item.findById(itemId);
    if (!item) {
      throw new Error("Item not found");
    }

    if (item.quantity < quantity) {
      throw new Error("Insufficient stock");
    }

    // Update the item's stock
    item.quantity -= quantity;
    await item.save();

    // Log the stock reduction
    const log = new StockReductionLog({
      item_id: item._id,
      patient_name: patientName,
      reason: reason,
      college: college,
      quantity: quantity,
    });
    await log.save();

    console.log("Stock reduced successfully and logged.");
  } catch (error) {
    console.error("Error reducing stock:", error.message);
  }
}

module.exports = reduceStock;
