import React from "react"
import { StyleSheet, View, ImageBackground} from 'react-native';

export default function  SplashScreen ({navigation}){
    setTimeout(() => {
        navigation.navigate('Login')
    },2000 );
    return(
        <View style={{ flex:1, justifyContent: "center",alignItems: "center" ,backgroundColor: "white"}}>
            <ImageBackground 
            style={{ width: 400, height: 400 }}
            source = {require('../Assets/super_man.png')}>
            </ImageBackground>        
        </View>
    )
}
