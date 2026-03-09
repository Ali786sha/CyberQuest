import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= REGISTER =================
export const registerUser = async (formData) => {
  try {
    const response = await API.post("/users/register", formData);
    return response.data;
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);
    throw error;
  }
};

// ================= LOGIN =================
export const loginUser = async (formData) => {
  try {
    const response = await API.post("/users/login", formData);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

// ================= GET USERS =================
export const getUsers = async () => {
  try {
    const response = await API.get("/users");
    return response.data;
  } catch (error) {
    console.error("Get Users Error:", error.response?.data || error.message);
    throw error;
  }
};
//chatbot

export const sendMessage = async (message) => {
  const response = await API.post("/chat", { message });
  return response.data;
};
