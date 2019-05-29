import React from 'react'
import { createStackNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import TournamentScreen from '../screens/TournamentScreen'
import AddRace from '../components/AddRace'
import AddPlayer from '../components/AddPlayer'
import TournamentChart from '../components/TournamentChart'
import JoinTournament from '../screens/JoinTournament'
import NewTournament from '../screens/NewTournament'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Tournament: TournamentScreen,
  AddRace,
  AddPlayer,
  Chart: TournamentChart,
  JoinTournament,
  NewTournament,
})

export default HomeStack
