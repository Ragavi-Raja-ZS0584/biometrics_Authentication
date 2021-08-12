import React , {useState, useEffect, useCallback} from "react"
import { StyleSheet, View, Text, ImageBackground} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function  SplashScreen ({navigation}) {
  
    const [h_message, seth_message] = useState ("")
    const [s_message, sets_message] = useState ("")
    const [e_message, sete_message] = useState ("")
    const [p_message, setp_message] = useState ("")

    
   
    const getBiometric = async () => {

       //check for the elegibility of the device
    const hasHardwareAsync =  LocalAuthentication.hasHardwareAsync();
    hasHardwareAsync.then((value)=>{
      if(value){
        seth_message("Device Elegible for Biometric Auth")
        const isenrolled = LocalAuthentication.isEnrolledAsync();
        isenrolled.then((value) => {
          if(value){
            sete_message("Device registered with signature")
            const support = LocalAuthentication.supportedAuthenticationTypesAsync()
            support.then((value)=>{
              if(value != undefined){
                sets_message("Supported level => ", value , " <= , 1- fingerprint,2-face,3-iris")
                const getEnrolled = LocalAuthentication.authenticateAsync()
                getEnrolled.then((value)=> {
                  if(value.success){
                    navigation.navigate("Home")
                  }else{
                    setp_message("Validation Fails => ")
                    if(value.error == 'user_cancel'){
                      setp_message(p_message,"User Cancelled the  Prompt")
                    }else{
                      if(value.error == 'system_cancel'){
                        setp_message(p_message,'Timeout error - System Cancelled the  Prompt')
                      }
                    }
                  }
                })
              }else{
                sets_message("Not Supported with any biometric")
              }
            })

          }else{
            sete_message("Device Not registered with signature")
          }
        })
      }else{
        seth_message("Device Not Elegible for Biometric Auth")
      }
      

    });

    }

     useEffect(()=>{
       getBiometric()
     }) ;
        
    return(
        <View style={{ flex:1, justifyContent: "center",alignItems: "center" ,backgroundColor: "white"}}>
            <ImageBackground 
            style={{ width: 400, height: 400 }}
            source = {require('../Assets/welcome.png')}>
            </ImageBackground>  
            
                <Text>
                  {h_message}
                </Text>
                <Text>
                  {s_message}
                </Text>
                <Text>
                  {e_message}
                </Text>
                <Text>
                   {p_message}
                </Text>
                    
        </View>
    )
}
