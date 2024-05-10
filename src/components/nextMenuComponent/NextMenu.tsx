import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonButton,
} from "@ionic/react";
import formatDate from "../../utils/formatDate";
import exampleMenu from "../../test/exampleMenu";
import formatDateWithTime from "../../utils/formatDateWithHour";

const NextMenu: React.FC = () => {
  let nextMenu: Menu = exampleMenu;
  let options: MenuItem[] = exampleMenu.options;

  return (
    <IonCard>
      <IonCardHeader style={{ textAlign: "center" }}>
        <div>
          <h2 style={{fontWeight: "bold",color: "black"}}>Proximo Menu</h2>
        </div>
      </IonCardHeader>
      <IonCardContent>
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
                <span style={{ marginRight: "8px", fontSize: "24px" }}>•</span>
                <h2>{option.description}</h2>
              </div>
            </IonCardContent>
          </IonCard>
        ))}
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <IonButton>IR A PEDIR</IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default NextMenu;
