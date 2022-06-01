import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Button, TextInput, Text, Image, TouchableOpacity, Icon , Dimensions } from 'react-native';
import React, { useEffect, useState } from "react";
import { getUserData, LogoutUser, storeUserData, updateUserData } from "../utils/AsyncStorageFunctions";

import Toast from 'react-native-toast-message';
import axios from 'axios';
;
const {width:WIDTH} =Dimensions.get('window')
import * as FilesSystem from 'expo-file-system';



export default function Horaire({ navigation }) {
  const [station, setStation] = useState('')
 const[jourPT , setJour]=useState('')
  const[error , setError]=useState(false);


  










  const editProfile = async () => {
    console.log(station.data)
    
    
    fetch("http://192.168.43.230:3001/utilisateur/ms/" + station.data.station._id, {
      method: "PUT",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
       jourPT

      }
      )
    }).then(res => res.json())
      .then(async (res) => {
        const newStation = { ...station };
        newStation.data.station = { ...newStation.data.station, ...res }
        await updateUserData(newStation);
       

        {
          Toast.show({
            type: 'success',
            position: 'top',
            text1:'Succes',
            text2:'Modification validé',
            autoHide: true,
            visibilityTime: 1000,
            autoHide: true,
          
            onShow: () =>{},
          })  
        }
        console.log(res)
       
      }


      )
      .catch((err) => {
        Toast.show({
          type: 'error',
          text1:'Modification ',
          text2:'Modification éroner',
          visibilityTime: 1000,
          position: 'top',
        }) 
        console.warn(err) })
  }

  useEffect(async () => {
    const data = await getUserData();
    setStation(data);
    setJour(data.data.station.jourPT)
    
    
   // console.warn(station)
 
  }, []);
  
  return (
    <>
      {station != undefined ?
        <ScrollView>

          
         
         

          <View style={styles.container1}>

            <View style={styles.wrapper}>

                <View style={styles.emailInput}>
                <Text style={styles.a}>Horaire </Text>
              <TextInput
                style={styles.input}
                defaultValue={station?.data?.station.jourPT}
                placeholder="Nouvelle adresse"
                onChangeText={text => setJour(text)}
                multiline={true}
              /></View>
             

  



         
       
        
        
 
             
              <TouchableOpacity style={styles.btnLogin} onPress={() => {
                editProfile()
              }}>
                <Text style={styles.TextBtn}>Ajouter</Text>

              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>

        : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
  
    marginTop: 20
  },
  input: {
   /* marginBottom: 12,
    borderWidth: 2,
    borderColor: '#bbb',
    borderRadius: 10,
    paddingHorizontal: 14,
    borderColor: '#007BFF',
    //backgroundColor: '#4A919E',
    padding: 15,
    margin: 5,*/
    width: WIDTH-30,
    height:200,
   marginTop: 20,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
        borderColor: '#427CA2',
  },
 a: {
      fontWeight:'bold',
      fontSize:20
 },

  link: {
    color: 'blue',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 0,
    marginTop: 10
  },
  logoContainer: {
    alignItems: 'center'
  },
  btnLogin: {
   /* width: 250,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#4A919E',
    justifyContent: 'center',
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center'*/
    borderColor: '#007BFF',
    backgroundColor: '#427CA2',
    padding: 15,
    borderRadius:10,
    margin: 5,
    width: WIDTH-40,
   
  },
  TextBtn: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
  marginTop: -60,
 overflow: 'hidden',
 marginRight:15
  },
  uploadBtn: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.3,
    fontWeight: 'bold',
  },
  mapp: {
    alignSelf: 'stretch', 
    height: 250,
    width: 300,
   
  },
  containers: {
    flex: 1,
    backgroundColor: "white",
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
  ac : {
    width: 10,
  height: 50,
  flexDirection: "row",
 
   
    
  },
  emailInput:{
    
  
  }
});