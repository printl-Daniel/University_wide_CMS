const express = require("express");
const session = require("express-session");
const path = require("path");
const MySQLStore = require("express-mysql-session")(session);
const bodyParser = require("body-parser");
const db = require("./config/db");
const app = express();

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
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
