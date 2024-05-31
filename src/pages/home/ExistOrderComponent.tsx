import { IonCard, IonCardContent, IonCardSubtitle, IonIcon } from "@ionic/react";
import { warning, checkmarkCircle, informationCircle } from "ionicons/icons";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import { getUserOrderByMenu } from "../../services/api/orderService";
import { OrderByIdResponse } from "../../types/order/typeOrderByIdResponse";
import axios from "axios";

const ExistOrder: React.FC = () => {
  const { actualOrder, setActualOrder, actualMenu, actualSession } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("warning");
  const [text, setText] = useState("¡Aún no has hecho un pedido para este menú!");
  const [actualIcon, setActualIcon] = useState<string>(warning);

  const idUser = actualSession?.id;

  useEffect(() => {
    if (!actualMenu) {
      setLoading(false);
      setActualIcon(informationCircle);
      setColor("primary");
      setText("¡Vaya, no hay ningún menú!");
      return;
    }
  
    console.log("Checking actualMenu:", actualMenu);
  
    const getOrder = async () => {
      try {
        const response = await getUserOrderByMenu(idUser!, actualMenu.id);
        if (response.status === 200) {
          let listOrders: OrderByIdResponse[] = response.data;
  
          listOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
          const lastOrder = listOrders[0];
          
          // Verificar si la última orden es diferente a la actual
          if (!actualOrder || lastOrder.id !== actualOrder.id) {
            setActualOrder(lastOrder);
            console.log("actual order", actualOrder);
  
            if (lastOrder.menu === actualMenu.id && lastOrder.state.id !== -1) {
              setActualIcon(checkmarkCircle);
              setColor("success");
              setText("¡Ya has hecho un pedido para este menú!");
            }
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log("Error al obtener la orden", error.response.status);
        } else {
          console.log("Error desconocido", error);
        }
      } finally {
        setLoading(false);
      }
    };
  
    getOrder();
  }, [actualMenu,actualOrder]); // Solo se ejecuta si actualMenu o actualOrder cambian
   // Dependencias: actualMenu, idUser, actualOrder, setActualOrder

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <IonCard>
      <IonCardContent>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <IonCardSubtitle style={{ marginRight: "18px", textAlign: "justify" }}>{text}</IonCardSubtitle>
          <IonIcon icon={actualIcon} color={color} size="large"></IonIcon>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ExistOrder;
