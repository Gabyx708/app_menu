export interface OrderCreatedResponse {
    idUser: string
    idMenu: string
    items: Item[]
  }
  
interface Item {
    idDish: string
    quantity: number
  }
  