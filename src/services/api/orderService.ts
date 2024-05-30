import { OrderByIdResponse } from "../../types/typeOrderByIdResponse";
import { OrderRequest } from "../../types/typeOrderRequest";
import { OrderResponse } from "../../types/typeOrderResponse";
import { OrdersPage } from "../../types/typeOrdersPage";
import axiosInstance from "../http/axiosInstance";
import { getUser } from "../local/userService";

export const getUserOrderByMenu = async (idUser:string, idMenu:string) =>{

    const response = await axiosInstance.get<OrderResponse[]>(`/menu/${idMenu}/user/${idUser}/orders`);
    //const response = await fetch(`https://localhost:7008/api/v2/menu/${idMenu}/user/${idUser}/orders`);
    return response;
}

export const makeOrder = async (order:OrderRequest) => {

    const response = await axiosInstance.post(`/order`,order);
    return response;
}

export const getUserOrders = async (startDate:string|null,finalDate:string|null,index:number):Promise<OrdersPage> => {

    const idUser = getUser()?.id;

    let url = `/user/${idUser}/orders?startDate=${startDate}&finalDate=${finalDate}&index=${index}&quantity=5`;

    if(startDate == null || finalDate == null)
    {
        url = `/user/${idUser}/orders?index=${index}&quantity=5`;
    }
    const response = await axiosInstance.get<OrdersPage>(url);
    return response.data;
}

export const getOrderById = async (id:string) => {

    const response = await axiosInstance.get<OrderByIdResponse>(`/order/${id}/`);
    return response.data;
}

export const cancelOrder = async (id:string) => {

    const response = await axiosInstance.patch<OrderByIdResponse>(`/order/${id}/cancel`);
    return response.data;
}