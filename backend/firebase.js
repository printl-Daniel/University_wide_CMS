require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://universitycms-2350d-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

module.exports = admin;
