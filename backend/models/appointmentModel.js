const admin = require("../firebase");
const db = admin.firestore();

exports.getAppointments = async () => {
  try {
    const snapshot = await db.collection("appointments").get();
    const appointments = [];
    snapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });
    return appointments;
  } catch (error) {
    throw new Error("Error fetching appointments: " + error.message);
  }
};
