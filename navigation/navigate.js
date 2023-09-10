import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RFValue } from 'react-native-responsive-fontsize';

import Home from '../screens/Home';
import CofounderDetails from '../screens/CofounderDetails';
import MainProfile from '../screens/MainProfile';
import Settings from '../screens/Settings';
import AboutApp from '../screens/AboutApp';
import EditProfile from '../screens/EditProfile';
import SendFeedback from '../screens/SendFeedback';
import Ionicons from 'react-native-vector-icons/Ionicons';
const HStack = createStackNavigator();
const SStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class BottomTabNavigator extends React.Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Profile') {
              iconName = 'person-circle';
            } else if (route.name === 'Settings') {
              iconName = 'cog';
            }

            return (
              <Ionicons name={iconName} color={color} size={RFValue(25)} />
            );
          },

          tabBarLabel: '',
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#00ADB5',
            height: '7%',
            overflow: 'hidden',
            position: 'absolute',
            borderTopRightRadius:20,
            borderTopLeftRadius:20,
          },
        })}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={MainProfile}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    );
  }
}

const HomeStack = () => {
  return (
    <HStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <HStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <HStack.Screen
        name="CofounderDetails"
        component={CofounderDetails}
        options={{ headerShown: false }}
      />
    </HStack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <SStack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false,
      }}>
      <SStack.Screen name="Settings" component={Settings} />
      <SStack.Screen name="EditProfile" component={EditProfile} />
      <SStack.Screen name="SendFeedback" component={SendFeedback} />
      <SStack.Screen name="AboutApp" component={AboutApp} />
    </SStack.Navigator>
  );
};
