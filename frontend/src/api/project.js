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
        const response = await axios.get(`${baseURL}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        }
    );
        console.log("getAllProject response", response.data);
        return response
    } catch (error) {
        throw error;
    }
};

export const getProjectById = async (id) => {
    try {
        const response = await axios.get(`${baseURL}${id}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        console.log("getProjectById response", response.data);
        return response
    } catch (error) {
        throw error;
    }
}


export const updateProject = async (id, service) => {
    // send brear token
    const token = localStorage.getItem("authToken");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        console.log("updateProject service in try");
        const response = await axios.put(`${baseURL}update/${id}/`, service, config);
        console.log("updateProject response", response.data);
        return response
    } catch (error) {
        console.log("updateProject error", error.response.data);
        throw error;
    }
}

export const getMyProjects = async () => {
    try {
        const response = await axios.get(`${baseURL}my-projects/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        console.log("getMyProject response", response.data);
        return response
    } catch (error) {
        throw error;
    }
}