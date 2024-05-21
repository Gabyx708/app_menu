import './Menu.css';
import {
  IonAlert,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";
import { getActualMenu } from "../../services/menuService";
import formatDate from "../../utils/formatDate";
import formatDateWithTime from "../../utils/formatDateWithHour";
import { fastFood } from "ionicons/icons";
import formatCurrency from "../../utils/formatCurrency";
import { useState } from "react";

const Menu: React.FC = () => {
  const menuInMemory: Menu | null = getActualMenu();
  const options = menuInMemory?.options;
  return (
    <IonPage className="ion-page fullscreen">
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <MenuInformation menu={menuInMemory!} />
        {options?.map((option, key) => (
          <MenuOption key={key} idMenu={menuInMemory?.id!} option={option} />
        ))}
      </IonContent>
    </IonPage>
  );
};

const MenuInformation = ({ menu }: { menu: Menu }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCard>
          <IonCardHeader>menu: {menu.id}</IonCardHeader>
        </IonCard>
      </IonCardHeader>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <IonCard>
          <IonCardHeader>
            se abrio el:{formatDateWithTime(menu.uploadDate)}
          </IonCardHeader>
        </IonCard>
        <IonCard>
          <IonCardHeader>cierra el:{formatDate(menu.closeDate)}</IonCardHeader>
        </IonCard>
      </div>
      <IonCard>
        <IonCardTitle>
          <h6 style={{ textAlign: "center" }}>
            se come el: {formatDate(menu.eatingDate)}
          </h6>
        </IonCardTitle>
      </IonCard>
    </IonCard>
  );
};

const MenuOption = ({option,idMenu,}: {option: MenuItem;idMenu: string;}) => {

  const icon = fastFood;
  const [isOpen,setIsOpen] = useState(false);
  const [descriptOrder,setDescriptionOrder] = useState('<default>');

  const handlerClickOption = () =>{
    setIsOpen(true);
    setDescriptionOrder(option.description);
  }


  return (
    <div>
      <IonAlert
        isOpen={isOpen}
        header="deseas confirmar tu pedido?"
        message={`Estas por pedir: ${descriptOrder}`}
        buttons={[
          {
            text: "cancelar",
            cssClass: 'custon-cancel-button',
            handler: () => {
              console.log("cancelado");
            },
          },
          {
            text: "confirmar",
            cssClass: 'custom-cancel-button',
            handler: () => {
              console.log("confirmado");
            },
          },
        ]}
        onDidDismiss={() => {
          setIsOpen(false);
        }}
      ></IonAlert>

      <IonCard
        onClick={() => {
          handlerClickOption();
        }}
      >
        <IonCardHeader>
          <IonIcon icon={icon} size="large"></IonIcon>
          <IonCardTitle>{option.description}</IonCardTitle>
          <IonCardSubtitle>
            precio: {formatCurrency(option.price)}
          </IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          <hr style={{ height: 0.2, backgroundColor: "black" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>disponibles: {option.stock - option.requested}</p>
            <p>pedidos: {option.requested}</p>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default Menu;
