import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import Colors from '../constants/Colors'
import TournamentScreen from '../screens/TournamentScreen'
import AddData from '../components/AddData'
import TournamentRecentRaces from '../components/TournamentRecentRaces'
import TournamentSettings from '../components/TournamentSettings'
import TournamentStats from '../components/TournamentStats'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Tournament: TournamentScreen,
  Add: AddData,
  Recent: TournamentRecentRaces,
  Settings: TournamentSettings,
  Stats: TournamentStats,
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-body${focused ? '' : '-outline'}`
          : 'md-body'
      }
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
    HomeStack,
    SettingsStack,
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.primary,
    },
  }
)
