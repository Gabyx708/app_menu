import { OrderResponse } from "../../types/typeOrderResponse";

export const saveOrder = (order:OrderResponse) => {

    sessionStorage.setItem('order',JSON.stringify(order));
    return order;
}

export const getOrder = (): OrderResponse | null => {
    
  const orderStringfy = sessionStorage.getItem("order");
  if (orderStringfy) {
    return JSON.parse(orderStringfy);
  }

  return null;
};