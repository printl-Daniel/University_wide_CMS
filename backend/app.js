const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// Connect to MongoDB
connectDB();

module.exports = app;

