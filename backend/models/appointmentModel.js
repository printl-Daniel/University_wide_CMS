const admin = require("../firebase");
const db = admin.firestore();

exports.getPendingAppointments = async () => {
  try {
    const snapshot = await db
      .collection("appointments")
      .where("status", "==", "Pending")
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error("Error fetching appointments: " + error.message);
  }
};

exports.getApprovedAppointments = async () => {
  try {
    const snapshot = await db
      .collection("appointments")
      .where("status", "==", "Approved")
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error("Error fetching appointments: " + error.message);
  }
};

exports.getDeclinedAppointments = async () => {
  try {
    const snapshot = await db
      .collection("appointments")
      .where("status", "==", "Declined")
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error("Error fetching appointments: " + error.message);
  }
};

exports.getAfterAppointed = async () => {
  try {
    const snapshot = await db
      .collection("appointments")
      .where("status", "in", ["No-show", "Attended"])
      .get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw new Error("Error fetching appointments: " + error.message);
  }
};

exports.updateStatus = async (id, status) => {
  const docRef = db.collection("appointments").doc(id);
  await docRef.update({ status: status });
};
