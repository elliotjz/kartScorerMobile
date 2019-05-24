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

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth')
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
