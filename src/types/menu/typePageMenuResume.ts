export interface PageMenuResume {
  index:number;
  totalPages:number;
  totalRecords:number;
  items:MenuResume[];
}

export interface MenuResume {
  idMenu: string
  eatingDate: string
  uploadDate: string
  closeDate:string
}
  
interface Item {
    idDish: string
    quantity: number
  }
  