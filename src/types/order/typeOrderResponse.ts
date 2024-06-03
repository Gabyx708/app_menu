export interface OrderResponse {
    id: string
    date: string
    user: User
    items: Item[]
    state: State
    receipt: ReceiptOrder
    transitions: Transition[]
  }
  
  export interface User {
    id: string
    name: string
  }
  
  export interface Item {
    description: string
    price: number
    quantity: number
  }
  
  export interface State {
    id: number
    description: string
  }
  
  export interface ReceiptOrder {
    id: string
    date: string
    totalPrice: number
    totalDiscount: number
  }
  
  export interface Transition {
    initialState: number
    initial: string
    finalState: number
    final: string
    date: string
  }
  