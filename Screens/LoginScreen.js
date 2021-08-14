import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import * as LocalAuthentication from 'expo-local-authentication';


export default function LoginScreen({navigation}) {
  const [h_message, seth_message] = useState ("")
  const [s_message, sets_message] = useState ("")
  const [e_message, sete_message] = useState ("")  
  const [p_message, setp_message] = useState ("")  
  // const [navigates, setnavigates] = useState (false)   
  
  const BioCheck = () => {
    const hasHardwareAsync =  LocalAuthentication.hasHardwareAsync();
    hasHardwareAsync.then((value)=>{if(value) seth_message("scanner is available on the device") });
    
    const isenrolled = LocalAuthentication.isEnrolledAsync();
    isenrolled.then((value) => { if(value) sete_message("device has saved data to use for authentication")});
   
    const support = LocalAuthentication.supportedAuthenticationTypesAsync();
    support.then((value) => { if(value) sets_message(value)});

    const getEnrolled = LocalAuthentication.authenticateAsync()

      getEnrolled.then((value)=> {
        console.log(value.success)
        if(value.success){
          // setnavigates(true)
          setp_message("Authenticated successfully")
        }else{
          // setnavigates(false)
          setp_message("Validation Fails => ")
          if(value.error == 'user_cancel'){
            setp_message("User Cancelled the  Prompt")
          }else{
            if(value.error == 'system_cancel'){
              setp_message('Timeout error - System Cancelled the  Prompt')
            }
          }
        }
      })
 
  }

    return (
      <View style={{ flex:1, justifyContent: "center",alignItems: "center" ,backgroundColor: "white"}}>      
        <TouchableOpacity style={styles.button}  onPress={BioCheck}><Text>Click To check</Text></TouchableOpacity>
     
        <Text >        
          {h_message}{'\n'}         
       </Text>       
        <Text style={{  justifyContent: "center"}}>       
          {e_message}{'\n'}        
        </Text>
        <Text>       
        Device Configured With : 
          {'\t'}{s_message} {'\n'}{'\n'} 1-FINGERPRINT,{'\n'} 2-FACIAL_RECOGNITION,{'\n'} 3-IRIS {'\n'}
        </Text>
        <Text>        
          {p_message}{'\n'}       
        </Text>
      </View>
    )
}
const styles = StyleSheet.create({
 
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  
});