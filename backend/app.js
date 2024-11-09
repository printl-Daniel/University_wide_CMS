const express = require("express");
const session = require("express-session");
const path = require("path");
const MySQLStore = require("express-mysql-session")(session);
const bodyParser = require("body-parser");
const db = require("./config/db");
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/routes.js');
const staffRoutes = require('./routes/staff-routes.js');

//==ROUTES==//
const viewRoutes = require("./routes/view-router");
const sentimentRoutes = require("./routes/sentiment-router");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public")); // Serving static files

// Use body-parser (You can replace with express built-in)
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // This replaces body-parser.json()

//==ROUTES==//
app.use("/", viewRoutes);
app.use("/sentiment", sentimentRoutes);
app.use(cors());

// API Routes
app.use('/api', userRoutes);
app.use('/api', staffRoutes);

//==SESSION==//
const sessionStore = new MySQLStore({}, db);

app.use(
  session({
    secret: "yourSecretKey",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // secure cookie in production
    },
  })
);

//==PORT==//
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
