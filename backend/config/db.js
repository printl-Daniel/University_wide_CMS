const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "crud",
  password: "root",
  database: "university-cms", //name of the database
});

db.connect((error) => {
  if (error) {
    console.error("Failed to connect to the database", error);
  } else {
    console.log("Connected to the database");
  }
});

module.exports = db;
