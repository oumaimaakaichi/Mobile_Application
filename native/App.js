import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homme from './Screen/homme'
import OnBoardScreenL from './Screen/homme2';
import Login from './Screen/login';
const Stack = createStackNavigator();
import Register from './Screen/inscri';
import Liste_stas from './Screen/client/liste';
import EspaceClient from './Screen/client/espaceClient';
import Dashboard from './Screen/dashboard';
import ListeS from './Screen/client/listeStation';
import Reservation from './Screen/reservation';
import Koko from './Screen/client/rese';
import DashboardHoraire from './Screen/AjouterHoraireDash'
import OnHistorique from './Screen/oneHistorique';
import ReservationU from './Screen/client/reservations';
import MapStation from './Screen/client/MapStation';
import Signin from './Screen/log';
import ListeSt from './Screen/client/espaceListe';
import DahboardProfile from './Screen/client/DashProfile';
import Profile from './Screen/client/profile';
import RegisterClient from './Screen/client/registerC';
import LoginC from './Screen/client/LoginC';
import ForgotPass from './Screen/forgotPass';
import HistoriqueReservation from './Screen/DashHistorique';  
import StationData from './Screen/client/informationStation';
import App7 from './Screen/client/liste';
import AddReservation from './Screen/client/ajoutReservation';
import App5 from './Screen/res';
import NewReservation from './Screen/client/NewReservation';
import ReservationStation from './Screen/ReservationStation';
import MesReservation from './Screen/client/MesReservation';
import OnrReservation from './Screen/oneReserva';
import Reservationclient from './Screen/client/resevationclient';
import NewReservationMap from './Screen/client/reservationMap';
import DashboardProfil from './Screen/DashProfil'
import {Splash} from './Screen/splash';
import StationInformation from './Screen/client/StationInformations';
import InscriC from './Screen/client/regi';
import Tab from './Screen/tab';
export default function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Homme' screenOptions = {{ headerShown : false}}>
      {/* <Stack.Screen name='Home' component={Homme} options={{ headerShown: false }} />*/}
      <Stack.Screen name="Splash" component= {Splash} />
        <Stack.Screen name='OnBoardScreenL' component={OnBoardScreenL}    options={{
   gestureEnabled: false
            }}/>
        <Stack.Screen name='Rerse' component={ReservationU}options={{ headerShown: false }} />
        <Stack.Screen name='listeS' component={ListeS}options={{ headerShown: false }} />
                <Stack.Screen name='mapstation' component={MapStation}options={{ headerShown: false }} />
                <Stack.Screen name='Update' component={DashboardProfil}options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='addreservation' component={AddReservation} />
        <Stack.Screen name='mapRes' component={NewReservationMap} />
        <Stack.Screen name='oneReservation' component={OnrReservation} />
        <Stack.Screen name='Liste_stas' component={ListeSt}options={{ headerShown: false }} />
        <Stack.Screen name='signin' component={Signin} />
        <Stack.Screen name='registerC' component={InscriC} />
        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
        <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false }} />
       
        <Stack.Screen name='Reservation' component={Reservation} />  
    
        <Stack.Screen name='Tab' component={Tab} /> 
        <Stack.Screen name='Profilee' component={DahboardProfile} options={{ headerShown: false }} />
        <Stack.Screen name='forgot' component={ForgotPass} />
       {/* <Stack.Screen name='registerC' component={RegisterClient} options={{ headerShown: false }} />*/}
        <Stack.Screen name='LoginC' component={LoginC} options={{ headerShown: false }} />
        <Stack.Screen name='espaceClient' component={EspaceClient} options={{ headerShown: false }} />
        <Stack.Screen name='onHistorique' component={OnHistorique} options={{ headerShown: false }} />
        <Stack.Screen name='DashHoraire' component={DashboardHoraire} options={{ headerShown: false }} />
        <Stack.Screen name='newreservation' component={NewReservation} />
        <Stack.Screen name='mesreservation' component={MesReservation} />
        <Stack.Screen name='reservationstation' component={ReservationStation} />
        <Stack.Screen name='reserv' component={App5} />
        <Stack.Screen name='reservationConfirmé' component={HistoriqueReservation} />
        <Stack.Screen name='resclient' component={Reservationclient} />
        <Stack.Screen name='stationData' component={StationData} />
        <Stack.Screen name='stationInfo' component={StationInformation} />
      </Stack.Navigator>
    </NavigationContainer>
  /*  <View>
      <Koko/>
    </View>*/





  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
