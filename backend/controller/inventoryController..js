const Inventory = require('../models/manageInventory');  // Import the Inventory model

exports.addProduct = async (req, res) => {
  const { productId, productName, description, category, quantity, expirationDate, status } = req.body;

  try {
    // Check if the product already exists
    const existingProduct = await Inventory.findOne({ productId });

    if (existingProduct) {
      return res.status(400).json({ message: 'Product already exists!' });
    }

    // Create a new product and save it to the database
    const newProduct = new Inventory({
      productId,
      productName,
      description,
      category,
      quantity,
      expirationDate,
      status,
      history: [],  // Start with an empty history
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully!', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add product', error });
  }
};


exports.updateQuantity = async (req, res) => {
  const { productId, quantityChange, userId } = req.body;

  try {
    // Find the product by productId
    const product = await Inventory.findOne({ productId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found!' });
    }

    // Update the quantity of the product
    product.quantity += quantityChange;

    // Add the action to the history log
    product.history.push({
      action: 'quantity-updated',
      quantityChange,
      user: userId,  // The staff member who performed the action
    });

    // Save the updated product
    await product.save();

    res.status(200).json({
      message: 'Quantity updated successfully!',
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update quantity', error });
  }

exports.getAllInventory = async (req, res) => {
    try {
      // Fetch all products from the inventory
      const products = await Inventory.find();
  
      if (products.length === 0) {
        return res.status(404).json({ message: 'No inventory products found' });
      }
  
      res.status(200).json({ message: 'Inventory fetched successfully', products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch inventory', error });
    }
  };
  
  // Controller to fetch a specific product by productId
exports.getProductById = async (req, res) => {
    const { productId } = req.params;
  
    try {
      // Find the product by productId
      const product = await Inventory.findOne({ productId });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product fetched successfully', product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch product', error });
    }
  };
};
