import axios from 'axios';
import { signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebase/firebaseConfig";
const ApiUrl = process.env.REACT_APP_BACKEND_API_URL;

export const signup = async (userData: {
  email: string;
  password: string;
  name: string;
  contact: string;
  role: string;
  dob: string;
  gender: string;
  
}) => {
  const formData = new FormData();
     
  Object.keys(userData).forEach((key) => {
    const value = userData[key as keyof typeof userData];
    if (value !== null && value !== undefined && key !== 'profilePic') {
      formData.append(key, value as string);
    }
  });
       
  const response = await axios.post(`${ApiUrl}/auth/signup`, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const signInWithGoogle = async () =>{
try {
  const result = await signInWithPopup(auth,googleProvider);
  const user = result.user;

  const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    profileImage: user.photoURL,
});

return response.data;

} catch (error) {
  console.error("Google Sign-In Error:", error);
  throw error;
}
};
