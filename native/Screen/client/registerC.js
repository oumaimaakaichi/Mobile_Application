import React, {useContext, useState} from 'react';
import { StyleSheet, Text, View , ImageBackground ,ScrollView,SafeAreaView, Image , TextInput ,TouchableOpacity} from 'react-native';
//import bgImage from './assets/logo.jpg'

import { Dimensions, input } from 'react-native-web';
import Icon from 'react-native-vector-icons/Ionicons'
import { Component } from 'react/cjs/react.production.min';
const {width:WIDTH} =Dimensions.get('window')
import client from '../../assets/regis.png'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import { useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

//import {AuthContext} from '../contexte/AuthContext';
const RegisterClient = ({navigation}) => { 
    const [cin, setCin] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [Num_tel, setNumero] = useState('');
    const [email, setEmail] = useState('');
    const [Adr, setUsename] = useState('');
  const [MPass, setPassword] = useState('');
  const { colors } = useTheme();
  async function AddClient(){

    
      fetch("http://192.168.43.230:3001/utilisateur/register" , {
          method: 'POST',
          headers:{
              "Content-Type" : 'application/json',
             
          },
          body:JSON.stringify({
            cin:cin,
            nom:nom,
            prenom:prenom,
            Num_tel:Num_tel,
            email:email,
            Adr:Adr,
            MPass:MPass,
            role:'client'
          }),
      }).then(res=>res.json())
      .then(async data=>{
        if(data){
         if(data.Adr!='' && data.MPass!=''){
          navigation.navigate('LoginC')
        }}
        
      })
      .catch(err=>{
        console.log(err)
      });
     
  }
  const [dataa, setDataa] = React.useState({
    
    
    secureTextEntry: true,
   
  });
  const updateSecureTextEntry = () => {
    setDataa({
      ...dataa,
      secureTextEntry: !dataa.secureTextEntry,
    });
  };
  return (
      <SafeAreaView style={{backgroundColor:'white'}}>
      <ScrollView style={styles.scrollView}>
    <ImageBackground  style={styles.backgroundContainer}>
    <View style={styles.logoContainer}>
        <Image source={client}  style={styles.logo}/>
       
      </View>
            <View style={styles.container1}>
                <Text style={{
          fontSize:20 , 
          fontWeight:"bold",
          marginBottom:15,
          color:'#4A919E'
        
        }}> Sign In </Text>
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="cin"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={text => setCin(text)}
          
          />
        
           
      
        </View>
    <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Nom"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={text => setNom(text)}
          
          />
        
           
      
        </View>
    <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="prenom"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={text => setPrenom(text)}
          
          />
        
           
      
        </View>
    <View style={styles.action}>
          <FontAwesome name="phone" color={colors.text} size={20} />
          <TextInput
            placeholder="Numéro du téléphone"
            placeholderTextColor="#666666"
          
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={text => setNumero(text)}
          
          />
        
           
      
        </View>
    
    <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder=" email"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
          
          />
        
           
      
        </View>
       
          
   
        
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="username"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={text => setUsename(text)}
          
          />
        
           
      
        </View>
       
          
        

     
     
      
        
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={dataa.secureTextEntry ? true : false}
       
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {dataa.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
     
         
       
      <TouchableOpacity style={styles.btnLogin} onPress={() => {
            AddClient();
          }}>
       <Text style={styles.TextBtn}>Register</Text>

      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginTop: 20 ,marginBottom:30}}>
          <Text>Already have an accoutn? </Text>
          <TouchableOpacity >
            <Text style={styles.link} onPress={() => navigation.navigate('LoginC')}>Login</Text>
          </TouchableOpacity>
        </View>
    </ImageBackground> 
       
        
    </ScrollView>
    </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width : null,
    height: null,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginVertical: 10,
  },
 
  btnLogin:{
width: 250,
height : 45,
borderRadius : 20,
backgroundColor: '#4A919E',
justifyContent: 'center',
marginTop : 20,
  },
  TextBtn :{
    color : 'white',
    fontSize:16,
    textAlign: 'center'
  },
  link: {
    color: '#4A919E',
  },
  input:{
    width:300,
    height:45,
    marginTop:10,
    marginBottom:10,
    borderRadius:25,
    fontSize:10,
    paddingLeft:45,
    backgroundColor: '#f5f5f5',
    color: 'black',
    marginHorizontal : 15

  },
  logoContainer:{
alignItems:'center'
},
btnEye:{

  top:17,
  right:60,
}
,
logoText:{
  color:'black',
fontWeight:600,
  fontSize:20,
  fontWeight:'400',
  marginTop:10,
  opacity:0.5,
  marginBottom:10
},
container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width:150,
    height:150,
   
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 100,
    paddingBottom: 40,
    marginTop:10
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#4A919E",
    fontWeight: "bold",
    fontSize: 25,
    alignSelf:'center'
  },
  text_footer: {
    color: "#4A919E",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#4A919E",

    marginBottom:30,
    marginLeft:15,
    marginRight:15
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#4A919E",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
   
    paddingLeft: 10,
    color: "#4A919E",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 12,
  },
  button: {
    alignItems: "center",
    marginTop: 40,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default RegisterClient;