export interface OrdersPage {
  user: User;
  page: Page;
}

interface User {
  id: string;
  name: string;
}

interface Page {
  index: number;
  totalPages: number;
  totalOrders: number;
  orders: OrderSummary[];
}

export interface OrderSummary {
  id: string;
  date: string;
  state: string;
  stateCode: number;
}
