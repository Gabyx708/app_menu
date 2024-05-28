import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonIcon } from "@ionic/react";
import { warning,checkmarkCircle } from "ionicons/icons";
import { getUser } from "../../services/local/userService";
import { getActualMenu } from "../../services/local/menuService";
import { useEffect, useState } from "react";
import { getUserOrderByMenu } from "../../services/api/orderService";
import axios from "axios";
import { saveOrder } from "../../services/local/orderService";

const ExistOrder: React.FC = () => {

  const [rederStatus,setRenderStatus] = useState(false);
  const [color, setColor] = useState("warning");
  const [text, setText] = useState("¡Aún no has hecho un pedido para este menú!");
  const [actualIcon, setActualIcon] = useState<string>(warning);

  let idUser = getUser()?.id;
  let idMenu = getActualMenu()?.id;

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await getUserOrderByMenu(idUser!, idMenu!);

        if (response.status == 200) setColor("success");
        setActualIcon(checkmarkCircle);
        setText("Ya has hecho un pedido para este menu!");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          let codigo = error.response.status;
          console.log(codigo);
        }
      }
    };

    getOrder();
  }, []);

  return (
    <IonCard>
      <IonCardContent>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <IonCardSubtitle style={{ marginRight: "18px", textAling: "justify" }}>{text}</IonCardSubtitle>
          <IonIcon icon={actualIcon} color={color} size="large"></IonIcon>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ExistOrder;
