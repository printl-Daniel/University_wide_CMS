const mongoose = require('mongoose');
const Inventory = require('../models/manageInventory');

// Add a new product
exports.addProduct = async (req, res) => {
  const { productId, productName, description, category, quantity, status, user } = req.body;

  if (!productId || !productName || quantity === undefined || !status || !user) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const existingProduct = await Inventory.findOne({ productId });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product already exists!' });
    }

    const newProduct = new Inventory({
      productId,
      productName,
      description,
      category,
      quantity,
      status,
      history: [
        {
          action: 'added',
          newQuantity: quantity,
          user: mongoose.Types.ObjectId(user),
        },
      ],
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully!', product: newProduct });
  } catch (error) {
    res.status(400).json({ message: 'Failed to add product', error: error.message });
  }
};


// Update the quantity of a product
exports.updateQuantity = async (req, res) => {
  const { _id, productId, quantityChange, user } = req.body;

  if (!_id || !productId || quantityChange === undefined || !user) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const product = await Inventory.findOne({ _id, productId });
    if (!product) return res.status(404).json({ message: 'Product not found!' });

    const previousQuantity = product.quantity;
    product.quantity += quantityChange;

    product.history.push({
      action: 'quantity-updated',
      previousQuantity,
      newQuantity: product.quantity,
      quantityChange,
      user: mongoose.Types.ObjectId(user),
    });

    await product.save();
    res.status(200).json({ message: 'Quantity updated successfully!', product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update quantity', error: error.message });
  }
};


exports.updateProduct = async (req, res) => {
  const { _id, productId, productName, description, category, status, user } = req.body;

  if (!_id || !productId || !productName || !status || !user) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const product = await Inventory.findOne({ _id, productId });
    if (!product) return res.status(404).json({ message: 'Product not found!' });

    product.productName = productName;
    product.description = description;
    product.category = category;
    product.status = status;

    product.history.push({
      action: 'updated-details',
      user: mongoose.Types.ObjectId(user),
      updatedFields: { productName, description, category, status },
    });

    await product.save();
    res.status(200).json({ message: 'Product updated successfully!', product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
};


// Get all inventory items
exports.getAllInventory = async (req, res) => {
  try {
    // Kunin ang lahat ng products mula sa Inventory collection
    const products = await Inventory.find();

    // Kung walang products, magbabalik ng 404
    if (products.length === 0) {
      return res.status(404).json({ message: 'No inventory products found' });
    }

    // Ibalik ang mga products kung may laman
    res.status(200).json({ message: 'Inventory fetched successfully', products });
  } catch (error) {
    // Kung may error, magbabalik ng 500 at error message
    res.status(500).json({ message: 'Failed to fetch inventory', error: error.message });
  }
};

exports.getProductHistory = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Inventory.findOne({ productId });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ history: product.history });
  } catch (error) {
    console.error('Error fetching product history:', error);
    res.status(500).json({ error: 'Failed to fetch product history' });
  }
};