const admin = require("../firebase");
const db = admin.firestore();

const createAppointment = async (appointmentData) => {
  try {
    const appointmentRef = db.collection("appointments").doc(); // Automatically generate a new document ID
    await appointmentRef.set(appointmentData); // Save the data to Firestore
    return appointmentRef.id; // Return the generated appointment ID
  } catch (error) {
    throw new Error("Failed to create appointment: " + error.message);
  }
};

module.exports = { createAppointment };
