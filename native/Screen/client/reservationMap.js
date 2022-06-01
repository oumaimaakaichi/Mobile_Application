import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground,Platform, StatusBar, LogBox  , ScrollView, SafeAreaView, Image, TextInput, TouchableOpacity , Dimensions} from 'react-native';
import { useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import datee from'../../assets/62920calendar_109276.png'
import timee from'../../assets/iconfinder-document09-1622827_121958.png'
 
import { getClientData, updateClientData } from "../../utils/AsyncStorageClient";
import DatePicker from 'react-native-datepicker';
const {width:WIDTH} =Dimensions.get('window')
import logo from '../../assets/res1.jpg';
import Toast from 'react-native-toast-message';
LogBox.ignoreAllLogs(true)
import DateTimePicker from "@react-native-community/datetimepicker";
export default function NewReservationMap({ route, navigation }) {
    const { itemId, getStation } = route.params;
    
    useEffect(() => {
       /* console.warn(itemId, getStation.Nom_station)
        console.warn(getStation._id)*/
    }, [])
    const [marque_vehicule, setMarque] = useState('');
    const [Nature_vehicule, setNatureVehicule] = useState('');
    const [id, setId] = useState('')
    const [client, setClient] = useState('')
    const [station, setStation] = useState()
const[date_heure , setDtateH]=useState('')
   
const[time , setTime]=useState('')

const[error , setError]=useState(false);
const [date, setDate] = useState(new Date());
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);
const [text, setText] = useState('');



    useEffect(async () => {
        setClient(await getClientData());
        if (getStation) {
            setStation(getStation)
        }
    }, []);

   
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime =   tempDate.getHours() + ': '+tempDate.getMinutes();
        setText(fDate + ' | Heure '+ fTime)
        console.log(text);
      
      }
      
      
      
      
      
      const showMode = (currentMode) =>{
        setShow(true);
        setMode(currentMode);
      }
      
      
      

    const { colors } = useTheme();

    async function addReservatoin() {



        if(  !text || !Nature_vehicule ||!marque_vehicule ){
            setError(true);
            return false;
              
          }
        fetch("http://192.168.43.230:3001/reservation/addres", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                idStation: itemId,
                date_heure: text,
                marque_vehicule: marque_vehicule,
                Nature_vehicule: Nature_vehicule,
                Nom_client: client.data.utilisateur.nom,
                Prenom_client: client.data.utilisateur.prenom,
                Utilistauer:client.data.utilisateur._id,
                Num_Client:client.data.Num_tel,
               Station:getStation._id
            }),
        }).then(res => res.json())
       
        .then(async res => {
            Toast.show({
                type: 'success',
                position: 'top',
                text1:'Connexion',
                text2:'Réservation envoyeé avec succée',
                autoHide: true,
                visibilityTime: 1000,
                autoHide: true,
                onHide: () =>{ navigation.navigate('espaceClient')},
                onShow: () =>{},
              }) 
                 
                
            })
            .catch(err => {
                Toast.show({
                    type: 'error',
                    text1:'Connexion éroner',
                    text2:'vérifier votre champs',
                    visibilityTime: 1000,
                    position: 'top',})
                console.log(err)
            });
    }

    return (

        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <ScrollView >
           
     
            <Image source={logo}  style={styles.logo}/>
            <Toast ref={(ref)=>{Toast.setRef(ref)}}/>
                




        <View style={{flexDirection:'row' , alignContent:'center' , alignItems:'center' ,marginBottom:10, alignSelf:'center'}}>
<Text style={{fontWeight:'bold' , fontSize:16}}>Choisir une date :      </Text>
<TouchableOpacity onPress={() => showMode('date')}>
<Image source={datee}  style={{width:40 , height:40}} />

</TouchableOpacity></View>
<View style={{flexDirection:'row' , alignContent:'center' , alignItems:'center' , alignSelf:'center'}}>
<Text style={{fontWeight:'bold' , fontSize:16}}> Choisir une heure :   </Text>
<TouchableOpacity onPress={() => showMode('time')}>
<Image source={timee}  style={{width:50 , height:50 , alignSelf:'center' , alignItems:'center'}} />

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
<View style={{
    flexDirection:'row',
    alignItems:"center",
    marginHorizontal:25,
    borderWidth:2,
    marginTop:30,
    paddingHorizontal:10,
    borderColor:"black",
  
    paddingVertical:2,
    width:WIDTH-20,
    alignSelf:'center'
    
}

}>
    <TextInput  style={{paddingHorizontal:10 , color:'black'}} 
    value={text}
    placeholderTextColor={'grey'}
    onChangeText={date=>setText(date)} 
    editable = {false}
 placeholder="date et heure"
    />
    

</View>


{error && !text  && <Text style={{color:'red' ,fontSize:10 , fontWeight:'bold' , marginStart:20}} > champ obligatoire *</Text>}









<View style={{
    flexDirection:'row',
    alignItems:"center",
    marginHorizontal:25,
    borderWidth:2,
    marginTop:30,
    paddingHorizontal:10,
    borderColor:"black",
 
    paddingVertical:2,
    width:WIDTH-20,
    alignSelf:'center'
}

}>
    <TextInput  style={{paddingHorizontal:10 , color:'black'}} 
    placeholder={'Marque de la véhicule'}
    placeholderTextColor={'grey'}
    onChangeText={text => setMarque(text)} />

</View>
{error && !marque_vehicule  && <Text style={{color:'red' ,fontSize:10 , fontWeight:'bold' , marginStart:20}} > champ obligatoire *</Text>}

<View style={{
    flexDirection:'row',
    alignItems:"center",
    marginHorizontal:25,
    borderWidth:2,
    marginTop:30,
    paddingHorizontal:10,
    borderColor:"black",
  
    paddingVertical:2,
    width:WIDTH-20,
    marginBottom:20,
    alignSelf:'center'
}

}>
    <TextInput 
     style={{paddingHorizontal:10 , color:'black'}} 
     placeholder={'Nature de la véhicule'}
     placeholderTextColor={'grey'}
    onChangeText={text => setNatureVehicule(text)} />

</View>
      {error && !Nature_vehicule && <Text style={{color:'red' ,fontSize:10 , fontWeight:'bold' , marginStart:20}} > champ obligatoire *</Text>}


                <TouchableOpacity style={styles.btnLogin} onPress={() => {
                    addReservatoin();
                }}>
                    <Text style={styles.TextBtn}>Reserver</Text>
                </TouchableOpacity>
                
               
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
        width:WIDTH-20,
        height: 45,
      
        backgroundColor: '#0594D0',
        justifyContent: 'center',
       
  
    marginTop:30,
  
        alignItems: 'center',
       
        marginBottom:80,
        alignSelf:'center'
    },
    TextBtn: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight:'bold'
    },
    link: {
        color: 'blue',
    },
    input: {
        width: 300,
        height: 45,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 15,
        fontSize: 10,
        paddingLeft: 45,
        backgroundColor: '#f5f5f5',
        color: 'black',
        marginHorizontal: 15,
        alignSelf: 'center',
        alignItems: 'center',
        borderBottomColor: "black",

    },
    logoContainer: {
        alignItems: 'center'
    },
    btnEye: {

        top: 17,
        right: 60,
    }
    ,
    action: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
    
        marginBottom:30,
        marginLeft:10,
        marginRight:10
      },
      textInput: {
        flex: 1,
       
       
        color: "gray"
      },
   
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
        width: 180,
        height: 180,
    alignSelf:'center',
    marginBottom:80
   
  
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
    container2: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
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
    },
    title: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
      },
      datePickerStyle: {
        width: 300,
        alignSelf:'center',
        marginTop:50,
        marginBottom:20
      },
      text: {
        textAlign: 'left',
        width: 230,
        fontSize: 16,
        color : "#000"
      },
      container5: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : '#A8E9CA'
      },

});