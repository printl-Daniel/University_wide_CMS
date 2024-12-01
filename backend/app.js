const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const inventoryRouter = require("./routes/inventoryRouter");
const feedbackRouter = require("./routes/feedbackRouter");
const patientRouter = require("./routes/patientRouter");
const appointmentsRouter = require("./routes/appointmentRouter");
const studentEnrollment = require("./routes/csvUpload/studentRoutes");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use("/api/inventory", inventoryRouter);

//routes for csv
app.use("/api/student-enrollment", studentEnrollment);

//
app.use("/api/inventory", inventoryRouter);

// app.use("/api/feedback", feedbackRouter);
app.use("/api/patient", patientRouter);
app.use("/api/appointments", appointmentsRouter);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
