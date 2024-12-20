import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const signup = async (userData: {
  email: string;
  password: string;
  name: string;
  contact: string;
  role: string;
  dob: string;
  gender: string;
  profilePic: File | null;
}) => {
  const formData = new FormData();

  Object.keys(userData).forEach((key) => {
    const value = userData[key as keyof typeof userData];
    if (value !== null && value !== undefined && key !== 'profilePic') {
      formData.append(key, value as string);
    }
  });

  if (userData.profilePic) {
    formData.append('profilePic', userData.profilePic, userData.profilePic.name);
  }

  const response = await axios.post(`${API_URL}/user/signup`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};
