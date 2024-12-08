import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
});

export const getFeedbacks = async () => {
  try {
    const response = await api.get("/feedback/get");
    return response.data;
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    throw error;
  }
};

export const syncFeedback = async () => {
  try {
    const response = await api.post("/feedback/sync");
    return response.data;
    console.log(response.data);
  } catch (error) {
    if (error.response) {
      console.error("API Error Response:", error.response.data);
    } else {
      console.error("Network or Unknown Error:", error.message);
    }
    throw error;
  }
};
