import axios from "axios";

const API_URL = 'http://localhost:5000/user';

export const registerUser = async(endpoint,user)=>{
    try{
        const res = await axios.post(`${API_URL}/${endpoint}`,user,{withCredentials:true});
        console.log("service ; ",res);

        return res.data;
    }catch(err){
        console.error("Service error : ",err);
        throw err;
    }
}
export const logoutUser = async(endpoint)=>{
    try{
        const res = await axios.get(`${API_URL}/${endpoint}`,{withCredentials:true});
        console.log("service ; ",res.data);
        return res.data;
    }catch(err){
        console.error("Service error : ",err);
        throw err;
    }
}