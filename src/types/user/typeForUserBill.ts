export interface UserBillResponse {
    user: string
    month: Month
    total: number
    totalDiscount: number
    ordersQuantity: number
    orders: OrderSummary[]
  }
  
interface Month {
    year: number
    month: number
    monthName: string
  }
  
interface OrderSummary {
    idOrder: string
    idReceipts: string
    discount: number
  }
  