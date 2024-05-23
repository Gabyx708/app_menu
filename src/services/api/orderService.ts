import { OrderResponse } from "../../types/typeOrder";
import axiosInstance from "../http/axiosInstance";

export const getUserOrderByMenu = async (idUser:string, idMenu:string) =>{

    //const response = await axiosInstance.get<OrderResponse>(`/menu/${idMenu}/user/${idUser}/orders`);
    const response = await fetch(`https://localhost:7008/api/v2/menu/${idMenu}/user/${idUser}/orders`);
    return response;
}
