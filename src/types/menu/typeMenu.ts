interface Menu {
    id: string;
    eatingDate: string;
    uploadDate: string;
    closeDate: string;
    options: MenuItem[];
}

interface MenuItem {
    idDish: number;
    description: string;
    price: number;
    stock: number;
    requested: number;
}
