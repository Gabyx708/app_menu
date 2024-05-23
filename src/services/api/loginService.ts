import axios from "axios";
import axiosInstance, { setAuthToken } from "../http/axiosInstance";
import { getUser } from "../local/userService";

const loginUser = async(username:string,password:string):Promise<SignInResponse> => {

    const api = import.meta.env.VITE_API_URL;
    const endpoint = `${api}/login`;
    const userData = {
        username: username,
        password: password
    };

    try {
        const response = await axiosInstance.post<SignInResponse>(endpoint, userData);
        
        setAuthToken(response.data.token); //save token in axios instance

        return response.data; 
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        throw error; 
    }
    
}

export default loginUser;