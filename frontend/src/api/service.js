import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/service"; // Now it routes through Vite proxy
export const addService = async (service) => {
    // send brear token
    const token = localStorage.getItem("authToken");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.post(`${baseURL}/create/`, service, config);
        return response
    } catch (error) {
        throw error;
    }
};


export const getAllServices = async () => {
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


