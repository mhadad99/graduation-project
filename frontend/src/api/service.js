import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/service"; // Now it routes through Vite proxy
export const addService = async (service) => {
    // send brear token
    const token = localStorage.getItem("authToken");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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

export const getMyServices = async () => {
    try {
        const response = await axios.get(`${baseURL}/personal-services/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return response
    } catch (error) {
        throw error;
    }
}



export const getServiceById = async (id) => {
    try {
        const response = await axios.get(`${baseURL}/${id}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return response
    } catch (error) {
        throw error;
    }
}

export const updateService = async (id, service) => {
    const token = localStorage.getItem("authToken");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };
    try {
        const response = await axios.put(`${baseURL}/update/${id}/`, service, config);
        return response
    } catch (error) {
        throw error;
    }
};

export const getServicesByTag = async (tag) => {
    try {
        const response = await axios.get(`${baseURL}/by-tag/?tag=${tag}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getUserServices = async (userId) => {
    try {
        const response = await axios.get(`${baseURL}/user/${userId}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};