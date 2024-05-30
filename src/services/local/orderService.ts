import { OrderByIdResponse } from "../../types/typeOrderByIdResponse";

export const saveOrder = (order:OrderByIdResponse) => {

    sessionStorage.setItem('order',JSON.stringify(order));
    return order;
}

export const getOrder = (): OrderByIdResponse | null => {
    
  const orderStringfy = sessionStorage.getItem("order");
  if (orderStringfy) {
    return JSON.parse(orderStringfy);
  }

  return null;
};

export const clearOrder = () =>{
  sessionStorage.removeItem("order");
}