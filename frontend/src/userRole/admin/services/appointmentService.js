import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
});

export const pendingAppointments = async () => {
  try {
    const response = await api.get("/appointments/pending");
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

export const submitApproval = async (formData) => {
  try {
    const response = await api.post("/appointments/approval", formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting approval:", error);
    throw error;
  }
};

export const approvedAppointments = async () => {
  try {
    const response = await api.get("/appointments/approved");
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

export const declinedAppointments = async () => {
  try {
    const response = await api.get("/appointments/declined");
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

export const updateAppStatus = async (formData) => {
  try {
    const response = await api.post("/appointments/approved/status", formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting approval:", error);
    throw error;
  }
};

export const fetchAppointmentOutcomes = async () => {
  try {
    const response = await api.get("/appointments/afterAppointed");
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};
