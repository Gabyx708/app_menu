import "./Menu.css";
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
  IonPage,
} from "@ionic/react";

import formatDateWithTime from "../../utils/formatDateWithHour";
import { fastFood } from "ionicons/icons";
import formatCurrency from "../../utils/formatCurrency";
import { useEffect, useState } from "react";
import { OrderRequest } from "../../types/order/typeOrderRequest";
import { getOrderById, makeOrder } from "../../services/api/orderService";
import axios from "axios";
import { useHistory } from "react-router";
import CancelOrder from "./CancelOrder";
import { useAppContext } from "../../context/AppContext";
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import { getDayFromWeek } from "../../utils/getDayFromWeek";
import formatDate from "../../utils/formatDate";

const Menu: React.FC = () => {
   const {actualOrder,actualMenu,setActualOrder} = useAppContext();
  const options = actualMenu?.options;

  const [cancelEnable,SetCancelEnable] = useState<boolean>(false);

  useEffect(() => {
    if(actualMenu && actualOrder){

      if (actualMenu.id === actualOrder.menu && actualOrder.state.description !== "cancelled")
        {
          SetCancelEnable(true);
        }else{
          SetCancelEnable(false);
        }
      }
  },[actualOrder,actualMenu]);

  if(cancelEnable)
  {
      return (
        <IonPage className="ion-page fullscreen">
          <IonHeader></IonHeader>
          <IonContent fullscreen>
                <CancelOrder/>
          </IonContent>
        </IonPage>
      );
  }


  return (
    <IonPage className="ion-page fullscreen">
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <MenuInformation menu={actualMenu!} />
        {options?.map((option, key) => (
          <MenuOption key={key} idMenu={actualMenu?.id!} option={option} />
        ))}
      </IonContent>
    </IonPage>
  );
};

const MenuInformation = ({ menu }: { menu: Menu }) => {
  return (
    <IonCard>
        <IonCardContent>
        <IonCardTitle>Sobre este menu</IonCardTitle>
        <hr className="line-divider"/>
        <IonCardSubtitle color='danger'>N°: {menu.id.toUpperCase()}</IonCardSubtitle>
        <p> </p>
        <IonCardSubtitle>SE COME EL: {getDayFromWeek(new Date(menu.eatingDate)).toUpperCase()} {formatDate(menu.eatingDate).toUpperCase()}
          </IonCardSubtitle>
        <IonCardSubtitle>SE CIERRA EL: {formatDateWithTime(menu.closeDate)}</IonCardSubtitle>
        </IonCardContent>
    </IonCard>
  );
};

const MenuOption = ({option,idMenu,}: {option: MenuItem;idMenu: string;}) => {

  const {actualSession} = useAppContext();
  const {setActualOrder} = useAppContext();
  const icon = fastFood;
  const [isOpen, setIsOpen] = useState(false);
  const [descriptOrder, setDescriptionOrder] = useState("<default>");
  const [orderRequest, setOrderRequest] = useState<OrderRequest | null>(null);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
  const history = useHistory();

  const handlerClickOption = () => {
    setIsOpen(true);
    setDescriptionOrder(option.description);
  };

  const handleOrder = async () => {

    const newOrder: OrderRequest = {
      idMenu: idMenu,
      idUser: actualSession?.id!,
      items: [
        {
          idDish: `${option.idDish}`,
          quantity: 1, // Puedes cambiar esto según la lógica que desees
        },
      ],
    };

    setOrderRequest(newOrder);

    try {
      const response = await makeOrder(newOrder);
      if (response.status === 201) {
        
        setActualOrder(null!);
        const newOrder = await getOrderById(response.data.id);
        setActualOrder(newOrder);
        
        setIsSuccessAlertOpen(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        let codigo = error.response.status;

        if (codigo == 409){
          setIsErrorAlertOpen(true);
        }

        if (codigo == 400){
          setIsErrorAlertOpen(true);
        }
      }
    }
  };

  return (
    <div>
      <IonAlert
        isOpen={isOpen}
        header="deseas confirmar tu pedido?"
        message={`Estas por pedir: ${descriptOrder}`}
        buttons={[
          {
            text: "cancelar",
            cssClass: "custon-cancel-button",
            handler: () => {
              console.log("cancelado");
            },
          },
          {
            text: "confirmar",
            cssClass: "custom-cancel-button",
            handler: () => {
              handleOrder();
            },
          },
        ]}
        onDidDismiss={() => {
          setIsOpen(false);
        }}
      ></IonAlert>

      <IonAlert
        isOpen={isSuccessAlertOpen}
        header="¡Éxito!"
        message="Su pedido fue realizado con éxito."
        buttons={[
          {
            text: "OK",
            handler: () => {
                setIsSuccessAlertOpen(false);
            },
          },
        ]}
      ></IonAlert>

      <IonAlert
        isOpen={isErrorAlertOpen}
        header="Error"
        message="Al parecer ya existe un pedido tuyo en este menu."
        buttons={[
          {
            text: "OK",
            handler: () => {
              setIsErrorAlertOpen(false);
            }
          }
        ]}
      ></IonAlert>

      <IonCard onClick={() => {handlerClickOption();}}>
        <IonCardHeader>
          <LabelImportantOutlinedIcon color="primary"/>
          <IonCardTitle>{option.description}</IonCardTitle>
          <IonCardSubtitle>
            Precio: {formatCurrency(option.price)}
          </IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          <hr style={{ height: 0.2, backgroundColor: "black" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p >QUEDAN: {option.stock - option.requested}</p>
            <p>SE PIDIERON: {option.requested}</p>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default Menu;
