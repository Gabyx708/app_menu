import { IonAlert, IonButton, IonCard, IonCardContent, IonIcon, IonItem, IonList } from "@ionic/react";
import { clearOrder, getOrder } from "../../services/local/orderService";
import { checkmarkCircle } from "ionicons/icons";
import formatDateWithTime from "../../utils/formatDateWithHour";
import { Item } from "../../types/typeOrderResponse";
import formatCurrency from "../../utils/formatCurrency";
import "../../css/general.css";
import { useState } from "react";
import { cancelOrder } from "../../services/api/orderService";
import { useHistory } from "react-router";

const CancelOrder: React.FC = () => {
  const order = getOrder();
  const [isOpen,setIsOpen] = useState<boolean>(false);
  const history = useHistory();

  if (!order) {
    return <div>ocurrio un problema</div>;
  }

  const handlerCancelation = async () =>{
      
      try{
        const response = await cancelOrder(order.id);
        clearOrder();
        history.push("/home");
    }catch(error){
        console.log("error")
    }
  }

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
            },
          },
        ]}
        onDidDismiss={() => {
          setIsOpen(false);
        }}
      ></IonAlert>
      
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
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
          <h5>Este pedido se hizo el {formatDateWithTime(order.date)}</h5>
        </IonItem>
        <IonItem>
          <IonCardContent>
            <div style={{ textAlign: "center" }}>
              <h1>RESUMEN</h1>
              <hr className="line-divider" style={{ marginBottom: 30 }} />
              {order.items.map((item, key) => (
                <ItemComponent key={key} item={item} />
              ))}
              <IonButton color={"danger"} onClick={()=>setIsOpen(true)}>CANCELAR</IonButton>
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
