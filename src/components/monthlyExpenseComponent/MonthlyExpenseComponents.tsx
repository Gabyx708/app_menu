import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";

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
        <IonCardSubtitle style={{fontSize: "20px"}}>Gastos: {month}</IonCardSubtitle>
        <IonCardTitle style={{ textAlign: "right", fontWeight: "lighter", fontSize: "30px" }}>
          {formattedTotal}
        </IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default MonthlyExpense;
