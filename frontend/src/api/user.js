import axios from "axios";



const baseURL = "http://127.0.0.1:8000/api/user"; // Now it routes through Vite proxy
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


export const getMyProfile = async () => {
    try {
        const response = await axios.get(`${baseURL}/user-profile/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return response
    } catch (error) {
        throw error;
    }
};



export const updateUserImage = async (formData) => {
    try {
        const response = await axios.patch(`${baseURL}/photo/update/`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data
    } catch (error) {
        throw error;
    }
}


export const updateUserProfile = async (formData) => {
    try {
        const response = await axios.patch(`${baseURL}/update/`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return response.data
    } catch (error) {
        throw error;
    }
}