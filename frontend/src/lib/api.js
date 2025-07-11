import { axiosInstance } from "./axios.js";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("error in the getAuthUser: ", error);
    return null ;
  }
};

export const completingOnboarding = async (formData) => {
    const res = await axiosInstance.post('/auth/onboarding',formData);
    return res.data;
};

export const getFriends = async()=>{
  const res = await axiosInstance.get('/users/getFriends');
  return res.data;
}

export const getUsers = async()=>{
  const res = await axiosInstance.get('/users/getUsers');
  return res.data;
}

export const getOutgoingRequest = async()=>{
  const res = await axiosInstance.get('/users/outgoing-requests');
  return res.data;
}

export const sendFriendRequest = async(userId)=>{
  const res = await axiosInstance.post(`/users/friend-request/${userId}`);
  return res.data;
}

export const acceptFriendRequest = async(requestId)=>{
  const res = await axiosInstance.put(`users/friend-request/${requestId}/accept`);
  return res.data;
}

export const getFriendRequest = async()=>{
  const res = await axiosInstance.get('/users/friend-requests');
  return res.data;
}

export const getStreamToken = async ()=>{
  const res = await axiosInstance.get(`/chat/token`);
  return res.data;
}