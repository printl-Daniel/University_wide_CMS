const express = require("express");
const session = require("express-session");
const path = require("path");
const MySQLStore = require("express-mysql-session")(session);
const bodyParser = require("body-parser");
const db = require("./config/db");
const cors = require("cors");

//==ROUTES DIR==//
const userRoutes = require("./routes/routes.js");
const staffRoutes = require("./routes/staffRoutes");

//==ROUTES==//
const viewRoutes = require("./routes/view-router");
const sentimentRoutes = require("./routes/sentiment-router");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//==ROUTES==//
app.use("/", viewRoutes);
app.use("/sentiment", sentimentRoutes);
app.use(cors());
app.use(bodyParser.json());
app.use("/api", userRoutes);

//==SESSION==//
const sessionStore = new MySQLStore({}, db);

app.use(
  session({
    secret: "yourSecretKey",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: false,
    },
  })
);

//==PORT==//
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
