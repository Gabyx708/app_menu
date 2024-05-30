import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import { warning, checkmarkCircle } from "ionicons/icons";
import { getUser } from "../../services/local/userService";
import { getActualMenu } from "../../services/local/menuService";
import { getOrderById, getUserOrderByMenu } from "../../services/api/orderService";
import axios from "axios";
import { saveOrder } from "../../services/local/orderService";
import { OrderResponse } from "../../types/typeOrderResponse";

const ExistOrder: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("warning");
  const [text, setText] = useState("¡Aún no has hecho un pedido para este menú!");
  const [actualIcon, setActualIcon] = useState<string>(warning);

  const idUser = getUser()?.id;
  let idMenu = getActualMenu()?.id;

  useEffect(() => {
    const interval = setInterval(() => {
      idMenu = getActualMenu()?.id;
      if (idMenu) {
        clearInterval(interval);
        const getOrder = async () => {
          try {
            const response = await getUserOrderByMenu(idUser!, idMenu!);
            if (response.status === 200) {

              let sortedOrders = response.data.sort((a: OrderResponse, b: OrderResponse) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
              
                return dateB.getTime() - dateA.getTime();
              });

              let lastOrderEntry = sortedOrders.find(i => i.state.id != -1);
              
              if(lastOrderEntry){
                const lastOrder = await getOrderById(lastOrderEntry.id);

                if (lastOrder.menu == idMenu || lastOrder.state.id != "-1") {
                  setColor("success");
                  setActualIcon(checkmarkCircle);
                  setText("¡Ya has hecho un pedido para este menú!");
                  saveOrder(lastOrder);
                }
              }
              
            }
          } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
              console.log(error.response.status);
            }
          } finally {
            setLoading(false);
          }
        };
        getOrder();
      }
    }, 1000); 
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <IonCard>
        <IonCardContent>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IonSpinner name="crescent" />
          </div>
        </IonCardContent>
      </IonCard>
    );
  }

  return (
    <IonCard>
      <IonCardContent>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <IonCardSubtitle style={{ marginRight: "18px", textAlign: "justify" }}>
            {text}
          </IonCardSubtitle>
          <IonIcon icon={actualIcon} color={color} size="large"></IonIcon>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ExistOrder;
