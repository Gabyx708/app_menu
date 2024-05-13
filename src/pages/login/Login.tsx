import { IonAlert,
        IonButton,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonContent,
        IonIcon,
        IonInput,
        IonPage,
        useIonViewDidEnter } from "@ionic/react";

import { useState } from 'react';
import { hideTabBar } from '../../utils/tabBarVisibility';
import './Login.css';
import { restaurant } from "ionicons/icons";
import loginUser from "../../services/loginService";
import { saveUser } from "../../services/userService";
import { useHistory } from "react-router";


const Login:React.FC = () => {
    
    const history = useHistory();
    
    useIonViewDidEnter(() => {
        hideTabBar(); //esconder barra de navegacion
    });

    const [isOpen,setIsOpen] = useState(false);
    const [errorOpen,setErrorOpen] = useState(false);
    
    const [userName,setUserName] = useState<string | null>(null);
    const [password,setPassword] = useState<string | null>(null);

    const handleUserNameChange = (e: CustomEvent) => {
        const value = (e.target as HTMLInputElement).value;
        setUserName(value);
    }

    const handlePasswordChange = (e: CustomEvent) => {
        const value = (e.target as HTMLInputElement).value;
        setPassword(value);
    }

    const handleLogin = async () => {
        
        let notExists:Boolean = userName == null || password == null;
        let tooShort: Boolean = userName?.length! < 5 || password?.length! < 5;

        if(notExists || tooShort){
            setIsOpen(true);
            return;
        }
        
        try{
            const user = await loginUser(userName!,password!);
            const userSave = saveUser(user);

            //redirect to /home
            history.push('/home');

        }catch(error){
            setErrorOpen(true);
        }
              
    }

    return (
        <IonPage>
          <IonContent className="ion-content-centered" fullscreen>
            <IonCard className='ion-card'>
              <IonCardHeader className="ion-card-header">
              <div className="ion-icon-container">
              <IonIcon icon={restaurant} style={{fontSize: '4rem',color: 'lightblue'}}/>
            </div>
              </IonCardHeader>
              <IonCardContent className="ion-card-content">
                <div style={{ marginBottom: '20px' }}>
                  <IonInput onIonInput={handleUserNameChange} fill="outline" placeholder="Username" type="text" style={{ padding: '20px' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <IonInput onIonInput={handlePasswordChange} fill="outline" placeholder="Password" type="password" style={{ padding: '20px' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <IonButton onClick={handleLogin}>INGRESAR</IonButton>

                  <IonAlert
                    isOpen={isOpen}
                    header="Revisa bien los datos!"
                    message="debe ingresar usuario y contraseña"
                    buttons={['ENTENDIDO']}
                    onDidDismiss={() => setIsOpen(false)}
                  ></IonAlert>

                    <IonAlert
                    isOpen={errorOpen}
                    header="usuario y/o contraseña incorrecta"
                    buttons={['ENTENDIDO']}
                    onDidDismiss={() => setErrorOpen(false)}
                  ></IonAlert>

                </div>
              </IonCardContent>
            </IonCard>

            <footer style={{textAlign: 'center'}}>
                <h5>v 2.0.0</h5>
            </footer>
          </IonContent>
        </IonPage>
      );
      
} 


export default Login;