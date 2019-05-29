import React from 'react'

import {
  View,
  StyleSheet,
  Image,
  Text,
  AsyncStorage,
  StatusBar,
} from 'react-native'

import Colors from '../constants/Colors'

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('@accessToken')
    const completedTutorial = await AsyncStorage.getItem('@completedTutorial')
    setTimeout(() => {
      console.log('starting app')
    }, 2000)
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if (userToken) {
      this.props.navigation.navigate(
        completedTutorial === 'true' ? 'App' : 'Tutorial'
      )
    } else this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>Welcome to Mario Kart... Scorer</Text>
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 20,
  },
  text: {
    fontSize: 20,
    color: Colors.white,
  },
})
