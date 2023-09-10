import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from './screens/Loading';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import GetStarted from './screens/GetStarted';
import ForgotPassword from './screens/ForgotPassword';

import db from "./config";

import BottomTabNavigator from "./navigation/navigate";

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Loading"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
           <Stack.Screen name="Loading" component={Loading} options={{headerShown: false}}/>
         <Stack.Screen name="GetStarted" component={GetStarted} options={{headerShown: false}}/>
    
      <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
     
      <Stack.Screen name="Tabs" component={BottomTabNavigator} options={{headerShown: false}}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}}/> 
           
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}