import React, { useState ,Component , useEffect} from 'react';
import { View, StyleSheet, Image , Text, TouchableOpacity, Dimensions, ToastAndroid} from 'react-native';
import MapView , { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { TextInput } from 'react-native-paper';




import * as Location from 'expo-location';
import PropTypes from 'prop-types';
const  Map = (props) => {

  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const { width, height } = Dimensions.get('window');

const[data , setData]=useState('')
  /*useEffect(() => {
    fetch("http://192.168.1.15:3001/utilisateur/getAll")
      .then((res) => res.json())
      .then((resJSON) => {
        console.log(resJSON)
        setData(resJSON);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);*/

  
  
  async function getAll() {
   
    fetch("http://192.168.43.230:3001/utilisateur/getAll", {
      method: ' GET',
     
     
    }).then((res) => res.json())
    .then((resJSON) => {
      console.log(resJSON)
      setData(resJSON);
        console.warn(data)
    })
    .catch((err) => console.error(err));
  }
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
    })();
  }, []);









  const [mapRegion, setmapRegion] = useState({
   
   
  
    latitude: 36.8002068,
    longitude: 	10.1857757,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
   
    
    }
  
  );

  onChangeValue = mapRegion =>{
   // ToastAndroid.show(JSON.stringify(mapRegion), ToastAndroid.SHORT)
    setmapRegion({
      mapRegion
    })
  
 console.log(mapRegion);
  }

 
  return (
   
  
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        //region={mapRegion}
      // onRegionChangeComplete= {onChangeValue}
        provider={PROVIDER_GOOGLE}

     region= {{
       
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude,
        latitudeDelta:mapRegion.latitudeDelta,
        longitudeDelta:mapRegion.longitudeDelta,}}
  showsUserLocation={true}
      >

{data?.map(marker =>(
<Marker

coordinate={{
latitude:marker.latitude,
longitude:marker.longitude,

}}
title={marker.Nom_station}


/>
)) } 
     
     </MapView>  
    </View>
    
    
  );

};




export default Map;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});