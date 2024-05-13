import axios from "axios";
import { setAuthToken } from "./axiosInstance";
import { getUser } from "./userService";

const loginUser = async(username:string,password:string):Promise<SignInResponse> => {

    const api = import.meta.env.VITE_API_URL;
    const endpoint = `${api}/login`;
    const userData = {
        username: username,
        password: password
    };

    try {
        const response = await axios.post<SignInResponse>(endpoint, userData);
        
        setAuthToken(getUser()?.token!); //save token in axios instance

        return response.data; 
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        throw error; 
    }
    
}

export default loginUser;