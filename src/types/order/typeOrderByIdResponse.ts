export interface OrderByIdResponse {
  id: string;
  date: string;
  menu: string;
  user: User;
  items: Item[];
  state: State;
  receipt: Receipt;
  transitions: Transition[];
}

interface User {
  id: string;
  name: string;
}

interface Item {
  description: string;
  price: number;
  quantity: number;
}

interface State {
  id: number;
  description: string;
}

export interface Receipt {
  id: string;
  date: string;
  totalPrice: number;
  totalDiscount: number;
}

interface Transition {
  initialState: number;
  initial: string;
  finalState: number;
  final: string;
  date: string;
}
