/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';
 import React, { useState, useContext } from 'react';
 import { createAppContainer } from 'react-navigation';
 import { createStackNavigator} from 'react-navigation-stack';
 import SplashScreen from './Screens/SplashScreen';
 import LoginScreen from './Screens/LoginScreen';
 import HomeScreen from './Screens/HomeScreen';

 const App = createStackNavigator({
  //Constant which holds all the screens like index of any book 
    Splash: { screen: SplashScreen }, 
    //First entry by default be our first screen if we do not define initialRouteName
    Login: { screen: LoginScreen },
    Home: { screen: HomeScreen },

  },
  {
    initialRouteName: 'Login',
  }
);
export default createAppContainer(App);