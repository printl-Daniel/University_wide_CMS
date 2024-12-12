const Inventory = require("../../models/Inventory/inventory.js");

exports.getTotalItems = async (req, res) => {
  try {
    const numberOfItems = await Inventory.countDocuments();

    res.status(200).json({
      totalItems: numberOfItems,
    });
  } catch (error) {
    console.error("Error retrieving total items:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving total items.",
      error: error.message,
    });
  }
};

exports.getExpiringSoonProductCount = async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7);

    const expiringProductCount = await Inventory.countDocuments({
      expirationDate: { $gte: today, $lte: sevenDaysFromNow },
    });

    if (expiringProductCount === 0) {
      return res.status(404).json({ message: "No products expiring soon." });
    }

    res.status(200).json({ count: expiringProductCount });
  } catch (error) {
    console.error("Error fetching expiring product count:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.getLowStockItemCount = async (req, res) => {
  try {
    const threshold = 6;
    const lowStockItemCount = await Inventory.countDocuments({
      quantity: { $lt: threshold },
    });

    if (lowStockItemCount === 0) {
      return res.status(404).json({ message: "No low stock items found." });
    }

    res.status(200).json({ count: lowStockItemCount });
  } catch (error) {
    console.error("Error fetching low stock item count:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.itemsNeedAttention = async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7);

    const lowStockItems = await Inventory.find({
      quantity: { $lt: 7 },
    });

    const expiringItems = await Inventory.find({
      expirationDate: { $gte: today, $lte: sevenDaysFromNow },
    });

    const attentionItems = [
      ...lowStockItems.map((item) => ({
        itemId: item.itemId,
        itemName: item.itemName,
        quantity: item.quantity,
        expirationDate: item.expirationDate,
        status: "Low Stock",
      })),
      ...expiringItems.map((item) => ({
        itemId: item.itemId,
        itemName: item.itemName,
        quantity: item.quantity,
        expirationDate: item.expirationDate,
        status: "Expiring Soon",
      })),
    ];

    if (attentionItems.length === 0) {
      return res.status(404).json({ message: "No items need attention." });
    }

    res.status(200).json(attentionItems);
  } catch (error) {
    console.error("Error fetching items that need attention:", error);
    res.status(500).json({ message: "Server error." });
  }
};
