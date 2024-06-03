import { createContext, ReactNode, useContext, useState } from "react";
import { OrderByIdResponse } from "../types/order/typeOrderByIdResponse";

interface AppContextType{
    actualOrder: OrderByIdResponse|null;
    setActualOrder: (value:OrderByIdResponse) => void;

    actualSession: SignInResponse|null;
    setActualSession: (value:SignInResponse) => void;

    actualMenu: Menu | null;
    setActualMenu: (value:Menu) => void;

    orderDetail: OrderByIdResponse | null;
    setOrderDetail: (value:OrderByIdResponse) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children:ReactNode}> = ({children}) => {

    const [actualOrder, setActualOrder] = useState<OrderByIdResponse | null>(null);
    const [orderDetail, setOrderDetail] = useState<OrderByIdResponse | null>(null);
    const [actualSession, setActualSession] = useState<SignInResponse | null>(null);
    const [actualMenu, setActualMenu] = useState<Menu | null>(null);

    return (
        <AppContext.Provider value={{
            actualOrder,
            setActualOrder,
            actualSession,
            setActualSession,
            actualMenu,
            setActualMenu,
            orderDetail,
            setOrderDetail
          }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = ():AppContextType => {
    const context = useContext(AppContext);

    if(!context){
        throw new Error("useAppContet must be used within an AppProvider");
    }

    return context;
}