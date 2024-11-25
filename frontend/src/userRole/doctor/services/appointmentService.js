import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
});

export const fetchAppointments = async () => {
  try {
    const response = await api.get("/appointment/get");
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};
