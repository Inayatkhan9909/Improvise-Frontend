import { useState } from "react"



export const useProfileAuth = ()=>{
const [loading,setLoading]= useState(false);
const [error, setError] = useState(null);


return {loading,error};
}