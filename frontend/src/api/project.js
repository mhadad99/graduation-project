import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/project/"; // Now it routes through Vite proxy
export const addProject = async (service) => {
    // send brear token
    const token = localStorage.getItem("authToken");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        console.log("addProject service in try");
        const response = await axios.post(`${baseURL}create/`, service, config);
        console.log("addProject response", response.data);
        return response
    } catch (error) {
        console.log("addProject error", error.response.data);
        throw error;
    }
};


export const getAllProject = async () => {
    try {
        const response = await axios.get(`${baseURL}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return response
    } catch (error) {
        throw error;
    }
};


