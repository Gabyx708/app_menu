import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonList,
} from "@ionic/react";
import {
  clearOrder,
  getOrderInMemory,
} from "../../services/local/orderService";
import { checkmarkCircle } from "ionicons/icons";
import formatDateWithTime from "../../utils/formatDateWithHour";
import { Item } from "../../types/order/typeOrderResponse";
import formatCurrency from "../../utils/formatCurrency";
import "../../css/general.css";
import { useState } from "react";
import { cancelOrder, getOrderById } from "../../services/api/orderService";
import { useHistory } from "react-router";
import { useAppContext } from "../../context/AppContext";
import axios, { isAxiosError } from "axios";

const CancelOrder: React.FC = () => {
  const { actualOrder, setActualOrder } = useAppContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConflictOpen, setIsConflictOpen] = useState<boolean>(false);
  const history = useHistory();

  if (!actualOrder) {
    return <div>ocurrio un problema</div>;
  }

  const handlerCancelation = async () => {
    try {
      clearOrder();

      const idOrder = actualOrder.id;
      await cancelOrder(actualOrder.id);
      setActualOrder(null!);

      const updateOrder = await getOrderById(idOrder);
      setActualOrder(updateOrder);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let status = error.response?.status;

        if (status == 409) {
          setIsConflictOpen(true);
        }
      }
    }
  };

  return (
    <>
      <IonAlert
        isOpen={isOpen}
        header="estas a punto de cancelar tu pedido!"
        buttons={[
          {
            text: "CONFIRMAR",
            cssClass: "custom-cancel-button",
            handler: () => {
              handlerCancelation();
              setIsOpen(false);
            },
          },
        ]}
        onDidDismiss={() => {
          setIsOpen(false);
        }}
      ></IonAlert>

      <IonAlert
        isOpen={isConflictOpen}
        header="el menu de este pedido ya cerro o el pedido fue completado,actualmente no es posible cancelarlo"
        buttons={[
          {
            text: "OK",
            cssClass: "custom-cancel-button",
            handler: () => {
              setIsConflictOpen(false);
            },
          },
        ]}
        onDidDismiss={() => {
          setIsConflictOpen(false);
        }}
      ></IonAlert>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <IonList inset={true} style={{ width: "90%", maxWidth: "800px" }}>
          <IonItem>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h4 style={{ margin: 0 }}>¡Ya has pedido para este menú!</h4>
              <IonIcon
                icon={checkmarkCircle}
                color="success"
                size="large"
                style={{ marginLeft: "10px" }}
              />
            </div>
          </IonItem>

          <IonItem>
            <h5>
              Este pedido se hizo el {formatDateWithTime(actualOrder.date)}
            </h5>
          </IonItem>
          <IonItem>
            <IonCardContent>
              <div style={{ textAlign: "center" }}>
                <h1>RESUMEN</h1>
                <hr className="line-divider" style={{ marginBottom: 30 }} />
                {actualOrder.items.map((item, key) => (
                  <ItemComponent key={key} item={item} />
                ))}
                <IonButton color={"danger"} onClick={() => setIsOpen(true)}>
                  CANCELAR
                </IonButton>
              </div>
            </IonCardContent>
          </IonItem>
        </IonList>
      </div>
    </>
  );
};

const ItemComponent = ({ item }: { item: Item }) => {
  return (
    <IonCard>
      <IonCardContent>
        <section style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ padding: 10 }}>
            <h4>{item.description}</h4>
          </div>
          <div style={{ padding: 10 }}>
            <p style={{ color: "green" }}>{formatCurrency(item.price)}</p>
          </div>
        </section>
      </IonCardContent>
    </IonCard>
  );
};

export default CancelOrder;
