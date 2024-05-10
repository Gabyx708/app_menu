//import "./Home.css";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonCardContent,
} from "@ionic/react";

import { personCircle } from "ionicons/icons";
import MonthlyExpense from "../../components/monthlyExpenseComponent/MonthlyExpenseComponents";
import NextMenu from "../../components/nextMenuComponent/NextMenu";
import ExistOrder from "./ExistOrderComponent";

const Home: React.FC = () => {
  const nickname = "John Doe";

  return (
    <IonPage className="ion-page fullscreen">
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense"></IonHeader>
      </IonContent>

      <IonCard>
        <IonCardHeader
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            float: "left"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IonIcon icon={personCircle} size="large" color="primary"></IonIcon>
            <IonCardTitle style={{ marginLeft: "18px" }}>
              Hola {nickname}!
            </IonCardTitle>
          </div>
        </IonCardHeader>
      </IonCard>

      <MonthlyExpense></MonthlyExpense>
      <ExistOrder></ExistOrder>
      <NextMenu></NextMenu>
    </IonPage>
  );
};

export default Home;
