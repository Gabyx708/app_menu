import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { informationCircle, checkmarkCircle, warning } from "ionicons/icons";
import { getUserOrderByMenu } from "../../services/api/orderService";
import axios from "axios";
import { OrderByIdResponse } from "../../types/order/typeOrderByIdResponse";

const ExistOrder: React.FC = () => {
  const { actualOrder, setActualOrder, actualMenu, actualSession } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("warning");
  const [text, setText] = useState("¡Aún no has hecho un pedido para este menú!");
  const [actualIcon, setActualIcon] = useState<string>(warning);

  const idUser = actualSession?.id;
  useEffect(() => {
    const fetchOrder = async () => {
      console.log("ejecucion", actualMenu, idUser);
  
      if (!actualMenu || !idUser) {
        setLoading(false);
        setActualIcon(informationCircle);
        setColor("primary");
        setText("¡Vaya, no hay ningún menú!");
        return;
      }
  
      try {
        const response = await getUserOrderByMenu(idUser, actualMenu.id);
        console.log("se actualizo", response);
  
        if (response.status === 200) {
          const listOrders = response.data.filter((order: OrderByIdResponse) => order.state.id !== -1);
  
          if (listOrders.length > 0) {
            listOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            const lastOrder = listOrders[0];
  
            setActualOrder(lastOrder);
  
            if (lastOrder.menu === actualMenu.id) {
              setActualIcon(checkmarkCircle);
              setColor("success");
              setText("¡Ya has hecho un pedido para este menú!");
            }
          } else {
            setActualIcon(warning);
            setColor("warning");
            setText("¡Aún no has hecho un pedido para este menú!");
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setActualIcon(warning);
            setColor("warning");
            setText("¡Aún no has hecho un pedido para este menú!");
          } else {
            console.log("Error al obtener la orden", error.response?.status);
          }
        } else {
          console.log("Error desconocido", error);
        }
      } finally {
        setLoading(false);
      }
    };
  
    // Realizar la solicitud solo si actualOrder no está definido o si se ha cambiado actualMenu
    if (!actualOrder || actualMenu?.id !== actualOrder.menu) {
      fetchOrder();
    }
  }, [actualMenu, actualSession, setActualOrder, actualOrder]);
  
  

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
