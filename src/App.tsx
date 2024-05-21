import { Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home,cart,settings,calendar} from 'ionicons/icons';
import Home from './pages/home/Home';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
//import '@ionic/react/css/palettes/dark.system.css';  <-- DARK MODE OFF

/* Theme variables */
import './theme/variables.css';
import Login from './pages/login/Login';
import { useState } from 'react';
import Menu from './pages/menu/Menu';

setupIonicReact();

const App: React.FC = () => {

  const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);

  return(
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/" render={()=> <Home/>}/>
          <Route path="/orders" render={()=><Tab3/>}/>
          <Route path="/future" render={()=><Tab3/>}/>
          <Route path="/waiter" render={()=><Tab3/>}/>
          <Route path="/home" render={()=><Home/>}/>
          <Route path="/login" render={()=><Login/>}/>
          <Route path="/menu" render={()=><Menu/>}/>
        </IonRouterOutlet>



        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/home">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="tab2" href="/orders">
            <IonIcon aria-hidden="true" icon={cart} />
            <IonLabel>pedidos</IonLabel>
          </IonTabButton>

          <IonTabButton tab="tab3" href="/future">
            <IonIcon aria-hidden="true" icon={calendar} />
            <IonLabel>futuros</IonLabel>
          </IonTabButton>

          <IonTabButton tab="tab4" href="/waiter">
            <IonIcon aria-hidden="true" icon={settings}/>
            <IonLabel>mesero</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>)
};

export default App;
