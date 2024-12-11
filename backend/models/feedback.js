const mongoose = require("mongoose");
const admin = require("../firebase");
const db = admin.firestore();

exports.getFeedback = async () => {
  try {
    const snapshot = await db
      .collection("feedbacks")
      .where("saved", "==", "not-yet")
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error("Error fetching appointments: " + error.message);
  }
};

exports.saveAnalyzedFeedback = async (feedbackData, feedbackAnalyzedData) => {
  try {
    const feedbackRef = db.collection("analyzedFeedback").doc(feedbackData.id);
    await feedbackRef.set(feedbackAnalyzedData);
    console.log("Feedback saved successfully:", feedbackData.id);
  } catch (error) {
    console.error("Error saving analyzed feedback:", error.message);
    throw new Error("Error saving analyzed feedback: " + error.message);
  }
};

exports.updateSavedStatus = async (feedbackData) => {
  const docRef = db.collection("feedbacks").doc(feedbackData.id);
  await docRef.update({ saved: "saved" });
};

exports.getAnalyzedFeedback = async () => {
  try {
    const snapshot = await db.collection("analyzedFeedback").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error("Error fetching analyzed feedback: " + error.message);
  }
};
