import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonIcon } from "@ionic/react";
import { warning,checkmarkCircle } from "ionicons/icons";

const ExistOrder: React.FC = () => {

  let exist: Boolean = true;
  let text: String = "Ya has hecho tu pedido para este menu!";
  let actualIcon:string = checkmarkCircle;
  let color = "success"

  if(!exist)
    {
        text = 'aun no has hecho un pedido para este menu!'
        color = 'warning'
        actualIcon = warning
    }

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
