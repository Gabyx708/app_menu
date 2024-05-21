//import "./Home.css";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  useIonViewDidEnter,
} from "@ionic/react";

import { personCircle } from "ionicons/icons";
import MonthlyExpense from "../../components/monthlyExpenseComponent/MonthlyExpenseComponents";
import NextMenu from "../../components/nextMenuComponent/NextMenu";
import ExistOrder from "./ExistOrderComponent";
import { getUser } from "../../services/userService";
import { showTabBar } from "../../utils/tabBarVisibility";

const Home: React.FC = () => {

  const nickname = getUser()?.nickName ? getUser()?.nickName : '<default>';

  useIonViewDidEnter(() => {
    showTabBar(); //visible tabBar
  })

  return (
    <IonPage className="ion-page fullscreen">
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense"></IonHeader>
      

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

      <MonthlyExpense/>
      <ExistOrder/>
      <NextMenu/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
