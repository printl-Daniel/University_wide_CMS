const express = require("express");
const path = require("path");
const app = express();
const appointmentRoutes = require("./routes/appointmentRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/appointment", appointmentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
