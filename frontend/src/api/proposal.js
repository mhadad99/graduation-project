import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/proposal/";

export const addProposal = async (proposal) => {
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.post(`${baseURL}create/`, proposal, config);
};

export const getProposalsByProject = async (projectId) => {
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(`${baseURL}by-project/${projectId}/`, config);
};

export const updateProposalStatus = async (proposalId, status) => {
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.patch(`${baseURL}${proposalId}/`, { status }, config);
};