import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonButton,
  IonIcon,
  IonCardTitle,
} from "@ionic/react";

import { alertCircleOutline, restaurant } from "ionicons/icons";
import formatDate from "../../utils/formatDate";
import formatDateWithTime from "../../utils/formatDateWithHour";
import { getNextMenuAvailable, saveActualMenu } from "../../services/local/menuService";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "../../css/general.css";

const NextMenu: React.FC = () => {

  const [menu,setMenu] = useState<Menu | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNextMenuAvailable();
        
        if(response.status != 404){
            setMenu(response.data);
            saveActualMenu(response.data); //guarda el menu actual en memoria
        }
      } catch (error) {
        console.error('Error al obtener el menú:', error);
      }
    };

    fetchData(); // Llama a la función fetchData al montar el componente
  }, []);

  

  return (
    <IonCard>
      <IonCardHeader style={{ textAlign: "center" }}>
        <div>
          <h2 style={{fontWeight: "bold",color: "black"}}>Proximo Menu</h2>
          <hr className="line-divider"/>
        </div>
      </IonCardHeader>
      <IonCardContent>
            { menu != null ? <MenuData nextMenu={menu}/> : <NotMenu/>}
      </IonCardContent>
    </IonCard>
  );
};

export default NextMenu;


const MenuData  = ({ nextMenu }: { nextMenu: Menu }) => {
  
  const history = useHistory();
  const handleButtonClick = () => {
    history.push('/menu');
  }

  let options: MenuItem[] = nextMenu.options;

  return <>
       <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p style={{ textAlign: "left" }}>
              Se come el: {formatDate(nextMenu.eatingDate)}
            </p>
          </div>
          <div>
            <p style={{ textAlign: "right" }}>
              Cierra el: {formatDateWithTime(nextMenu.closeDate)}
            </p>
          </div>
        </div>
        {options.map((option, index) => (
          <IonCard key={index} style={{ marginTop: "16px" }}>
            <IonCardContent>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "8px", fontSize: "24px" }}><IonIcon icon={restaurant}/></span>
                <h2>{option.description}</h2>
              </div>
            </IonCardContent>
          </IonCard>
        ))}
        <div style={{ textAlign: "center", marginTop: "5px" }}>
            <IonButton onClick={handleButtonClick}>IR A PEDIR</IonButton>
        </div></>
      }

const NotMenu = () => {
  return <IonCard>
    <IonCardContent>
      <div style={{textAlign:"center",fontSize: 30}}>
        <IonIcon icon={alertCircleOutline}></IonIcon>
        <p>NO ENCONTRAMOS NIGUN MENU</p>
      </div>
    </IonCardContent>
  </IonCard>
}