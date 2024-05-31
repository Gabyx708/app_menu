import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { getFuturesMenues, getMenuById } from "../../services/api/menuService";
import { getMondayFromDate } from "../../utils/getMondayFromDate";
import { MenuResume } from "../../types/menu/typePageMenuResume";
import { getDayFromWeek } from "../../utils/getDayFromWeek";
import formatDateWithTime from "../../utils/formatDateWithHour";
import formatDate from "../../utils/formatDate";
import { calendarClearOutline } from "ionicons/icons";
import { useAppContext } from "../../context/AppContext";
import { useHistory } from "react-router";

const Futures: React.FC = () => {

    const [menues,setMenues] = useState<MenuResume[]>();
    const actualDate = new Date();

    useEffect(()=>{
            const fetchMenues = async ()=>{
                    const response = await getFuturesMenues(getMondayFromDate(actualDate));
                    setMenues(response);
            };

            fetchMenues();
    },[])
  return (
    <IonPage>
      <IonContent fullscreen>
        <h2>PROXIMOS MENUES</h2>

        <section>
            {
                menues?.map((menu,index)=> (
                    <MenuFound menu={menu} key={index}/>
                ))
            }
        </section>
      </IonContent>
    </IonPage>
  );
};

const MenuFound = ({ menu }: { menu: MenuResume }) => {
    
    const {actualMenu,setActualMenu} = useAppContext();
    const history = useHistory();

    const handleClick = async () =>{
            
        const response = await getMenuById(menu.idMenu);
        setActualMenu(response);
        history.push("/menu");
    };

  return (
    <div onClick={()=>{handleClick()}}>
      <IonCard>
        <IonCardContent>
          <div>
            <section>
              <IonCardTitle>
                <IonIcon icon={calendarClearOutline} />
                {getDayFromWeek(new Date(menu.eatingDate)).toLowerCase()}{" "}
                {formatDate(menu.eatingDate)}
              </IonCardTitle>
              <IonCardSubtitle>
                fecha de cierre: {formatDateWithTime(menu.closeDate)}
                <br></br>
                se cargo el:{formatDateWithTime(menu.uploadDate)}
              </IonCardSubtitle>
            </section>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default Futures;
