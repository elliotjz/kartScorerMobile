import React from 'react'
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import LoginScreen from '../screens/LoginScreen'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import TutorialScreen from '../screens/TutorialScreen'
import SettingsScreen from '../screens/SettingsScreen'

const AuthStack = createStackNavigator({ Login: LoginScreen })
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: MainTabNavigator,
      Auth: AuthStack,
      Tutorial: TutorialScreen,
      Settings: SettingsScreen,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
)
