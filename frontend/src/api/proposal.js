import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/project-proposal/";

export const addProposal = async (proposal) => {
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
console.log("efdfd",proposal)
  return axios.post(`${baseURL}apply/`, proposal, config);
};

export const getProposalsByProject = async (projectId) => {
  try{
    const token = localStorage.getItem("authToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(`${baseURL}proposals/${projectId}/`, config);
    console.log(response)
    return response;
  }
  catch(error){
    console.error("Error fetching proposals:", error);
    throw error;
  }
};

export const approveProposal = async (proposalId) => {

  // console.log(proposalId)
  return axios.post(`${baseURL}approve/${proposalId}/`,{}, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
};

export const getMyProposals = async () => {
  try{
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = axios.get(`${baseURL}my-proposals/`, config);
  console.log(response.data)
  return response;}
  catch(error){
    console.error("Error fetching proposals:", error);
    throw error;
  }
};

export const updateProposalStatus = async (proposalId, status) => {
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.patch(`${baseURL}${proposalId}/`, { status }, config);
};