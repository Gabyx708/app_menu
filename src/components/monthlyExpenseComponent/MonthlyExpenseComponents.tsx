import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";

import {walletOutline} from 'ionicons/icons';
import { getUserBill } from "../../services/api/userService";
import { useEffect, useState } from "react";
import { getMondayFromDate } from "../../utils/getMondayFromDate";
import { useAppContext } from "../../context/AppContext";

const MonthlyExpense: React.FC = () => {
  
  const {actualSession} = useAppContext();

  const date = new Date();
  const monthNumber = (date.getMonth()) + 1;
  const year = date.getFullYear();
  const idUser = actualSession?.id;

  const [month,setMonth] = useState('<not month>');
  const [billMount,setBillMount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await getUserBill(idUser!,monthNumber,year);
        setBillMount(response.data.total);
        setMonth(response.data.month.monthName);

      } catch (error) {
        console.error('Error al obtener el menú:', error);
      }
    };

    fetchData();
  }, []);


  const formattedTotal = billMount.toLocaleString("en-US", {
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
