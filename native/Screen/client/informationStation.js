


import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Dimensions, input } from 'react-native-web';
import { getClientData, updateClientData } from "../../utils/AsyncStorageClient";
import MapView , { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import * as Location from 'expo-location';
const { width: WIDTH } = Dimensions.get('window')

export default function StationData({ route, navigation }) {
    const { itemId, getStation } = route.params;
    useEffect(() => {
        console.warn(itemId, getStation.Nom_station)
        console.warn(getStation._id)
    }, [])
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
         // console.log(location);
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
        //ToastAndroid.show(JSON.stringify(mapRegion), ToastAndroid.SHORT)
        setmapRegion({
          mapRegion
        })
      
     console.log(mapRegion);
      }    
    const [date_heure, setDate] = useState('');
    const [marque_vehicule, setMarque] = useState('');
    const [Nature_vehicule, setNatureVehicule] = useState('');
    const [id, setId] = useState('')
    const [client, setClient] = useState('')
    const [station, setStation] = useState()

    useEffect(async () => {
        setClient(await getClientData());
        if (getStation) {
            setStation(getStation)
        }
    }, []);





    
    return (

        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <ScrollView >
            <View >
      
    </View>
               
                <Image
                      source={{ uri: getStation.avatar }}
                      style={{ width: WIDTH-40, height: 230 }}
                    ></Image>
                     <View style={{ backgroundColor:'white' }}>
                    <Text style={{ color: '#0594D0', fontWeight: 'bold' , fontSize:20 , marginTop:30 , marginBottom:20 , marginLeft:9}}>
                          Information de la station
                    </Text>
                    <View >
    <DataTable>
    <DataTable.Header>
    <DataTable.Cell style={{fontSize:20}}>Nom station</DataTable.Cell>
        <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{station?.Nom_station}</DataTable.Title>
  
        
         
         </DataTable.Header>

         <DataTable.Header>
    <DataTable.Cell style={{fontSize:20}}>Type lavage</DataTable.Cell>
        <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{station?.type_lavage}</DataTable.Title>
  
        
         
         </DataTable.Header>

         <DataTable.Header>
    <DataTable.Cell style={{fontSize:20}}>Adresse</DataTable.Cell>
        <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{station?.adresse}</DataTable.Title>
  
        
         
         </DataTable.Header>
         <DataTable.Header>
    <DataTable.Cell style={{fontSize:20}}>Ville</DataTable.Cell>
        <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{station?.ville}</DataTable.Title>
  
        
         
         </DataTable.Header>
         <DataTable.Header>
    <DataTable.Cell style={{fontSize:20}}>Email</DataTable.Cell>
        <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{station?.email}</DataTable.Title>
  
        
         
         </DataTable.Header>



        


    </DataTable>
    </View>
            
                    <TouchableOpacity style={styles.btnLogin} onPress={()=>{navigation.navigate('mapRes', {
                          itemId: station._id,
                          getStation: station,
                        });}}>
       <Text style={styles.TextBtn}>Reserver</Text>

      </TouchableOpacity>
                </View>
                
               
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        backgroundColor: 'white',
        marginVertical: 10,
    },
    icon: {

        top: 8,
        left: 37,
    },
    btnLogin: {
        width: 250,
        height: 45,
        borderRadius: 10,
        backgroundColor: '#0594D0',
        justifyContent: 'center',
        marginTop: 20,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom:40
    },
    TextBtn: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    link: {
        color: 'blue',
    },
    input: {
        width: 300,
        height: 45,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 25,
        fontSize: 10,
        paddingLeft: 45,
        backgroundColor: '#f5f5f5',
        color: 'black',
        marginHorizontal: 15,
        alignSelf: 'center',
        alignItems: 'center'

    },
    logoContainer: {
        alignItems: 'center'
    },
    btnEye: {

        top: 17,
        right: 60,
    }
    ,
    logoText: {
        color: 'black',
        fontWeight: 600,
        fontSize: 20,
        fontWeight: '400',
        marginTop: 10,
        opacity: 0.5,
        marginBottom: 10
    },
    logo: {
        width: 150,
        height: 180,
        marginBottom: 20
    },
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: '80%',
    },

    link: {
        color: 'blue',
    },
    uploadBtnContainer: {
        height: 125,
        width: 125,
        borderRadius: 125 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth: 1,
        overflow: 'hidden',
    },
    uploadBtn: {
        textAlign: 'center',
        fontSize: 16,
        opacity: 0.3,
        fontWeight: 'bold',
    },
    skip: {
        textAlign: 'center',
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
        opacity: 0.5,
    },
    containerr: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapp: {
        width: 500,
        height: 180, 
    }

});