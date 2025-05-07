import axios from "axios";



const baseURL = "http://127.0.0.1:8000/api/"; // Now it routes through Vite proxy
export const addService = async (service) => {
    // send brear token
    const token = localStorage.getItem("authToken");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.post(`${baseURL}user/create/`, service, config);
        return response
    } catch (error) {
        throw error;
    }
};


export const getMyProfile = async () => {
    try {
        const response = await axios.get(`${baseURL}user/user-profile/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return response
    } catch (error) {
        throw error;
    }
};


export const getMyFreelancerProfile = async () => {
    try {
        const response = await axios.get(`${baseURL}freelancers/detail/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return response
    } catch (error) {
        throw error;
    }
};
export const getMyClientProfile = async () => {
    try {
        const response = await axios.get(`${baseURL}clients/detail/`, {
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
        const response = await axios.patch(`${baseURL}user/photo/update/`, formData, {
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
        const response = await axios.patch(`${baseURL}user/update/`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return response.data
    } catch (error) {
        throw error;
    }
}
export const updateFreelancerProfile = async (formData) => {
    try {
        const response = await axios.patch(`${baseURL}freelancers/update/`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return response.data
    } catch (error) {
        throw error;
    }
}
export const updateClientProfile = async (formData) => {
    try {
        const response = await axios.patch(`${baseURL}clients/update/`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return response.data
    } catch (error) {
        throw error;
    }
}