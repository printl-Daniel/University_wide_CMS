import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/dashboard",
});

export const totalItemsCount = async () => {
  try {
    const response = await api.get("/total-items");
    if (response && response.data && response.data.totalItems !== undefined) {
      return response.data.totalItems;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching total items count:", error);
    throw error;
  }
};
export const totalLowItemsCount = async () => {
  try {
    const response = await api.get("/total-low-items-count");
    return response.data.count;
  } catch (error) {
    console.error("Error fetching total low items counts:", error);
    throw error;
  }
};

export const totalExpiringSoon = async () => {
  try {
    const response = await api.get("/near-expiry-count");
    return response.data.count;
  } catch (error) {
    console.error("Error fetching expiring soon counts:", error);
    throw error;
  }
};

export const itemsNeedAttention = async () => {
  try {
    const response = await api.get("/items-need-attention");
    return response.data;
  } catch (error) {
    console.error("Error fetching items that need attention:", error);
    throw error;
  }
};
