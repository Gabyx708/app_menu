import { IonButton, IonCard, IonCardContent, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonIcon, IonLabel, IonModal, IonPage } from "@ionic/react";
import { getUserOrders, getOrderById } from "../../services/api/orderService";
import { useEffect, useState } from "react";
import { OrderSummary } from "../../types/order/typeOrdersPage";
import { checkmarkCircle, closeCircle, informationCircle } from "ionicons/icons";
import formatDateWithTime from "../../utils/formatDateWithHour";
import "../../css/general.css";
import "./Order.css";
import { useAppContext } from "../../context/AppContext";
import { useHistory } from "react-router";

const Orders: React.FC = () => {
  const { actualSession, setActualOrder,setOrderDetail,actualOrder } = useAppContext();
  const history = useHistory();

  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchOrdersInitial = async () => {
      let response = await getUserOrders(actualSession?.id!, null, null, pageIndex);
      setOrders(response.page.orders);
      setPageIndex(response.page.index);
      setTotalPages(response.page.totalPages);
    };
    fetchOrdersInitial();
  }, [pageIndex, actualSession,actualOrder]);

  const handleFetchOrders = async () => {
    let response = await getUserOrders(actualSession?.id!, startDate, endDate, pageIndex);
    setOrders(response.page.orders);
    setPageIndex(response.page.index);
    setTotalPages(response.page.totalPages);
  };

  const handleOrderClick =  async (orderId: string) => {
      const order = await getOrderById(orderId);
      setOrderDetail(order);
      history.push("/detail");

  };

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <div style={{ padding: 15, textAlign: "center" }}>
          <div className="date-picker-container">
            <IonLabel>Desde:</IonLabel>
            <IonDatetimeButton datetime="datetime-start"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime
                id="datetime-start"
                presentation="date"
                onIonChange={(e) => setStartDate(e.detail.value! as string)}
              ></IonDatetime>
            </IonModal>
          </div>
          <div className="date-picker-container">
            <IonLabel>Hasta:</IonLabel>
            <IonDatetimeButton datetime="datetime-end"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime
                id="datetime-end"
                presentation="date"
                onIonChange={(e) => setEndDate(e.detail.value! as string)}
              ></IonDatetime>
            </IonModal>
          </div>
          <IonButton className="fetch-orders-button" onClick={handleFetchOrders}>Buscar</IonButton>
        </div>

        <section>
          <h5 style={{ textAlign: "center" }}>HISTORIAL DE PEDIDOS</h5>
          <hr className="line-divider" style={{ width: 300 }} />
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} onClick={() => handleOrderClick(order.id)}>
                <OrderItem order={order}></OrderItem>
              </div>
            ))
          ) : (
            <IonCard>
              <IonCardContent>
                <div style={{ textAlign: "center" }}>
                  <h2>NO SE ENCONTRARON PEDIDOS</h2>
                </div>
              </IonCardContent>
            </IonCard>
          )}
        </section>
        <div className="pagination-controls">
          <IonButton
            onClick={() => setPageIndex(pageIndex > 1 ? pageIndex - 1 : 1)}
            disabled={pageIndex === 1}
          >
            Anterior
          </IonButton>
          <div className="page-info">
            {pageIndex}/{totalPages}
          </div>
          <IonButton
            onClick={() => setPageIndex(pageIndex < totalPages ? pageIndex + 1 : totalPages)}
            disabled={pageIndex === totalPages}
          >
            Siguiente
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

const OrderItem = ({ order }: { order: OrderSummary }) => {
  const colors = ["danger", "primary", "success"];
  const icons = [closeCircle, informationCircle, checkmarkCircle];
  const states = ["cancelado", "en progreso", "completado"];
  let index = order.stateCode;

  if (order.stateCode == -1) {
    index = 0;
  }

  const icon = icons[index];
  const state = states[index];
  const color = colors[index];

  return (
    <IonCard>
      <IonCardContent>
        <div>
          <h4 style={{ fontWeight: "bolder" }}>PEDIDO N°: {order.id}</h4>
          <h6>fecha: {formatDateWithTime(order.date)}</h6>
        </div>
        <div style={{ float: "right", textAlign: "center" }}>
          <IonIcon icon={icon} color={color} size="large"></IonIcon>
          <h6>{state}</h6>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default Orders;
