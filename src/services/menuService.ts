import axios,{AxiosRequestConfig} from "axios";
import { getUser } from "./userService";
import axiosInstance from "./axiosInstance";

export const getNextMenuAvailable = async () => {

     const response = await axiosInstance.get<Menu>('menu/next-available');
     return response;

 };
 