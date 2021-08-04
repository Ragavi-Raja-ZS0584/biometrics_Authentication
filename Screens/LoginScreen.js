import React,{useState, useEffect} from 'react';
import { Button, View, Text } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';


export default function LoginScreen({navigation}) {

    BiometricAvailabilityCheck = () => {
        ReactNativeBiometrics.isSensorAvailable()
            .then((resultObject) => {
            const { available, biometryType } = resultObject;
            if (available && biometryType === ReactNativeBiometrics.TouchID) {
            console.log('TouchID is supported')
            } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
            console.log('FaceID is supported')
            } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
            console.log('Biometrics is supported')
            } else {
            console.log('Biometrics not supported')
            }
        })
    }

    BiometricVerification= () => {
        BiometricRendering();
        ReactNativeBiometrics.createSignature({
            promptMessage: 'Sign in',
            payload:  Math.round((new Date()).getTime() / 1000).toString()
        })
        .then((resultObject) => {
            console.log(resultObject);
            const { success, signature } = resultObject
            if (success) {
                navigation.navigate('Home');

            }
            else{
                console.log("please re-load and try again");
            }
        })
    }

    BiometricRendering= () => { ReactNativeBiometrics.createKeys('Confirm fingerprint')
    .then((resultObject) => {
      const { publicKey } = resultObject
      console.log(publicKey);
    })
    }

    useEffect(() => {
        BiometricAvailabilityCheck();
        BiometricVerification();
    });

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Please Login using Biometrics</Text>
      </View>
    )
}