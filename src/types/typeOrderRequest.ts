export interface OrderRequest 
{
    idUser : string,
    idMenu: string
    items : itemOrder[]
}

interface itemOrder 
{
    idDish: string,
    quantity: number
}