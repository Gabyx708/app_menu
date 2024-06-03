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
import { getNextMenuAvailable } from "../../services/api/menuService";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "../../css/general.css";
import { useAppContext } from "../../context/AppContext";

const NextMenu: React.FC = () => {
  const { actualMenu, setActualMenu } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNextMenuAvailable();
        if (response.status !== 404) {
          setActualMenu(response.data);
        }
      } catch (error) {
        console.error('Error al obtener el menú:', error);
      }
    };

    fetchData();
  }, [setActualMenu]);

  return (
    <IonCard>
      <IonCardHeader style={{ textAlign: "center" }}>
        <div>
          <h2 style={{fontWeight: "bold",color: "black"}}>Proximo Menu</h2>
          <hr className="line-divider"/>
        </div>
      </IonCardHeader>
      <IonCardContent>
        { actualMenu ? <MenuData nextMenu={actualMenu}/> : <NotMenu/> }
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

  return (
    <>
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
              <span style={{ marginRight: "8px", fontSize: "24px" }}>
                <IonIcon icon={restaurant}/>
              </span>
              <h2>{option.description}</h2>
            </div>
          </IonCardContent>
        </IonCard>
      ))}
      <div style={{ textAlign: "center", marginTop: "5px" }}>
        <IonButton onClick={handleButtonClick}>IR A PEDIR</IonButton>
      </div>
    </>
  );
}

const NotMenu = () => {
  return (
    <IonCard>
      <IonCardContent>
        <div style={{textAlign:"center",fontSize: 30}}>
          <IonIcon icon={alertCircleOutline}></IonIcon>
          <p>NO ENCONTRAMOS NIGUN MENU</p>
        </div>
      </IonCardContent>
    </IonCard>
  );
}
