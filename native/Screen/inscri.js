import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, SafeAreaView, Image,LogBox,StatusBar, TextInput, TouchableOpacity , ToastAndroid, Alert} from 'react-native';
import MapView ,{ PROVIDER_GOOGLE, Marker }from 'react-native-maps';
//import bgImage from './assets/logo.jpg'

import { Dimensions, input } from 'react-native-web';
import Icon from 'react-native-vector-icons/Ionicons'
import { Component } from 'react/cjs/react.production.min';
const { width: WIDTH } = Dimensions.get('window')
import * as ImagePicker from 'expo-image-picker';

import timee from'../assets/iconfinder-document09-1622827_121958.png'
import { useTheme } from "react-native-paper";


import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import {Picker} from "@react-native-picker/picker";
import axios from 'axios';
LogBox.ignoreAllLogs(true)
import DateTimePicker from "@react-native-community/datetimepicker";
import * as FilesSystem from 'expo-file-system';
//import {AuthContext} from '../contexte/AuthContext';

function dataURLtoFile(dataurl, filename) {
 
  var bstr = atob(dataurl), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename);
}

const Register = ({ navigation }) => {
 /* const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [mode1, setMode1] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [show1, setShow1] = useState(false);
const[text1 ,setText1]=useState('')
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    
    let fTime =   tempDate.getHours() + ': '+tempDate.getMinutes();
    setText( fTime)
    console.log(text);
  
  }
  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow1(Platform.OS === 'ios');
    setDate1(currentDate);
    let tempDate = new Date(currentDate);
    
    let fTime =   tempDate.getHours() + ': '+tempDate.getMinutes();
    setText1( fTime)
    console.log(text);
  
  }
  
  
  
  
  
  const showMode = (currentMode) =>{
    setShow(true);
    setMode(currentMode);
  }
  const showMode1 = (currentMode) =>{
    setShow1(true);
    setMode1(currentMode);
  }
  
  */
  
  const [Nom_station, setNom_station] = useState('');
  const [type_lavage, setType_lavage] = useState();
  const [ville, setVille] = useState();
  const [adresse, setAdresse] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const[jourPT , setJourPT]=useState('')
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState();
  
  const[error , setError]=useState(false);
  const [mapRegion, setmapRegion] = useState({

    latitude: 36.8002068,
    longitude: 	10.1857757,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  onChangeValue = mapRegion =>{
    //ToastAndroid.show(JSON.stringify(mapRegion), ToastAndroid.SHORT)
    setmapRegion({
      mapRegion
    })
 setLongitude(mapRegion.longitude);
 setLatitude(mapRegion.latitude);
  }
  //  const {isLoading, register} = useContext(AuthContext);




  const { colors } = useTheme();
  const [dataa, setDataa] = React.useState({
    
    
    secureTextEntry: true,
   
  });
  const updateSecureTextEntry = () => {
    setDataa({
      ...dataa,
      secureTextEntry: !dataa.secureTextEntry,
    });
  };

  function Add() {
    if(!Nom_station  || !email || !password || !longitude ||!ville || !adresse || !latitude  ||!jourPT || password.length<6 || !type_lavage){
      console.log("Erreur")
      setError(true);
      return false;
        
    }
    console.log("Inscription mobile");
    

    const data =  {
      Nom_station, 
      type_lavage, 
      ville, 
      adresse, 
      longitude, 
      latitude, 
      email, 
      password, 
      /*heureOuverture:text,
      heureFermeture:text1,
      jourPT,*/
      avatar : avatarFile,
      Role : "lavage"
    }
    

    axios.post("http://192.168.43.230:3001/utilisateur/register", data)
      .then( ({data}) => {
        if (data) {
          if (data.email != '' && data.password != '') {
            navigation.navigate('signin')
          }
        }
      })
      .catch(err => {
        console.log(err.response)
      });
  }

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect : [4,3],
        quality:1,
        base64 : true
      });
     
      if (!response.cancelled) {
        setAvatar(response.uri);
        FilesSystem.uploadAsync('http://192.168.43.230:3001/utilisateur/upload-avatar', response.uri, {
          fieldName : "avatar",
          uploadType : FilesSystem.FileSystemUploadType.MULTIPART
        }).then((res)=> setAvatarFile(res.body) )
      }
    }
  };

  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append('profile', {
      name: new Date() + '_profile',
      uri: `data:image/gif;base64,${avatar}`,
      type: 'image/jpg',
    });
  }
  return (
    <>
      {mapRegion != undefined?
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <ScrollView style={styles.scrollView}>
        <View style={{ alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: '#427CA2', fontWeight: 'bold', marginBottom: 30, fontSize: 22 , marginTop: 20}}>Création d'un compte</Text>
        </View>
        <View style={styles.containerr}>
          <View>
            <TouchableOpacity
              onPress={openImageLibrary}
              style={styles.uploadBtnContainer}
            >
              {avatar ? (
                <Image
                  source={{ uri: avatar}}
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <Text style={styles.uploadBtn} onChangeText={(text) => setProfileImage(text)}>Cliquer pour choisir une image</Text>
              )}
            </TouchableOpacity>


          </View>

        </View>




        <View style={styles.action}>
         {/* <FontAwesome name="user-o" color={colors.text} size={20} />*/}
          <TextInput
            placeholder="Nom Station"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {marginTop: 30,
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={text => setNom_station(text)}
          
          />
        
       
        </View>
           {error && !Nom_station &&<Text style={{color:'red' ,marginLeft:20,fontSize:10  ,fontWeight:'bold'}} > champ obligatoire *</Text>}
                             
      
          
       
          
        
          <View style={styles.action}>
          {/*<FontAwesome name="user-o" color={colors.text} size={20} />*/}
          <TextInput
            placeholder="Adresse"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={text => setAdresse(text)}
          
          />
        
       
        </View>
         {error && !adresse &&<Text style={{color:'red' ,marginLeft:20,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
     
      

        


        
        
        <View style={styles.action}>
         {/* <FontAwesome name="user-o" color={colors.text} size={20} />*/}
          <TextInput
            placeholder="Email"
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
         {error && !email &&<Text style={{color:'red' ,marginLeft:20,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
    
      
         <View style={styles.action}>
         {/* <Feather name="lock" color={colors.text} size={20} />*/}
          <TextInput
            placeholder="MotPasse"
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
{error && !password &&<Text style={{color:'red' ,marginLeft:20,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
{error && password.length<6 && <Text style={{color:'red' ,marginLeft:20,fontSize:10 , fontWeight:'bold'}} > Mot de passe doit contenir minimum 6 caractére</Text>}
{/*<View style={{flexDirection:'row' , alignContent:'center' , alignItems:'center' , alignSelf:'center'}}>

<View style={styles.action1}>
 
          <TextInput
            placeholder="Heure d'ouverture"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={date=>setText(date)} 
    editable = {false}
    value={text}
          
          />
        
       
        </View>

<TouchableOpacity onPress={() => showMode('time')}>
<Image source={timee}  style={{width:40 , height:40 , alignSelf:'center' , alignItems:'center' , marginEnd:50}} />

</TouchableOpacity>
</View>



{show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
<StatusBar style="auto" />

    

<View style={{flexDirection:'row' , alignContent:'center' , alignItems:'center' , alignSelf:'center'}}>

<View style={styles.action1}>
 
          <TextInput
            placeholder="Heure de fermeture"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={date=>setText1(date)} 
    editable = {false}
    value={text1}
          
          />
        
       
        </View>

<TouchableOpacity onPress={() => showMode1('time')}>
<Image source={timee}  style={{width:40 , height:40 , alignSelf:'center' , alignItems:'center' , marginEnd:50}} />

</TouchableOpacity>
</View>



{show1 && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date1}
            mode={mode1}
            is24Hour={true}
            display="default"
            onChange={onChange2}
          />
        )}
<StatusBar style="auto" />





        <View style={styles.ac}>
        <View>
        <Picker
          selectedValue={jourPT}
          style={{ height: 40, width: 250 ,marginBottom:25 , marginLeft:4  }}
          //mode={"dialog"}
          onValueChange={(itemValue) => setJourPT(itemValue)}
          placeholder='select me '
                                mode="dropdown"
        >
         <Picker.Item label="Jour férié" value={null} style={{ display : "none" , fontSize:17}}/>
         <Picker.Item label="Lundi" value="Lundi" />
          <Picker.Item label="mardi" value="mardi" />
          <Picker.Item label="mercredi" value="mercredi" />
          <Picker.Item label="jeudi" value="jeudi" />
          <Picker.Item label="vendredi" value="vendredi" />
          <Picker.Item label="samedi" value="samedi" />
          <Picker.Item label="dimanche" value="dimanche" />
         
          </Picker>
          </View>
*/} 
        <View>
        <Picker
          selectedValue={type_lavage}
          style={{ height: 40, width: 250 ,marginBottom:25 , marginLeft:4  }}
          //mode={"dialog"}
          onValueChange={(itemValue) => setType_lavage(itemValue)}
          placeholder='select me '
                                mode="dropdown"
        >
         <Picker.Item label="Type lavage" value={null} style={{ display : "none" , fontSize:17}}/>
         <Picker.Item label="Lavage portique à brosses classiques" value="Lavage portique à brosses classiques" />
          <Picker.Item label="Lavage portique haute pression sans brosses" value="Lavage portique haute pression sans brosses" />
          <Picker.Item label="Lavage à sec (sans eau)" value="Lavage à sec (sans eau)" />
          <Picker.Item label="Nettoyage automatique" value="Nettoyage automatique" />
       
         
          </Picker>{error && !type_lavage &&<Text style={{color:'red'  ,fontSize:10 , fontWeight:'bold' , marginStart:50}} >champ obligatoire *</Text>}</View>
            
            <View>
        <Picker
          selectedValue={ville}
          style={{ height: 40, width: 254 }}
          //mode={"dialog"}
          onValueChange={(itemValue) => setVille(itemValue)}
            mode="dropdown"
          
        >
         
         <Picker.Item label=" Ville" value={null} style={{ display : "none" ,fontSize:17 }}/>
          <Picker.Item label="Ariana" value="	Ariana" />
          <Picker.Item label="Béja" value="Béja" />
          <Picker.Item label="Ben Arous" value="Ben Arous" />
          <Picker.Item label="Bizerte" value="Bizerte" />
          <Picker.Item label="Gabès" value="Gabès" />
          <Picker.Item label="Gafsa" value="Gafsa" />
          <Picker.Item label="Jendouba" value="Jendouba" />
          <Picker.Item label="Kairouan" value="Kairouan" />
          <Picker.Item label="Kasserine" value="Kasserine" />
          <Picker.Item label="Kébili" value="Kébili" />
          <Picker.Item label="Le Kef" value="Le Kef" />
          <Picker.Item label="Mahdia" value="Mahdia" />
          <Picker.Item label="La Manouba" value="La Manouba" />
          <Picker.Item label="Médenine" value="Médenine" />
          <Picker.Item label="Monastir" value="Monastir" />
          <Picker.Item label="Nabeul" value="Nabeul" />
          <Picker.Item label="Sfax" value="Sfax" />
          <Picker.Item label="Sidi Bouzid" value="Sidi Bouzid" />
          <Picker.Item label="Siliana" value="Siliana" />
          <Picker.Item label="Sousse" value="Sousse" />
          <Picker.Item label="Tataouine" value="Tataouine" />
          <Picker.Item label="Tozeur" value="Tozeur" />
          <Picker.Item label="Tunis" value="Tunis" />
          <Picker.Item label="Zaghouan" value="Zaghouan" />
        </Picker>{error && !ville &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
        </View>
        

        <View style={styles.container}>
        <MapView
       // style={{ alignSelf: 'stretch', height: '10%'  , width: '30%'}}
        //region={mapRegion}
        style={styles.mapp}
       onRegionChangeComplete= {onChangeValue}
        provider={PROVIDER_GOOGLE}

     region= {{
       
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude,
        latitudeDelta:mapRegion.latitudeDelta,
        longitudeDelta:mapRegion.longitudeDelta,}}
  
      />
<View style={{top: '50%', left: '50%', marginLeft:-24,marginTop:-48,position:'absolute'}}>
          <Image style={{height:48, width:48}} source= {require('../assets/marque.png')}/>
        </View>

    </View>
    <View style={styles.action}>
         {/* <FontAwesome name="user-o" color={colors.text} size={20} />*/}
          <TextInput
            placeholder="longitude"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={text => setLongitude(text)}
            defaultValue={`${longitude}`}
            editable = {false}
          />
        
       
        </View>
        <View style={styles.action}>
         {/* <FontAwesome name="user-o" color={colors.text} size={20} />*/}
          <TextInput
            placeholder="Latitude"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={text => setLatitude(text)}
            defaultValue={`${latitude}`}
            editable = {false}
          />
        
       
        </View>

  

        <TouchableOpacity style={styles.btnLogin} onPress={() => {
          Add();
        }}>
          <Text style={styles.TextBtn}>Register</Text>

        </TouchableOpacity>
        <View style={{
          flexDirection: 'row', marginTop: 20, marginBottom: 30, alignItems: 'center',
          alignSelf: 'center'
        }}>
          <Text>Vous avez déjà un compte?</Text>
          <TouchableOpacity >
            <Text style={styles.link} onPress={() => navigation.navigate('signin')}>Login</Text>
          </TouchableOpacity>
        </View>



      </ScrollView>
    </SafeAreaView>
    :null}
    </>

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
    width: 200,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#427CA2',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center'
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
    color: '#427CA2',
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: '#427CA2',
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
    alignSelf: 'stretch', 
    height: 250,
    width: 500,
   
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
    borderBottomWidth: 0.8,
    borderBottomColor: "#427CA2",

    marginBottom:30,
    marginLeft:15,
    marginRight:15
  },
  action1: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: "#427CA2",

    marginBottom:30,
    marginLeft:60,

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
ac : {
  width: 20,
  height: 50,

  marginBottom:60,
 
        marginRight:15
}
});
export default Register;