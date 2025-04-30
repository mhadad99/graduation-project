import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/user/"; // Now it routes through Vite proxy
// Function to authenticate user
export const loginUser = async (credentials) => {
  try {
    console.log("credentials" + credentials)
    const response =  await axios.post(`${baseURL}login/`, credentials);
    console.log(response)
    return response
  } catch (error) {
    throw error;
  }
};

// Register: Add a new user
export const registerUser = async (newUser) => {
  try {
    const formData = new FormData();
    for (const key in newUser) {
      formData.append(key, newUser[key]);
    }
    const createUserResponse = await axios.post(`${baseURL}register/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(createUserResponse)
    return createUserResponse.data;
  } catch (error) {
    throw error;
  }
};