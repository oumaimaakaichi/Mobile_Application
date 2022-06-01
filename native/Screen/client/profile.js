import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import styles from "./style";
import { Alert, StyleSheet, ScrollView, Image, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, Pressable, View } from "react-native";
import { Button, SocialIcon } from "react-native-elements";
import * as Facebook from "expo-facebook";
import profl from '../../assets/asmaaa.png'
import { getClientData, updateClientData } from "../../utils/AsyncStorageClient";
import Toast from 'react-native-toast-message';
export default function Profile({ navigation }) {
  const onLoginPress = () => {};

 
  const [client, setClient] = useState('')
  // const [email , setEmail]=useState('')
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [Adr, setAdr] = useState('')
  const [Num_tel, setNum_tel] = useState('')
  const[error , setError]=useState(false);

  const editProfile = async () => {
    console.log(client.data)
    console.log({
      nom,
      prenom,
      Adr,
      Num_tel,
     
    })
    if(  !nom || !prenom ||!Adr|| !Num_tel ){
      setError(true);
      return false;
        
    }
    fetch("http://192.168.43.230:3001/utilisateur/m/" + client.data.utilisateur._id, {
      method: "PUT",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        nom,
        prenom,
        Adr,
        Num_tel,
        
      }
      )
    }).then(res => res.json())
      .then(async (res) => {
      
        console.log(res)
        const newClient = { ...client };
        newClient.data.utilisateur = { ...newClient.data.utilisateur, ...res }
        await updateClientData(newClient);
        if(res){
          Toast.show({
            type: 'success',
            position: 'top',
            text1:'Modification',
            text2:'Modification succes',
            autoHide: true,
            visibilityTime: 1000,
            autoHide: true,
            onHide: () =>{  navigation.navigate("espaceClient")},
            onShow: () =>{},
          })  
        }
       
      }


      )
      .catch((err) => { 
        Toast.show({
          type: 'error',
          text1:'Connexion éroner',
          text2:'vérifier votre champs',
          visibilityTime: 1000,
          position: 'top',
        }) 
        
        
        
        })
  }

  useEffect(async () => {
    const data = await getClientData();
    setClient(data);
    setNom(data.data.utilisateur.nom)
    setPrenom(data.data.utilisateur.prenom)
    setAdr(data.data.utilisateur.Adr)
    setNum_tel(data.data.utilisateur.Num_tel)
    console.log(client)
  }, []);

 

  return (
    <View style={{backgroundColor: '#FFFFFF',}}>
    
    {client != undefined ?
    
    <ScrollView>
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
        
          <View >
            <></>
          
         
          <View style={{ justifyContent: 'center',
    alignItems: 'center',}}>
            <Image source={ profl } style={{
    width: 300,
    height: 300,
   alignSelf:'center'
 
  }} />

          </View>
            
            <TextInput placeholder="Nom" 
            placeholderColor="#c4c3cb" 
            defaultValue={client?.data?.utilisateur.nom}
              onChangeText={text => setNom(text)}
            style={styles.loginFormTextInput} />
{error && !nom  && <Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}


            <TextInput placeholder="Prenom" 
            placeholderColor="#c4c3cb" 
            defaultValue={client?.data?.utilisateur.prenom}
              
              onChangeText={text => setPrenom(text)}
            style={styles.loginFormTextInput} />
{error && !prenom &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
    
     


            <TextInput placeholder="Adresse" 
            placeholderColor="#c4c3cb" 
            defaultValue={client?.data?.utilisateur.Adr}
              
              onChangeText={text => setAdr(text)}
            style={styles.loginFormTextInput} />
 {error && !Num_tel &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
    
            <TextInput placeholder="Numéro de téléphonr" 
            placeholderColor="#c4c3cb" 
            defaultValue={`${client?.data?.utilisateur.Num_tel}`}
              type= {Number}
              onChangeText={text => setNum_tel(text)}
            style={styles.loginFormTextInput} />
            {error && !Adr &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
    
            <Button  style={{alignContent:'center'}} onPress={() => {
                editProfile()
              }} title="Modifier" />
            
          </View>
         
        </View>
      </TouchableWithoutFeedback>
      <Toast ref={(ref)=>{Toast.setRef(ref)}}/>        
    </KeyboardAvoidingView>
    </ScrollView>
     : null}
   </View>
  );
}



/*const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center"
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    alignItems: "center"
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
});*/