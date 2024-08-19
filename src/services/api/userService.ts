import axiosInstance from "../http/axiosInstance"

export const getUserBill = async(idUser:string,month:number,year:number) =>
{
    const response = await axiosInstance.get(`/user/${idUser}/bills/year/${year}/month/${month}`);
    return response;
}