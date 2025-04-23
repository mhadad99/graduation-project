import axios from "axios";

const baseURL = "http://localhost:8000/users"; // Now it routes through Vite proxy
// Function to authenticate user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.get(`${baseURL}users`);
    const user = response.data.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );
    if (user) {
      return user;
    }
    throw new Error("Invalid username or password");
  } catch (error) {
    throw error;
  }
};

// Register: Add a new user
export const registerUser = async (newUser) => {
  try {
    // const response = await axios.get(baseURL);
    // const userExists = response.data.some(
    //   (u) => u.email === newUser.email || u.username === newUser.username
    // );
    // if (userExists) {
    //   throw new Error("Username or email already exists");
    // }
    const createUserResponse = await axios.post(baseURL, newUser);
    console.log(createUserResponse)
    return createUserResponse.data;
  } catch (error) {
    throw error;
  }
};