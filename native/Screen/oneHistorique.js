import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';

import { Dimensions, input } from 'react-native-web';
import { DataTable } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
const { width: WIDTH } = Dimensions.get('window')

export default function OnHistorique({ route, navigation }) {
    const { itemId, getReservations} = route.params;
    useEffect(() => {
        /*console.warn(itemId, getReservations.marque_vehicule)
        console.warn(getReservations._id)*/
    }, [])

    const[reservation , setReservation]=useState('')
    useEffect(async () => {
      
        if (getReservations) {
            setReservation(getReservations)
        }
    }, []);


  
    
    return (

        <SafeAreaView >
            <ScrollView >
                
            <Text style={{color:'#427CA2' , fontWeight:'bold' , fontSize:19 , alignSelf:'center' ,marginTop:50 }}>Informations de la réservation</Text>
                
                <View style={styles.container}>
        <DataTable>
        <DataTable.Header>
        <DataTable.Cell style={{fontSize:20}}><Ionicons
              name="person"
              size={20}
              color="#427CA2"
              
            />    Nom client</DataTable.Cell>
            <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{reservation.Nom_client}</DataTable.Title>
      
            
             
             </DataTable.Header>
    
             <DataTable.Header>
        <DataTable.Cell ><Ionicons
              name="person"
              size={20}
              color="#427CA2"
            
            />    Prenom </DataTable.Cell>
            <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{reservation.Prenom_client}</DataTable.Title>
      
            
             
             </DataTable.Header>
    
          {/*<DataTable.Row>
            <DataTable.Cell>Numéro du téléphone</DataTable.Cell>
            <DataTable.Cell>{reservation.Num_Client}</DataTable.Cell>
           
        </DataTable.Row>*/}
    
    
    
            
    <DataTable.Header>
        <DataTable.Cell style={{fontSize:20}}><Ionicons
              name="car"
              size={22}
              color="#427CA2"
            
            />    Marque</DataTable.Cell>
            <DataTable.Title style={{ marginLeft:40}}>{reservation.marque_vehicule}</DataTable.Title>
             </DataTable.Header>
             <DataTable.Header>
        <DataTable.Cell style={{fontSize:20}}><Ionicons
              name="car"
              size={22}
              color="#427CA2"
              style={{marginRight: 10}}
            />    Nature </DataTable.Cell>
            <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{reservation.Nature_vehicule}</DataTable.Title>
      
            
             
             </DataTable.Header>
          <DataTable.Header>
            <DataTable.Cell><Ionicons
              name="calendar"
              size={20}
              color="#427CA2"
              style={{marginRight: 10}}
            />    Date</DataTable.Cell>
            <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{reservation.date_heure}</DataTable.Title>
          
          </DataTable.Header>
         
    
        </DataTable>
      </View>
                   
                    
               
                
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
      
      },
   
   f:{
      fontStyle:'italic',
      color:'red'
   }
   
   

});