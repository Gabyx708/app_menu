import { OrderByIdResponse } from "../../types/order/typeOrderByIdResponse";

export const saveOrderInMemory = (order:OrderByIdResponse) => {

    sessionStorage.setItem('order',JSON.stringify(order));
    return order;
}

export const getOrderInMemory = (): OrderByIdResponse | null => {
    
  const orderStringfy = sessionStorage.getItem("order");
  if (orderStringfy) {
    return JSON.parse(orderStringfy);
  }

  return null;
};

export const clearOrder = () =>{
  sessionStorage.removeItem("order");
}