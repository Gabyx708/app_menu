import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonItem,
  IonPage,
} from "@ionic/react";
import { useAppContext } from "../../context/AppContext";
import {
  archiveSharp,
  checkmarkCircle,
  closeCircle,
  flame,
  informationCircle,
} from "ionicons/icons";
import { Icon } from "ionicons/dist/types/components/icon/icon";
import "../../css/general.css";
import "./OderDetails.css";
import { OrderByIdResponse } from "../../types/order/typeOrderByIdResponse";
import { Item, ReceiptOrder } from "../../types/order/typeOrderResponse";
import formatCurrency from "../../utils/formatCurrency";
import formatDateWithTime from "../../utils/formatDateWithHour";

const OrderDetails: React.FC = () => {
  const { orderDetail } = useAppContext();

  if (orderDetail == null) {
    return <div>CARGANDO...</div>;
  }

  const colors = ["danger", "primary", "success"];
  const icons = [closeCircle, informationCircle, checkmarkCircle];
  const states = ["cancelado", "en progreso", "completado"];
  let index = orderDetail.state.id;

  if (index == -1) {
    index = 0;
  }

  const icon = icons[index];
  const state = states[index];
  const color = colors[index];

  return (
    <IonPage>
      <IonContent>
        <div className="wrapper-order">
          <IonCard>
            <IonCardContent>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IonIcon icon={archiveSharp} size="large" style={{ marginRight: "10px" }} />
                <IonCardTitle>estado del pedido: {state}</IonCardTitle>
                <IonIcon icon={icon} size="large" color={color} />
              </div>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
              <IonCardTitle>Informacion</IonCardTitle>
              <hr className="line-divider"/>
                  <p>N° de orden: {orderDetail.id}</p>
                  <p>fecha: {formatDateWithTime(orderDetail.date)}</p>
            </IonCardContent>
          </IonCard>
              
          <IonCard>
            <IonCardContent>
              <IonCardTitle>Tu pedido</IonCardTitle>
              <hr className="line-divider" />
              {
                orderDetail.items.map((item, index) => (
                  <FoodItem item={item} key={index} />
                ))
              }
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
              <IonCardTitle>Recibo</IonCardTitle>
              <hr className="line-divider"/>
              {!orderDetail.receipt ? <h2>este pedido aun no posee recibo</h2> : <Receipt receipt={orderDetail.receipt}/>}
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
}  

export default OrderDetails;

const FoodItem = ({ item }: { item: Item }) => {
  return (
    <IonItem>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ marginBottom: "5px" }}>{item.description}</p>
        <p style={{ marginLeft: "5px", color: "green" }}>{formatCurrency(item.price)}</p>
        <p style={{ marginLeft: "5px" }}>x{item.quantity}</p>
      </div>
    </IonItem>
  );
};


const Receipt = ({receipt}:{receipt : ReceiptOrder}) => {
    return <div>
      <p>fecha: {formatDateWithTime(receipt.date)}</p>
      <br />
      <p>subtotal pedido: {formatCurrency(receipt.totalPrice)}</p>
      <p>total descuento: {formatCurrency(receipt.totalDiscount)}</p>
      <hr  className="line-divider"/>
      <h2>TOTAL { formatCurrency(receipt.totalPrice - receipt.totalDiscount)}</h2>
    </div>
}