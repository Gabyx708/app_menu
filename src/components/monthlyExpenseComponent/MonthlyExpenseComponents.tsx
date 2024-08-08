import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";

import {walletOutline} from 'ionicons/icons';

const MonthlyExpense: React.FC = () => {

  const total = 8000;
  const month = 'mayo';

  const formattedTotal = total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <IonCard>
      <IonCardHeader>
        <div style={{display: 'inline-flex'}}>
        <IonIcon icon={walletOutline} color='primary' size="large" style={{ marginRight: "10px" }} />
        <IonCardSubtitle style={{fontSize: "20px",color: 'black'}}>Gastos del mes de {month}</IonCardSubtitle>
        </div>
        <IonCardTitle style={{ textAlign: "right", fontWeight: "bolder", fontSize: "30px"}} color='primary'>
          {formattedTotal}
        </IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default MonthlyExpense;
