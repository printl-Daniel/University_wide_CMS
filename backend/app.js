const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const inventoryRouter = require("./routes/inventoryRouter");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/inventory", inventoryRouter);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;