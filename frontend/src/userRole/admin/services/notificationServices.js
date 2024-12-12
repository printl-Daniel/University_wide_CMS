import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/dashboard",
});

export const itemsNeedAttention = async () => {
  try {
    const response = await api.get("/items-need-attention");
    return response.data;
  } catch (error) {
    console.error("Error fetching items that need attention:", error);
    throw error;
  }
};
