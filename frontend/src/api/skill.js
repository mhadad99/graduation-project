// api/skill.js
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

// Utility function to get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  console.log("Auth Token:", token); 

  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch all skills
export const fetchSkills = async () => {
  try {
    const response = await axios.get(`${baseURL}skills/all/`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new skill
export const createSkill = async (name) => {
  try {
    const response = await axios.post(
        `${baseURL}skills/create/`,
        { skill_name: name }, 
        { headers: getAuthHeaders() }
      );
    return response.data;
  } catch (error) {
    throw error;
  }
};