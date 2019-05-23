import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import TutorialScreen from '../screens/TutorialScreen'
import LoginScreen from '../screens/LoginScreen'
import SettingsScreen from '../screens/SettingsScreen'
import Colors from '../constants/Colors'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
}

const TutorialStack = createStackNavigator({
  Tutorial: TutorialScreen,
})

TutorialStack.navigationOptions = {
  tabBarLabel: 'Tutorial',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
}

const LoginStack = createStackNavigator({
  Login: LoginScreen,
})

LoginStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
})

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
}

export default createBottomTabNavigator(
  {
    LoginStack,
    TutorialStack,
    SettingsStack,
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.primary,
    },
  }
)
