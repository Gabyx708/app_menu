import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonButton,
  IonIcon,
} from "@ionic/react";

import { restaurant } from "ionicons/icons";
import exampleMenu from "../../test/exampleMenu";
import formatDate from "../../utils/formatDate";
import formatDateWithTime from "../../utils/formatDateWithHour";
import { getNextMenuAvailable } from "../../services/menuService";
import { useEffect, useState } from "react";

const NextMenu: React.FC = () => {

  const [menu,setMenu] = useState<Menu | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNextMenuAvailable();
        
        if(response.status != 404){
            setMenu(response.data);
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
        </div>
      </IonCardHeader>
      <IonCardContent>
            { menu != null ? <MenuData nextMenu={menu}/> : <h3>NO HAY MENU</h3>}
      </IonCardContent>
    </IonCard>
  );
};

export default NextMenu;


const MenuData  = ({ nextMenu }: { nextMenu: Menu }) => {
  
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
          <IonButton>IR A PEDIR</IonButton>
        </div></>
      }